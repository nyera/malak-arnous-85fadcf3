import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          { path: "/", priority: "1.0" },
          { path: "/programs", priority: "0.9" },
          { path: "/transformations", priority: "0.9" },
          { path: "/about", priority: "0.7" },
          { path: "/survey", priority: "0.9" },
          { path: "/contact", priority: "0.8" },
        ];
        const urls = entries.map((e) => `  <url>\n    <loc>${e.path}</loc>\n    <priority>${e.priority}</priority>\n  </url>`);
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml" } });
      },
    },
  },
});
