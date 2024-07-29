class infoApp {
  static loadInfo(app) {
    app.querySelector("#versionwrite").innerHTML = version;
    app.querySelector("#screensizewrite").innerHTML = infoApp.getSizeOfScreen();
    app.querySelector("#timezonewrite").innerHTML = infoApp.getTimeZone();
  }
  static getSizeOfScreen() {
    return window.screen.width + "x" + window.screen.height;
  }
  static getTimeZone() {
    return (new Date().getTimezoneOffset() / 60).toString();
  }
}
