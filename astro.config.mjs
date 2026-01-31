// @ts-check
import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
import rehypeKatex from "rehype-katex";
import remarkExtendedTable from "remark-extended-table";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import remarkCallout from "@r4ai/remark-callout";

// https://astro.build/config
export default defineConfig({
    site: "https://almiinh.github.io",
    integrations: [svelte(), mdx()],

    redirects: {
        "/web": "/#web-projects",
    },

    markdown: {
        rehypePlugins: [rehypeKatex],
        remarkPlugins: [remarkExtendedTable, remarkMath, remarkGfm, remarkCallout],
    },
});
