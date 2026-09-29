import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";
const router = Router();
router.get("/", requireAuth, async (req, res, next) => { try { const rows = await prisma.lessonProgress.findMany({ where: { userId: req.user.id }, select: { lessonId: true, completed: true, completedAt: true } }); res.json({ progress: rows }); } catch(e){ next(e); } });
router.put("/:lessonId", requireAuth, async (req,res,next)=>{ try { const { completed } = z.object({ completed: z.boolean() }).parse(req.body); const row=await prisma.lessonProgress.upsert({ where:{userId_lessonId:{userId:req.user.id,lessonId:req.params.lessonId}}, create:{userId:req.user.id,lessonId:req.params.lessonId,completed,completedAt:completed?new Date():null}, update:{completed,completedAt:completed?new Date():null} }); res.json({progress:row}); } catch(e){next(e);} });
export default router;
