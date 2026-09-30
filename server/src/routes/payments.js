import { Router } from "express";
import { z } from "zod";

import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

const PREMIUM_NGN = 20000;
const PREMIUM_AMOUNT_KOBO = PREMIUM_NGN * 100;

// ------------------------------------------------------------
// GET /api/payments/subscription
// ------------------------------------------------------------

router.get(
  "/subscription",
  requireAuth,
  async (req, res, next) => {
    try {
      const subscription =
        await prisma.subscription.findUnique({
          where: {
            userId: req.user.id,
          },
          select: {
            status: true,
            plan: true,
            activatedAt: true,
            paymentId: true,
          },
        });

      res.json({
        subscription: subscription
          ? {
              status: subscription.status,
              plan: subscription.plan,
              activatedAt: subscription.activatedAt,
              paymentId: subscription.paymentId,
            }
          : {
              status: "INACTIVE",
              plan: "premium",
              activatedAt: null,
              paymentId: null,
            },
      });
    } catch (error) {
      next(error);
    }
  }
);

// ------------------------------------------------------------
// POST /api/payments/initialize
//
// Creates a manual bank-transfer payment request.
// No Paystack is used here.
// ------------------------------------------------------------

router.post(
  "/initialize",
  requireAuth,
  async (req, res, next) => {
    try {
      const existing =
        await prisma.subscription.findUnique({
          where: {
            userId: req.user.id,
          },
        });

      if (existing?.status === "ACTIVE") {
        return res.status(409).json({
          error: "Premium is already active.",
        });
      }

      // Check whether this user already has a pending payment.
      const existingPayment =
        await prisma.payment.findFirst({
          where: {
            userId: req.user.id,
            amountKobo: PREMIUM_AMOUNT_KOBO,
            status: "INITIALIZED",
          },
          orderBy: {
            createdAt: "desc",
          },
        });

      if (existingPayment) {
        return res.json({
          paymentMethod: "bank_transfer",
          reference: existingPayment.reference,
          amountNgn: PREMIUM_NGN,
          status: "PENDING",
          bankDetails: {
            bankName:
              process.env.BANK_NAME || "YOUR BANK NAME",
            accountName:
              process.env.BANK_ACCOUNT_NAME ||
              "YOUR ACCOUNT NAME",
            accountNumber:
              process.env.BANK_ACCOUNT_NUMBER ||
              "YOUR ACCOUNT NUMBER",
          },
          instructions:
            "Transfer exactly ₦20,000 and keep your transaction reference. After payment, submit the payment reference for verification.",
        });
      }

      const reference =
        `SB-BANK-${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 8)
          .toUpperCase()}`;

      const payment =
        await prisma.payment.create({
          data: {
            userId: req.user.id,
            reference,
            amountKobo: PREMIUM_AMOUNT_KOBO,
            currency: "NGN",
            status: "INITIALIZED",
            metadata: {
              paymentMethod: "bank_transfer",
              product: "skillbridge-premium",
              durationMonths: 6,
            },
          },
        });

      res.status(201).json({
        paymentMethod: "bank_transfer",
        reference: payment.reference,
        amountNgn: PREMIUM_NGN,
        status: "PENDING",
        bankDetails: {
          bankName:
            process.env.BANK_NAME || "YOUR BANK NAME",
          accountName:
            process.env.BANK_ACCOUNT_NAME ||
            "YOUR ACCOUNT NAME",
          accountNumber:
            process.env.BANK_ACCOUNT_NUMBER ||
            "YOUR ACCOUNT NUMBER",
        },
        instructions:
          "Transfer exactly ₦20,000 and keep your transaction reference. After payment, submit the payment reference for verification.",
      });
    } catch (error) {
      next(error);
    }
  }
);

// ------------------------------------------------------------
// POST /api/payments/confirm
//
// User tells the system that they have made the transfer.
// This DOES NOT activate Premium.
// An admin must verify the bank payment first.
// ------------------------------------------------------------

router.post(
  "/confirm",
  requireAuth,
  async (req, res, next) => {
    try {
      const { reference } =
        z
          .object({
            reference: z.string().min(1).max(120),
          })
          .parse(req.body);

      const payment =
        await prisma.payment.findFirst({
          where: {
            reference,
            userId: req.user.id,
          },
        });

      if (!payment) {
        return res.status(404).json({
          error: "Payment not found.",
        });
      }

      if (payment.status === "SUCCESS") {
        return res.json({
          confirmed: true,
          status: "SUCCESS",
          message:
            "This payment has already been approved.",
        });
      }

      await prisma.payment.update({
        where: {
          id: payment.id,
        },
        data: {
          metadata: {
            ...(payment.metadata || {}),
            paymentMethod: "bank_transfer",
            customerConfirmedAt:
              new Date().toISOString(),
          },
        },
      });

      res.json({
        confirmed: true,
        status: "PENDING",
        message:
          "Payment submitted for verification. Premium will be activated after the payment is verified.",
      });
    } catch (error) {
      next(error);
    }
  }
);

// ------------------------------------------------------------
// GET /api/payments/verify/:reference
//
// For bank transfer, verification is manual.
// This endpoint only reports the current payment status.
// ------------------------------------------------------------

router.get(
  "/verify/:reference",
  requireAuth,
  async (req, res, next) => {
    try {
      const { reference } =
        z
          .object({
            reference: z.string().min(1).max(120),
          })
          .parse(req.params);

      const payment =
        await prisma.payment.findFirst({
          where: {
            reference,
            userId: req.user.id,
          },
        });

      if (!payment) {
        return res.status(404).json({
          error: "Payment not found.",
        });
      }

      const subscription =
        await prisma.subscription.findUnique({
          where: {
            userId: req.user.id,
          },
          select: {
            status: true,
            plan: true,
            activatedAt: true,
          },
        });

      res.json({
        paid: payment.status === "SUCCESS",
        paymentStatus: payment.status,
        reference: payment.reference,
        subscription,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;