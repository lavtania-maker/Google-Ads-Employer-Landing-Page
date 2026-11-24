import express from "express";
import { createServer as createHttpServer } from "http";
import { createServer as createViteServer } from "vite";
import path from "path";
import dotenv from "dotenv";
import { GET as enterpriseGET } from "./app/enterprise/route";
import { GET as enterpriseThankYouGET } from "./app/enterprise/thank-you/route";

dotenv.config();

async function startServer() {
  const app = express();
  const httpServer = createHttpServer(app);
  const PORT = 3000;

  // Middleware to parse JSON
  app.use(express.json());

  // API route to proxy the lead submission
  app.post("/api/submit-lead", async (req, res) => {
    try {
      const scriptUrl = process.env.GOOGLEADS_APPS_SCRIPT_URL;
      const sheetId = process.env.SHEET_ID;
      const sheetName = process.env.SHEET_NAME;

      if (!scriptUrl) {
        console.error("GOOGLEADS_APPS_SCRIPT_URL is not defined");
        return res.status(500).json({ error: "Configuration missing" });
      }

      // Add sheet info to payload if available
      const payload = {
        ...req.body,
        sheet_id: sheetId,
        sheet_name: sheetName
      };

      console.log("Submitting to Apps Script:", scriptUrl);
      console.log("Payload summary:", { 
        email: payload.email, 
        sheet_id: sheetId ? "present" : "MISSING",
        sheet_name: sheetName ? "present" : "MISSING"
      });

      const response = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        redirect: 'follow'
      });

      const text = await response.text();
      console.log("Apps Script response status:", response.status);
      console.log("Apps Script response body:", text);

      res.status(response.status).send(text);
    } catch (error) {
      console.error("Proxy error:", error);
      res.status(500).json({ error: "Failed to submit lead" });
    }
  });

  // Full HTML pages exported as Next.js-style route handlers in app/enterprise
  const sendRouteResponse = async (response: Response, res: express.Response) => {
    res.status(response.status);
    response.headers.forEach((value, key) => res.setHeader(key, value));
    res.send(await response.text());
  };
  app.get(["/enterprise", "/enterprise/"], (_req, res) => sendRouteResponse(enterpriseGET(), res));
  app.get(["/enterprise/thank-you", "/enterprise/thank-you/"], (_req, res) =>
    sendRouteResponse(enterpriseThankYouGET(), res)
  );

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        // Share the app's HTTP server so the HMR WebSocket uses the same port the preview proxy exposes.
        hmr: process.env.DISABLE_HMR === "true" ? false : { server: httpServer },
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      // If the request is for a static file (e.g., contains a dot like .js, .css, .png, etc.),
      // return a clean 404 instead of falling back to serving index.html.
      // This prevents "Unexpected token '<'" browser JS exceptions when assets are cached/desynced.
      if (req.path.includes('.') || req.path.startsWith('/assets/')) {
        return res.status(404).send('Not Found');
      }
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
