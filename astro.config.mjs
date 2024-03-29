import { defineConfig } from "astro/config";
// Use Vercel Edge Functions (Recommended)
// import vercel from "@astrojs/vercel/edge";
// Can also use Serverless Functions
// import vercel from '@astrojs/vercel/serverless';
// Or a completely static build
import vercel from "@astrojs/vercel/static";

// https://astro.build/config
export default defineConfig({
  output: "static",
  experimental: {
    assets: true,
    viewTransitions: true,
  },
  adapter: vercel({
    imageService: true,
  }),
  integrations: [],
});
