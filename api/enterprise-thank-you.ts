// Vercel runs this as native ESM, so relative imports need an explicit .js extension.
import html from "../app/enterprise/thank-you/thank-you-html.js";

export function GET() {
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
