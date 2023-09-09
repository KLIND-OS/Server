class Browser {
  static changeUrl(window, url) {
    const browser = window.querySelector("#brow");
    browser.src = url;
    browser.setAttribute("sr", url);
  }
  static reload(window) {
    const browser = window.querySelector("#brow");
    const url = browser.src;
    browser.src = "about:blank";
    setTimeout(() => {
      browser.src = url;
    }, 200);
  }
  static init(window) {
    const browser = window.querySelector("#brow");
    const input = window.querySelector("#url");
    setInterval(() => {
      if (browser.getAttribute("sr") !== browser.src) {
        browser.setAttribute("sr", browser.src);
        input.value = browser.src;
      }
    }, 200);

  }
  static goBack(window) {
    const browser = window.querySelector("#brow");
    browser.goBack();
  }
  static goForward(window) {
    const browser = window.querySelector("#brow");
    browser.goForward();
  }
}
