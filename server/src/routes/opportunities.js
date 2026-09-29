import { Router } from "express";

import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// GET /api/opportunities
// Public list of opportunities
router.get("/", async (req, res, next) => {
  try {
    const opportunities =
      await prisma.opportunity.findMany({
        orderBy: [
          { postedAt: "desc" },
          { createdAt: "desc" },
        ],
      });

    res.json({
      opportunities,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/opportunities/saved
// Get IDs of opportunities saved by logged-in user
router.get(
  "/saved",
  requireAuth,
  async (req, res, next) => {
    try {
      const rows =
        await prisma.savedOpportunity.findMany({
          where: {
            userId: req.user.id,
          },
          select: {
            opportunityId: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });

      res.json({
        ids: rows.map(
          (row) => row.opportunityId
        ),
      });
    } catch (error) {
      next(error);
    }
  }
);

// POST /api/opportunities/:id/save
// Save an opportunity
router.post(
  "/:id/save",
  requireAuth,
  async (req, res, next) => {
    try {
      const opportunity =
        await prisma.opportunity.findUnique({
          where: {
            id: req.params.id,
          },
        });

      if (!opportunity) {
        return res.status(404).json({
          error: "Opportunity not found.",
        });
      }

      await prisma.savedOpportunity.upsert({
        where: {
          userId_opportunityId: {
            userId: req.user.id,
            opportunityId: req.params.id,
          },
        },
        create: {
          userId: req.user.id,
          opportunityId: req.params.id,
        },
        update: {},
      });

      res.json({
        saved: true,
        opportunityId: req.params.id,
      });
    } catch (error) {
      next(error);
    }
  }
);

// DELETE /api/opportunities/:id/save
// Remove a saved opportunity
router.delete(
  "/:id/save",
  requireAuth,
  async (req, res, next) => {
    try {
      await prisma.savedOpportunity.deleteMany({
        where: {
          userId: req.user.id,
          opportunityId: req.params.id,
        },
      });

      res.json({
        saved: false,
        opportunityId: req.params.id,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
