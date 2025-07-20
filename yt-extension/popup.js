document.addEventListener("DOMContentLoaded", () => {
  const limitInput = document.getElementById("limit");
  const saveBtn = document.getElementById("save");
  const status = document.getElementById("status");

  // load existing limit
  chrome.storage.sync.get(["shortLimit"], (data) => {
    if (data.shortLimit) {
      limitInput.value = data.shortLimit;
    }
  });

  // save the limit
  saveBtn.addEventListener("click", () => {
    const limit = parseInt(limitInput.value);
    if (!limit || limit < 1) {
      status.textContent = "Please enter a valid number.";
      status.style.color = "red";
      return;
    }

    chrome.storage.sync.set({ shortLimit: limit, viewed: 0 }, () => {
      status.textContent = `Limit set to ${limit}. Counter reset.`;
      status.style.color = "green";
    });
  });
});
