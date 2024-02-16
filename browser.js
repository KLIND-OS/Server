class Browser {
  static changeUrl(win, url, dontAddHTTPS) {
    if (!dontAddHTTPS) {
      try {
        var urlObject = new URL(url);
      } catch {
        var urlObject = new URL("http://" + url);
      }
      if (
        urlObject.hostname == window.location.hostname &&
        urlObject.port == window.location.port &&
        urlObject.pathname != "/developer.html"
      ) {
        const browerr = win.querySelector(".browerr");
        browerr.querySelector("#errorcodebrow").textContent = 0;
        browerr.querySelector("#errornamebrow").textContent =
          "This website is blocked!";
        browerr.style.display = "block";
        return;
      }
    }

    const browser = win.querySelector("#brow");
    win.querySelector(".iframegamebrow").style.display = "none";
    win.querySelector(".iframeWrapper").style.display = "none";
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
  static download(win) {
    const url = win.querySelector("#url").value;
    const webview = win.querySelector("webview");
    webview.downloadURL(url);
  }
  static init(win) {
    const browser = win.querySelector("#brow");
    const input = win.querySelector("#url");

    // Submit when enter is pressed
    input.addEventListener("keypress", (e) => {
      if (e.key == "Enter") {
        Browser.changeUrl(win, input.value);
      }
    });

    setInterval(() => {
      if (browser.getAttribute("sr") !== browser.src) {
        browser.setAttribute("sr", browser.src);
        input.value = browser.src;
      }
    }, 200);
    browser.addEventListener("did-fail-load", (event) => {
      if (event.isMainFrame) {
        if (event.errorCode == -106) {
          const iframeWrapper = win.querySelector(".iframeWrapper");
          const iframegamebrow = win.querySelector(".iframegamebrow");
          iframegamebrow.src = "game/index.html";
          iframegamebrow.style.display = "block";
          iframeWrapper.style.display = "block";
        } else if ([-105, -109].includes(event.errorCode)) {
          const browerr = win.querySelector(".browerr");
          browerr.querySelector("#errorcodebrow").textContent = event.errorCode;
          browerr.querySelector("#errornamebrow").textContent =
            event.errorDescription;
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
