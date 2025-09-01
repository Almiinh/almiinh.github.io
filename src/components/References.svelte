<script>
    import { onMount } from "svelte";

    const references = [
        {
            href: "index/CV FR Minh-Hoang HUYNH.pdf",
            src: "index/CV128.red.png",
            alt: "PDF",
        },
        {
            href: "https://www.linkedin.com/in/minh-hoang-alexis-huynh-621b52222/",
            src: "index/LINKEDIN.svg",
            alt: "LinkedIn",
        },
        {
            href: "https://github.com/Almiinh",
            src: "index/GITHUB.svg",
            srcdark: "index/GITHUB.white.svg",
            alt: "GitHub",
        },
    ];

    function checkDarkMode() {
        return (
            localStorage.theme == "dark" ||
            (!localStorage.theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
        );
    }

    let darkMode = $state(false);
    onMount(() => {
        darkMode = checkDarkMode();
        document.onclick = checkDarkMode;
    });
</script>

<section class="references">
    {#each references as item}
        <a href={item.href}>
            {#if darkMode && item.srcdark}
                <img src={item.srcdark} alt={item.alt} style="height: 32px; width: 32px" />
            {:else}
                <img src={item.src} alt={item.alt} style="height: 32px; width: 32px" />
            {/if}
        </a>
    {/each}
</section>

<style>
    @media (max-width: 720px) {
        .references {
            display: none;
        }
    }
    .references a {
        display: inline-block;
        margin: 0 0.3rem;
    }
    img:hover {
        translate: 0 -2px;
        filter: none;
        transition: all 0.2s;
    }
</style>
