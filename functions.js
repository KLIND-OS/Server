var todos = [];
var openGetFile = [];
var playingSounds = [];
var playingSongs = [];
var control = {
  dowhenlogin: {
    add: (x) => {
      if (typeof x === "function") {
        todos.push(x);
      }
    },
    loged: () => {
      for (var i = 0; i < todos.length; i++) {
        todos[i]();
      }
      todos = [];
    },
    loaded: () => {
      if (login != "true") {
        setTimeout(() => {
          for (var i = 0; i < todos.length; i++) {
            todos[i]();
          }
          todos = [];
        }, 790);
      }
    },
  },
  error: (type) => {
    if (type == "fatal") {
      return (info, appName) => {
        error("0x0000241", info, "Chyba vyvolána aplikací: " + appName);
      };
    } else if (type == "warn") {
      return (info, appName) => {
        spawnNotification(appName + " - Varování", info);
      };
    } else {
      return () => {
        throw new Error("Uknown type of error: " + type);
      };
    }
  },
  loged: false,
  functions: {
    logout: (app) => {
      var appName = app.info.name;
      spawnNotification(appName, "Budete odhlášen za 5 sekund.");
      setTimeout(() => {
        Login.logout();
      }, 5000);
    },
    reboot: (app) => {
      var appName = app.info.name;
      BPrompt.confirm(
        "Chcete aplikaci " + appName + " povolit restartovat Váš počítač?",
        (x) => {
          if (x) {
            spawnNotification(appName, "Systém bude restartován za 5 sekund!");
            setTimeout(() => {
              window.location.reload();
            }, 5000);
          }
        },
      );
    },
  },
  playSound: (location) => {
    var x = new Howl({
      src: [location],
      autoplay: true,
    });
    x.on("end", function () {
      playingSounds = removebyindex(playingSounds, playingSounds.indexOf(x));
    });
    playingSounds.push(x);
    return x;
  },
  playSong: (location, otherSettings, autoplay) => {
    var x = new Howl({
      src: [location],
      autoplay: autoplay || true,
      ...otherSettings,
    });
    x.on("end", function () {
      playingSongs = removebyindex(playingSongs, playingSongs.indexOf(x));
    });
    playingSongs.push(x);
    return x;
  },
  notify: spawnNotification,
  fileManager: Object.assign(
    {},
    {
      fileSelect: (callBack) => {
        windows.open("filemanager", { mode: "select", callBack: callBack });
      },
      folderSelect: (callBack) => {
        windows.open("filemanager", {
          mode: "folderselect",
          callBack: callBack,
        });
      },
    },
    mainFileManager,
  ),
  message: BPrompt,
};
class App {
  windowParser = {
    parseName: (windowName) => {
      return `${this.info.name}-${windowName}`;
    },
    parseClass: (windowName) => {
      return this.windowParser.parseName(windowName).replaceAll(" ", "");
    },
  };
  windows = [];
  constructor({ name, hidden }) {
    if (Object.keys(Apps).includes(name)) {
      throw new Error(
        "App with this name already exists. Name must be a unique.",
      );
    } else {
      if (hidden === false) {
        var element = document.createElement("li");
        var a = document.createElement("a");
        a.textContent = name;
        a.onclick = () => {
          windows.open(Apps[name]);
        };
        element.appendChild(a);
        document.querySelector("#liststartmenu").appendChild(element);
      } else {
        hidden = true;
      }

      this.info = {
        name: name,
        inStartMenu: !hidden,
      };
      LocalStorage.customApps.push(name);
    }
  }
  createWindow({
    name,
    buttons,
    content,
    defaultWindow,
    onStart = async () => {},
    onFocus = false,
    passProps = async () => {
      return {};
    },
    _forcePlainHTML = false,
  }) {
    var idName = this.info.name + "-" + name;
    var okno = document.createElement("div");
    okno.classList.add(idName.replaceAll(" ", ""));
    okno.setAttribute("onclick", "ZIndexer.focus(this);");

    var widgetHeader = document.createElement("div");
    widgetHeader.classList.add("window-header");

    var headerClass = document.createElement("div");
    headerClass.classList.add("headerclass");
    var spanName = document.createElement("span");
    spanName.textContent = name;
    spanName.style.float = "left";
    headerClass.appendChild(spanName);

    if (buttons.custom != undefined && buttons.custom.length > 0) {
      for (const button of buttons.custom) {
        const customButton = document.createElement("div");
        customButton.classList.add("menu");
        customButton.onclick = button[1];
        customButton.textContent = button[0];
        headerClass.appendChild(customButton);
      }
    }

    if (buttons.close != undefined) {
      var closeBtn = document.createElement("div");
      closeBtn.classList.add("close");
      closeBtn.setAttribute("onclick", "windows.close(this,'" + idName + "')");
      headerClass.appendChild(closeBtn);
      var closeaction = buttons.close;
    } else {
      var closeaction = false;
    }

    if (buttons.mini != undefined) {
      var miniBtn = document.createElement("div");
      miniBtn.classList.add("mini");
      miniBtn.setAttribute("onclick", "windows.mini(this,'" + idName + "')");
      headerClass.appendChild(miniBtn);
      var miniaction = buttons.mini;
    } else {
      var miniaction = false;
    }

    windows.list.names.push(idName);
    windows.list.classes.push("." + idName.replaceAll(" ", ""));
    windows.list.focusedAction.push(onFocus);
    windows.list.special[idName] = [
      async (win, args) => {
        if (_forcePlainHTML) {
          win.querySelector("#root").innerHTML = content;
        } else {
          const props = await passProps(win, args);
          const root = win.querySelector("#root");
          const html = await this.appData.getText(content);

          const template = Handlebars.compile(html);
          const finalHtml = template(props);
          root.innerHTML = finalHtml;
        }

        await onStart(win, args);
      },
      closeaction,
      miniaction,
    ];

    widgetHeader.appendChild(headerClass);

    okno.appendChild(widgetHeader);
    okno.classList.add("customAppResizable");

    var final = document.querySelector(".oknadisplaynone").appendChild(okno);
    final.innerHTML += `<div id="root"></div>`;

    var element = document.createElement("img");
    element.src = CustomApp.getIcon(this.info.name);
    element.alt = idName;
    element.setAttribute("onclick", "windows.miniOpen('" + idName + "',this)");
    element.classList.add("ikonadown");
    element.classList.add(idName.replaceAll(" ", "") + "ikonadown");

    var finals = document
      .querySelector(".downiconsAppNone")
      .appendChild(element);

    windows.list.ikonadown.push("." + idName.replaceAll(" ", "") + "ikonadown");

    if (defaultWindow) Apps[this.info.name] = idName;

    this.windows.push({
      element: final,
      ikonaDown: finals,
      open: () => windows.open(idName),
    });

    return {
      element: final,
      ikonaDown: finals,
      open: () => windows.open(idName),
    };
  }
  storage = {
    set: (key, value) => {
      var storage = JSON.parse(localStorage.getItem(this.info.name)) || {};
      storage[key] = value;
      localStorage.setItem(this.info.name, JSON.stringify(storage));
    },
    get: (key) => {
      var storage = JSON.parse(localStorage.getItem(this.info.name)) || {};
      return storage[key];
    },
    remove: (key) => {
      var storage = JSON.parse(localStorage.getItem(this.info.name));
      delete storage[key];
    },
    clear: () => {
      var name = this.info.name;
      localStorage.removeItem(name);
    },
  };
  appData = {
    getUrl: (path) => {
      const finalUrl = LowLevelApi.filesystem.path.join(this.info.name, path);
      return new URL(finalUrl, "http://localhost:9998");
    },
    getBinary: async (path) => {
      const finalUrl = LowLevelApi.filesystem.path.join(
        LowLevelApi.filesystem.os.homedir(),
        "appdata",
        this.info.name,
        path,
      );
      return await LowLevelApi.filesystem.readFile(finalUrl, "binary");
    },
    getText: async (path) => {
      const finalUrl = LowLevelApi.filesystem.path.join(
        LowLevelApi.filesystem.os.homedir(),
        "appdata",
        this.info.name,
        path,
      );
      return await LowLevelApi.filesystem.readFile(finalUrl, "utf8");
    },
    get: async (path, encoding) => {
      const finalUrl = LowLevelApi.filesystem.path.join(
        LowLevelApi.filesystem.os.homedir(),
        "appdata",
        this.info.name,
        path,
      );
      return await LowLevelApi.filesystem.readFile(finalUrl, encoding);
    },
  };
  Shortcuts = {
    createWindowShortcut: (windowName, shortcut) => {
      const parsedName = this.windowParser.parseName(windowName);
      Shortcuts.addWindowShortcut(parsedName, shortcut);
    },
    createGlobalShortcut: Shortcuts.addGlobalShort,
  };
}

window.control = control;
