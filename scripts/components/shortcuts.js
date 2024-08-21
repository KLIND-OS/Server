const keysDown = new Set();
window.onkeydown = (e) => {
  keysDown.add(e.key);
  Shortcuts._handleKeypress(keysDown);
};
window.onkeyup = () => {
  // keysDown.delete(e.key);
  keysDown.clear();
};

class Shortcut {
  keys;
  exec;
  multiple;
  constructor(keys, exec, multiple) {
    this.keys = keys;
    this.exec = exec;
    this.multiple = multiple;
  }
}

class Shortcuts {
  static globalShortcutList = [
    new Shortcut(["Meta"], () => StartMenu.open()),
    new Shortcut(["Control", "l"], () => Login.logout()),
    new Shortcut([["AltGraph", "h"], ["AltGraph", "`"]], () => windows.open("nap"), true),
    new Shortcut(["Alt", "F4"], () => {
      if (!ZIndexer.current) return;

      const closeButton = ZIndexer.current.querySelector(".headerclass .close");
      if (!closeButton) return;
      if (closeButton.style.display == "none") return;

      closeButton.click();
    }),
    new Shortcut([["Alt", "`"], ["Alt", ";"]], () => {
      if (appsopened.oppened) {
        appsopened.close();
      } else {
        appsopened.open();
      }
    }, true),
    new Shortcut([["AltGraph", "f"], ["AltGraph", "["]], () => ColorFilters.deactivateAll(), true),
    new Shortcut(["Alt", "ArrowUp"], () => {
      if (!ZIndexer.current) return;
      DraggableElements.windowSizing.full(ZIndexer.current);
    }),
    new Shortcut(["Alt", "ArrowRight"], () => {
      if (!ZIndexer.current) return;
      DraggableElements.windowSizing.right(ZIndexer.current);
    }),
    new Shortcut(["Alt", "ArrowLeft"], () => {
      if (!ZIndexer.current) return;
      DraggableElements.windowSizing.left(ZIndexer.current);
    }),
    new Shortcut(["Alt", "ArrowDown"], () => {
      if (!ZIndexer.current) return;
      DraggableElements.windowSizing.defaultNonEvent(ZIndexer.current, 15, 15);
    }),
  ];

  static windowShortcutList = {
    fileeditor: [
      new Shortcut(["Control", "s"], (win) => {
        if (win.querySelector(".filesavefileconfig").style.display == "block") {
          win.querySelector(".filesavefileconfig").click();
        }
      }),
    ],
    filemanager: [
      new Shortcut(["Control", "v"], (win) => {
        const id = win.dataset.id;
        FilemanagerAppList[id].paste();
      }),
      new Shortcut([["Control", "r"], ["F5"]], (win) => {
        const id = win.dataset.id;
        FilemanagerAppList[id].reloadWin();
      }, true),
      new Shortcut([["Control", "ArrowLeft"], ["F5"]], (win) => {
        const id = win.dataset.id;
        FilemanagerAppList[id].redirectBack();
      }, true)
    ]
  };
  static _eqSet(xs, ys) {
    return xs.size === ys.size && [...xs].every((x) => ys.has(x));
  }
  static _handleKeypress(keysDown) {
    for (const shortcut of this.globalShortcutList) {
      if (shortcut.multiple) {
        for (const shortcutl of shortcut.keys) {
          const needPress = new Set(shortcutl);
          if (this._eqSet(keysDown, needPress)) {
            shortcut.exec();
            return;
          }
        }
      } else {
        const needPress = new Set(shortcut.keys);
        if (this._eqSet(keysDown, needPress)) {
          shortcut.exec();
          return;
        }
      }
    }

    if (!ZIndexer.current) return;
    const className = ZIndexer.current.classList[0];
    const location = windows.list.classes.indexOf(`.${className}`);
    const windowName = windows.list.names[location];
    const windowShortcuts = this.windowShortcutList[windowName];

    if (!windowShortcuts) return;

    for (const shortcut of windowShortcuts) {
      if (shortcut.multiple) {
        for (const shortcutl of shortcut.keys) {
          const needPress = new Set(shortcutl);
          if (this._eqSet(keysDown, needPress)) {
            shortcut.exec(ZIndexer.current);
            return;
          }
        }
      } else {
        const needPress = new Set(shortcut.keys);
        if (this._eqSet(keysDown, needPress)) {
          shortcut.exec(ZIndexer.current);
          return;
        }
      }
    }
  }
  static addGlobalShort(shortcut) {
    this.globalShortcutList.push(shortcut);
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
