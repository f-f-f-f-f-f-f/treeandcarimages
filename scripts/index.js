const games = document
    .querySelector("#special")
    .querySelectorAll("a");
for (const el of games) {
    if (!el.href.includes("asyncem"))
        continue;
    const link = el.href;
    el.href = "about:blank"; // To give it styling
    el.removeAttribute("target");
    el.addEventListener("click", (e) => {
        e.preventDefault();
        const win = window.open("about:blank", "_blank");
        if (!win)
            return alert(`An unknown error occured.`);
        const iframe = document.createElement("iframe");
        iframe.src = link;
        iframe.style.width = "99vw";
        iframe.style.height = "99vh";
        win.document.body.appendChild(iframe);
    });
}
export {};
//# sourceMappingURL=index.js.map