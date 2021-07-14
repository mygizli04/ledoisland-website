// Typescript file for the main page

let discordModalActive = false

// Function called when the "Discord" link is clicked.
function toggleDiscord() {
    let div = document.getElementById("discordFrame")!
    if (div.style.display === "none") {
        div.style.display = "block"
    }
    else {
        div.style.display = "none"
    }
}