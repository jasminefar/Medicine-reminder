document.addEventListener("DOMContentLoaded", () => {
  const timeInput = document.getElementById("reminder-time");
  const saveButton = document.getElementById("save-button");

  chrome.storage.sync.get("time", data => {
    timeInput.value = data.time;
  });

  saveButton.addEventListener("click", () => {
    const time = timeInput.value;
    chrome.storage.sync.set({ time }, () => {
      console.log("Reminder time saved:", time);
    });
  });
});
