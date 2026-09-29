import { env } from "../config/env.js";
import { getSession } from "../lib/session.js";

export async function requireAuth(req, res, next) {
  try {
    const session = await getSession(req.cookies[env.COOKIE_NAME]);
    if (!session) return res.status(401).json({ error: "Authentication required." });
    req.user = session.user;
    req.session = session;
    next();
  } catch (error) { next(error); }
}

export function publicUser(user) {
  return { id: user.id, name: user.name, email: user.email, bio: user.bio, location: user.location, role: user.role, createdAt: user.createdAt };
}
