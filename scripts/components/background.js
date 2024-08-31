class Background {
  static async load() {
    if (localStorage.getItem("background") != null) {
      if (
        await mainFileManager.fileExists(localStorage.getItem("background"))
      ) {
        document.getElementById("klindows").style.backgroundImage =
          "url(http://localhost:9999" +
          localStorage.getItem("background") +
          ")";
      } else {
        control.dowhenlogin.add(() => {
          spawnNotification("Pozadí", "Obrázek pro pozadí nebyl nalezen!");
        });
      }
    } else {
      if (localStorage.getItem("mode") == "dark") {
        document.getElementById("klindows").style.backgroundImage =
          "url(wallpapers/dark.jpg)";
      } else {
        document.getElementById("klindows").style.backgroundImage =
          "url(wallpapers/light.jpg)";
      }
    }
  }

  static loadSecureBoot() {
    document.getElementById("klindows").style.backgroundImage =
      "url('images/safeModeBackground.png')";
  }

  static set(location) {
    localStorage.setItem("background", location);
    document.getElementById("klindows").style.backgroundImage =
      "url(http://localhost:9999" + location + ")";
  }
}
