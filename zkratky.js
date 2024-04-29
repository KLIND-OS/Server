var keysDown = new Array();
var shortCutsFunctions = [];
window.onkeydown = function (e) {
  if (keysDown.includes(e.key)) return;
  keysDown.push(e.key);
  if (e.key == "Meta") {
    openstartmenu();
  }
  else if (keysDown.indexOf("Control") > -1 && keysDown.indexOf("l") > -1) {
    logout();
  }
  else if (keysDown.indexOf("AltGraph") > -1 && keysDown.indexOf("r") > -1 || keysDown.indexOf("AltGraph") > -1 && keysDown.indexOf("¶") > -1) {
    openstartmenu();
  }
  else if (keysDown.indexOf("AltGraph") > -1 && keysDown.indexOf("h") > -1 || keysDown.indexOf("AltGraph") > -1 && keysDown.indexOf("`") > -1) {
    windows.open("nap");
  }
  else if (keysDown.indexOf("AltGraph") > -1 && keysDown.indexOf("t") > -1) {
    dialog();
  }
  else if (keysDown.indexOf("Alt") > -1 && keysDown.indexOf("F4") > -1) {
    // Close currently selected window
    if (!openedwindowindex) return;

    const closeButton = openedwindowindex.querySelector(".headerclass .close");
    if (!closeButton) return;
    if (closeButton.style.display == "none") return;

    closeButton.click();
  }
  else if (keysDown.indexOf("Alt") > -1 && keysDown.indexOf(";") > -1) {
    if (appsopened.oppened) {
      appsopened.close();
    }
    else {
      appsopened.open();
    }
  }
  else if (keysDown.indexOf("AltGraph") > -1 && keysDown.indexOf("f") > -1 || keysDown.indexOf("AltGraph") > -1 && keysDown.indexOf("[") > -1) {
    ColorFilters.deactivateAll();
  }
  else if (keysDown.indexOf("Alt") > -1 && keysDown.indexOf("ArrowUp") > -1) {
    if (!openedwindowindex) return;

    windowSizing.full(openedwindowindex);
  }
  else if (keysDown.indexOf("Alt") > -1 && keysDown.indexOf("ArrowLeft") > -1) {
    if (!openedwindowindex) return;

    windowSizing.left(openedwindowindex);
  }
  else if (keysDown.indexOf("Alt") > -1 && keysDown.indexOf("ArrowRight") > -1) {
    if (!openedwindowindex) return;

    windowSizing.right(openedwindowindex);
  }
  else if (keysDown.indexOf("Alt") > -1 && keysDown.indexOf("ArrowDown") > -1) {
    if (!openedwindowindex) return;

    windowSizing.defaultNonEvent(openedwindowindex, 15, 15);
  }
  else if (keysDown.indexOf("Control") > -1 && keysDown.indexOf("Shift") > -1 && keysDown.indexOf("Escape") > -1) {
    windows.open("procesy");
  }
  else {
    function removeLastInstance(badtext, str) {
      var charpos = str.lastIndexOf(badtext);
      if (charpos < 0) return str;
      ptone = str.substring(0, charpos);
      pttwo = str.substring(charpos + (badtext.length));
      return (ptone + pttwo);
    }
    for (const fun of shortCutsFunctions) {
      var keysPressed = [];
      for (const key of keysDown) keysPressed.push(removeLastInstance("true",key));
      var response = fun([...new Set(keysPressed)]);
      if (typeof response == "function") {
        response();
        break;
      }
    }
  }
};
function writekeysdown() {
  return keysDown;
}
window.onkeyup = function () {
  try {
    keysDown = new Array();
  }
  catch { }
};
