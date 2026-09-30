import { Router } from "express";

import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// Only ADMIN users can access this router.
async function requireAdmin(req, res, next) {
  if (req.user?.role !== "ADMIN") {
    return res.status(403).json({
      error: "Administrator access required.",
    });
  }

  next();
}

// GET /api/admin/payments
// Returns pending payments for admin review.
router.get(
  "/payments",
  requireAuth,
  requireAdmin,
  async (req, res, next) => {
    try {
      const payments = await prisma.payment.findMany({
        where: {
          status: "INITIALIZED",
        },
        orderBy: {
          createdAt: "asc",
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      res.json({
        payments,
      });
    } catch (error) {
      next(error);
    }
  }
);

// POST /api/admin/payments/:paymentId/approve
// Approves a verified ₦20,000 payment and
// activates Premium for 6 months.
router.post(
  "/payments/:paymentId/approve",
  requireAuth,
  requireAdmin,
  async (req, res, next) => {
    try {
      const { paymentId } = req.params;

      const payment = await prisma.payment.findUnique({
        where: {
          id: paymentId,
        },
      });

      if (!payment) {
        return res.status(404).json({
          error: "Payment not found.",
        });
      }

      if (payment.status === "SUCCESS") {
        return res.status(409).json({
          error: "This payment has already been approved.",
        });
      }

      if (payment.amountKobo !== 2000000) {
        return res.status(400).json({
          error: "This payment does not match the Premium price.",
        });
      }

      const now = new Date();

      const expiresAt = new Date(now);
      expiresAt.setMonth(expiresAt.getMonth() + 6);

      const result = await prisma.$transaction(async (tx) => {
        const updatedPayment = await tx.payment.update({
          where: {
            id: payment.id,
          },
          data: {
            status: "SUCCESS",
            paidAt: now,
          },
        });

        const subscription = await tx.subscription.upsert({
          where: {
            userId: payment.userId,
          },
          create: {
            userId: payment.userId,
            paymentId: payment.id,
            status: "ACTIVE",
            plan: "premium",
            activatedAt: now,
            expiresAt,
          },
          update: {
            paymentId: payment.id,
            status: "ACTIVE",
            plan: "premium",
            activatedAt: now,
            expiresAt,
          },
        });

        return {
          payment: updatedPayment,
          subscription,
        };
      });

      res.json({
        message: "Payment approved and Premium activated for 6 months.",
        payment: {
          id: result.payment.id,
          reference: result.payment.reference,
          status: result.payment.status,
          paidAt: result.payment.paidAt,
        },
        subscription: {
          status: result.subscription.status,
          plan: result.subscription.plan,
          activatedAt: result.subscription.activatedAt,
          expiresAt: result.subscription.expiresAt,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

// POST /api/admin/payments/:paymentId/reject
// Rejects a pending payment without activating Premium.
router.post(
  "/payments/:paymentId/reject",
  requireAuth,
  requireAdmin,
  async (req, res, next) => {
    try {
      const { paymentId } = req.params;

      const payment = await prisma.payment.findUnique({
        where: {
          id: paymentId,
        },
      });

      if (!payment) {
        return res.status(404).json({
          error: "Payment not found.",
        });
      }

      if (payment.status !== "INITIALIZED") {
        return res.status(409).json({
          error: "Only pending payments can be rejected.",
        });
      }

      const updatedPayment = await prisma.payment.update({
        where: {
          id: payment.id,
        },
        data: {
          status: "FAILED",
          gatewayResponse:
            "Bank transfer was rejected during manual verification.",
        },
      });

      res.json({
        message: "Payment rejected.",
        payment: {
          id: updatedPayment.id,
          reference: updatedPayment.reference,
          status: updatedPayment.status,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;