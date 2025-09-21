<script>
    import { onMount } from "svelte"; 
    import iconCV from "../assets/index/CV128.red.png";
    import iconLinkedIn from "../assets/index/LINKEDIN.svg";
    import iconGithub from "../assets/index/GITHUB.svg";
    import iconGithubWhite from "../assets/index/GITHUB.white.svg";

    const references = [
        {
            href: "/index/CV FR Minh-Hoang HUYNH.pdf",
            src: iconCV.src,
            alt: "PDF",
        },
        {
            href: "https://www.linkedin.com/in/minh-hoang-alexis-huynh-621b52222/",
            src: iconLinkedIn.src,
            alt: "LinkedIn",
        },
        {
            href: "https://github.com/Almiinh",
            src: iconGithub.src,
            srcdark: iconGithubWhite.src,
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
        document.addEventListener("click", checkDarkMode);
    });
</script>

<section class="references">
    {#each references as item}
        <a href={item.href}>
            {#if darkMode && item.srcdark}
                <img src={item.srcdark} alt={item.alt} style="height: 28px; width: 28px" />
            {:else}
                <img src={item.src} alt={item.alt} style="height: 28px; width: 28px" />
            {/if}
        </a>
    {/each}
</section>

<style>
    .references {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .references a {
        display: inline-block;
        margin: 0 0.3rem;
    }
    img:hover {
        translate: 0 -2px;
        filter: contrast(50%) invert(20%);
        transition: all 0.2s;
    }
</style>
