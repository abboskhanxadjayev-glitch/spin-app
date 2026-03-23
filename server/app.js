import express from "express";
import { createApiRouter } from "./routes/api.js";
import { createWebRouter } from "./routes/web.js";

function applyCors(_req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (_req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  return next();
}

export function createApp({
  db,
  config,
  roomManager,
  broadcastRoomUpdate,
  broadcastChatMessage,
  broadcastTurnUpdate,
}) {
  const app = express();

  app.use(applyCors);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    "/api",
    createApiRouter({
      db,
      config,
      roomManager,
      broadcastRoomUpdate,
      broadcastChatMessage,
      broadcastTurnUpdate,
    })
  );
  app.use(createWebRouter({ rootDir: config.rootDir }));
  app.use((req, res) => {
    console.warn("[server] route not found", {
      method: req.method,
      path: req.path,
    });

    if (req.path.startsWith("/api")) {
      res.status(404).json({
        ok: false,
        error: "Not Found",
      });
      return;
    }

    res.status(404).send("Not Found");
  });
  app.use((err, req, res, _next) => {
    console.error("[server] unhandled app error", {
      method: req.method,
      path: req.path,
      message: err?.message || "Unknown error",
    });

    if (res.headersSent) {
      return;
    }

    const wantsJson =
      req.path.startsWith("/api") ||
      req.accepts(["json", "html"]) === "json";

    if (wantsJson) {
      res.status(500).json({
        ok: false,
        error: "Internal server error.",
      });
      return;
    }

    res.status(500).send("Internal server error.");
  });

  return app;
}
