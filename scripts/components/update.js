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
      spawnNotification(
        Localization.getString("updates"),
        Localization.getString("dont_close_update"),
      );
      // Block closing window
      return true;
    }
  }

  static start(el) {
    if (Updates.updating)
      return spawnNotification(
        Localization.getString("updates"),
        Localization.getString("update_already_running"),
      );

    const text = el.parentElement.querySelector(".updateStatus");
    Updates.updating = true;
    el.parentElement.setAttribute("updating", true);
    LowLevelApi.Updates.update((percentage) => {
      if (percentage === true) {
        el.parentElement.setAttribute("updating", false);
        Updates.updating = false;
        text.textContent = Localization.getString("update_finished");
        setTimeout(() => {
          LowLevelApi.Power.reboot();
        }, 2000);
      } else {
        text.textContent = `${percentage} ${Localization.getString("msgupdates")[percentage]}`;
      }
    });
  }
}
