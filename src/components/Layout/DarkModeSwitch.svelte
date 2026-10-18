<script lang="ts">
    const { class: className } = $props();
    let theme = $state("");

    function switchDarkMode() {
        if (!("theme" in localStorage) || localStorage.theme === "") {
            theme = "light";
        } else if (localStorage.theme !== "dark") {
            theme = "dark";
        } else if (localStorage.theme === "dark") {
            theme = "";
        }
    }

    $effect(() => {
        document.documentElement.style.colorScheme = theme;
        localStorage.theme = theme;
    });
</script>

<div class="{className} dark-mode-btn-container">
    <button title="Switch between dark and light mode" onclick={switchDarkMode}>
        <svg class="light-mode-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path d="M0 0h24v24H0z" fill="none" />
            <g fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M17 12a5 5 0 1 1-10 0a5 5 0 0 1 10 0Z" />
                <path stroke-linecap="round" d="M12 2v1.5m0 17V22m7.07-2.929l-1.06-1.06M5.99 5.989L4.928 4.93M22 12h-1.5m-17 0H2m17.071-7.071l-1.06 1.06M5.99 18.011l-1.06 1.06" />
            </g>
        </svg>
        <svg class="dark-mode-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21.5 14.078A8.557 8.557 0 0 1 9.922 2.5C5.668 3.497 2.5 7.315 2.5 11.873a9.627 9.627 0 0 0 9.627 9.627c4.558 0 8.376-3.168 9.373-7.422" />
        </svg>
        <span class="auto-mode-icon" hidden={theme === "light" || theme === "dark"}>AUTO</span>
    </button>
</div>

<style>
    .dark-mode-btn-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    button {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: all 0.2s ease-in-out;
        margin: 0 1vw;
        border: 0;
        border-radius: calc(infinity * 1px);
        background-color: transparent;
        padding: 5px;

        svg {
            border-radius: calc(infinity * 1px);
        }
        &:hover {
            translate: 0 -2px;
            cursor: pointer;
        }
    }
</style>
