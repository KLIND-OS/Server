var infolder = "/";
var storage = parent.storage;
function lengthInUtf8Bytes(str) {
  var m = encodeURIComponent(str).match(/%[89ABab]/g);
  return str.length + (m ? m.length : 0);
}

document.addEventListener(
  "contextmenu",
  function (e) {
    if (!selectmode) {
      if (e.target.classList == "element") {
        rightclickad = document.querySelector(".rightclick");
        rightclickad.setAttribute("idel", e.target.getAttribute("idel"));
        rightclickad.style.left = e.clientX + "px";
        rightclickad.style.top = e.clientY + "px";
        rightclickad.style.display = "block";
      } else if (e.target.parentElement.classList == "element") {
        rightclickad = document.querySelector(".rightclick");
        rightclickad.setAttribute(
          "idel",
          e.target.parentElement.getAttribute("idel"),
        );
        rightclickad.style.left = e.clientX + "px";
        rightclickad.style.top = e.clientY + "px";
        rightclickad.style.display = "block";
      } else if (e.target.classList == "elmnt") {
        rightclickad = document.querySelector(".rightclicktwo");
        rightclickad.setAttribute(
          "idel",
          e.target.querySelector("p").innerHTML,
        );
        rightclickad.style.left = e.clientX + "px";
        rightclickad.style.top = e.clientY + "px";
        rightclickad.style.display = "block";
      } else if (e.target.parentElement.classList == "elmnt") {
        rightclickad = document.querySelector(".rightclicktwo");
        rightclickad.setAttribute(
          "idel",
          e.target.parentElement.querySelector("p").innerHTML,
        );
        rightclickad.style.left = e.clientX + "px";
        rightclickad.style.top = e.clientY + "px";
        rightclickad.style.display = "block";
      } else if (e.target.classList.contains("main")) {
        rightclickad = document.querySelector(".rightclickthree");
        rightclickad.style.left = e.clientX + "px";
        rightclickad.style.top = e.clientY + "px";
        rightclickad.style.display = "block";
      }
    }
    e.preventDefault();
  },
  false,
);

var parseExcel = function (file) {
  var reader = new FileReader();

  reader.onload = function (e) {
    var asdajksdhjasd = [];
    var data = e.target.result;
    var workbook = XLSX.read(data, {
      type: "binary",
    });

    workbook.SheetNames.forEach(function (sheetName) {
      var XL_row_object = XLSX.utils.sheet_to_row_object_array(
        workbook.Sheets[sheetName],
      );

      asdajksdhjasd.push(XL_row_object);
    });
    FileManager.uploadToLocalStorage(file, JSON.stringify(asdajksdhjasd));
    document.querySelector("#fileupload").value = "";
    FileManager.readFiles();
  };
  reader.onerror = function (ex) {
    console.log(ex);
  };

  reader.readAsBinaryString(file);
};
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
window.addEventListener("click", function (e) {
  if (document.querySelector(".rightclick").contains(e.target)) {
  } else {
    document.querySelector(".rightclick").style.display = "none";
  }
  if (document.querySelector(".rightclicktwo").contains(e.target)) {
  } else {
    document.querySelector(".rightclicktwo").style.display = "none";
  }
  if (document.querySelector(".rightclickthree").contains(e.target)) {
  } else {
    document.querySelector(".rightclickthree").style.display = "none";
  }
});
var FileManager = {
  readFiles: async () => {
    if (selectmode) {
      document.querySelector(".main").innerHTML =
        "<header><p>Správce Souborů <span>" + infolder + "</span></p></header>";
    } else {
      document.querySelector(".main").innerHTML =
        "<header><p>Správce Souborů <span>" +
        infolder +
        '</span></p><!--<div class="mainelement" onclick="FileManager.upload();"></div>--!><div class="secondelement" onclick="FileManager.createFolder();"></div><div class="thirdelement" onclick="FileManager.createFile();"></div><div class="fourthelement" onclick="FileManager.readFiles();"></div></header>';
    }
    if (infolder != "/") {
      var element = document.createElement("div");
      element.classList.add("elmnt");
      element.setAttribute("onclick", "FileManager.goto('..')");
      element.setAttribute("cursor", "pointer");
      element.innerHTML = "<p cursor='pointer'>..</p>";

      document.querySelector(".main").appendChild(element);
    }

    const items = await parent.LowLevelApi.filesystem.readdir(
      parent.LowLevelApi.filesystem.os.homedir() + "/usrfiles" + infolder,
    );

    for (const folder of items) {
      try {
        const folderPath = parent.LowLevelApi.filesystem.path.join(
          parent.LowLevelApi.filesystem.os.homedir() + "/usrfiles" + infolder,
          folder,
        );
        const folderStat = await parent.LowLevelApi.filesystem.stat(folderPath);

        if (!folderStat.isFile()) {
          var element = document.createElement("div");
          element.classList.add("elmnt");
          element.setAttribute(
            "onclick",
            "FileManager.goto('" + folder + "/')",
          );
          element.setAttribute("idel", folder);
          element.setAttribute("cursor", "pointer");
          element.innerHTML = "<p cursor='pointer'>" + folder + "</p>";

          document.querySelector(".main").appendChild(element);
        }
      } catch (e) {
        console.error(e);
      }
    }

    for (const file of items) {
      try {
        const filePath = parent.LowLevelApi.filesystem.path.join(
          parent.LowLevelApi.filesystem.os.homedir() + "/usrfiles" + infolder,
          file,
        );
        const fileStat = await parent.LowLevelApi.filesystem.stat(filePath);

        if (fileStat.isFile()) {
          var element = document.createElement("div");
          element.classList.add("element");
          element.setAttribute(
            "onclick",
            "FileManager.openFile(`" + file + "`)",
          );
          function removeLastFromString(str, substr) {
            var lastIndex = str.lastIndexOf(substr);
            if (lastIndex !== -1) {
              return str.substring(0, lastIndex);
            } else {
              return str;
            }
          }
          const displayname = removeLastFromString(file, ".lnk");
          element.setAttribute("idel", file);
          element.setAttribute("cursor", "pointer");
          element.innerHTML =
            "<p cursor='pointer'>" +
            displayname +
            "</p><span>" +
            humanFileSize(fileStat.size, true) +
            "</span>";

          document.querySelector(".main").appendChild(element);
        }
      } catch (e) {
        console.error(e);
      }
    }
  },
  openFile: async (isdd) => {
    if (!selectmode) {
      if (isdd.endsWith(".lnk")) {
        const systemPath = parent.LowLevelApi.filesystem.path.join(
          parent.LowLevelApi.filesystem.os.homedir() + "/usrfiles",
          infolder + isdd,
        );
        const content = await parent.LowLevelApi.filesystem.readFile(
          systemPath,
          "utf8",
        );
        if (
          content.includes(":") &&
          content.split(":")[0].trim() == "open" &&
          content.split(":")[1] !== ""
        ) {
          var path = content.split(":")[1];
          if (await parent.mainFileManager.fileExists(path)) {
            if (await parent.mainFileManager.isFile(path)) {
              let lastIndex = path.lastIndexOf("/");
              let firstPart = path.substring(0, lastIndex);
              let secondPart = path.substring(lastIndex + 1);
              parent.mainFileManager.open(firstPart, secondPart);
            } else {
              FileManager.goto(path.replace("/", "") + "/");
            }
          } else {
            parent.spawnNotification(
              "Správce souborů",
              "Soubor nebo složka neexistuje!",
            );
          }
        }
        return;
      }
      parent.mainFileManager.open(infolder, isdd);
    } else {
      const path = infolder + isdd;
      var index = window.location.href.split("index=")[1];
      parent.openGetFile[index][1]["success"](path);
      var element = parent.openGetFile[index][0].querySelector(".close");
      parent.openGetFile = removebyindex(parent.openGetFile, index);
      parent.windows.close(element, "filemanager");
    }
  },
  remove: async (filename) => {
    const path = parent.LowLevelApi.filesystem.path.join(
      parent.LowLevelApi.filesystem.os.homedir() + "/usrfiles" + infolder,
      filename,
    );

    await parent.LowLevelApi.filesystem.unlink(path);

    FileManager.readFiles();
  },
  removeFolder: async (foldername) => {
    const path = parent.LowLevelApi.filesystem.path.join(
      parent.LowLevelApi.filesystem.os.homedir() + "/usrfiles" + infolder,
      foldername,
    );

    await parent.LowLevelApi.filesystem.rm(path, { recursive: true });

    FileManager.readFiles();
  },
  goto: (folder) => {
    if (folder == "..") {
      nocasdjhuasd = infolder.split("/");
      for (var i = 0; i < nocasdjhuasd.length; i++) {
        nocasdjhuasd[i] += "/";
      }
      infolder = nocasdjhuasd.slice(0, -2).join("");
      FileManager.readFiles();
    } else {
      infolder += folder;
      FileManager.readFiles();
    }
    document.querySelector("header p").innerHTML =
      "Správce Souborů <span>" + infolder + "</span>";
  },
  createFolder: () => {
    parent.BPrompt.prompt("Zadejte název složky:", async (name) => {
      if (name == null || name.length == 0) {
        // Nothing
      } else {
        if (name.indexOf("/") > -1 || name.indexOf(".") > -1) {
          parent.spawnNotification(
            "Správce Souborů",
            "'/' a '.' jsou zakázané znaky!",
          );
        } else {
          if (await FileManager.folderExists(name)) {
            parent.spawnNotification(
              "Správce Souborů",
              "Složka se stejným názvem již v této složce existuje.",
            );
          } else {
            const path = parent.LowLevelApi.filesystem.path.join(
              parent.LowLevelApi.filesystem.os.homedir() +
                "/usrfiles" +
                infolder,
              name,
            );
            await parent.LowLevelApi.filesystem.mkdir(path);

            FileManager.readFiles();
          }
        }
      }
    });
  },
  folderExists: async (name) => {
    const path = parent.LowLevelApi.filesystem.path.join(
      parent.LowLevelApi.filesystem.os.homedir() + "/usrfiles" + infolder,
      name,
    );

    return await parent.LowLevelApi.filesystem.exists(path);
  },
  fileExist: async (name) => {
    const path = parent.LowLevelApi.filesystem.path.join(
      parent.LowLevelApi.filesystem.os.homedir() + "/usrfiles" + infolder,
      name,
    );

    return await parent.LowLevelApi.filesystem.exists(path);
  },
  rename: async (filename) => {
    const path = parent.LowLevelApi.filesystem.path.join(
      parent.LowLevelApi.filesystem.os.homedir() + "/usrfiles" + infolder,
      filename,
    );
    parent.BPrompt.prompt("Zadejte nové jméno souboru.", async (newname) => {
      if (newname == null || newname.length == 0) {
      } else if (newname.length > 100) {
        parent.spawnNotification(
          "Správce Souborů",
          "Název souborů nesmí být delší jak 100 znaků.",
        );
      } else if (newname.indexOf("/") > -1 || newname.indexOf("\\") > -1) {
        parent.spawnNotification(
          "Správce Souborů",
          "'/' a '\\' jsou zakázané znaky.",
        );
      } else if (await FileManager.fileExist(newname)) {
        parent.spawnNotification(
          "Správce Souborů",
          "Tento název souboru je již v této složce použit!",
        );
      } else {
        const newpath = parent.LowLevelApi.filesystem.path.join(
          parent.LowLevelApi.filesystem.os.homedir() + "/usrfiles" + infolder,
          newname,
        );
        await parent.LowLevelApi.filesystem.rename(path, newpath);
        FileManager.readFiles();
      }
    });
  },
  copy: (filename) => {
    const path = parent.LowLevelApi.filesystem.path.join(
      parent.LowLevelApi.filesystem.os.homedir() + "/usrfiles" + infolder,
      filename,
    );
    clipboard = [path, filename];
    parent.spawnNotification(
      "Správce Souborů",
      "Jděte do jakékoli složky a stiskněte CTRL + V pro vložení.",
    );
  },
  paste: async () => {
    if (clipboard != undefined) {
      var newclipboard = clipboard;
      if (await FileManager.fileExist(newclipboard[1])) {
        parent.BPrompt.prompt(
          "Soubor se stejným názvem již v této složce existuje. Zadejte nový název souboru.",
          async (newname) => {
            if (newname != "" && newname != null) {
              clipboard[1] = newname;
              await FileManager.paste();
            }
          },
        );
      } else {
        const destinationPath = parent.LowLevelApi.filesystem.path.join(
          parent.LowLevelApi.filesystem.os.homedir() + "/usrfiles" + infolder,
          clipboard[1],
        );

        const source = parent.LowLevelApi.filesystem.fs.createReadStream(
          clipboard[0],
        );
        const destination =
          parent.LowLevelApi.filesystem.fs.createWriteStream(destinationPath);

        let bytesCopied = 0;
        const fileSize = (
          await parent.LowLevelApi.filesystem.stat(clipboard[0])
        ).size;
        const progressBar = new parent.window.DownloadStatus(clipboard[1]);

        source.on("error", (err) => console.error("Error reading file:", err));
        destination.on("error", (err) =>
          console.error("Error writing file:", err),
        );

        source.on("data", (chunk) => {
          bytesCopied += chunk.length;
          const percentage = Math.floor((bytesCopied / fileSize) * 100);
          progressBar.updatePercentage(percentage);
        });

        source.pipe(destination);

        destination.on("finish", () => {
          progressBar.finish();
          FileManager.readFiles();
        });
      }
    }
  },
  properties: (name) => {
    const path = parent.LowLevelApi.filesystem.path.join(infolder, name);

    parent.mainFileManager.properties(path);
  },
  createFile: () => {
    parent.BPrompt.prompt("Vložte název souboru.", async (name) => {
      if (name == null || name.length == 0) {
      } else {
        if (await FileManager.fileExist(name)) {
          parent.spawnNotification(
            "Správce Souborů",
            "Soubor se stejným názvem už existuje.",
          );
        } else {
          if (name.length > 100) {
            parent.spawnNotification(
              "Správce Souborů",
              "Název souborů nesmí být delší jak 100 znaků.",
            );
          } else {
            if (name.indexOf("/") > -1 || name.indexOf("\\") > -1) {
              parent.spawnNotification(
                "Správce Souborů",
                "'/' a '\\' jsou zakázané znaky.",
              );
            } else {
              const path = parent.LowLevelApi.filesystem.path.join(
                parent.LowLevelApi.filesystem.os.homedir() +
                  "/usrfiles" +
                  infolder,
                name,
              );

              parent.LowLevelApi.filesystem.fs.open(path, "w", (err, file) => {
                FileManager.readFiles();
              });
            }
          }
        }
      }
    });
  },
  copyPath: (name) => {
    var path = infolder + name;
    parent.spawnNotification("Správce Souborů", "Cesta: " + path);
  },
  selectMode: () => {
    selectmode = true;
  },
  addShortcut: (idel) => {
    var fun = `try{mainFileManager.open('${infolder}', '${idel}')}catch {spawnNotification("Správce souborů","Tento soubor nebyl nalezen!")}`;
    parent.DesktopIcons.add({ run: fun, icon: "filemanager/images/file.png" });
  },
  createShortcut: () => {
    parent.BPrompt.prompt("Vložte název zástupce.", async (name) => {
      if (name == null || name.length == 0) {
      } else {
        if (await FileManager.fileExist(name + ".lnk")) {
          parent.spawnNotification(
            "Správce Souborů",
            "Soubor se stejným názvem už existuje.",
          );
        } else {
          if (name.length > 100) {
            parent.spawnNotification(
              "Správce Souborů",
              "Název souborů nesmí být delší jak 100 znaků.",
            );
          } else {
            if (name.indexOf("/") > -1 || name.indexOf("\\") > -1) {
              parent.spawnNotification(
                "Správce Souborů",
                "'/' a '\\' jsou zakázané znaky.",
              );
            } else {
              setTimeout(() => {
                parent.BPrompt.prompt(
                  "Vložte cestu k souboru ke kterému chcete přidat zástupce.",
                  async (filepath) => {
                    const path = parent.LowLevelApi.filesystem.path.join(
                      parent.LowLevelApi.filesystem.os.homedir() + "/usrfiles",
                      infolder + name + ".lnk",
                    );
                    await parent.LowLevelApi.filesystem.writeFile(
                      path,
                      "open:" + filepath,
                      { encoding: "utf8" },
                    );

                    FileManager.readFiles();
                  },
                );
              }, 50);
            }
          }
        }
      }
    });
  },
};
var selectmode = false;
var keysdown = [];
document.addEventListener("keydown", function (e) {
  keysdown.push(e.key);
  if (keysdown.indexOf("Control") > -1 && keysdown.indexOf("v") > -1) {
    keysdown.length = 0;
    FileManager.paste();
  }
});
document.addEventListener("keyup", function () {
  keysdown.length = 0;
});
var clipboard;
if (window.location.href.indexOf("dark") > -1) {
  document.querySelector(".main").classList.add("dark");
} else {
  document.querySelector(".main").classList.add("light");
}
if (window.location.href.indexOf("select") > -1) {
  FileManager.selectMode();
}
