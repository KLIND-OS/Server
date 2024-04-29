function bhdasv() {
  document.querySelector(".poznamkymenu").classList.remove("displaynone");
}
function nastavenipoznamky() {
  document.querySelector(".poznamkynas").classList.remove("displaynone");
}
function closepoznamkymenu() {
  document.querySelector(".poznamkymenu").classList.add("displaynone");
}
function closepoznamkynas() {
  document.querySelector(".poznamkynas").classList.add("displaynone");
}
function poznamkykeypress(element) {
  var valutextareapoznamky = element.value;
  let daste = new Date();
  let sjhd = daste.getDate();
  let msodaisd = ["ledna", "února", "března", "dubna", "května", "června", "července", "srpna", "září", "října", "listopadu", "prosince"][daste.getMonth()];
  let asjdod = daste.getFullYear();
  let datepoznamky = sjhd + ". " + msodaisd + " " + asjdod + " ";
  var poznamkajedna = valutextareapoznamky
    .replace("!date ", datepoznamky)
    .replace("!ahoj ", "Ahoj,\n")
    .replace("(r) ", "® ")
    .replace("(e) ", "€ ")
    .replace("(c) ", "© ")
    .replace("\()/ ", "\¯_(ツ)_/¯ ")
    .replace(":-) ", "😊 ")
    .replace(":D ", "😁 ");
  element.value = poznamkajedna;
  //vars
  if (poznamkajedna.indexOf("!setvar=") > -1) {
    const varvaluepoznamky = poznamkajedna
      .split("!")
      .find(row => row.startsWith("setvar"))
      .split("=")[1];
    var sjduhahgsdhhashdhashdihasuid = poznamkajedna
      .replace("!setvar=" + varvaluepoznamky + "!", "");
    element.value = sjduhahgsdhhashdhashdihasuid;
    localStorage.setItem("ajdhasgdhagsdhjgasdghjasdbbbvjihztterw", varvaluepoznamky);
  }
  if (poznamkajedna.indexOf("!writevar ") > -1) {
    const kasbdhasbdjbashgdb = localStorage.getItem("ajdhasgdhagsdhjgasdghjasdbbbvjihztterw");
    var asbdjhasdghjasgdhjasgbhjd = poznamkajedna
      .replace("!writevar ", kasbdhasbdjbashgdb + " ");
    element.value = asbdjhasdghjasgdhjasgbhjd;
  }
}
function savepoznamky(element) {
  var sabdhjsbdhkbk = element.parentElement.parentElement.parentElement.querySelector("#asldslk").value.replace(/(\n)/g, "//n//");
  localStorage.setItem("poznamkysave", sabdhjsbdhkbk);
  spawnNotification("Poznámky", "Poznámka byla uložena!");
}
function smazatulozene() {
  localStorage.setItem("poznamkysave", "");
  spawnNotification("Poznámky", "Poznámka byla smazána!");
}
function loadpoznamky(element) {
  try {
    const asdjhgsiudhgia = localStorage.getItem("poznamkysave");
    element.querySelector("#asldslk").value = asdjhgsiudhgia.replaceAll("//n//", "\n");
  }
  catch { }
  try {
    const sdaisdgsu = localStorage.getItem("velikostpismapoznamky");
    element.querySelector("#asldslk").style.fontSize = sdaisdgsu + "px";
    document.getElementById("velikostpismapoznamky").value = sdaisdgsu;
  }
  catch { }
  try {
    const saddas = localStorage.getItem("barvapismapoznamky");
    element.querySelector("#asldslk").style.color = saddas;
    document.getElementById("barvapismapoznamky").value = saddas;
  }
  catch { }
    
}
function sadhos() {
  var velikostpismapoznamky = document.getElementById("velikostpismapoznamky").value;
  var sjahdijs = document.querySelectorAll("#asldslk");
  for (var i = 0; i < sjahdijs.length; i++) {
    sjahdijs[i].style.fontSize = velikostpismapoznamky + "px";
    sjahdijs[i].style.fontSize = velikostpismapoznamky + "px";
  }
  localStorage.setItem("velikostpismapoznamky", velikostpismapoznamky);
}
function sadhsaos() {
  var barvapismapoznamky = document.getElementById("barvapismapoznamky").value;
  var adjhkasd = document.querySelectorAll("#asldslk");
  for (var i = 0; i < adjhkasd.length; i++) {
    adjhkasd[i].style.color = barvapismapoznamky;
  }
  localStorage.setItem("barvapismapoznamky", barvapismapoznamky);
}
