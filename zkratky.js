const keysDown = new Set();
window.onkeydown = (e) => {
  keysDown.add(e.key);
  Shortcuts._handleKeypress(keysDown);
};
window.onkeyup = (e) => {
  // keysDown.delete(e.key);
  keysDown.clear();
};

class Shortcut {
  keys;
  exec;
  constructor(keys, exec) {
    this.keys = keys;
    this.exec = exec;
  }
}

class Shortcuts {
  static globalShortcutList = [
    new Shortcut(["Meta"], () => openstartmenu()),
    new Shortcut(["Control", "l"], () => logout()),
    new Shortcut(["AltGraph", "h"], () => windows.open("nap")),
    new Shortcut(["AltGraph", "`"], () => windows.open("nap")),
    new Shortcut(["Alt", "F4"], () => {
      if (!openedwindowindex) return;

      const closeButton = openedwindowindex.querySelector(
        ".headerclass .close",
      );
      if (!closeButton) return;
      if (closeButton.style.display == "none") return;

      closeButton.click();
    }),
    new Shortcut(["Alt", "`"], () => {
      if (appsopened.oppened) {
        appsopened.close();
      } else {
        appsopened.open();
      }
    }),
    new Shortcut(["Alt", ";"], () => {
      if (appsopened.oppened) {
        appsopened.close();
      } else {
        appsopened.open();
      }
    }),
    new Shortcut(["AltGraph", "f"], () => ColorFilters.deactivateAll()),
    new Shortcut(["AltGraph", "["], () => ColorFilters.deactivateAll()),
    new Shortcut(["Alt", "ArrowUp"], () => {
      if (!openedwindowindex) return;
      windowSizing.full(openedwindowindex);
    }),
    new Shortcut(["Alt", "ArrowRight"], () => {
      if (!openedwindowindex) return;
      windowSizing.right(openedwindowindex);
    }),
    new Shortcut(["Alt", "ArrowLeft"], () => {
      if (!openedwindowindex) return;
      windowSizing.left(openedwindowindex);
    }),
    new Shortcut(["Alt", "ArrowDown"], () => {
      if (!openedwindowindex) return;
      windowSizing.defaultNonEvent(openedwindowindex, 15, 15);
    }),
  ];
  static windowShortcutList = {
    poznamky: [
      new Shortcut(["Control", "s"], (win) => {
        win.querySelector(".menu.savepoznamky").click();
      }),
    ],
    fileeditor: [
      new Shortcut(["Control", "s"], (win) => {
        if (win.querySelector(".filesavefileconfig").style.display == "block") {
          win.querySelector(".filesavefileconfig").click();
        }
      }),
    ],
  };
  static _eqSet(xs, ys) {
    return xs.size === ys.size && [...xs].every((x) => ys.has(x));
  }
  static _handleKeypress(keysDown) {
    for (const shortcut of this.globalShortcutList) {
      const needPress = new Set(shortcut.keys);
      if (this._eqSet(keysDown, needPress)) {
        shortcut.exec();
        return;
      }
    }

    if (!openedwindowindex) return;
    const className = openedwindowindex.classList[1];
    const location = windows.list.classes.indexOf(`.${className}`);
    const windowName = windows.list.names[location];
    const windowShortcuts = this.windowShortcutList[windowName];

    if (!windowShortcuts) return;

    for (const shortcut of windowShortcuts) {
      const needPress = new Set(shortcut.keys);
      if (this._eqSet(keysDown, needPress)) {
        shortcut.exec(openedwindowindex);
        return;
      }
    }
  }
  static addGlobalShort(shortcut) {
    this.globalShortcutList.add(shortcut);
  }
  static addWindowShortcut(windowName, shortcut) {
    const list = this.windowShortcutList[windowName];

    if (list) {
      list.push(shortcut);
    } else {
      this.windowShortcutList[windowName] = [shortcut];
    }
  }
}
