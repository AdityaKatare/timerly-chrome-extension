document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get(["timeLimits"], (data) => {
        if (data.timeLimits) {
            document.getElementById("ytLimit").value = data.timeLimits["youtube.com"] || 30;
            document.getElementById("nfLimit").value = data.timeLimits["netflix.com"] || 45;
        }
    });

    document.getElementById("save").addEventListener("click", () => {
        let ytTime = document.getElementById("ytLimit").value;
        let nfTime = document.getElementById("nfLimit").value;

        let timeLimits = { "youtube.com": parseInt(ytTime), "netflix.com": parseInt(nfTime) };

        chrome.storage.local.set({ timeLimits }, () => {
            alert("Time limits updated!");
        });
    });
});