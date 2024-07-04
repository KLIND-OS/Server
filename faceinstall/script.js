window.addEventListener("DOMContentLoaded", () => {
  if (
    localStorage.getItem("fa1c2e") == null ||
    localStorage.getItem("fa1c2e") == "" ||
    parent.mainFileManager.getContent(
      JSON.parse(localStorage.getItem("fa1c2e"))[0],
    ) == false ||
    parent.mainFileManager.getContent(
      JSON.parse(localStorage.getItem("fa1c2e"))[1],
    ) == false
  ) {
    var value1 = document.createElement("button");
    var value2 = document.createElement("button");
    var submit = document.createElement("button");
    value1.textContent = "Vyberte první obrázek";
    value2.textContent = "Vyberte druhý obrázek";
    submit.textContent = "Odeslat";
    value1.onclick = () => {
      parent.control.fileManager.fileSelect({
        success: (path) => {
          value1.setAttribute("path", path);
          value1.textContent = path;
        },
        closed: (e) =>
          parent.spawnNotification("NRO", "Výběr souboru byl přerušen!"),
      });
    };
    value2.onclick = () => {
      parent.control.fileManager.fileSelect({
        success: (path) => {
          value2.setAttribute("path", path);
          value2.textContent = path;
        },
        closed: (e) =>
          parent.spawnNotification("NRO", "Výběr souboru byl přerušen!"),
      });
    };
    submit.onclick = () => {
      if (
        parent.mainFileManager.getContent(value1.getAttribute("path")) !=
          false &&
        parent.mainFileManager.getContent(value2.getAttribute("path")) != false
      ) {
        localStorage.setItem(
          "fa1c2e",
          JSON.stringify([
            value1.getAttribute("path"),
            value2.getAttribute("path"),
          ]),
        );
        parent.Login.loadFaceButton();
        window.location.reload();
      } else {
        parent.spawnNotification(
          "NRO",
          "První nebo druhý soubor se nenáhází na uvedené cestě.",
        );
      }
    };
    document.body.appendChild(value1);
    document.body.appendChild(value2);
    document.body.appendChild(submit);
  } else {
    // Installed
    var removebtn = document.createElement("button");
    removebtn.textContent = "Vymazat uložené obrázky";
    removebtn.onclick = () => {
      localStorage.removeItem("fa1c2e"), parent.Login.loadFaceButton();
      window.location.reload();
    };
    document.body.appendChild(removebtn);
  }
});
