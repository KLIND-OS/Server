class Browser {
  static changeUrl(window, url, dontAddHTTPS) {
    if (dontAddHTTPS != true && !/^https?:\/\//i.test(url)) {
        url = 'http://' + url;
    }
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
  static init(win) {
    const browser = win.querySelector("#brow");
    const input = win.querySelector("#url");
    setInterval(() => {
      if (browser.getAttribute("sr") !== browser.src) {
        browser.setAttribute("sr", browser.src);
        input.value = browser.src;
      }
    }, 200);
    // TODO: Fix
    browser.addEventListener('did-fail-load', (event) => {
      /* browser.src = "game/index.html"
      browser.setAttribute("sr", browser.src) */
    });
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
