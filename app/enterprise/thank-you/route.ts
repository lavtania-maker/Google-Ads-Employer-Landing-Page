import html from "./thank-you-html"

// Serves the Enterprise form Thank You page as a complete, self-contained HTML page at /enterprise/thank-you
export const dynamic = "force-static"

export function GET() {
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  })
}
