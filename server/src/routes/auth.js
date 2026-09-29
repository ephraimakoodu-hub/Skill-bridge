import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { hashPassword, verifyPassword } from "../lib/passwords.js";
import { createSession, deleteSession } from "../lib/session.js";
import { env } from "../config/env.js";
import { publicUser, requireAuth } from "../middleware/auth.js";

const router = Router();
const credentials = z.object({ name: z.string().trim().min(1).max(120), email: z.string().trim().email().max(255), password: z.string().min(8).max(128) });
const loginSchema = z.object({ email: z.string().trim().email().max(255), password: z.string().min(1).max(128) });
const cookieOptions = { httpOnly: true, secure: env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: env.SESSION_DAYS * 86400000 };

router.post("/register", async (req, res, next) => {
  try {
    const data = credentials.parse(req.body);
    const email = data.email.toLowerCase();
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(409).json({ error: "An account with that email already exists." });
    const user = await prisma.user.create({ data: { name: data.name, email, passwordHash: await hashPassword(data.password) } });
    const session = await createSession(user.id);
    res.cookie(env.COOKIE_NAME, session.token, cookieOptions);
    res.status(201).json({ user: publicUser(user) });
  } catch (e) { next(e); }
});

router.post("/login", async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email: data.email.toLowerCase() } });
    if (!user || !(await verifyPassword(data.password, user.passwordHash))) return res.status(401).json({ error: "Invalid email or password." });
    const session = await createSession(user.id);
    res.cookie(env.COOKIE_NAME, session.token, cookieOptions);
    res.json({ user: publicUser(user) });
  } catch (e) { next(e); }
});

router.post("/logout", async (req, res, next) => { try { await deleteSession(req.cookies[env.COOKIE_NAME]); res.clearCookie(env.COOKIE_NAME, { httpOnly: true, secure: env.NODE_ENV === "production", sameSite: "lax", path: "/" }); res.status(204).end(); } catch (e) { next(e); } });
router.get("/me", requireAuth, async (req, res) => res.json({ user: publicUser(req.user) }));

router.patch("/me", requireAuth, async (req, res, next) => {
  try {
    const data = z.object({ name: z.string().trim().min(1).max(120).optional(), bio: z.string().max(500).optional(), location: z.string().max(120).optional() }).parse(req.body);
    const user = await prisma.user.update({ where: { id: req.user.id }, data });
    res.json({ user: publicUser(user) });
  } catch (e) { next(e); }
});

export default router;
