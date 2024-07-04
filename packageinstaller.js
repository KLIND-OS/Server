class PackageInstaller {
  static init(win, args) {
    if (args?.type == "printer") {
      win.querySelector("printerdriverstext").style.display = "block";
    }
  }
  static installPackage(win) {
    var repository = win.querySelector(".repo").value;
    var packageName = win.querySelector(".packagename").value;
    win.querySelector(".helptext").style.color = "white";
    win.querySelector(".helptext").textContent = "Prosím počkejte...";
    LowLevelApi.Packages.install(repository, packageName, (response) => {
      if (response == "error") {
        win.querySelector(".helptext").style.color = "red";
        win.querySelector(".helptext").textContent =
          "Aj, nastala chyba při instalaci balíčku. Zkontrolujte že máte správně vybraný repozitář a že máte správný název balíčku.";
      } else if (response == "success") {
        win.querySelector(".helptext").textContent =
          "Balíček byl úspěšně nainstalován!";
        win.querySelector(".helptext").style.color = "green";
      }
    });
  }
}
