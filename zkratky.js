var keysDown = new Array();
window.onkeydown = function(e) {
  keysDown.push(e.key+"true")
  if (keysDown.indexOf("Controltrue")>-1 && keysDown.indexOf("ltrue")>-1) {
    logout()
    keysDown = new Array()
  }
  else if (keysDown.indexOf("AltGraphtrue")>-1 && keysDown.indexOf("rtrue")>-1) {
    openstartmenu()
    keysDown = new Array()
  }
  else if (keysDown.indexOf("AltGraphtrue")>-1 && keysDown.indexOf("htrue")>-1) {
    windows.open("nap")
    keysDown = new Array()
  }
  else if (keysDown.indexOf("AltGraphtrue")>-1 && keysDown.indexOf("ttrue")>-1) {
    dialog();
    keysDown = new Array()
  }
  else if (keysDown.indexOf("Alttrue")>-1 && keysDown.indexOf(";true")>-1) {
    if (appsopened.oppened) {
      appsopened.close();
    }
    else {
      appsopened.open();
    }
    keysDown = new Array()
  }
}
function writekeysdown() {
  return keysDown;
}
window.onkeyup = function() {
  try {
    keysDown = new Array()
  }
  catch {}
}