import { Router } from "express";
import { prisma } from "../lib/prisma.js";
const router = Router();
router.get("/", async (req, res, next) => { try { await prisma.$queryRaw`SELECT 1`; res.json({ ok: true, service: "skillbridge-api" }); } catch (e) { next(e); } });
export default router;
