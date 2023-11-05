var openedwindowindex;
var pejfd = document.querySelector(".koks");
function changewindowmain(asdasdasdasdd) {
  openedwindowindex = asdasdasdasdd;
  trychange();
}
function trychange() {
  pejfd.classList.remove("windowedmtjhjass");
  openedwindowindex.classList.add("windowedmtjhjass");
  setTimeout(() => {
    pejfd = openedwindowindex;
  }, 100);
}