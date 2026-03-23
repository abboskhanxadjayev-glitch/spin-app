import express from "express";
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

  router.use(express.static(webDir, staticOptions));
  router.use("/app", express.static(webDir, staticOptions));
  router.get("/", (_req, res) => {
    res.redirect("/app");
  });
  router.get("/app", (_req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    res.sendFile(indexFile);
  });
  router.get("/app/*", (_req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    res.sendFile(indexFile);
  });

  return router;
}
