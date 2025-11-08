import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
    // Load Markdown and MDX files in the `src/content/blog/` directory.
    loader: glob({ base: "./src/content/blog", pattern: "**/*.{astro,md,mdx}" }),
    // Type-check frontmatter using a schema
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string(),
            pubDate: z.coerce.date(), // Transform string to Date object
            updatedDate: z.coerce.date().optional(),
            heroImage: image().optional(),
            heroSize: z.enum(["small", "large"]).default("large"),
        }),
});

export const collections = { blog };
