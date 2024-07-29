class Boot {
  static safeBoot = localStorage.getItem("bootType") == "safe";
  static rebootAsSafeMode(x) {
    if (x) {
      localStorage.setItem("bootType", "safe");
      window.location.reload();
    } else {
      BPrompt.confirm(
        Localization.getString("do_you_really_want_safeboot"),
        (ans) => {
          if (ans) {
            localStorage.setItem("bootType", "safe");
            window.location.reload();
          }
        },
      );
    }
  }
}

if (Boot.safeBoot) {
  localStorage.setItem("bootType", "normal");
}
