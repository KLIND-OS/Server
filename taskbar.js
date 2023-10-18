var autotaskshovat = false;
function adjasjdk(cbtaskbar) {
    if (cbtaskbar) {
        autotaskshovat = true;
        localStorage.setItem("autotaskschovat", "true");
        document.getElementById("downbar").style.bottom = "-50px";
    }
    else {
        autotaskshovat = false;
        localStorage.setItem("autotaskschovat", "false");
        document.getElementById("downbar").style.bottom = "0";
    }
}
function downbarover() {
    if (autotaskshovat) document.getElementById("downbar").style.bottom = "0";
}
function downbarout() {
    if (autotaskshovat) document.getElementById("downbar").style.bottom = "-50px";
}