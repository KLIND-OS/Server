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
    win.querySelector(".helptext").textContent = Localization.getString("please_wait") + "...";
    LowLevelApi.Packages.install(repository, packageName, (response) => {
      if (response == "error") {
        win.querySelector(".helptext").style.color = "red";
        win.querySelector(".helptext").textContent =
          Localization.getString("package_install_error");
      } else if (response == "success") {
        win.querySelector(".helptext").textContent =
          Localization.getString("package_installed");
        win.querySelector(".helptext").style.color = "green";
      }
    });
  }
}
