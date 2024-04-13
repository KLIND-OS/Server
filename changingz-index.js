var previouslySelected = document.querySelector(".koks");
var openedwindowindex;
function changewindowmain(openedwindow) {
  openedwindowindex = openedwindow;
  previouslySelected.classList.remove("windowedmtjhjass");
  openedwindow.classList.add("windowedmtjhjass");
  previouslySelected = openedwindow;

  const name = openedwindow.getAttribute("name");
  const location = windows.list.names.indexOf(name);
  const focusAction = windows.list.focusedAction[location];

  if (!focusAction) {
    return
  }

  focusAction(openedwindow);
}
