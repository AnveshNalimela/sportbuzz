import express, { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();

  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true }, // Use true to enable middleware mode
  });

  // Use Vite's middleware to handle HMR, asset requests, etc.
  app.use(vite.middlewares);

  // Transform and serve `index.html` for the root route
  app.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Read the `index.html` file
      let html = fs.readFileSync(
        path.resolve(__dirname, "../index.html"),
        "utf-8"
      );

      // Transform HTML using Vite (injects HMR, modules, etc.)
      html = await vite.transformIndexHtml(req.url, html);

      // Send the transformed HTML
      res.send(html);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  // Handle other routes if necessary
  app.use("*", async (req: Request, res: Response, next: NextFunction) => {
    try {
      let html = fs.readFileSync(
        path.resolve(__dirname, "../index.html"),
        "utf-8"
      );
      html = await vite.transformIndexHtml(req.url, html);
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
}

startServer();
