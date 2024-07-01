class Updates {
  static updating = false;

  static detect() {
    if (localStorage.getItem("updatesklindows") != null) {
      const updates = localStorage.getItem("updatesklindows");
      if (version != updates) {
        window.location.href = "update.html";
      }
    } else {
      window.location.href = "update.html";
    }
  }

  static closeWindow(win) {
    if (win.getAttribute("updating") == "true") {
      spawnNotification("Aktualizace", "Při aktualizaci nezavírejte okno.");
      // Block closing window
      return true;
    }
  }

  static start(el) {
    if (Updates.updating)
      return spawnNotification("Aktualizace", "Aktualizace již probíhá");

    const text = el.parentElement.querySelector(".updateStatus");
    Updates.updating = true;
    el.parentElement.setAttribute("updating", true);
    LowLevelApi.Updates.update((percentage, t) => {
      if (percentage === true) {
        el.parentElement.setAttribute("updating", false);
        Updates.updating = false;
        text.textContent = "Aktualizace dokončena! Systém bude restartován.";
        setTimeout(() => {
          LowLevelApi.Power.reboot();
        }, 2000);
      } else {
        text.textContent = `${percentage} ${t}`;
      }
    });
  }
}
