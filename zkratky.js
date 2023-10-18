var keysDown = new Array();
var shortCutsFunctions = [];
window.onkeydown = function (e) {
    keysDown.push(e.key + "true");
    if (keysDown.indexOf("Controltrue") > -1 && keysDown.indexOf("ltrue") > -1) {
        logout();
        keysDown = new Array();
    }
    else if (keysDown.indexOf("AltGraphtrue") > -1 && keysDown.indexOf("rtrue") > -1 || keysDown.indexOf("AltGraphtrue") > -1 && keysDown.indexOf("¶true") > -1) {
        openstartmenu();
        keysDown = new Array();
    }
    else if (keysDown.indexOf("AltGraphtrue") > -1 && keysDown.indexOf("htrue") > -1) {
        windows.open("nap");
        keysDown = new Array();
    }
    else if (keysDown.indexOf("AltGraphtrue") > -1 && keysDown.indexOf("ttrue") > -1) {
        dialog();
        keysDown = new Array();
    }
    else if (keysDown.indexOf("Alttrue") > -1 && keysDown.indexOf(";true") > -1) {
        if (appsopened.oppened) {
            appsopened.close();
        }
        else {
            appsopened.open();
        }
        keysDown = new Array();
    }
    else if (keysDown.indexOf("AltGraphtrue") > -1 && keysDown.indexOf("ftrue") > -1 || keysDown.indexOf("AltGraphtrue") > -1 && keysDown.indexOf("[true") > -1) {
        ColorFilters.deactivateAll();
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