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
    "text/plain": [
      ["Textový editor", (file) => windows.open("fileeditor", { file: file })],
    ],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
      ["Word editor", (file) => windows.open("wordeditor", { file: file })],
    ],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
      ["Sheets editor", (file) => windows.open("sheetseditor", { file: file })],
    ],
    "text/html": [
      ["Word editor", (file) => windows.open("wordeditor", { file: file })],
    ],
    image: [["Obrázky", (file) => windows.open("fileeditor", { file: file })]],
    video: [
      ["Přehrávač videa", (file) => windows.open("fileeditor", { file: file })],
    ],
    audio: [
      [
        "Přehrávač hudby",
        (file) => windows.open("musicplayer", { filePath: file[5] + file[0] }),
      ],
    ],
  },
  openingFile: undefined,
  open: (file) => {
    if (file[2] == "klindos/app") {
      parent.windows.open(file[4].split(":")[1]);
      return;
    } else if (file[2] == "klindos/installer") {
      parent.windows.open("installapp", { file: file });
      return;
    }

    var possible = [];
    if (Object.keys(mainFileManager.openWith).includes(file[2])) {
      possible = [...possible, ...mainFileManager.openWith[file[2]]];
    }

    for (const type of Object.keys(mainFileManager.openWith)) {
      if (!type.includes("/")) {
        if (type == file[2].split("/")[0]) {
          possible = [...possible, ...mainFileManager.openWith[type]];
        }
      }
    }

    if (possible.length == 0) {
      spawnNotification(
        "Správce souborů",
        "Nemáte staženou aplikaci která by uměla otevřít tento soubor. Otevírám v textovém editoru.",
      );
      windows.open("fileeditor", {
        file: file,
      });
    } else if (possible.length == 1) {
      possible[0][1](file);
    } else {
      mainFileManager.openingFile = [possible, file];
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
  properties: (file) => {
    document.querySelector("#filename").innerHTML = file[0];
    document.querySelector("#filesize").innerHTML = humanFileSize(
      file[1],
      true,
    );
    document.querySelector("#filechange").innerHTML = file[3];
    document.querySelector("#filelocation").innerHTML = file[5] + file[0];
    if (file[2] != "") {
      document.querySelector("#filetype").innerHTML = file[2];
    } else {
      document.querySelector("#filetype").innerHTML = "neznámé";
    }
    windows.open("fileproperties");
  },
  saveText: (location, file) => {
    let lastSlashIndex = location.lastIndexOf("/");
    let directory = location.substring(0, lastSlashIndex + 1);
    let filename = location.substring(lastSlashIndex + 1);
    var value = storage.getSync(directory);
    for (var i = 0; i < value.length; i++) {
      if (value[i][0] == filename) {
        var time = new Date().toString();
        value[i][3] = time;
        const sdsa = `data:${value[i][2]};base64,` + Base64.encode(file);
        value[i][4] = sdsa;
        value[i][1] = lengthInUtf8Bytes(sdsa);
        continue;
      }
    }
    try {
      storage.setSync(directory, value);
    } catch (e) {
      spawnNotification(
        "Správce souborů",
        "Tento soubor je moc velký na to aby byl uložen.",
      );
      console.log("File is too big to be saved. Error: " + e.toString());
    }
    var windowasjdh = document.querySelectorAll(".window");
    for (var i = 0; i < windowasjdh.length; i++) {
      if (windowasjdh[i].querySelector("#filemanageriframe") != undefined) {
        windowasjdh[i]
          .querySelector("#filemanageriframe")
          .contentWindow.FileManager.readFiles();
      }
    }
  },
  save: (location, file) => {
    let lastSlashIndex = location.lastIndexOf("/");
    let directory = location.substring(0, lastSlashIndex + 1);
    let filename = location.substring(lastSlashIndex + 1);
    var value = storage.getSync(directory);
    for (var i = 0; i < value.length; i++) {
      if (value[i][0] == filename) {
        var time = new Date().toString();
        value[i][1] = lengthInUtf8Bytes(file);
        value[i][3] = time;
        value[i][4] = file;
        break;
      }
    }
    try {
      storage.setSync(directory, value);
    } catch (e) {
      spawnNotification(
        "Správce souborů",
        "Tento soubor je moc velký na to aby byl uložen.",
      );
      console.log("File is too big to be saved. Error: " + e.toString());
    }
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
      "url(" + mainFileManager.getContent(location) + ")";
  },
  getContent: (location) => {
    try {
      locationsplit = location.split("/");
      namefile = locationsplit[locationsplit.length - 1];
      folder =
        removebyindex(locationsplit, locationsplit.length - 1).join("/") + "/";
      var stored = storage.getSync(folder);
      if (stored) {
        for (var i = 0; i < stored.length; i++) {
          if (stored[i][0] == namefile) {
            return stored[i][4];
          }
        }
      }
      return false;
    } catch {
      return false;
    }
  },
  getTextContent: (location) => {
    const content = mainFileManager.getContent(location);
    if (content === false) return false;
    return Base64.decode(content.split(",")[1]);
  },
  folderExist: (location) => {
    try {
      var stored = JSON.parse(localStorage.getItem("folders-uploaded"));
    } catch {
      return false;
    }
    if (stored == null) return false;
    for (var i = 0; i < stored.length; i++) {
      if (stored[i][1] + stored[i][0] == location) {
        return true;
      }
    }
    return false;
  },
  allFiles: (folder) => {
    if (folder != "/") folder = folder + "/";
    try {
      var stored = storage.getSync(folder);
    } catch {
      return new Array();
    }
    return stored;
  },
  getFile: (location) => {
    let lastSlashIndex = location.lastIndexOf("/");
    let directory = location.substring(0, lastSlashIndex + 1);
    let filename = location.substring(lastSlashIndex + 1);
    var stored = storage.getSync(directory);
    for (var i = 0; i < stored.length; i++) {
      if (stored[i][0] == filename) {
        return stored[i];
      }
    }
  },
  createAppShortCut: (appName, fileName) => {
    var stored = storage.getSync("/");
    const time = new Date().toString();
    const content = "open:" + appName;

    if (mainFileManager.getContent("/" + fileName) == false) {
      stored.push([
        fileName,
        lengthInUtf8Bytes(content),
        "klindos/app",
        time,
        content,
        "/",
      ]);
      storage.setSync("/", stored);

      var windowasjdh = document.querySelectorAll(".window");
      for (var i = 0; i < windowasjdh.length; i++) {
        if (windowasjdh[i].querySelector("#filemanageriframe") != undefined) {
          windowasjdh[i]
            .querySelector("#filemanageriframe")
            .contentWindow.FileManager.readFiles();
        }
      }
    } else {
      mainFileManager.createAppShortCut(appName, fileName + "x");
    }
  },
  createFile: ({
    name,
    type = "text/plain",
    content = "",
    parentFolder = "/",
  }) => {
    if (mainFileManager.fileExists(name + parentFolder)) {
      name = "x" + name;
      mainFileManager.createFile({ name, type, content, parentFolder });
    } else {
      var array = storage.getSync(parentFolder);
      var add = [
        name,
        lengthInUtf8Bytes(content),
        type,
        new Date().toString(),
        content,
        parentFolder,
      ];
      array.push(add);
      storage.setSync(parentFolder, array);
      return add;
    }
  },
  fileExists: (path) =>
    mainFileManager.getContent(path) === false ? false : true,
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
  saveFromUri(uri, filename, parentFolder = "/", messages = true) {
    if (filename == null) {
      BPrompt.prompt("Vyberte název souboru", (n) => {
        mainFileManager.saveFromUri(uri, n);
      });
    } else if (mainFileManager.fileExists(parentFolder + filename)) {
      BPrompt.prompt(
        "Soubor se stejným názvem v kořenové složce již existuje. Vyberte nový název souboru",
        (n) => {
          mainFileManager.saveFromUri(uri, n);
        },
      );
    } else {
      let base64ContentArray = uri.split(",");
      try {
        var mimeType = base64ContentArray[0].match(
          /[^:\s*]\w+\/[\w-+\d.]+(?=[;| ])/,
        )[0];
      } catch {
        // Set default mimetype
        var mimeType = null;
      }
      var type = mimeType;

      function x() {
        var stored = storage.getSync(parentFolder);
        if (Object.keys(stored).length == 0) {
          stored = [];
        }
        stored.push([
          filename,
          lengthInUtf8Bytes(uri),
          type,
          new Date().toString(),
          uri,
          parentFolder,
        ]);
        try {
          storage.setSync(parentFolder, stored);
        } catch (e) {
          spawnNotification(
            "Správce souborů",
            "Není dostatek místa na úložišti. Více info <a href='https://www.gwtproject.org/doc/latest/DevGuideHtml5Storage.html'>zde</a>.",
          );
          console.log(
            "File is too big to be uploaded. Error message: " +
              e.toString(),
          );
        }
      }

      if (type == "text/plain") {
        var data = uri.split(",")[1];
        uri = decodeURIComponent(data);
        x();
      } else {
        x();
      }
      if (messages)
        spawnNotification("Stahování", "Soubor byl stažen do kořenové složky");
    }
  },
};
class File {
  constructor(file) {
    if (!file) throw new Error("File does not exist!");
    this.name = file[0];
    this.size = file[1];
    this.type = file[2];
    this.lastChange = file[3];
    this.content = file[4];
    this.parentFolder = file[5];
    this.fullPath = this.parentFolder + this.name;
  }
  decodeToArray() {
    return [
      this.name,
      this.size,
      this.type,
      this.lastChange,
      this.content,
      this.parentFolder,
    ];
  }
  open() {
    return mainFileManager.open(this.decodeToArray());
  }
  saveText(content) {
    const sdsa = `data:${this.type};base64,` + Base64.encode(content);
    this.content = sdsa;
    mainFileManager.save(this.fullPath, sdsa);
  }
  save(dataUri) {
    this.content = dataUri;
    mainFileManager.save(this.fullPath, dataUri);
  }
  remove() {
    var value = storage.getSync(this.parentFolder);
    for (var i = 0; i < value.length; i++) {
      if (value[i][5] + value[i][0] === this.fullPath) {
        var newarray = removebyindex(value, i);
        storage.setSync(this.parentFolder, newarray);
        return true;
      }
    }
    throw new Error("File does not exist!");
  }
}
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
