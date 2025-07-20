console.log("✅ Content script loaded!");

let lastShortId = "";

function checkAndTrackShorts() {
  const url = window.location.href;

  if (!url.includes("youtube.com/shorts")) return;

  const currentShortId = url.split("/shorts/")[1]?.split("?")[0];
  if (currentShortId && currentShortId !== lastShortId) {
    lastShortId = currentShortId;

    chrome.runtime.sendMessage({ action: "shortViewed" });
  }
}

// Run
checkAndTrackShorts();


let lastUrl = location.href;
new MutationObserver(() => {
  const currentUrl = location.href;
  if (currentUrl !== lastUrl) {
    lastUrl = currentUrl;
    checkAndTrackShorts();
  }
}).observe(document, { subtree: true, childList: true });
