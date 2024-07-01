class Boot {
  static safeBoot = localStorage.getItem("bootType") == "safe";
  static rebootAsSafeMode(x) {
    if (x) {
      localStorage.setItem("bootType", "safe");
      window.location.reload();
    } else {
      BPrompt.confirm(
        "Opravdu chcete restartovat Váš počítač do safe módu?",
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
  console.clear();
  mainConsole.log(
    "%cSafeMode!",
    "color: red; font:bold; font-family:monospace; font-size: 40px",
  );
  mainConsole.log(
    "%cPočítač je spuštěný v nouzovém režimu! Některé funkce nemusí fungovat.",
    "color: red; font:bold; font-family:monospace; font-size: 25px",
  );
  mainConsole.log(
    "%cPokud chcete vypnout tuhle zprávu pošlete 'Boot.disableMessageSafeMode()",
    "color: green; font:bold; font-family:monospace; font-size: 15px",
  );
}
