<script>
    import { onMount } from "svelte";

    let {
        contentSelector = ".blog-content",
        headingLevels = ["h2", "h3", "h4", "h5", "h6"],
        title = "On this page",
    } = $props(); // Using Svelte 5 runes syntax

    let headings = $state([]);
    let activeId = $state("");

    onMount(() => {
        const article = document.querySelector(contentSelector);
        if (!article) return;

        const headingElements = article.querySelectorAll(headingLevels.join(", "));
        const items = Array.from(headingElements).map((heading) => {            
            return {
                id: heading.id,
                text: heading.textContent ?? "",
                level: parseInt(heading.tagName[1], 10),
            };
        });
        const minLevel = Math.min(...items.map(item => item.level));
        items.forEach(item => {
            item.level -= (minLevel - 1); // Normalize levels to start from 1
        });

        headings = items;

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

<nav class="toc" aria-label="Table of contents">
    {#if title}
        <h3 class="toc-title">{title}</h3>
    {/if}
    <ol class="toc-list" role="list">
        {#each headings as { id, text, level }}
            <li class="toc-item" style="--depth: {level - 1}">
                <a href="#{id}" class="toc-link" class:toc-link--active={activeId === id}>
                    {text}
                </a>
            </li>
        {/each} 
    </ol>
</nav>

<style>
    nav.toc {
        --toc-accent: #4f46e5;
        --toc-text: #374151;
        --toc-muted: #9ca3af;
        --toc-border: #e5e7eb;
        --toc-indent: 1rem;
        border-radius: 0.5rem;
        padding: 1rem;
        font-size: 0.875rem;
    }

    .toc-title {
        margin: 0 0 0.75rem;
        color: var(--color-text);
        font-weight: 600;
        font-size: 0.75rem;
        letter-spacing: 0.05em;
        text-transform: uppercase;
    }

    .toc-list {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .toc-item {
        padding-left: calc(var(--depth, 0) * var(--toc-indent));
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
