class UserAgent {
  static test() {
    let userAgent = navigator.userAgent;
    let browser;
    if (developermode != "true") {
      if (userAgent.match(/edg/i)) {
        browser = "edge";
      } else if (userAgent.match(/firefox|fxios/i)) {
        browser = "firefox";
      } else if (userAgent.match(/opr\//i)) {
        browser = "opera";
      } else if (userAgent.match(/chrome|chromium|crios/i)) {
        browser = "chrome";
      } else if (userAgent.match(/safari/i)) {
        browser = "safari";
      } else {
        browser = "other";
      }
    }

    if (browser != "chrome" && developermode != "true") {
      error(
        "0x0000005",
        "Unsupported browser",
        "KLIND OS | Load",
      );
    }
  }
}
