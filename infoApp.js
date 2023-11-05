class infoApp {
  static loadInfo(app) {
    app.querySelector("#versionwrite").innerHTML = version;
    app.querySelector("#screensizewrite").innerHTML = infoApp.getSizeOfScreen();
    app.querySelector("#windowsizewrite").innerHTML = infoApp.getWindowSize();
    app.querySelector("#timezonewrite").innerHTML = infoApp.getTimeZone();
    app.querySelector("#browserwrite").innerHTML = infoApp.getBrowser();
    app.querySelector("#browserlanguage").innerHTML = infoApp.getBrowserLanguage();
    app.querySelector("#oparatingsystemwrite").innerHTML = infoApp.getOS();
    app.querySelector("#cookiesenabledwrite").innerHTML = infoApp.getCookiesEnabled();
    app.querySelector("#colordepthwrite").innerHTML = infoApp.getColorDepth();
    app.querySelector("#pixeldepthwrite").innerHTML = infoApp.getPixelDepth();
  }
  static getSizeOfScreen() {
    return window.screen.width + "x" + window.screen.height;
  }
  static getWindowSize() {
    return window.innerWidth + "x" + window.innerHeight;
  }
  static getTimeZone() {
    return ((new Date().getTimezoneOffset())/60).toString();
  }
  static getBrowser() {
    return navigator.userAgent.toString();
  }
  static getBrowserLanguage() {
    return navigator.language;
  }
  static getOS() {
    return navigator.platform;
  }
  static getCookiesEnabled() {
    return navigator.cookieEnabled ? "ano": "ne";
  }
  static getColorDepth() {
    return screen.colorDepth;
  }
  static getPixelDepth() {
    return screen.pixelDepth;
  }
}