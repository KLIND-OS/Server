let passwordc= localStorage.getItem("password");
function loadreg() {
  if (localStorage.getItem("reg.login") != null) {
    setTimeout(() => {
      const reglogin = localStorage.getItem("reg.login");
      if (reglogin == passwordc + "**." + "false") {
        document.querySelector(".login").classList.add("displaynone");
        document.querySelector(".login").style.opacity = "0";
        login = "false";
        control.loged = true;
      }
      else if (reglogin == passwordc + "**." + "true") { }
      else if (reglogin == "") { }
      else {
        error("0x0000042", "Error in register | Chyba v registrech", "KLIND OS | REG");
      }
    }, 500);
  }
  if (localStorage.getItem("reg.consolelog") != null) {
    setTimeout(() => {
      const reglogins = localStorage.getItem("reg.consolelog");
      if (reglogins == passwordc + "**." + "false") {
        consolelog = "false";
      }
      else if (reglogins == passwordc + "**." + "true") { }
      else if (reglogins == "") { }
      else {
        error("0x0000043", "Error in register | Chyba v registrech", "KLIND OS | REG");
      }
    }, 500);
  }
  if (localStorage.getItem("reg.autolocklogin") != null) {
    setTimeout(() => {
      const regloginss = localStorage.getItem("reg.autolocklogin");
      if (regloginss == passwordc + "**." + "false") {
        autolocklogin = "false";
      }
      else if (regloginss == passwordc + "**." + "true") { }
      else if (regloginss == "") { }
      else {
        error("0x0000044", "Error in register | Chyba v registrech", "KLIND OS | REG");
      }
    }, 500);
  }
}
function submitreg(elmnt) {
  var change = elmnt.querySelector("#changesss").value;
  var values = elmnt.querySelector("#valuesss").value;
  if (change == "login") {
    localStorage.setItem("reg.login", passwordc + "**." + values);
    spawnNotification("Editor registrů", "Registr login byl aktualizován!");
  }
  else if (change == "consolelog") {
    localStorage.setItem("reg.consolelog", passwordc + "**." + values);
    spawnNotification("Editor registrů", "Registr consolelog byl aktualizován!");
  }
  else if (change == "autolocklogin") {
    localStorage.setItem("reg.autolocklogin", passwordc + "**." + values);
    spawnNotification("Editor registrů", "Registr autolocklogin byl aktualizován!");
  }
  else {

  }
}
