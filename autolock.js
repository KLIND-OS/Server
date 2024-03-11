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
