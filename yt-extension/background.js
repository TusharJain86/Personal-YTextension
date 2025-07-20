chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action === "shortViewed") {
    chrome.storage.sync.get(["shortLimit", "viewed"], (data) => {
      const limit = data.shortLimit || 10;
      const viewed = (data.viewed || 0) + 1;

      chrome.storage.sync.set({ viewed });

      if (viewed === limit) {
        chrome.scripting.executeScript({
          target: { tabId: sender.tab.id },
          func: () => {
            alert("⏰ You've reached your Shorts limit! Time to stop scrolling.");
          }
        });
      }
    });
  }
});
