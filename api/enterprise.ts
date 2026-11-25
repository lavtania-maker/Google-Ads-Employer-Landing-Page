// Vercel runs this as native ESM, so relative imports need an explicit .js extension.
import html from "../app/enterprise/enterprise-html.js";

const PLACEHOLDER = "PASTE_APPS_SCRIPT_WEB_APP_URL_HERE";

export function GET() {
  const endpoint = process.env.ENTERPRISE_FORM_ENDPOINT ?? PLACEHOLDER;
  return new Response(html.replace(PLACEHOLDER, endpoint), {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
