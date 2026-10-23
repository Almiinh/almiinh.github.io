// @ts-check
import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import rehypeKatex from "rehype-katex";
// import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { remarkExtendedTable, extendedTableHandlers } from "remark-extended-table";
import remarkRehype from "remark-rehype";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeCallouts from "rehype-callouts";

import {
    addCollapse,
    addCopyButton,
    addLanguage,
    addTitle,
    updateStyle,
} from "./src/plugins/shiki-custom-transformers.ts";
// Sub-path base, used when deployed under a project Pages URL
// (e.g. /astro-theme-ink/). Empty locally & for user/project root deploys.
const base = process.env.BASE_PATH || ''

// https://astro.build/config
export default defineConfig({
    site: "https://almiinh.github.io",
    integrations: [svelte(), mdx(), icon()],

    redirects: {
        "/web": "/#web-projects",
    },

    markdown: {
        processor: unified({
            rehypePlugins: [
                rehypeKatex,
                // rehypeAutolinkHeadings,
                rehypeCallouts,
            ],
            remarkPlugins: [
                remarkExtendedTable,
                [remarkRehype, { handlers: extendedTableHandlers }],
                remarkMath,
                remarkGfm,
            ],
        }),
        shikiConfig: {
            themes: {
                light: "github-light",
                dark: "github-dark",
            },
            transformers: [
                // @ts-ignore
                updateStyle(),
                // @ts-ignore
                addTitle(),
                // @ts-ignore
                addLanguage(),
                // @ts-ignore
                addCopyButton(2000, base), // timeout in ms
                // @ts-ignore
                addCollapse(15, base), // max lines that needs to collapse
            ],
        },
    },
});
