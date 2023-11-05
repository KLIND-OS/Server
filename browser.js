class Browser {
  static changeUrl(win, url, dontAddHTTPS) {
    if (dontAddHTTPS != true && !/^https?:\/\//i.test(url)) {
      url = "http://" + url;
    }
    const browser = win.querySelector("#brow");
    win.querySelector(".iframegamebrow").style.display = "none";
    win.querySelector(".browerr").style.display = "none";
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
    browser.addEventListener("did-fail-load", (event) => {
      if (event.isMainFrame) {
        if (event.errorCode == -106) {
          const iframegamebrow = win.querySelector(".iframegamebrow");
          iframegamebrow.src = "game/index.html";
          iframegamebrow.style.display = "block";
        }
        else {
          const browerr = win.querySelector(".browerr");
          browerr.querySelector("#errorcodebrow").textContent = event.errorCode;
          browerr.querySelector("#errornamebrow").textContent = event.errorDescription;
          browerr.style.display = "block";
        }
      }
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
