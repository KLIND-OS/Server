document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") { }
    else {
        if (autolocklogin == "true") {
            logout();
            document.getElementById("pokusy").innerHTML = "Byl jsi odhlášen z<br>důvodu zavření karty!<br>Lze to vypnout<br>v registrech";
        }
        else if (autolocklogin == "true") { logout(); document.getElementById("pokusy").innerHTML = "Byl jsi odhlášen z<br>důvodu zavření karty!<br>Lze to vypnout<br>v registrech"; }
        else if (autolocklogin == "true") { logout(); document.getElementById("pokusy").innerHTML = "Byl jsi odhlášen z<br>důvodu zavření karty!<br>Lze to vypnout<br>v registrech"; }
    }
});
setTimeout(() => {
    if (autolocklogin == "true") {
        document.querySelector(".jstetujeste").classList.add("displayblockimport");
        sadjijashdhjkahsdjhajsdj = setTimeout(() => {
            logout();
            document.getElementById("pokusy").innerHTML = "Nebyl ste tu dlouho<br>proto jsme vás<br>radši odhlásili";
            document.querySelector(".jstetujeste").classList.remove("displayblockimport");
            aggainlockauto();
        }, 300000);
    }
}, 1800000);
function aggainlockauto() {
    setTimeout(() => {
        if (autolocklogin == "true") {
            document.querySelector(".jstetujeste").classList.add("displayblockimport");
            sadjijashdhjkahsdjhajsdj = setTimeout(() => {
                logout();
                document.getElementById("pokusy").innerHTML = "Nebyl ste tu dlouho<br>proto jsme vás<br>radši odhlásili";
                document.querySelector(".jstetujeste").classList.remove("displayblockimport");
                aggainlockauto();
            }, 300000);
        }
    }, 1800000);

}
function sakdhjsiahdijashdiashdihasjd() {
    clearTimeout(sadjijashdhjkahsdjhajsdj);
    document.querySelector(".jstetujeste").classList.remove("displayblockimport");
    aggainlockauto();
}