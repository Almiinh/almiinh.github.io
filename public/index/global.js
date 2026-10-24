const $ = document.querySelector.bind(document);
const template = `
<button class="dark-mode-btn" title="Switch between dark and light mode" onclick="switchDarkMode()">
    <!-- hugeicons:sun-03 -->
    <svg class="light-mode-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M0 0h24v24H0z" fill="none"/><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 12a5 5 0 1 1-10 0a5 5 0 0 1 10 0Z" /><path stroke-linecap="round" d="M12 2v1.5m0 17V22m7.07-2.929l-1.06-1.06M5.99 5.989L4.928 4.93M22 12h-1.5m-17 0H2m17.071-7.071l-1.06 1.06M5.99 18.011l-1.06 1.06" /></g></svg>
    <!-- hugeicons:moon-02-->
    <svg class="dark-mode-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21.5 14.078A8.557 8.557 0 0 1 9.922 2.5C5.668 3.497 2.5 7.315 2.5 11.873a9.627 9.627 0 0 0 9.627 9.627c4.558 0 8.376-3.168 9.373-7.422" /></svg>
    <span class="auto-mode-icon hidden">AUTO</span>
</button>`;
const darkModeBtn = document.createElement("div");

function switchDarkMode() {
    const root = document.documentElement;
    const current = root.style.colorScheme;

    if (!current || current === "light dark") {
        root.style.colorScheme = "light";
        localStorage.theme = "light";
    } else if (current === "light") {
        root.style.colorScheme = "dark";
        localStorage.theme = "dark";
    } else {
        root.style.colorScheme = "";
        localStorage.removeItem("theme");
    }
}

function setupDarkModeButton() {
    if (window.onload) window.onload();
    console.log("Script loaded: global.js");
    darkModeBtn.className = "dark-mode-btn-container";
    darkModeBtn.innerHTML = template;
    $(".global-banner").insertBefore(darkModeBtn, $(".global-banner h1"));

    if (localStorage.theme) {
        document.documentElement.style.colorScheme = localStorage.theme;
    }
}

window.addEventListener("DOMContentLoaded", setupDarkModeButton);
