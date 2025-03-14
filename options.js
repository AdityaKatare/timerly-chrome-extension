document.getElementById("add").addEventListener("click", () => {
    let site = document.getElementById("website").value;
    let time = document.getElementById("time").value;

    if (!site || !time) return;

    chrome.storage.local.get(["timeLimits"], (data) => {
        let limits = data.timeLimits || {};
        limits[site] = parseInt(time);
        chrome.storage.local.set({ timeLimits: limits }, () => {
            location.reload();
        });
    });
});

chrome.storage.local.get(["timeLimits"], (data) => {
    let list = document.getElementById("siteList");
    let limits = data.timeLimits || {};
    
    for (let site in limits) {
        let li = document.createElement("li");
        li.textContent = `${site}: ${limits[site]} min`;
        list.appendChild(li);
    }
});