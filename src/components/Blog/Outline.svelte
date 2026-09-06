<script>
    import { onMount } from "svelte";

    let {
        contentSelector = ".blog-content",
        headingLevels = ["h2", "h3", "h4", "h5", "h6"],
        title = "On this page",
    } = $props();

    let headingTree = $state([]);
    let activeId = $state("");

    function buildTree(items) {
        const root = [];
        const stack = []; // stack of node refs, parallel to their level

        for (const item of items) {
            const node = { ...item, children: [] };

            // Pop back to the nearest ancestor (strictly shallower level)
            while (stack.length && stack[stack.length - 1].level >= node.level) {
                stack.pop();
            }

            if (stack.length === 0) {
                root.push(node);
            } else {
                stack[stack.length - 1].children.push(node);
            }

            stack.push(node);
        }

        return root;
    }

    onMount(() => {
        const article = document.querySelector(contentSelector);
        if (!article) return;

        const headingElements = article.querySelectorAll(headingLevels.join(", "));
        const items = Array.from(headingElements).map((heading) => {
            return {
                id: heading.id,
                text: heading.innerHTML ?? "",
                level: parseInt(heading.tagName[1], 10),
            };
        });

        if (items.length === 0) return;

        const minLevel = Math.min(...items.map((item) => item.level));
        items.forEach((item) => {
            item.level -= minLevel - 1; // Normalize levels to start from 1
        });

        headingTree = buildTree(items);

        // // 3. Highlight active heading on scroll
        // const observer = new IntersectionObserver(
        //     (entries) => {
        //         for (const entry of entries) {
        //             if (entry.isIntersecting) {
        //                 activeId = entry.target.id;
        //                 // Optional: Break early if you only want the top-most visible heading
        //                 break;
        //             }
        //         }
        //     },
        //     { rootMargin: "0px 0px -80% 0px", threshold: 0 },
        // );

        // headingElements.forEach((h) => observer.observe(h));

        // // Cleanup observer when component unmounts
        // return () => {
        //     observer.disconnect();
        // };
    });
</script>

{#snippet tocLink(node)}
    <a href="#{node.id}" class="toc-link" class:toc-link--active={activeId === node.id}>
        {@html node.text}
    </a>    
{/snippet}

{#snippet tocNodes(nodes)}
    <ol class="toc-list" role="list">
        {#each nodes as node (node.id)}
            <li class="toc-item">
                {#if node.children.length > 0}
                    <details class="toc-details" open>
                        <summary class="toc-summary">
                            {@render tocLink(node)}
                        </summary>
                        {@render tocNodes(node.children)}
                    </details>
                {:else}
                    {@render tocLink(node)}
                {/if}
            </li>
        {/each}
    </ol>
{/snippet}

<nav class="toc" aria-label="Table of contents">
    {#if title}
        <h3 class="toc-title">{title}</h3>
    {/if}
    {@render tocNodes(headingTree)}
</nav>

<style>
    nav.toc {
        --toc-accent: #4f46e5;
        --toc-text: #374151;
        --toc-muted: #9ca3af;
        --toc-border: #e5e7eb;
        --toc-indent: 0rem;
        position: sticky;
        top: 1rem;
        border-radius: 0.5rem;
        /* padding: 1rem; */
        font-size: 0.875rem;
        max-height: calc(80vh - 2rem);
        overflow-y: auto;
        overscroll-behavior: contain;
        scrollbar-width: thin;
        scrollbar-color: var(--toc-muted) transparent;
    }

    nav.toc::-webkit-scrollbar {
        width: 6px;
    }

    nav.toc::-webkit-scrollbar-track {
        background: transparent;
    }

    nav.toc::-webkit-scrollbar-thumb {
        background-color: var(--toc-muted);
        border-radius: 999px;
    }

    .toc-title {
        margin: 0 0 0.75rem;
        color: var(--color-text);
        font-weight: 600;
        font-size: 0.75rem;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        position: sticky;
        top: 0;
        background: inherit;
        padding-top: 0.1rem;
        padding-bottom: 0.1rem;
    }

    .toc-list {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .toc-list .toc-list {
        padding-left: var(--toc-indent);
        margin-top: 0.25rem;
    }

    .toc-item {
        display: flex;
        flex-direction: column;
    }

    .toc-details {
        display: flex;
        flex-direction: column;
    }

    .toc-details > summary {
        cursor: pointer;
        display: flex;
        align-items: center;
    }

    .toc-link {
        display: block;
        transition:
            color 0.15s ease,
            border-color 0.15s ease;
        border-left: 2px solid transparent;
        padding: 0.2rem 0;
        padding-left: 0.5rem;
        color: var(--toc-muted);
        line-height: 1.4;
        text-decoration: none;
        flex: 1;
    }

    .toc-link:hover {
        color: var(--toc-accent);
    }

    .toc-link--active {
        border-left-color: var(--toc-accent);
        color: var(--toc-accent);
        font-weight: 500;
    }
</style>