import "../../fonts.css"
import "./style.css"
import imgKayleigHarrington from "./images/kayleigh-harrington-yhn4okt6ci0-unsplash.jpg"
import imgNusaUrbancek from "./images/nusa-urbancek-pD6YZkTXPpo-unsplash.jpg"
import imgInni from "./images/inni-w-5WK2RTjj_yE-unsplash.jpg"

const content = document.querySelector("#content")
const image = document.createElement("img");

function handleHome() {
    image.src = imgKayleigHarrington
    content.replaceChildren(image)
}

function handleMenu() {
    image.src = imgNusaUrbancek
    window.location.hostname = window.location.hostname + 'menu/'
    content.replaceChildren(image)
}

function handleAbout() {
    image.src = imgInni
    content.replaceChildren(image)
}

window.onload = handleHome()
document.querySelector(".home").addEventListener("click", handleHome)
document.querySelector(".about").addEventListener("click", handleAbout)
document.querySelector(".menu").addEventListener("click", handleMenu)