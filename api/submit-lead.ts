import type { IncomingMessage, ServerResponse } from "http";

interface VercelRequest extends IncomingMessage {
  body: any;
  query: { [key: string]: string | string[] };
  method?: string;
}

interface VercelResponse extends ServerResponse {
  status: (statusCode: number) => VercelResponse;
  json: (body: any) => VercelResponse;
  send: (body: any) => VercelResponse;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers for security and compatibility
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    res.status(200).send("OK");
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed. Use POST instead." });
    return;
  }

  try {
    const scriptUrl = process.env.GOOGLEADS_APPS_SCRIPT_URL;
    const sheetId = process.env.SHEET_ID;
    const sheetName = process.env.SHEET_NAME;

    if (!scriptUrl) {
      console.error("GOOGLEADS_APPS_SCRIPT_URL is missing in environment variables");
      res.status(500).json({ 
        error: "Server configuration error: GOOGLEADS_APPS_SCRIPT_URL is missing or unreadable. If you just added it to Vercel, please make sure you Redeployed your project so the environment variables are active." 
      });
      return;
    }

    // Safely parse body using a dual-layer approach (pre-parsed OR streamed raw chunk)
    let parsedBody = req.body;
    if (!parsedBody) {
      try {
        const buffers = [];
        for await (const chunk of req) {
          buffers.push(chunk);
        }
        const data = Buffer.concat(buffers).toString();
        if (data) {
          parsedBody = JSON.parse(data);
        }
      } catch (streamErr) {
        console.error("Could not parse request body from stream:", streamErr);
      }
    }

    if (typeof parsedBody === "string") {
      try {
        parsedBody = JSON.parse(parsedBody);
      } catch (parseErr) {
        console.error("Error parsing string request body:", parseErr);
      }
    }

    if (!parsedBody) {
      parsedBody = {};
    }

    const payload = {
      ...parsedBody,
      sheet_id: sheetId,
      sheet_name: sheetName,
    };

    console.log("Proxying request to Apps Script:", scriptUrl);

    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    const text = await response.text();
    console.log("Apps Script server responded with status:", response.status);

    if (!response.ok) {
      res.status(response.status).json({ error: `Apps Script error (${response.status}): ${text}` });
      return;
    }

    res.status(200).send(text);
  } catch (error: any) {
    console.error("Vercel Proxy serverless handler caught an error:", error);
    res.status(500).json({ 
      error: `Integration error: Failed to connect to the Google Apps Script service. Details: ${error?.message || error}` 
    });
  }
}
