// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// 2. Define your collection(s)
const svgCollection = defineCollection({
  type: "content", // v2.5.0 and later
  schema: () =>
    z.object({
      day: z.number(),
      title: z.string(),
      component: z.string(),
      category: z.string(),
      description: z.string(),
      suggestions: z.array(z.string()).optional(),
    }),
});
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  svg: svgCollection,
};
