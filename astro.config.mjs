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
  adapter: vercel({
    imageService: true
  }),
  integrations: [mdx(), react()]
});