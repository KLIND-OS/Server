class Poznamky {
  static keypress(element) {
    var valutextareapoznamky = element.value;
    let date = new Date();
    let day = date.getDate();
    let month = [
      "ledna",
      "února",
      "března",
      "dubna",
      "května",
      "června",
      "července",
      "srpna",
      "září",
      "října",
      "listopadu",
      "prosince",
    ][date.getMonth()];
    let year = date.getFullYear();
    let datepoznamky = day + ". " + month + " " + year + " ";
    var poznamkajedna = valutextareapoznamky
      .replace("!date ", datepoznamky)
      .replace("!ahoj ", "Ahoj,\n")
      .replace("(r) ", "® ")
      .replace("(e) ", "€ ")
      .replace("(c) ", "© ")
      .replace("\\()/ ", "¯_(ツ)_/¯ ")
      .replace(":-) ", "😊 ")
      .replace(":D ", "😁 ");
    element.value = poznamkajedna;

    if (poznamkajedna.indexOf("!setvar=") > -1) {
      const varvaluepoznamky = poznamkajedna
        .split("!")
        .find((row) => row.startsWith("setvar"))
        .split("=")[1];
      var sjduhahgsdhhashdhashdihasuid = poznamkajedna.replace(
        "!setvar=" + varvaluepoznamky + "!",
        "",
      );
      element.value = sjduhahgsdhhashdhashdihasuid;
      localStorage.setItem(
        "ajdhasgdhagsdhjgasdghjasdbbbvjihztterw",
        varvaluepoznamky,
      );
    }
    if (poznamkajedna.indexOf("!writevar ") > -1) {
      const kasbdhasbdjbashgdb = localStorage.getItem(
        "ajdhasgdhagsdhjgasdghjasdbbbvjihztterw",
      );
      var asbdjhasdghjasgdhjasgbhjd = poznamkajedna.replace(
        "!writevar ",
        kasbdhasbdjbashgdb + " ",
      );
      element.value = asbdjhasdghjasgdhjasgbhjd;
    }
  }
  static load(win) {
    try {
      const velikost = localStorage.getItem("velikostpismapoznamky");
      win.querySelector("#asldslk").style.fontSize = velikost + "px";
      document.getElementById("velikostpismapoznamky").value = velikost;
    } catch {}
    try {
      const color = localStorage.getItem("barvapismapoznamky");
      win.querySelector("#asldslk").style.color = color;
      document.getElementById("barvapismapoznamky").value = color;
    } catch {}
  }
}
