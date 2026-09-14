import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const PAGES_ROUTES = [
  "/",
  "/features",
  "/pricing",
  "/about",
  "/faq",
  "/contact",
  "/privacy-policy",
  "/terms",
];

// Dedicated GitHub Pages build. Uses the standard Lovable plugin chain
// (same design, SEO head, assets and fonts) but with prerendering enabled so
// every route is emitted as static <route>/index.html for GitHub Pages.
// The default `vite build` (Lovable/Cloudflare) is untouched.
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
    prerender: {
      enabled: true,
      routes: PAGES_ROUTES,
    },
  },
});