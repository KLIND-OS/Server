function lengthInUtf8Bytes(str) {
  var m = encodeURIComponent(str).match(/%[89ABab]/g);
  return str.length + (m ? m.length : 0);
}
function removebyindex(array, index) {
  var doacgajs = [];
  for (var i = 0; i < array.length; i++) {
    if (i != index) {
      doacgajs.push(array[i]);
    }
  }
  return doacgajs;
}
function humanFileSize(bytes, si = false, dp = 1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }

  const units = si
    ? ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );

  return bytes.toFixed(dp) + " " + units[u];
}
var mainFileManager = {
  openWith: {
    txt: [
      ["Textový editor", (path) => windows.open("fileeditor", { path: path })],
    ],
    docx: [
      ["Word editor", (path) => windows.open("wordeditor", { path: path })],
    ],
    xlsx: [
      ["Sheets editor", (path) => windows.open("sheetseditor", { path: path })],
    ],
    html: [
      ["Word editor", (path) => windows.open("wordeditor", { path: path })],
    ],
    jpg: [["Obrázky", (file) => windows.open("fileeditor", { path: file })]],
    jpeg: [["Obrázky", (file) => windows.open("fileeditor", { path: file })]],
    png: [["Obrázky", (file) => windows.open("fileeditor", { path: file })]],
    gif: [["Obrázky", (file) => windows.open("fileeditor", { path: file })]],
    svg: [["Obrázky", (file) => windows.open("fileeditor", { path: file })]],
    webp: [["Obrázky", (file) => windows.open("fileeditor", { path: file })]],
    ico: [["Obrázky", (file) => windows.open("fileeditor", { path: file })]],
    mp4: [
      ["Přehrávač videa", (file) => windows.open("fileeditor", { path: file })],
    ],
    avi: [
      ["Přehrávač videa", (file) => windows.open("fileeditor", { path: file })],
    ],
    mov: [
      ["Přehrávač videa", (file) => windows.open("fileeditor", { path: file })],
    ],
    mkv: [
      ["Přehrávač videa", (file) => windows.open("fileeditor", { path: file })],
    ],
    wmv: [
      ["Přehrávač videa", (file) => windows.open("fileeditor", { path: file })],
    ],
    mpg: [
      ["Přehrávač videa", (file) => windows.open("fileeditor", { path: file })],
    ],
    mpeg: [
      ["Přehrávač videa", (file) => windows.open("fileeditor", { path: file })],
    ],
    webm: [
      ["Přehrávač videa", (file) => windows.open("fileeditor", { path: file })],
    ],
    "3gp": [
      ["Přehrávač videa", (file) => windows.open("fileeditor", { path: file })],
    ],
    ogv: [
      ["Přehrávač videa", (file) => windows.open("fileeditor", { path: file })],
    ],
    mp3: [
      [
        "Přehrávač hudby",
        (file) => windows.open("musicplayer", { filePath: file }),
      ],
    ],
    waw: [
      [
        "Přehrávač hudby",
        (file) => windows.open("musicplayer", { filePath: file }),
      ],
    ],
    ogg: [
      [
        "Přehrávač hudby",
        (file) => windows.open("musicplayer", { filePath: file }),
      ],
    ],
    aac: [
      [
        "Přehrávač hudby",

        (file) => windows.open("musicplayer", { filePath: file }),
      ],
    ],
    m4a: [
      [
        "Přehrávač hudby",
        (file) => windows.open("musicplayer", { filePath: file }),
      ],
    ],
    wma: [
      [
        "Přehrávač hudby",
        (file) => windows.open("musicplayer", { filePath: file }),
      ],
    ],
    ks: [["Terminál", (file) => windows.open("ter", { path: file })]],
  },
  openingFile: undefined,
  open: async (infolder, file) => {
    if (!file.includes(".")) {
      spawnNotification(
        "Správce souborů",
        "Nebylo možné zjistit typ souboru. Otevírám jako textový soubor.",
      );
      windows.open("fileeditor", {
        path: infolder + file,
      });
      return;
    }
    const parts = file.split(".");
    const type = parts[parts.length - 1];

    if (type == "kapp") {
      const content = await mainFileManager.getTextContent(infolder + file);
      parent.windows.open(content.split(":")[1]);
      return;
    } else if (type == "kapk") {
      parent.windows.open("installapp", { path: infolder + file });
      return;
    }

    var possible = [];
    if (Object.keys(mainFileManager.openWith).includes(type)) {
      possible = [...possible, ...mainFileManager.openWith[type]];
    }

    if (possible.length == 0) {
      spawnNotification(
        "Správce souborů",
        "Nemáte staženou aplikaci která by uměla otevřít tento soubor. Otevírám v textovém editoru.",
      );
      windows.open("fileeditor", {
        path: infolder + file,
      });
    } else if (possible.length == 1) {
      possible[0][1](infolder + file);
    } else {
      mainFileManager.openingFile = [possible, infolder + file];
      var element = document.querySelector(".selectApp .apps ");

      for (var i = 0; i < possible.length; i++) {
        var n = document.createElement("div");
        n.className = "appsapp";
        n.setAttribute("cursor", "pointer");
        n.textContent = possible[i][0];
        n.setAttribute("onclick", `mainFileManager.openFileWithApp(${i})`);
        element.appendChild(n);
      }

      element.parentElement.parentElement.style.display = "flex";
    }
  },
  openFileWithApp: (index) => {
    document.querySelector(".selectApp").style.display = "none";
    document.querySelector(".selectApp .apps").innerHTML = "";
    var script = mainFileManager.openingFile[0][index][1];
    script(mainFileManager.openingFile[1]);
    mainFileManager.openingFile = undefined;
  },
  properties: async (file) => {
    const path = LowLevelApi.filesystem.path.join(
      LowLevelApi.filesystem.os.homedir() + "/usrfiles",
      file,
    );

    const stats = await LowLevelApi.filesystem.stat(path);

    const parts = file.split("/");
    const name = parts[parts.length - 1];
    document.querySelector("#filename").innerHTML = name;
    document.querySelector("#filesize").innerHTML = humanFileSize(
      stats.size,
      true,
    );
    document.querySelector("#filechange").innerHTML = stats.mtime;
    document.querySelector("#filelocation").innerHTML = file;
    windows.open("fileproperties");
  },
  saveText: async (location, file) => {
    const path = LowLevelApi.filesystem.path.join(
      LowLevelApi.filesystem.os.homedir() + "/usrfiles",
      location,
    );
    await LowLevelApi.filesystem.writeFile(path, file, { encoding: "utf8" });

    var windowasjdh = document.querySelectorAll(".window");
    for (var i = 0; i < windowasjdh.length; i++) {
      if (windowasjdh[i].querySelector("#filemanageriframe") != undefined) {
        windowasjdh[i]
          .querySelector("#filemanageriframe")
          .contentWindow.FileManager.readFiles();
      }
    }
  },
  save: async (location, binary) => {
    const path = LowLevelApi.filesystem.path.join(
      LowLevelApi.filesystem.os.homedir() + "/usrfiles",
      location,
    );
    await LowLevelApi.filesystem.writeFile(path, binary, {
      encoding: "binary",
    });

    var windowasjdh = document.querySelectorAll(".window");
    for (var i = 0; i < windowasjdh.length; i++) {
      if (windowasjdh[i].querySelector("#filemanageriframe") != undefined) {
        windowasjdh[i]
          .querySelector("#filemanageriframe")
          .contentWindow.FileManager.readFiles();
      }
    }
  },
  setWallpaper: (location) => {
    localStorage.setItem("background", location);
    document.getElementById("klindows").style.backgroundImage =
      "url(http://localhost:9999" + location + ")";
  },
  getContent: async (location) => {
    if (!(await mainFileManager.fileExists(location))) {
      return false;
    }
    const path = LowLevelApi.filesystem.path.join(
      LowLevelApi.filesystem.os.homedir() + "/usrfiles",
      location,
    );

    const data = LowLevelApi.filesystem.readFile(path, "binary");
    return data;
  },
  getTextContent: async (location) => {
    if (!(await mainFileManager.fileExists(location))) {
      return false;
    }
    const path = LowLevelApi.filesystem.path.join(
      LowLevelApi.filesystem.os.homedir() + "/usrfiles",
      location,
    );
    const content = await LowLevelApi.filesystem.readFile(path, "utf8");
    return content;
  },
  folderExist: async (location) => {
    const path = LowLevelApi.filesystem.path.join(
      LowLevelApi.filesystem.os.homedir() + "/usrfiles",
      location,
    );
    return LowLevelApi.filesystem.exists(path);
  },
  allFiles: async (folder) => {
    const path = LowLevelApi.filesystem.path.join(
      LowLevelApi.filesystem.os.homedir() + "/usrfiles",
      folder,
    );

    const items = await parent.LowLevelApi.filesystem.readdir(path);
    const files = [];

    for (const item of items) {
      try {
        const filePath = parent.LowLevelApi.filesystem.path.join(path, item);
        const fileStat = await parent.LowLevelApi.filesystem.stat(filePath);

        if (fileStat.isFile()) {
          files.push(item);
        }
      } catch (e) {
        console.error(e);
      }
    }

    return files;
  },
  createAppShortCut: async (appName, fileName) => {
    if (await mainFileManager.fileExists("/" + fileName + ".kapp")) {
      return mainFileManager.createAppShortCut(appName, fileName + "x");
    }

    await mainFileManager.createFile({
      name: fileName + ".kapp",
    });
    await mainFileManager.saveText("/" + fileName + ".kapp", "open:" + appName);
  },
  createFile: async ({ name, parentFolder = "/" }) => {
    if (await mainFileManager.fileExists(parentFolder + name)) {
      name = "x" + name;
      await mainFileManager.createFile({ name, parentFolder });
    } else {
      const path = LowLevelApi.filesystem.path.join(
        LowLevelApi.filesystem.os.homedir() + "/usrfiles",
        parentFolder + name,
      );
      await LowLevelApi.filesystem.open(path, "w");
      return true;
    }
  },
  fileExists: async (filepath) => {
    const path = LowLevelApi.filesystem.path.join(
      LowLevelApi.filesystem.os.homedir() + "/usrfiles",
      filepath,
    );
    return await LowLevelApi.filesystem.exists(path);
  },
  isFile: async (filepath) => {
    const path = LowLevelApi.filesystem.path.join(
      LowLevelApi.filesystem.os.homedir() + "/usrfiles",
      filepath,
    );
    const stats = await LowLevelApi.filesystem.stat(path);
    return stats.isFile();
  },
  addProgramToOpenApps: (typesOfFilesShouldBeOpened, script, name) => {
    var types =
      typeof typesOfFilesShouldBeOpened == "object"
        ? typesOfFilesShouldBeOpened
        : [typesOfFilesShouldBeOpened];

    for (const type of types) {
      if (Object.keys(mainFileManager.openWith).includes(type)) {
        mainFileManager.openWith[type].push([name, script]);
      } else {
        mainFileManager.openWith[type] = [[name, script]];
      }
    }
  },
};
function fileManagerOpen() {
  if (localStorage.getItem("mode") == "dark") {
    for (
      var i = 0;
      i < document.querySelectorAll("#filemanageriframe").length;
      i++
    ) {
      document.querySelectorAll("#filemanageriframe")[i].src =
        "/filemanager/?dark";
    }
    for (
      var i = 0;
      i < document.querySelectorAll("#textareafileeditorimage").length;
      i++
    ) {
      document.querySelectorAll("#textareafileeditorimage")[i].style.color =
        "white";
    }
  } else {
    for (
      var i = 0;
      i < document.querySelectorAll("#filemanageriframe").length;
      i++
    ) {
      document.querySelectorAll("#filemanageriframe")[i].src = "/filemanager/";
    }
    for (
      var i = 0;
      i < document.querySelectorAll("#textareafileeditorimage").length;
      i++
    ) {
      document.querySelectorAll("#textareafileeditorimage")[i].style.color =
        "black";
    }
  }
}
