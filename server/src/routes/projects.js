import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";
const router = Router();
router.get("/mine", requireAuth, async (req,res,next)=>{try{const rows=await prisma.projectState.findMany({where:{userId:req.user.id},include:{project:true}});res.json({projects:rows});}catch(e){next(e);}});
router.put("/:projectId", requireAuth, async (req,res,next)=>{try{const data=z.object({status:z.enum(["NOT_STARTED","IN_PROGRESS","COMPLETED"]).optional(),checklist:z.record(z.string(),z.boolean()).optional(),notes:z.string().max(10000).optional()}).parse(req.body); const project=await prisma.project.findUnique({where:{id:req.params.projectId}});if(!project)return res.status(404).json({error:"Project not found."}); const existing=await prisma.projectState.findUnique({where:{userId_projectId:{userId:req.user.id,projectId:req.params.projectId}}}); const status=data.status??existing?.status??"NOT_STARTED"; const row=await prisma.projectState.upsert({where:{userId_projectId:{userId:req.user.id,projectId:req.params.projectId}},create:{userId:req.user.id,projectId:req.params.projectId,status,checklist:data.checklist??{},notes:data.notes??"",startedAt:status!=="NOT_STARTED"?new Date():null,completedAt:status==="COMPLETED"?new Date():null},update:{...data,startedAt:status!=="NOT_STARTED"?(existing?.startedAt??new Date()):null,completedAt:status==="COMPLETED"?new Date():null}});res.json({project:row});}catch(e){next(e);}});
export default router;
