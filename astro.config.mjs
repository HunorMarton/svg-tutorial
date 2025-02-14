import { defineConfig } from "astro/config";
// Use Vercel Edge Functions (Recommended)
// import vercel from "@astrojs/vercel/edge";
// Can also use Serverless Functions
// import vercel from '@astrojs/vercel/serverless';
// Or a completely static build
import vercel from "@astrojs/vercel/static";
import mdx from "@astrojs/mdx";

import react from "@astrojs/react";

import sentry from "@sentry/astro";

import astroExpressiveCode from "astro-expressive-code";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { highlightElementPlugin } from "./src/plugins/code-highlight-element/index.ts";
import { highlightCoordinatePlugin } from "./src/plugins/code-highlight-coordinate/index.ts";

import markdownHighlightCode from "./src/plugins/markdown-highlight-code/index.ts";

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: "https://svg-tutorial.com",
  adapter: vercel({
    imageService: true,
  }),
  integrations: [
    astroExpressiveCode({
      plugins: [
        pluginCollapsibleSections(),
        highlightCoordinatePlugin(),
        highlightElementPlugin([
          "circle",
          "ellipse",
          "rect",
          "polygon",
          "polyline",
          "line",
          "path",
        ]),
      ],
      useDarkModeMediaQuery: false,
      styleOverrides: {
        codeFontSize: "12px", // How to use em or rem here?
      },
    }),
    mdx(),
    react(),
    sentry({
      dsn: "https://c2e552f56cd9a0c4c68bfe50cc0c424b@o4506893552975872.ingest.us.sentry.io/4508043663507456",
      sourceMapsUploadOptions: {
        project: "svg-tutorial",
        authToken: process.env.SENTRY_AUTH_TOKEN,
      },
    }),
  ],
  markdown: {
    remarkPlugins: [markdownHighlightCode],
  },
  redirects: {
    // SVG Tutorial
    "/svg/polygon": "/svg/viewbox",
    "/svg/house": "/svg/polygon-and-polyline",
    "/svg/bell": "/svg/animation-on-hover",
    "/svg/forest": "/svg/scale",
    "/svg/rotate": "/svg/rotate-and-translate",
    "/svg/text-path": "/svg/text",
    // Editor
    "/arc": "/editor/arc",
    "/cubicBezier": "/editor/cubicBezier",
    "/quadraticBezier": "/editor/quadraticBezier",
    "/line": "/editor/line",
    "/circle": "/editor/circle",
    "/rect": "/editor/rect",
  },
});
