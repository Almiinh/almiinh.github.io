// @ts-check
import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
import rehypeKatex from "rehype-katex";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkExtendedTable from "remark-extended-table";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import remarkCallout from "@r4ai/remark-callout";
import remarkObsidian from "remark-obsidian";

// https://astro.build/config
export default defineConfig({
    site: "https://almiinh.github.io",
    integrations: [svelte(), mdx()],

    redirects: {
        "/web": "/#web-projects",
    },

    markdown: {
        processor: unified({
            rehypePlugins: [rehypeKatex, rehypeAutolinkHeadings],
            remarkPlugins: [remarkMath, remarkGfm, remarkCallout, remarkObsidian],
        }),
    },
});
