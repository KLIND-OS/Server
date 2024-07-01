class CustomCSS {
  static load() {
    if (localStorage.getItem("customcss") != null) {
      const customcssarcookie = localStorage.getItem("customcss");
      var contentofcustomcss = mainFileManager.getContent(
        customcssarcookie,
        "utf8",
      );
      var elementustomcss = document.getElementById("customcssstyleelement");
      elementustomcss.innerHTML = contentofcustomcss;
    }
  }

  static set(value) {
    var path = new File(value).fullPath;
    var contentoffile = mainFileManager.getContent(path, "utf8");
    var element = document.getElementById("customcssstyleelement");
    element.innerHTML = contentoffile;
    localStorage.setItem("customcss", path);
  }
}

window.CustomCSS = CustomCSS;
