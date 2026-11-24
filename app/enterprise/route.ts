import html from "./enterprise-html"

// ─────────────────────────────────────────────────────────────
// Google Sheet + Upbox: paste your Apps Script web app URL here
// (Apps Script > Deploy > Manage deployments > Web app URL, ends with /exec).
// Or set it as the environment variable ENTERPRISE_FORM_ENDPOINT in Vercel/v0.
const SHEET_ENDPOINT =
  process.env.ENTERPRISE_FORM_ENDPOINT ?? "PASTE_APPS_SCRIPT_WEB_APP_URL_HERE"
// ─────────────────────────────────────────────────────────────

// Serves the Maukerja Enterprise landing page as a complete HTML page at /enterprise
export const dynamic = "force-static"

export function GET() {
  const page = html.replace("PASTE_APPS_SCRIPT_WEB_APP_URL_HERE", SHEET_ENDPOINT)
  return new Response(page, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  })
}
