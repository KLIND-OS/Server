class ZIndexer {
  static current;
  static previous = document.querySelector(".koks");

  static focus(win, nomove = false) {
    if (ZIndexer.current && ZIndexer.current.isEqualNode(win)) return;


    if (!nomove) document.querySelector(".oknapatrizde").appendChild(win);

    setTimeout(() => {
      ZIndexer.current = win;
      ZIndexer.previous.classList.remove("winselected");
      win.classList.add("winselected");
      ZIndexer.previous = ZIndexer.current;
    });

    const name = win.getAttribute("name");
    const location = windows.list.names.indexOf(name);
    const focusAction = windows.list.focusedAction[location];

    if (!focusAction) {
      return;
    }

    focusAction(win);
  }
}
