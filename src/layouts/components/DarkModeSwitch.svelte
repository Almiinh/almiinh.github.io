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
        <svg
            class="light-mode-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
        >
            <path d="M0 0h24v24H0z" fill="none" />
            <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
            >
                <circle cx="12" cy="12" r="4" />
                <path
                    d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
                />
            </g>
        </svg>
        <svg
            class="dark-mode-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
        >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
            />
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
