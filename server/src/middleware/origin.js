import { env } from "../config/env.js";
export function requireTrustedOrigin(req, res, next) {
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) return next();
  const origin = req.get("origin");
  if (origin && origin !== env.APP_ORIGIN) return res.status(403).json({ error: "Untrusted request origin." });
  next();
}
