// @ts-check
import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
import remarkExtendedTable from "remark-extended-table";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";

// https://astro.build/config
export default defineConfig({
    site: "https://almiinh.github.io",
    integrations: [svelte(), mdx()],

    redirects: {
        "/web": "/#webProjects",
    },
    markdown: {
        remarkPlugins: [remarkExtendedTable, remarkMath, remarkGfm],
    },
});
