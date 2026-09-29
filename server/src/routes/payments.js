import { Router } from "express";
import { z } from "zod";

import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";
import { env } from "../config/env.js";

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

      const reference =
        `SBNG-${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 10)}`;

      const response = await fetch(
        "https://api.paystack.co/transaction/initialize",
        {
          method: "POST",
          headers: {
            Authorization:
              `Bearer ${env.PAYSTACK_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: req.user.email,
            amount: PREMIUM_AMOUNT_KOBO,
            currency: "NGN",
            reference,
            metadata: {
              userId: req.user.id,
              product: "skillbridge-premium",
            },
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.status) {
        return res.status(502).json({
          error: "Unable to initialize payment.",
        });
      }

      await prisma.payment.create({
        data: {
          userId: req.user.id,
          reference,
          amountKobo: PREMIUM_AMOUNT_KOBO,
          currency: "NGN",
          status: "INITIALIZED",
          metadata: result.data ?? undefined,
        },
      });

      res.json({
        reference,
        authorizationUrl:
          result.data.authorization_url,
        accessCode: result.data.access_code,
      });
    } catch (error) {
      next(error);
    }
  }
);

// ------------------------------------------------------------
// GET /api/payments/verify/:reference
// ------------------------------------------------------------

router.get(
  "/verify/:reference",
  requireAuth,
  async (req, res, next) => {
    try {
      const { reference } =
        z.object({
          reference: z.string().min(1).max(120),
        }).parse(req.params);

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

      // Already successfully verified.
      if (payment.status === "SUCCESS") {
        const subscription =
          await prisma.subscription.findUnique({
            where: {
              userId: req.user.id,
            },
          });

        return res.json({
          paid: true,
          subscription: subscription
            ? {
                status: subscription.status,
                plan: subscription.plan,
                activatedAt:
                  subscription.activatedAt,
              }
            : null,
        });
      }

      const response = await fetch(
        `https://api.paystack.co/transaction/verify/${encodeURIComponent(
          reference
        )}`,
        {
          headers: {
            Authorization:
              `Bearer ${env.PAYSTACK_SECRET_KEY}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok || !result.status) {
        return res.status(502).json({
          error: "Unable to verify payment.",
        });
      }

      const transaction = result.data;

      const success =
        transaction?.status === "success" &&
        transaction?.amount === payment.amountKobo &&
        transaction?.currency === payment.currency &&
        transaction?.reference === payment.reference;

      if (success) {
        await prisma.$transaction([
          prisma.payment.update({
            where: {
              id: payment.id,
            },
            data: {
              status: "SUCCESS",
              paidAt: transaction.paid_at
                ? new Date(transaction.paid_at)
                : new Date(),
              gatewayResponse:
                transaction.gateway_response ??
                null,
              metadata: transaction,
            },
          }),

          prisma.subscription.upsert({
            where: {
              userId: req.user.id,
            },
            create: {
              userId: req.user.id,
              paymentId: payment.id,
              status: "ACTIVE",
              plan: "premium",
              activatedAt: new Date(),
            },
            update: {
              paymentId: payment.id,
              status: "ACTIVE",
              plan: "premium",
              activatedAt: new Date(),
            },
          }),
        ]);
      } else {
        await prisma.payment.update({
          where: {
            id: payment.id,
          },
          data: {
            status:
              transaction?.status === "abandoned"
                ? "ABANDONED"
                : "FAILED",
            gatewayResponse:
              transaction?.gateway_response ??
              null,
            metadata: transaction ?? undefined,
          },
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
        paid: success,
        subscription,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
