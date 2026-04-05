const ruffle = window.RufflePlayer.newest();
const player = ruffle.createPlayer();
const container = document.querySelector("#ruffle-container");
const params = new URLSearchParams(window.location.search);
const rawPath = params.get("path");
if (!rawPath) {
    container.classList.add("path-not-exists");
    container.textContent = `Can't find the Flash file`;
}
else {
    player.addEventListener("click", () => {
        player.enterFullscreen();
    });
    const path = decodeURIComponent(rawPath);
    container.appendChild(player);
    player.load({
        url: path,
        allowScriptAccess: true,
    });
}
export {};
//# sourceMappingURL=index.js.map