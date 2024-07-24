chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ time: "08:00" }, () => {
    console.log("Default reminder time set to 08:00.");
  });
});

chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === "medicineReminder") {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon48.png",
      title: "Medicine Reminder",
      message: "It's time to take your medicine!",
      priority: 2
    });
  }
});

function createAlarm(timeString) {
  const [hour, minute] = timeString.split(":").map(Number);
  const now = new Date();
  const alarmTime = new Date();
  alarmTime.setHours(hour, minute, 0, 0);

  if (alarmTime <= now) {
    alarmTime.setDate(alarmTime.getDate() + 1);
  }

  const delayInMinutes = (alarmTime - now) / 60000;

  chrome.alarms.create("medicineReminder", { delayInMinutes, periodInMinutes: 1440 });
}

chrome.storage.sync.get("time", data => {
  createAlarm(data.time);
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.time) {
    chrome.alarms.clear("medicineReminder", () => {
      createAlarm(changes.time.newValue);
    });
  }
});
