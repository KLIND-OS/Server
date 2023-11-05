var updating = false;
function updatereload(el) {
  if (updating) return spawnNotification("Aktualizace", "Aktualizace již probíhá");

  const text = el.parentElement.querySelector(".updateStatus");
  updating = true;
  el.parentElement.setAttribute("updating", true);
  LowLevelApi.Updates.update((percentage, t) => {
    if (percentage === true) {
      el.parentElement.setAttribute("updating", false);
      updating = false;
      text.textContent = "Aktualizace dokončena! Systém bude restartován.";
      setTimeout(() => {
        LowLevelApi.Power.reboot();
      }, 2000);
    }
    else {
      text.textContent = `${percentage} ${t}`;
    }
  });
}
function detectUpdates() {
  if (localStorage.getItem("updatesklindows") != null) {
    try {
      const updateshotove = localStorage.getItem("updatesklindows");
      if (version == updateshotove) {

      }
      else {
        window.location.href = "update.html";
      }
    } catch { }
  }
  else {
    window.location.href = "update.html";
  }
}
function closeUpdates(win) {
  if (win.getAttribute("updating") == "true") {
    spawnNotification("Aktualizace", "Při aktualizaci nezavírejte okno.");
    // Block closing window
    return true;
  }
}