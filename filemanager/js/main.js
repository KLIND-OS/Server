var infolder = "/";
var storage = parent.storage;
function lengthInUtf8Bytes(str) {
  var m = encodeURIComponent(str).match(/%[89ABab]/g);
  return str.length + (m ? m.length : 0);
}

document.addEventListener(
  "contextmenu",
  function (e) {
    if (!selectmode && !folderselect) {
      if (e.target.classList == "element") {
        rightclickad = document.querySelector(".rightclick");
        rightclickad.setAttribute("idel", e.target.getAttribute("idel"));
        rightclickad.style.left = e.pageX + "px";
        rightclickad.style.top = e.pageY + "px";
        rightclickad.style.display = "block";
      } else if (e.target.parentElement.classList == "element") {
        rightclickad = document.querySelector(".rightclick");
        rightclickad.setAttribute(
          "idel",
          e.target.parentElement.getAttribute("idel"),
        );
        rightclickad.style.left = e.pageX + "px";
        rightclickad.style.top = e.pageY + "px";
        rightclickad.style.display = "block";
      } else if (e.target.classList == "elmnt") {
        rightclickad = document.querySelector(".rightclicktwo");
        rightclickad.setAttribute(
          "idel",
          e.target.querySelector("p").innerHTML,
        );
        rightclickad.style.left = e.pageX + "px";
        rightclickad.style.top = e.pageY + "px";
        rightclickad.style.display = "block";
      } else if (e.target.parentElement.classList == "elmnt") {
        rightclickad = document.querySelector(".rightclicktwo");
        rightclickad.setAttribute(
          "idel",
          e.target.parentElement.querySelector("p").innerHTML,
        );
        rightclickad.style.left = e.pageX + "px";
        rightclickad.style.top = e.pageY + "px";
        rightclickad.style.display = "block";
      } else if (e.target.classList.contains("main")) {
        rightclickad = document.querySelector(".rightclickthree");
        rightclickad.style.left = e.pageX + "px";
        rightclickad.style.top = e.pageY + "px";
        rightclickad.style.display = "block";
      }
    }
    e.preventDefault();
  },
  false,
);

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
  if (!document.querySelector(".rightclick").contains(e.target)) {
    document.querySelector(".rightclick").style.display = "none";
  }
  if (!document.querySelector(".rightclicktwo").contains(e.target)) {
    document.querySelector(".rightclicktwo").style.display = "none";
  }
  if (!document.querySelector(".rightclickthree").contains(e.target)) {
    document.querySelector(".rightclickthree").style.display = "none";
  }
});
var FileManager = {
  readFiles: async () => {
    if (selectmode) {
      document.querySelector(".main").innerHTML =
        "<header><p>" +
        parent.Localization.getString("file_manager") +
        " <span>" +
        infolder +
        "</span></p></header>";
    } else if (folderselect) {
      document.querySelector(".main").innerHTML =
        "<header><p>" +
        parent.Localization.getString("file_manager") +
        " <span>" +
        infolder +
        "</span></p><div class=\"secondelement\" onclick=\"FileManager.createFolder();\"></div></header>";
    } else {
      document.querySelector(".main").innerHTML =
        "<header><p>" +
        parent.Localization.getString("file_manager") +
        " <span>" +
        infolder +
        "</span></p><div class=\"secondelement\" onclick=\"FileManager.createFolder();\"></div><div class=\"thirdelement\" onclick=\"FileManager.createFile();\"></div><div class=\"fourthelement\" onclick=\"FileManager.readFiles();\"></div></header>";
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
          let element = document.createElement("div");
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
          let element = document.createElement("div");
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
  openFile: async (isdd, ignorepreference = false) => {
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
              parent.Localization.getString("file_manager"),
              parent.Localization.getString("file_or_folder_not_exist"),
            );
          }
        }
        return;
      }
      parent.mainFileManager.open(infolder, isdd, ignorepreference);
    } else if (!folderselect) {
      const path = infolder + isdd;
      var index = window.location.href.split("index=")[1];
      parent.openGetFile[index][1]["success"](path);
      var element = parent.openGetFile[index][0].querySelector(".close");
      parent.openGetFile = removebyindex(parent.openGetFile, index);
      parent.windows.close(element, "filemanager");
    }
  },
  remove: (filename) => {
    parent.FileLocker.fullTest(infolder + filename);
    parent.BPrompt.confirm(
      parent.Localization.getString("do_you_really_file_remove"),
      async (res) => {
        if (!res) return;
        const path = parent.LowLevelApi.filesystem.path.join(
          parent.LowLevelApi.filesystem.os.homedir() + "/usrfiles" + infolder,
          filename,
        );

        await parent.LowLevelApi.filesystem.unlink(path);

        FileManager.readFiles();
      },
    );
  },
  removeFolder: (foldername) => {
    parent.FileLocker.fullTest(infolder + foldername);
    parent.BPrompt.confirm(
      parent.Localization.getString("do_you_really_folder_remove"),
      async (res) => {
        if (!res) return;
        const path = parent.LowLevelApi.filesystem.path.join(
          parent.LowLevelApi.filesystem.os.homedir() + "/usrfiles" + infolder,
          foldername,
        );

        await parent.LowLevelApi.filesystem.rm(path, { recursive: true });

        FileManager.readFiles();
      },
    );
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
      parent.Localization.getString("file_manager") +
      " <span>" +
      infolder +
      "</span>";
  },
  createFolder: () => {
    parent.BPrompt.prompt(
      parent.Localization.getString("enter_folder_name"),
      async (name) => {
        if (name == null || name.length == 0) {
          // Nothing
        } else {
          if (name.indexOf("/") > -1 || name.indexOf(".") > -1) {
            parent.spawnNotification(
              parent.Localization.getString("file_manager"),
              parent.Localization.getString("invalid_characters"),
            );
          } else {
            if (name.length > 100) {
              parent.spawnNotification(
                parent.Localization.getString("file_manager"),
                parent.Localization.getString("folder_name_longer"),
              );
              return;
            }
            if (await FileManager.folderExists(name)) {
              parent.spawnNotification(
                parent.Localization.getString("file_manager"),
                parent.Localization.getString("folder_with_same_name"),
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
      },
    );
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
  renameFolder: (foldername) => {
    parent.FileLocker.fullTest(infolder + foldername);
    const path = parent.LowLevelApi.filesystem.path.join(
      parent.LowLevelApi.filesystem.os.homedir() + "/usrfiles" + infolder,
      foldername,
    );
    parent.BPrompt.prompt(
      parent.Localization.getString("enter_new_folder_name"),
      async (newname) => {
        if (newname == null || newname.length == 0 || newname == foldername) {
          // Ignore
        } else if (newname.length > 100) {
          parent.spawnNotification(
            parent.Localization.getString("file_manager"),
            parent.Localization.getString("folder_name_longer"),
          );
        } else if (newname.includes("/") || newname.includes("\\")) {
          parent.spawnNotification(
            parent.Localization.getString("file_manager"),
            parent.Localization.getString("invalid_characters"),
          );
        } else if (await FileManager.folderExists(newname)) {
          parent.spawnNotification(
            parent.Localization.getString("file_manager"),
            parent.Localization.getString("folder_with_same_name"),
          );
        } else {
          const newpath = parent.LowLevelApi.filesystem.path.join(
            parent.LowLevelApi.filesystem.os.homedir() + "/usrfiles" + infolder,
            newname,
          );
          await parent.LowLevelApi.filesystem.rename(path, newpath);
          FileManager.readFiles();
        }
      },
      foldername,
    );
  },
  rename: async (filename) => {
    parent.FileLocker.fullTest(infolder + filename);
    const path = parent.LowLevelApi.filesystem.path.join(
      parent.LowLevelApi.filesystem.os.homedir() + "/usrfiles" + infolder,
      filename,
    );
    parent.BPrompt.prompt(
      parent.Localization.getString("enter_new_file_name"),
      async (newname) => {
        if (newname == null || newname.length == 0 || newname == filename) {
          // Ignore
        } else if (newname.length > 100) {
          parent.spawnNotification(
            parent.Localization.getString("file_manager"),
            parent.Localization.getString("file_name_longer"),
          );
        } else if (newname.indexOf("/") > -1 || newname.indexOf("\\") > -1) {
          parent.spawnNotification(
            parent.Localization.getString("file_manager"),
            parent.Localization.getString("invalid_characters_file"),
          );
        } else if (await FileManager.fileExist(newname)) {
          parent.spawnNotification(
            parent.Localization.getString("file_manager"),
            parent.Localization.getString("file_with_same_name"),
          );
        } else {
          const newpath = parent.LowLevelApi.filesystem.path.join(
            parent.LowLevelApi.filesystem.os.homedir() + "/usrfiles" + infolder,
            newname,
          );
          await parent.LowLevelApi.filesystem.rename(path, newpath);
          FileManager.readFiles();
        }
      },
      filename,
    );
  },
  copy: (filename) => {
    const path = parent.LowLevelApi.filesystem.path.join(
      parent.LowLevelApi.filesystem.os.homedir() + "/usrfiles" + infolder,
      filename,
    );
    const klindospath = parent.LowLevelApi.filesystem.path.join(
      infolder,
      filename,
    );
    clipboard = [path, filename, false, klindospath];
    parent.spawnNotification(
      parent.Localization.getString("file_manager"),
      parent.Localization.getString("copy_message"),
    );
  },
  copyFolder: (foldername) => {
    const path = parent.LowLevelApi.filesystem.path.join(
      parent.LowLevelApi.filesystem.os.homedir() + "/usrfiles" + infolder,
      foldername,
    );
    const klindospath = parent.LowLevelApi.filesystem.path.join(
      infolder,
      foldername,
    );

    clipboard = [path, foldername, true, klindospath];
    parent.spawnNotification(
      parent.Localization.getString("file_manager"),
      parent.Localization.getString("copy_message"),
    );
  },
  paste: async () => {
    if (clipboard != undefined) {
      if (clipboard[2]) {
        if (await FileManager.folderExists(clipboard[1])) {
          parent.BPrompt.prompt(
            parent.Localization.getString("folder_exists_new_name"),
            async (newname) => {
              if (newname != "" && newname != null) {
                clipboard[1] = newname;
                await FileManager.paste();
              }
            },
            clipboard[1],
          );
        } else {
          const bypass = parent.FileLocker.add(clipboard[3]);
          const destinationPath = parent.LowLevelApi.filesystem.path.join(
            parent.LowLevelApi.filesystem.os.homedir() + "/usrfiles" + infolder,
            clipboard[1],
          );
          const progressBar = new parent.window.DownloadStatus(clipboard[1]);
          progressBar.customMessage(parent.Localization.getString("copying"));
          parent.LowLevelApi.filesystem.fsExtra.copy(
            clipboard[0],
            destinationPath,
            (err) => {
              if (err) {
                throw new Error("Error occured!");
              }
              progressBar.finish();
              FileManager.readFiles();
              parent.FileLocker.remove(clipboard[3], bypass);
            },
          );
        }

        return;
      }

      var newclipboard = clipboard;
      if (await FileManager.fileExist(newclipboard[1])) {
        parent.BPrompt.prompt(
          parent.Localization.getString("file_exists_new_name"),
          async (newname) => {
            if (newname != "" && newname != null) {
              clipboard[1] = newname;
              await FileManager.paste();
            }
          },
          newclipboard[1],
        );
      } else {
        const bypass = parent.FileLocker.add(clipboard[3]);
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
          parent.FileLocker.remove(clipboard[3], bypass);
        });
      }
    }
  },
  properties: (name) => {
    const path = parent.LowLevelApi.filesystem.path.join(infolder, name);

    parent.mainFileManager.properties(path);
  },
  createFile: () => {
    parent.BPrompt.prompt(
      parent.Localization.getString("enter_file_name"),
      async (name) => {
        if (!(name == null || name.length == 0)) {
          if (await FileManager.fileExist(name)) {
            parent.spawnNotification(
              parent.Localization.getString("file_manager"),
              parent.Localization.getString("file_with_same_name"),
            );
          } else {
            if (name.length > 100) {
              parent.spawnNotification(
                parent.Localization.getString("file_manager"),
                parent.Localization.getString("file_name_longer"),
              );
            } else {
              if (name.indexOf("/") > -1 || name.indexOf("\\") > -1) {
                parent.spawnNotification(
                  parent.Localization.getString("file_manager"),
                  parent.Localization.getString("invalid_characters_file"),
                );
              } else {
                const path = parent.LowLevelApi.filesystem.path.join(
                  parent.LowLevelApi.filesystem.os.homedir() +
                    "/usrfiles" +
                    infolder,
                  name,
                );

                parent.LowLevelApi.filesystem.fs.open(path, "w", () => {
                  FileManager.readFiles();
                });
              }
            }
          }
        }
      },
    );
  },
  copyPath: (name) => {
    var path = infolder + name;
    parent.spawnNotification(
      parent.Localization.getString("file_manager"),
      parent.Localization.getString("path") + ": " + path,
    );
  },
  selectMode: () => {
    selectmode = true;
  },
  folderSelect: () => {
    folderselect = true;
    document.querySelector(".folderselect").style.display = "flex";
  },
  addShortcut: (idel) => {
    var fun = `try{mainFileManager.open('${infolder}', '${idel}')}catch {spawnNotification(Localization.getString("file_manager"),Localization.getString("file_not_found"))}`;
    parent.DesktopIcons.add({ run: fun, icon: "filemanager/images/file.png" });
  },
  createShortcut: () => {
    parent.BPrompt.prompt(
      parent.Localization.getString("enter_shortcut_name"),
      async (name) => {
        if (!(name == null || name.length == 0)) {
          if (await FileManager.fileExist(name + ".lnk")) {
            parent.spawnNotification(
              parent.Localization.getString("file_manager"),
              parent.Localization.getString("file_with_same_name"),
            );
          } else {
            if (name.length > 100) {
              parent.spawnNotification(
                parent.Localization.getString("file_manager"),
                parent.Localization.getString("file_name_longer"),
              );
            } else {
              if (name.indexOf("/") > -1 || name.indexOf("\\") > -1) {
                parent.spawnNotification(
                  parent.Localization.getString("file_manager"),
                  parent.Localization.getString("invalid_characters_file"),
                );
              } else {
                setTimeout(() => {
                  parent.BPrompt.prompt(
                    parent.Localization.getString("create_shortcut_path"),
                    async (filepath) => {
                      const path = parent.LowLevelApi.filesystem.path.join(
                        parent.LowLevelApi.filesystem.os.homedir() +
                          "/usrfiles",
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
      },
    );
  },
  zipFolder: async (folder) => {
    parent.spawnNotification(
      parent.Localization.getString("file_manager"),
      parent.Localization.getString("started_zipping"),
    );
    const exec = parent.LowLevelApi.filesystem.promisify(
      parent.LowLevelApi.child_process.exec,
    );
    const execPath = parent.LowLevelApi.filesystem.path.join(
      parent.LowLevelApi.filesystem.os.homedir(),
      "usrfiles",
      infolder,
      folder,
    );

    const zipPath = `${folder}.zip`;

    await exec(`zip -r '../${zipPath}' ./*`, {
      cwd: execPath,
    });

    parent.spawnNotification(
      parent.Localization.getString("file_manager"),
      parent.Localization.getString("zipping_done"),
    );

    FileManager.readFiles();
  },
  submitFolder: () => {
    var index = window.location.href.split("index=")[1];
    parent.openGetFile[index][1]["success"](infolder);
    var element = parent.openGetFile[index][0].querySelector(".close");
    parent.openGetFile = removebyindex(parent.openGetFile, index);
    parent.windows.close(element, "filemanager");
  },
};
var selectmode = false;
var folderselect = false;
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
if (window.location.href.indexOf("fileselect") > -1) {
  FileManager.selectMode();
}
if (window.location.href.includes("folderselect")) {
  FileManager.folderSelect();
}
