var xs;
var ys;
var i;
document.addEventListener("mousemove", function (e) {
    xs = e.clientX;
    ys = e.clientY;
});
var ahdgsasd = "";
function rightclickApp(element) {
    ahdgsasd = element;
    document.getElementById("menu").style.display = "none";
    document.getElementById("rightclickmenuicons").style.top = ys - 52 + "px";
    document.getElementById("rightclickmenuicons").style.left = xs - 67 + "px";
    document.getElementById("rightclickmenuicons").style.display = "block";
    document.getElementById("outclick").style.display = "block";
}
var asdgasd = "";
function rightClickIcon(element) {
    asdgasd = element;
    document.getElementById("menu").style.display = "none";
    document.getElementById("rightclickmenuiconsdone").style.top = ys - 52 + "px";
    document.getElementById("rightclickmenuiconsdone").style.left = xs - 67 + "px";
    document.getElementById("rightclickmenuiconsdone").style.display = "block";
    document.getElementById("outclick").style.display = "block";
}
function removeIconFromDesktop() {
    var storage = JSON.parse(localStorage.getItem("desktop-icons"));
    var newstorage = [];
    var id = asdgasd.getAttribute("id");
    for (var i = 0; i < storage.length; i++) {
        if (id != i) {
            newstorage.push(storage[i]);
        }
    }
    localStorage.setItem("desktop-icons", JSON.stringify(newstorage));
    document.querySelector(".iconsKLINDOS").innerHTML = "";
    DesktopIcons.load();
}
function addShortCutApp() {
    var icon = ahdgsasd.getAttribute("icon");
    var run = ahdgsasd.getAttribute("onclick");
    DesktopIcons.add({
        run: run,
        icon: icon
    });
}
function addShortCutFiles() {
    var name = ahdgsasd.textContent;
    var app = ahdgsasd.getAttribute("onclick").replace("windows.open(", "").replace(")", "").replaceAll("'", "").replaceAll("\"", "").replaceAll(";", "");
    mainFileManager.createAppShortCut(app, name);
    windows.open("filemanager");
}
function closewindowdown() {
    document.querySelector("." + i).classList.remove("opened");
    var minimized = document.querySelectorAll(".window." + i.replace("ikonadown", ""));
    minimized.forEach((e) => {
        if (!e.classList.contains("openedwin")) {
            e.remove();
        }
    });
}