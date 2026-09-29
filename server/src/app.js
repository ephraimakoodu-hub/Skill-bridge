import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

import { env } from "./config/env.js";

import { requireTrustedOrigin } from "./middleware/origin.js";
import {
  notFound,
  errorHandler,
} from "./middleware/errors.js";

import healthRouter from "./routes/health.js";
import authRouter from "./routes/auth.js";
import paymentsRouter from "./routes/payments.js";
import progressRouter from "./routes/progress.js";
import projectsRouter from "./routes/projects.js";
import opportunitiesRouter from "./routes/opportunities.js";

const app = express();

app.disable("x-powered-by");

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(
  cors({
    origin: env.APP_ORIGIN,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "100kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: "draft-8",
    legacyHeaders: false,
  })
);

app.use(requireTrustedOrigin);

// API root
app.get("/", (req, res) => {
  res.json({
    name: "SkillBridge NG API",
    status: "ok",
  });
});

// API routes
app.use("/api/health", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/payments", paymentsRouter);
app.use("/api/progress", progressRouter);
app.use("/api/projects", projectsRouter);
app.use(
  "/api/opportunities",
  opportunitiesRouter
);

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

export default app;
