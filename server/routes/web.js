import express from "express";
import fs from "node:fs";
import path from "node:path";

export function createWebRouter({ rootDir }) {
  const router = express.Router();
  const webDir = path.resolve(rootDir, "web");
  const indexFile = path.resolve(webDir, "index.html");
  const staticOptions = {
    setHeaders(res, filePath) {
      if (/\.(html|js|css)$/i.test(filePath)) {
        res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
      }
    },
  };

  router.get("/", (_req, res) => {
    res.redirect("/app");
  });

  function sendAppShell(req, res) {
    const exists = fs.existsSync(indexFile);
    console.info("[web] /app request", {
      path: req.path,
      webDir,
      indexFile,
      indexExists: exists,
    });

    if (!exists) {
      res.status(500).send("Mini App shell is missing.");
      return;
    }

    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    res.sendFile(indexFile);
  }

  router.get("/app", sendAppShell);
  router.get("/app/*", sendAppShell);
  router.use(express.static(webDir, staticOptions));

  return router;
}
