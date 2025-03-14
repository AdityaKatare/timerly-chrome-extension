let timeLimits = { "youtube.com": 30, "netflix.com": 45 }; // Minutes
let usage = {};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (!tab.url) return;
    let hostname = new URL(tab.url).hostname;
    
    if (timeLimits[hostname]) {
        if (!usage[hostname]) {
            usage[hostname] = 0;
        }

        let interval = setInterval(() => {
            usage[hostname]++;
            chrome.storage.local.set({ usage });

            if (usage[hostname] >= timeLimits[hostname]) {
                chrome.tabs.remove(tabId);
                clearInterval(interval);
            }
        }, 60000); // Every 1 minute
    }
});

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ usage: {} });
});