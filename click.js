// Right click menu
var xs;
var ys;
document.addEventListener("mousemove", function (e) {
  xs = e.clientX;
  ys = e.clientY;
});

// Global right click menu
new ContextMenu(document.getElementById("klindowsrightclickmenu"), [
  new ContextMenuItem("Napájení", () => Power.open()),
  new ContextMenuItem("Vypnout", () => Power.turnoff()),
  new ContextMenuItem("Nastavení", () => windows.open("nas")),
]);

const startmenu = new ContextMenu(undefined, [
  new ContextMenuItem("Přidat aplikaci na plochu", (e) => {
    var icon = e.getAttribute("icon");
    var run = e.getAttribute("onclick");
    DesktopIcons.add({
      run: run,
      icon: icon,
    });
  }),
  new ContextMenuItem("Přidat zástupce do souborů", (e) => {
    var name = e.textContent;
    var app = e
      .getAttribute("onclick")
      .replace("windows.open(", "")
      .replace(")", "")
      .replaceAll("'", "")
      .replaceAll('"', "")
      .replaceAll(";", "");
    mainFileManager.createAppShortCut(app, name);
    windows.open("filemanager");
  }),
]);

function rightclickApp(element) {
  startmenu.manualTrigger(xs, ys, element);
}

const desktopiconsmenu = new ContextMenu(undefined, [
  new ContextMenuItem("Odebrat", (e) => {
    var storage = JSON.parse(localStorage.getItem("desktop-icons"));
    var newstorage = [];
    var id = e.getAttribute("id");
    for (var i = 0; i < storage.length; i++) {
      if (id != i) {
        newstorage.push(storage[i]);
      }
    }
    localStorage.setItem("desktop-icons", JSON.stringify(newstorage));
    document.querySelector(".iconsKLINDOS").innerHTML = "";
    DesktopIcons.load();
  }),
]);

function rightClickIcon(element) {
  desktopiconsmenu.manualTrigger(xs - 59, ys + 10, element);
}
