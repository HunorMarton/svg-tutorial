import { defineConfig } from "astro/config";
// Use Vercel Edge Functions (Recommended)
// import vercel from "@astrojs/vercel/edge";
// Can also use Serverless Functions
// import vercel from '@astrojs/vercel/serverless';
// Or a completely static build
import vercel from "@astrojs/vercel/static";
import mdx from "@astrojs/mdx";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: "https://svg-tutorial.com",
  adapter: vercel({
    imageService: true,
  }),
  integrations: [mdx(), react()],
  redirects: {
    "/arc": "/editor/arc",
    "/cubicBezier": "/editor/cubicBezier",
    "/quadraticBezier": "/editor/quadraticBezier",
    "/line": "/editor/line",
    "/circle": "/editor/circle",
    "/rect": "/editor/rect",
  },
});
