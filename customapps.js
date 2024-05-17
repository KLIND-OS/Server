var CustomApp = {
  icons: [],
  load: () => {
    var scripts = localStorage.getItem("customapps");
    if (scripts !== null) {
      var all = JSON.parse(scripts);
      for (var i = 0; i < all.length; i++) {
        CustomApp.icons.push([all[i][0].trim(), all[i][2]]);
        var element = document.createElement("script");
        element.innerHTML = all[i][1];
        document.body.appendChild(element);
      }
    }
  },
  getIcon: (name) => {
    for (var i = 0; i < CustomApp.icons.length; i++) {
      if (CustomApp.icons[i][0] === name) {
        return CustomApp.icons[i][1];
      }
    }
    return false;
  },
  loadWindow: (e) => {
    var div = e.querySelector(".allapps");
    div.innerHTML = "";
    var allscripts = localStorage.getItem("customapps");
    if (allscripts !== null) {
      var all = JSON.parse(allscripts);
      for (var i = 0; i < all.length; i++) {
        var element = document.createElement("div");
        element.classList.add("customappdiv");

        var span = document.createElement("span");
        span.textContent = all[i][0];

        var removebtn = document.createElement("button");
        removebtn.setAttribute(
          "onclick",
          "CustomApp.remove('" + all[i][0].trim() + "')",
        );
        removebtn.textContent = "Odstranit";

        element.appendChild(span);
        element.appendChild(removebtn);

        div.appendChild(element);
      }
    } else {
      div.innerHTML = "Nemáte nainstalované žádné aplikace!";
    }
  },
  remove: async (element) => {
    var scripts = JSON.parse(localStorage.getItem("customapps"));
    for (var i = 0; i < scripts.length; i++) {
      if (scripts[i][0].trim() == element.trim()) {
        function removebyindex(array, index) {
          var doacgajs = [];
          for (var i = 0; i < array.length; i++) {
            if (i != index) {
              doacgajs.push(array[i]);
            }
          }
          return doacgajs;
        }
        localStorage.removeItem(scripts[i][0]);
        scripts = removebyindex(scripts, i);
        localStorage.setItem("customapps", JSON.stringify(scripts));
        break;
      }
    }

    const appDataPath = LowLevelApi.filesystem.path.join(
      LowLevelApi.filesystem.os.homedir(),
      "appdata",
      element,
    );
    await LowLevelApi.filesystem.fsExtra.rm(appDataPath, { recursive: true });
    window.location.reload();
  },
  async loadFromPath(path) {
    const exec = LowLevelApi.filesystem.promisify(
      LowLevelApi.child_process.exec,
    );
    const zipPath = LowLevelApi.filesystem.path.join(
      LowLevelApi.filesystem.os.homedir(),
      "usrfiles",
      path,
    );
    const outputPath = LowLevelApi.filesystem.path.join(
      LowLevelApi.filesystem.os.homedir(),
      "app_output",
    );

    await exec(`unzip '${zipPath}' -d '${outputPath}'`);

    const appVersion = await LowLevelApi.filesystem.readFile(
      LowLevelApi.filesystem.path.join(outputPath, "version.txt"),
      "utf8",
    );

    if (!version && version.trim() != appVersion.trim()) {
      spawnNotifiction(
        "Instalátor aplikací",
        "Tato aplikace je na jinou verzi KLIND OS",
      );
      return;
    }

    const iconBase64 = await LowLevelApi.filesystem.readFile(
      LowLevelApi.filesystem.path.join(outputPath, "image.png"),
      "base64",
    );

    const icon = `data:image/png;base64,${iconBase64}`;

    const name = (
      await LowLevelApi.filesystem.readFile(
        LowLevelApi.filesystem.path.join(outputPath, "name.txt"),
        "utf8",
      )
    ).trim();

    const script = await LowLevelApi.filesystem.readFile(
      LowLevelApi.filesystem.path.join(outputPath, "script.js"),
      "utf8",
    );

    const install = await LowLevelApi.filesystem.readFile(
      LowLevelApi.filesystem.path.join(outputPath, "install.js"),
      "utf8",
    );

    if (localStorage.getItem("customapps") == null) {
      localStorage.setItem("customapps", "[]");
    }

    const all = JSON.parse(localStorage.getItem("customapps"));

    for (var i = 0; i < all.length; i++) {
      if (all[i][0] === name) {
        spawnNotification(
          "Instalátor aplikací",
          "Aplikace se stejným jménem je již nainstalována!",
        );
        return;
      }
    }

    const appdatapath = LowLevelApi.filesystem.path.join(
      LowLevelApi.filesystem.os.homedir(),
      "appdata",
      name,
    );

    await LowLevelApi.filesystem.mkdir(appdatapath);

    try {
      await exec(
        `mv '${LowLevelApi.filesystem.path.join(outputPath, "appdata")}'/* '${appdatapath}'`,
      );
    } catch {}

    await LowLevelApi.filesystem.fsExtra.rm(outputPath, { recursive: true });

    if (install.trim().startsWith('"use async"')) {
      this.window.installFinished = () => {
        all.push([name, script, icon]);
        localStorage.setItem("customapps", JSON.stringify(all));
        window.location.reload();
      };
      eval(install);
    } else {
      eval(install);
      all.push([name, script, icon]);
      localStorage.setItem("customapps", JSON.stringify(all));
      window.location.reload();
    }
  },
};
