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
    zip: [["UnZip", (file) => windows.open("unzip", { path: file })]],
  },
  openingFile: undefined,
  open: async (infolder, file, ignorepreference = false) => {
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
      const content = await mainFileManager.getContent(infolder + file, "utf8");
      windows.open(content.split(":")[1]);
      return;
    } else if (type == "kapk") {
      windows.open("installapp", { path: infolder + file });
      return;
    }

    var possible = [];
    if (Object.keys(mainFileManager.openWith).includes(type)) {
      possible = [...possible, ...mainFileManager.openWith[type]];
    }

    const preference = FileopenPreferences.getApp(type);

    if (possible.length == 0) {
      spawnNotification(
        "Správce souborů",
        "Nemáte staženou aplikaci která by uměla otevřít tento soubor. Otevírám v textovém editoru.",
      );
      windows.open("fileeditor", {
        path: infolder + file,
      });
    } else if (possible.length == 1 && !ignorepreference) {
      possible[0][1](infolder + file);
    } else if (
      preference &&
      possible.some((e) => e[0].trim() == preference.trim()) &&
      !ignorepreference
    ) {
      possible.filter((e) => e[0].trim() == preference.trim())[0][1](
        infolder + file,
      );
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
  _showList: (possible, path) => {
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
  },
  openFileWithApp: (index) => {
    document.querySelector(".selectApp").style.display = "none";
    document.querySelector(".selectApp .apps").innerHTML = "";
    var script = mainFileManager.openingFile[0][index][1];
    script(mainFileManager.openingFile[1]);
    mainFileManager.openingFile = undefined;
  },
  stat: async (file) => {
    const path = LowLevelApi.filesystem.path.join(
      LowLevelApi.filesystem.os.homedir() + "/usrfiles",
      file,
    );
    const stats = await LowLevelApi.filesystem.stat(path);
    return stats;
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
  remove: async (location, bypass = "") => {
    if (FileLocker.test(location, bypass)) {
      throw new FileUsedError("This file is already used!");
    }

    const path = LowLevelApi.filesystem.path.join(
      LowLevelApi.filesystem.os.homedir() + "/usrfiles",
      location,
    );

    await LowLevelApi.filesystem.unlink(path);
  },
  save: async (location, content, bypass, encoding = "binary") => {
    if (FileLocker.test(location, bypass)) {
      throw new FileUsedError("This file is already used!");
    }

    const path = LowLevelApi.filesystem.path.join(
      LowLevelApi.filesystem.os.homedir() + "/usrfiles",
      location,
    );
    await LowLevelApi.filesystem.writeFile(path, content, {
      encoding: encoding,
    });

    var windowasjdh = document.querySelectorAll(".window");
    for (var i = 0; i < windowasjdh.length; i++) {
      if (windowasjdh[i].querySelector("#filemanageriframe") != undefined) {
        try {
          windowasjdh[i]
            .querySelector("#filemanageriframe")
            .contentWindow.FileManager.readFiles();
        } catch {}
      }
    }
  },
  saveText: async (location, file, bypass = "") => {
    // Deprecated!
    // Use control.fileManager.save("/file.txt", "text", undefined "utf8") instead
    // Will be removed soon

    console.warn(
      "Using deprecated function getTextContent! Look up documentation to migrate to new API.",
    );

    if (FileLocker.test(location, bypass)) {
      throw new FileUsedError("This file is already used!");
    }

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
  setWallpaper: (x) => {
    Background.set(x);
  },
  getContent: async (location, encoding = "binary") => {
    if (!(await mainFileManager.fileExists(location))) {
      return false;
    }
    const path = LowLevelApi.filesystem.path.join(
      LowLevelApi.filesystem.os.homedir() + "/usrfiles",
      location,
    );

    const data = await LowLevelApi.filesystem.readFile(path, encoding);
    return data;
  },
  getTextContent: async (location) => {
    // Deprecated!
    // Use control.fileManager.getContent("/file.txt", "utf8") instead
    // Will be removed soon

    console.warn(
      "Using deprecated function getTextContent! Look up documentation to migrate to new API.",
    );

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

    const items = await LowLevelApi.filesystem.readdir(path);
    const files = [];

    for (const item of items) {
      try {
        const filePath = LowLevelApi.filesystem.path.join(path, item);
        const fileStat = await LowLevelApi.filesystem.stat(filePath);

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
    await mainFileManager.save(
      "/" + fileName + ".kapp",
      "open:" + appName,
      undefined,
      "utf8",
    );
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
  copyFile: async (from, to, callbackPercentage, callbackFinal) => {
    // Note: All the paths must be full path.
    // Correct: from: /folder/somefile.txt to: /folder2/somefile.txt
    // Wrong: /folder/somefile.txt to: /folder2/

    const bypass = FileLocker.add(from);
    if (await mainFileManager.fileExists(to)) {
      throw new Error("File on the new location already exist.");
    }

    const finalFrom = LowLevelApi.filesystem.path.join(
      LowLevelApi.filesystem.os.homedir() + "/usrfiles",
      from,
    );

    const finalTo = LowLevelApi.filesystem.path.join(
      LowLevelApi.filesystem.os.homedir() + "/usrfiles",
      to,
    );

    const source = LowLevelApi.filesystem.fs.createReadStream(finalFrom);
    const destination = LowLevelApi.filesystem.fs.createWriteStream(finalTo);

    let bytesCopied = 0;
    const fileSize = (await LowLevelApi.filesystem.stat(finalFrom)).size;

    source.on("error", (err) => console.error("Error reading file:", err));
    destination.on("error", (err) => console.error("Error writing file:", err));

    source.on("data", (chunk) => {
      bytesCopied += chunk.length;
      const percentage = Math.floor((bytesCopied / fileSize) * 100);
      callbackPercentage(percentage);
    });

    source.pipe(destination);

    destination.on("finish", () => {
      FileLocker.remove(from, bypass);
      callbackFinal();
    });
  },
  copyFolder: async (from, to, callback) => {
    // Note: All the paths must be full path.
    // Correct: from: /sounds/Linkin Park to: /music/Linkin Park
    // Wrong: /sounds/Linkin Park to: /music/

    const bypass = FileLocker.add(from);

    const finalFrom = LowLevelApi.filesystem.path.join(
      LowLevelApi.filesystem.os.homedir() + "/usrfiles",
      from,
    );
    const finalTo = LowLevelApi.filesystem.path.join(
      LowLevelApi.filesystem.os.homedir() + "/usrfiles" + infolder,
      to,
    );
    if (await mainFileManager.folderExist(to)) {
      throw new Error("Folder already exists in the path.");
    }

    LowLevelApi.filesystem.fsExtra.copy(finalFrom, finalTo, () => {
      FileLocker.remove(from, bypass);
      callback();
    });
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
