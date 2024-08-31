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
        removebtn.textContent = Localization.getString("remove");

        element.appendChild(span);
        element.appendChild(removebtn);

        div.appendChild(element);
      }
    } else {
      div.innerHTML = Localization.getString("you_dont_have_any_app");
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
    await LowLevelApi.NodePackages.removeContext(element);
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
        Localization.getString("app_installer"),
        Localization.getString("this_app_is_for_version"),
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

    const node = await LowLevelApi.filesystem.readFile(
      LowLevelApi.filesystem.path.join(outputPath, "node_packages.json"),
      "utf8",
    );

    const linux = await LowLevelApi.filesystem.readFile(
      LowLevelApi.filesystem.path.join(outputPath, "linux_programs.json"),
      "utf8",
    );

    if (localStorage.getItem("customapps") == null) {
      localStorage.setItem("customapps", "[]");
    }

    const all = JSON.parse(localStorage.getItem("customapps"));

    for (var i = 0; i < all.length; i++) {
      if (all[i][0] === name) {
        spawnNotification(
          Localization.getString("app_installer"),
          Localization.getString("app_with_same_name"),
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
    } catch {
      // Try catch is here because it will fail when user doesnt have any appdata.
    }

    await LowLevelApi.filesystem.fsExtra.rm(outputPath, { recursive: true });

    all.push([name, script, icon]);
    localStorage.setItem("customapps", JSON.stringify(all));

    await LowLevelApi.NodePackages.createContext(name);

    await LowLevelApi.NodePackages.install(JSON.parse(node).join(" "), name);

    const execAsync = LowLevelApi.filesystem.promisify(
      LowLevelApi.child_process.exec,
    );

    if (JSON.parse(linux).length !== 0) {
      await execAsync(
        "sudo pacman -Sy --noconfirm --needed " + JSON.parse(linux).join(" "),
      );
    }

    window.location.reload();
  },
};
