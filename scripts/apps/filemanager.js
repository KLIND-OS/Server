const FilemanagerAppList = [];

class FilemanagerApp {
  static clipboard;

  static startOptions = Object.freeze({
    DEFAULT: "DEFAULT",
    FILESELECT: "FILESELECT",
    FOLDERSELECT: "FOLDERSELECT",
  });

  static destroy(id) {
    FilemanagerAppList[id].destroy();
  }

  destroy() {
    this.states._rightClicks.forEach((e) => e.destroy());
    this.states._globalRight.destroy();
  }

  static staticTools = {
    addShortcutToDesktop: (folder, path) => {
      var fun = `try{mainFileManager.open('${folder}', '${path}')}catch {spawnNotification(Localization.getString("file_manager"),Localization.getString("file_not_found"))}`;
      DesktopIcons.add({
        run: fun,
        icon: "filemanager/images/file.png",
        name: folder
      });
    },
    addFolderShortcutToDesktop: (path) => {
      var fun = `windows.open("filemanager", { startFolder: "${path}" })`;
      DesktopIcons.add({
        run: fun,
        icon: "icons/folder.svg",
        name: path.replace(/\/$/, "").split("/").at(-1)
      });
    },
  };

  tools = {
    addShortcutToDesktop: (path) => {
      FilemanagerApp.staticTools.addShortcutToDesktop(
        this.states.currentFolder,
        path,
      );
    },
    recursiveCreateFolder: async (url) => {
      await LowLevelApi.filesystem.fs.promises.mkdir(url, {
        recursive: true,
      });
    },
    humanFileSize: function (bytes, si = false, dp = 1) {
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
    },
    lengthInUtf8Bytes: function (str) {
      var m = encodeURIComponent(str).match(/%[89ABab]/g);
      return str.length + (m ? m.length : 0);
    },
    removebyindex: function (array, index) {
      var temp = [];
      for (var i = 0; i < array.length; i++) {
        if (i != index) {
          temp.push(array[i]);
        }
      }
      return temp;
    },
    folderExists: async (name) => {
      const path = LowLevelApi.filesystem.path.join(
        LowLevelApi.filesystem.os.homedir() +
          "/usrfiles" +
          this.states.currentFolder,
        name,
      );

      return await LowLevelApi.filesystem.exists(path);
    },
    fileExist: async (name) => {
      const path = LowLevelApi.filesystem.path.join(
        LowLevelApi.filesystem.os.homedir() +
          "/usrfiles" +
          this.states.currentFolder,
        name,
      );

      return await LowLevelApi.filesystem.exists(path);
    },
  };

  async paste() {
    const clipboard = FilemanagerApp.clipboard;
    if (clipboard != undefined) {
      if (clipboard[2]) {
        if (await this.tools.folderExists(clipboard[1])) {
          BPrompt.prompt(
            Localization.getString("folder_exists_new_name"),
            async (newname) => {
              if (newname != "" && newname != null) {
                clipboard[1] = newname;
                await this.paste();
              }
            },
            clipboard[1],
          );
        } else {
          const bypass = FileLocker.add(clipboard[3]);
          const destinationPath = LowLevelApi.filesystem.path.join(
            LowLevelApi.filesystem.os.homedir() +
              "/usrfiles" +
              this.states.currentFolder,
            clipboard[1],
          );
          const progressBar = new DownloadStatus(clipboard[1]);
          progressBar.customMessage(Localization.getString("copying"));
          LowLevelApi.filesystem.fsExtra.copy(
            clipboard[0],
            destinationPath,
            (err) => {
              if (err) {
                throw new Error("Error occured!");
              }
              progressBar.finish();
              this.reloadWin();
              FileLocker.remove(clipboard[3], bypass);
            },
          );
        }

        return;
      }

      var newclipboard = clipboard;
      if (await this.tools.fileExist(newclipboard[1])) {
        BPrompt.prompt(
          Localization.getString("file_exists_new_name"),
          async (newname) => {
            if (newname != "" && newname != null) {
              clipboard[1] = newname;
              await this.paste();
            }
          },
          newclipboard[1],
        );
      } else {
        const bypass = FileLocker.add(clipboard[3]);
        const destinationPath = LowLevelApi.filesystem.path.join(
          LowLevelApi.filesystem.os.homedir() +
            "/usrfiles" +
            this.states.currentFolder,
          clipboard[1],
        );

        const source = LowLevelApi.filesystem.fs.createReadStream(clipboard[0]);
        const destination =
          LowLevelApi.filesystem.fs.createWriteStream(destinationPath);

        let bytesCopied = 0;
        const fileSize = (await LowLevelApi.filesystem.stat(clipboard[0])).size;
        const progressBar = new DownloadStatus(clipboard[1]);

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
          this.reloadWin();
          FileLocker.remove(clipboard[3], bypass);
        });
      }
    }
  }

  _addAside(name, iconsrc, url, asideNav) {
    const div = document.createElement("div");

    div.onclick = () => {
      this.redirect(url);
    };

    const icon = document.createElement("img");
    icon.className = "icon-f";
    icon.src = iconsrc;

    const span = document.createElement("span");
    span.textContent = name;

    div.appendChild(icon);
    div.appendChild(span);

    asideNav.appendChild(div);
  }

  _loadAside() {
    const asideNav = this.win.querySelector(".aside-nav");

    this._addAside(
      Localization.getString("home"),
      "icons/house.svg",
      "/",
      asideNav,
    );

    this._addAside(
      Localization.getString("downloads"),
      "icons/download.svg",
      "/Downloads/",
      asideNav,
    );
  }

  async redirect(newFolder) {
    if (newFolder == this.states.currentFolder) {
      return;
    }

    const path = LowLevelApi.filesystem.path.join(
      LowLevelApi.filesystem.os.homedir(),
      "usrfiles",
      newFolder,
    );

    if (!(await LowLevelApi.filesystem.exists(path))) {
      await this.tools.recursiveCreateFolder(path);
    }

    this.states.currentFolder = newFolder;
    await this.reloadWin();
  }

  _loadFooter() {
    if (this.states.type == FilemanagerApp.startOptions.DEFAULT) {
      return;
    }

    const footer = this.win.querySelector(".dynamicfooter");

    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.justifyContent = "space-between";
    container.style.padding = "0 10px";
    container.style.boxSizing = "border-box";

    if (this.states.type == FilemanagerApp.startOptions.FILESELECT) {
      const text = document.createElement("h2");
      text.textContent = Localization.getString("select_folder");
      container.appendChild(text);
    }

    if (this.states.type == FilemanagerApp.startOptions.FOLDERSELECT) {
      const text = document.createElement("h2");
      text.textContent = Localization.getString("select_folder");
      container.appendChild(text);

      const buttonsContainer = document.createElement("div");
      buttonsContainer.className = "buttons-container";

      const button = document.createElement("button");
      button.className = "button";
      button.textContent = Localization.getString("select_folder_act");
      button.style.width = "fit-content";
      button.style.padding = "0 5px";

      button.onclick = () => {
        this.states.callback(this.states.currentFolder);
        this.win.parentElement.querySelector(".headerclass .close").click();
      };

      buttonsContainer.appendChild(button);

      container.appendChild(buttonsContainer);
    }

    footer.appendChild(container);
    footer.style.display = "block";
  }

  __loadBredcrumbItem(breadcrumb, name, url, trail = false) {
    const liText = document.createElement("li");
    if (trail) {
      liText.classList.add("active");
    } else {
      let prevhov = false;
      let interval;

      FileDraggingAPI.registerDroppable(
        liText,
        true,
        true,
        Localization.getString("copy"),
        async (location, type) => {
          if (type == "file") {
            const path = LowLevelApi.filesystem.path.join(
              LowLevelApi.filesystem.os.homedir(),
              "/usrfiles",
              location,
            );

            FilemanagerApp.clipboard = [
              path,
              location.split("/").at(-1),
              false,
              location,
            ];

            await this.redirect(url);
            await this.paste();
          }
          if (type == "folder") {
            const path = LowLevelApi.filesystem.path.join(
              LowLevelApi.filesystem.os.homedir(),
              "/usrfiles",
              location,
            );

            FilemanagerApp.clipboard = [
              path,
              location.split("/").at(-2),
              true,
              location,
            ];

            await this.redirect(url);
            await this.paste();
          }
        },
        (e) => {
          if (e) {
            if (prevhov == false) {
              interval = setTimeout(() => {
                this.redirect(url);
                prevhov = false;
              }, 700);
            }
            prevhov = true;
          } else {
            if (prevhov == true) {
              clearInterval(interval);
            }
            prevhov = false;
          }
        },
      );
    }

    const p = document.createElement("p");
    p.textContent = name;
    p.setAttribute("cursor", "pointer");
    liText.appendChild(p);

    liText.onclick = async () => {
      await this.redirect(url);
    };

    const liImage = document.createElement("li");
    liImage.classList.add("sepa");
    liImage.setAttribute("role", "presentation");
    liImage.setAttribute("aria-hidden", "true");
    const img = document.createElement("img");
    img.src = "icons/chevron-right.svg";
    liImage.appendChild(img);

    breadcrumb.appendChild(liText);
    if (!trail) {
      breadcrumb.appendChild(liImage);
    }
  }

  _loadBreadcrumb(breadcrumb, items) {
    let url = "/";
    const newitems = items.filter((item) => item.trim().length !== 0);
    this.__loadBredcrumbItem(
      breadcrumb,
      Localization.getString("home"),
      url,
      newitems.length == 0,
    );

    newitems.forEach((text, index) => {
      url += text + "/";
      this.__loadBredcrumbItem(
        breadcrumb,
        text,
        url,
        !(index < newitems.length - 1),
      );
    });
  }

  _loadButton(buttonsDiv, iconsrc, func) {
    const button = document.createElement("button");
    button.classList.add("button");

    button.onclick = func;

    const icon = document.createElement("img");
    icon.src = iconsrc;
    button.appendChild(icon);

    buttonsDiv.appendChild(button);
  }

  __createFile() {
    BPrompt.prompt(Localization.getString("enter_file_name"), async (name) => {
      if (!(name == null || name.length == 0)) {
        if (await this.tools.fileExist(name)) {
          spawnNotification(
            Localization.getString("file_manager"),
            Localization.getString("file_with_same_name"),
          );
        } else {
          if (name.length > 100) {
            spawnNotification(
              Localization.getString("file_manager"),
              Localization.getString("file_name_longer"),
            );
          } else {
            if (name.indexOf("/") > -1 || name.indexOf("\\") > -1) {
              spawnNotification(
                Localization.getString("file_manager"),
                Localization.getString("invalid_characters_file"),
              );
            } else {
              const path = LowLevelApi.filesystem.path.join(
                LowLevelApi.filesystem.os.homedir() +
                  "/usrfiles" +
                  this.states.currentFolder,
                name,
              );

              LowLevelApi.filesystem.fs.open(path, "w", () => {
                this.reloadWin();
              });
            }
          }
        }
      }
    });
  }

  __createFolder() {
    BPrompt.prompt(
      Localization.getString("enter_folder_name"),
      async (name) => {
        if (name == null || name.length == 0) {
          // Nothing
        } else {
          if (name.indexOf("/") > -1 || name.indexOf(".") > -1) {
            spawnNotification(
              Localization.getString("file_manager"),
              Localization.getString("invalid_characters"),
            );
          } else {
            if (name.length > 100) {
              spawnNotification(
                Localization.getString("file_manager"),
                Localization.getString("folder_name_longer"),
              );
              return;
            }
            if (await this.tools.folderExists(name)) {
              spawnNotification(
                Localization.getString("file_manager"),
                Localization.getString("folder_with_same_name"),
              );
            } else {
              const path = LowLevelApi.filesystem.path.join(
                LowLevelApi.filesystem.os.homedir() +
                  "/usrfiles" +
                  this.states.currentFolder,
                name,
              );
              await LowLevelApi.filesystem.mkdir(path);

              await this.reloadWin();
            }
          }
        }
      },
    );
  }

  _loadButtons(buttonsDiv) {
    this._loadButton(buttonsDiv, "icons/reload.png", () => this.reloadWin());
    this._loadButton(buttonsDiv, "icons/file.png", () => this.__createFile());
    this._loadButton(buttonsDiv, "icons/folder.svg", () =>
      this.__createFolder(),
    );
  }

  async openFile(filename, ignorepreference = false) {
    if (this.states.type == FilemanagerApp.startOptions.FOLDERSELECT) {
      return;
    }

    if (this.states.type == FilemanagerApp.startOptions.FILESELECT) {
      const path = LowLevelApi.filesystem.path.join(
        this.states.currentFolder,
        filename,
      );
      this.states.callback(path);
      this.win.parentElement.querySelector(".headerclass .close").click();
      return;
    }

    if (filename.endsWith(".lnk")) {
      const systemPath = LowLevelApi.filesystem.path.join(
        LowLevelApi.filesystem.os.homedir() + "/usrfiles",
        this.states.currentFolder + filename,
      );
      const content = await LowLevelApi.filesystem.readFile(systemPath, "utf8");
      if (
        content.includes(":") &&
        content.split(":")[0].trim() == "open" &&
        content.split(":")[1] !== ""
      ) {
        var path = content.split(":")[1];
        if (await mainFileManager.fileExists(path)) {
          if (await mainFileManager.isFile(path)) {
            let lastIndex = path.lastIndexOf("/");
            let firstPart = path.substring(0, lastIndex);
            let secondPart = path.substring(lastIndex + 1);
            mainFileManager.open(firstPart, secondPart);
          } else {
            this.redirect(path.replace("/", "") + "/");
          }
        } else {
          spawnNotification(
            Localization.getString("file_manager"),
            Localization.getString("file_or_folder_not_exist"),
          );
        }
      }
      return;
    }

    mainFileManager.open(this.states.currentFolder, filename, ignorepreference);
  }

  async _loadFiles(filesDiv) {
    const items = await LowLevelApi.filesystem.readdir(
      LowLevelApi.filesystem.os.homedir() +
        "/usrfiles" +
        this.states.currentFolder,
    );

    try {
      for (const folder of items) {
        const folderPath = LowLevelApi.filesystem.path.join(
          LowLevelApi.filesystem.os.homedir() +
            "/usrfiles" +
            this.states.currentFolder,
          folder,
        );
        const folderStat = await LowLevelApi.filesystem.stat(folderPath);

        if (!folderStat.isFile()) {
          const element = document.createElement("div");
          element.setAttribute("cursor", "pointer");

          FileDraggingAPI.registerFolder(
            element,
            folder,
            LowLevelApi.filesystem.path.join(
              this.states.currentFolder,
              folder,
            ) + "/",
          );

          let interval;
          let prevhov = false;

          FileDraggingAPI.registerDroppable(
            element,
            true,
            true,
            Localization.getString("copy"),
            async (location, type) => {
              if (type == "file") {
                const path = LowLevelApi.filesystem.path.join(
                  LowLevelApi.filesystem.os.homedir(),
                  "/usrfiles",
                  location,
                );

                FilemanagerApp.clipboard = [
                  path,
                  location.split("/").at(-1),
                  false,
                  location,
                ];

                await this.redirect(this.states.currentFolder + folder + "/");
                await this.paste();
              }
              if (type == "folder") {
                const path = LowLevelApi.filesystem.path.join(
                  LowLevelApi.filesystem.os.homedir(),
                  "/usrfiles",
                  location,
                );

                FilemanagerApp.clipboard = [
                  path,
                  location.split("/").at(-2),
                  true,
                  location,
                ];

                await this.redirect(this.states.currentFolder + folder + "/");
                await this.paste();
              }
            },
            (e) => {
              if (e) {
                element.style.scale = "1.1";
                if (prevhov == false) {
                  interval = setTimeout(() => {
                    this.redirect(
                      LowLevelApi.filesystem.path.join(
                        this.states.currentFolder,
                        folder,
                      ) + "/",
                    );
                  }, 700);
                }
                prevhov = true;
              } else {
                element.style.scale = "";
                if (prevhov == true) {
                  clearInterval(interval);
                }
                prevhov = false;
              }
            },
          );

          element.onclick = () => {
            this.redirect(this.states.currentFolder + folder + "/");
          };

          const item = new ContextMenu(element, [
            new ContextMenuItem(Localization.getString("copy"), (folder) => {
              const path = LowLevelApi.filesystem.path.join(
                LowLevelApi.filesystem.os.homedir() +
                  "/usrfiles" +
                  this.states.currentFolder,
                folder.querySelector("h3").textContent,
              );
              const klindospath = LowLevelApi.filesystem.path.join(
                this.states.currentFolder,
                folder.querySelector("h3").textContent,
              );

              FilemanagerApp.clipboard = [
                path,
                folder.querySelector("h3").textContent,
                true,
                klindospath,
              ];
              spawnNotification(
                Localization.getString("file_manager"),
                Localization.getString("copy_message"),
              );
            }),
            new ContextMenuItem(Localization.getString("delete"), (folder) => {
              const foldername = folder.querySelector("h3").textContent;

              FileLocker.fullTest(this.states.currentFolder + foldername);
              BPrompt.confirm(
                Localization.getString("do_you_really_folder_remove"),
                async (res) => {
                  if (!res) return;
                  const path = LowLevelApi.filesystem.path.join(
                    LowLevelApi.filesystem.os.homedir() +
                      "/usrfiles" +
                      this.states.currentFolder,
                    foldername,
                  );

                  await LowLevelApi.filesystem.rm(path, {
                    recursive: true,
                  });

                  await this.reloadWin();
                },
              );
            }),
            new ContextMenuItem(Localization.getString("rename"), (folder) => {
              const foldername = folder.querySelector("h3").textContent;

              FileLocker.fullTest(this.states.currentFolder + foldername);
              const path = LowLevelApi.filesystem.path.join(
                LowLevelApi.filesystem.os.homedir() +
                  "/usrfiles" +
                  this.states.currentFolder,
                foldername,
              );
              BPrompt.prompt(
                Localization.getString("enter_new_folder_name"),
                async (newname) => {
                  if (
                    newname == null ||
                    newname.length == 0 ||
                    newname == foldername
                  ) {
                    // Ignore
                  } else if (newname.length > 100) {
                    spawnNotification(
                      Localization.getString("file_manager"),
                      Localization.getString("folder_name_longer"),
                    );
                  } else if (newname.includes("/") || newname.includes("\\")) {
                    spawnNotification(
                      Localization.getString("file_manager"),
                      Localization.getString("invalid_characters"),
                    );
                  } else if (await this.tools.folderExists(newname)) {
                    spawnNotification(
                      Localization.getString("file_manager"),
                      Localization.getString("folder_with_same_name"),
                    );
                  } else {
                    const newpath = LowLevelApi.filesystem.path.join(
                      LowLevelApi.filesystem.os.homedir() +
                        "/usrfiles" +
                        this.states.currentFolder,
                      newname,
                    );
                    await LowLevelApi.filesystem.rename(path, newpath);
                    await this.reloadWin();
                  }
                },
                foldername,
              );
            }),
            new ContextMenuItem(
              Localization.getString("add_to_zip"),
              async (folder) => {
                spawnNotification(
                  Localization.getString("file_manager"),
                  Localization.getString("started_zipping"),
                );
                const exec = LowLevelApi.filesystem.promisify(
                  LowLevelApi.child_process.exec,
                );
                const execPath = LowLevelApi.filesystem.path.join(
                  LowLevelApi.filesystem.os.homedir(),
                  "usrfiles",
                  this.states.currentFolder,
                  folder.querySelector("h3").textContent,
                );

                const zipPath = `${folder.querySelector("h3").textContent}.zip`;

                await exec(`zip -r '../${zipPath}' ./*`, {
                  cwd: execPath,
                });

                spawnNotification(
                  Localization.getString("file_manager"),
                  Localization.getString("zipping_done"),
                );

                await this.reloadWin();
              },
            ),
          ]);

          this.states._rightClicks.push(item);

          const icon = document.createElement("img");
          icon.src = "icons/folder.svg";
          icon.setAttribute("cursor", "pointer");
          element.appendChild(icon);

          const name = document.createElement("h3");
          name.textContent = folder;
          name.setAttribute("cursor", "pointer");
          element.appendChild(name);

          filesDiv.appendChild(element);
        }
      }

      if (this.states.type == FilemanagerApp.startOptions.FOLDERSELECT) {
        return;
      }
      for (const file of items) {
        const filePath = LowLevelApi.filesystem.path.join(
          LowLevelApi.filesystem.os.homedir() +
            "/usrfiles" +
            this.states.currentFolder,
          file,
        );
        const fileStat = await LowLevelApi.filesystem.stat(filePath);

        if (fileStat.isFile()) {
          const element = document.createElement("div");
          element.setAttribute("cursor", "pointer");

          FileDraggingAPI.registerFile(
            element,
            file,
            LowLevelApi.filesystem.path.join(this.states.currentFolder, file),
          );

          const item = new ContextMenu(element, [
            new ContextMenuItem(Localization.getString("copy"), (file) => {
              const filename = file.querySelector("h3").textContent;
              const path = LowLevelApi.filesystem.path.join(
                LowLevelApi.filesystem.os.homedir() +
                  "/usrfiles" +
                  this.states.currentFolder,
                filename,
              );
              const klindospath = LowLevelApi.filesystem.path.join(
                this.states.currentFolder,
                filename,
              );
              FilemanagerApp.clipboard = [path, filename, false, klindospath];
              spawnNotification(
                Localization.getString("file_manager"),
                Localization.getString("copy_message"),
              );
            }),
            this.states.type != FilemanagerApp.startOptions.DEFAULT
              ? null
              : new ContextMenuItem(
                Localization.getString("open_with"),
                (file) => {
                  this.openFile(file.querySelector("h3").textContent, true);
                },
              ),
            new ContextMenuItem(Localization.getString("copy_path"), (file) => {
              var path =
                this.states.currentFolder +
                file.querySelector("h3").textContent;
              spawnNotification(
                Localization.getString("file_manager"),
                Localization.getString("path") + ": " + path,
              );
            }),
            new ContextMenuItem(
              Localization.getString("add_shortcut_to_desktop"),
              (file) => {
                this.tools.addShortcutToDesktop(
                  file.querySelector("h3").textContent,
                );
              },
            ),
            new ContextMenuItem(Localization.getString("rename"), (file) => {
              const filename = file.querySelector("h3").textContent;
              FileLocker.fullTest(this.states.currentFolder + filename);
              const path = LowLevelApi.filesystem.path.join(
                LowLevelApi.filesystem.os.homedir() +
                  "/usrfiles" +
                  this.states.currentFolder,
                filename,
              );
              BPrompt.prompt(
                Localization.getString("enter_new_file_name"),
                async (newname) => {
                  if (
                    newname == null ||
                    newname.length == 0 ||
                    newname == filename
                  ) {
                    // Ignore
                  } else if (newname.length > 100) {
                    spawnNotification(
                      Localization.getString("file_manager"),
                      Localization.getString("file_name_longer"),
                    );
                  } else if (
                    newname.indexOf("/") > -1 ||
                    newname.indexOf("\\") > -1
                  ) {
                    spawnNotification(
                      Localization.getString("file_manager"),
                      Localization.getString("invalid_characters_file"),
                    );
                  } else if (await this.tools.fileExist(newname)) {
                    spawnNotification(
                      Localization.getString("file_manager"),
                      Localization.getString("file_with_same_name"),
                    );
                  } else {
                    const newpath = LowLevelApi.filesystem.path.join(
                      LowLevelApi.filesystem.os.homedir() +
                        "/usrfiles" +
                        this.states.currentFolder,
                      newname,
                    );
                    await LowLevelApi.filesystem.rename(path, newpath);
                    await this.reloadWin();
                  }
                },
                filename,
              );
            }),
            new ContextMenuItem(Localization.getString("delete"), (file) => {
              const filename = file.querySelector("h3").textContent;
              FileLocker.fullTest(this.states.currentFolder + filename);
              BPrompt.confirm(
                Localization.getString("do_you_really_file_remove"),
                async (res) => {
                  if (!res) return;
                  const path = LowLevelApi.filesystem.path.join(
                    LowLevelApi.filesystem.os.homedir() +
                      "/usrfiles" +
                      this.states.currentFolder,
                    filename,
                  );

                  await LowLevelApi.filesystem.unlink(path);

                  await this.reloadWin();
                },
              );
            }),
            new ContextMenuItem(
              Localization.getString("properties"),
              (file) => {
                const path = LowLevelApi.filesystem.path.join(
                  this.states.currentFolder,
                  file.querySelector("h3").textContent,
                );

                mainFileManager.properties(path);
              },
            ),
          ]);

          this.states._rightClicks.push(item);

          element.onclick = () => {
            this.openFile(file);
          };

          const icon = document.createElement("img");
          icon.src = "icons/file.png";
          icon.setAttribute("cursor", "pointer");
          element.appendChild(icon);

          const name = document.createElement("h3");
          name.textContent = file;
          name.setAttribute("cursor", "pointer");
          element.appendChild(name);

          const small = document.createElement("small");
          small.textContent = this.tools.humanFileSize(fileStat.size, true);
          small.setAttribute("cursor", "pointer");
          element.appendChild(small);

          filesDiv.appendChild(element);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  resetWin() {
    // Reset breadcrumb
    const breadcrumb = this.win.querySelector(".breadcrumb-container nav ol");
    breadcrumb.innerHTML = "";

    // Reset files
    const filesList = this.win.querySelector(".files-list");
    filesList.innerHTML = "";

    // Reset right clicks
    this.states._rightClicks.forEach((e) => e.destroy());
    this.states._rightClicks = [];

    // Reset aside
    this.win.querySelector(".aside-nav").innerHTML = "";
  }

  async loadWin() {
    this._loadFooter();
    this._loadBreadcrumb(
      this.win.querySelector(".breadcrumb-container nav ol"),
      this.states.currentFolder.split("/"),
    );
    this._loadAside();
    await this._loadFiles(this.win.querySelector(".files-list"));
  }

  async reloadWin() {
    if (this.states.loading) {
      return;
    }

    this.states.loading = true;
    this.resetWin();
    await this.loadWin();
    this.states.loading = false;
  }

  registerGlobalRight() {
    const element = this.win.querySelector(".files-list").parentElement;

    const item = new ContextMenu(element, [
      new ContextMenuItem(Localization.getString("create_file"), () =>
        this.__createFile(),
      ),
      new ContextMenuItem(Localization.getString("create_folder"), () =>
        this.__createFolder(),
      ),
      new ContextMenuItem(Localization.getString("paste"), () => this.paste()),
      new ContextMenuItem(Localization.getString("create_shortcut"), () => {
        BPrompt.prompt(
          Localization.getString("enter_shortcut_name"),
          async (name) => {
            if (!(name == null || name.length == 0)) {
              if (await this.tools.fileExist(name + ".lnk")) {
                spawnNotification(
                  Localization.getString("file_manager"),
                  Localization.getString("file_with_same_name"),
                );
              } else {
                if (name.length > 100) {
                  spawnNotification(
                    Localization.getString("file_manager"),
                    Localization.getString("file_name_longer"),
                  );
                } else {
                  if (name.indexOf("/") > -1 || name.indexOf("\\") > -1) {
                    spawnNotification(
                      Localization.getString("file_manager"),
                      Localization.getString("invalid_characters_file"),
                    );
                  } else {
                    setTimeout(() => {
                      BPrompt.prompt(
                        Localization.getString("create_shortcut_path"),
                        async (filepath) => {
                          const path = LowLevelApi.filesystem.path.join(
                            LowLevelApi.filesystem.os.homedir() + "/usrfiles",
                            this.states.currentFolder + name + ".lnk",
                          );
                          await LowLevelApi.filesystem.writeFile(
                            path,
                            "open:" + filepath,
                            { encoding: "utf8" },
                          );

                          await this.reloadWin();
                        },
                      );
                    }, 50);
                  }
                }
              }
            }
          },
        );
      }),
    ]);

    this.states._globalRight = item;
  }

  static async init(win, startType, callback, startFolder) {
    const el = new this(win);
    el.states.type = startType || this.startOptions.DEFAULT;
    if (callback) {
      el.states.callback = callback;
    }

    el.win.parentElement.dataset.id = FilemanagerAppList.length;
    await el.loadWin();
    el._loadButtons(win.querySelector(".buttons-container"));
    el.registerGlobalRight();

    FileDraggingAPI.registerDroppable(
      win.querySelector("main"),
      true,
      true,
      Localization.getString("copy"),
      async (location, type) => {
        if (type == "file") {
          const path = LowLevelApi.filesystem.path.join(
            LowLevelApi.filesystem.os.homedir(),
            "/usrfiles",
            location,
          );

          FilemanagerApp.clipboard = [
            path,
            location.split("/").at(-1),
            false,
            location,
          ];

          await el.paste();
        }
        if (type == "folder") {
          const path = LowLevelApi.filesystem.path.join(
            LowLevelApi.filesystem.os.homedir(),
            "/usrfiles",
            location,
          );

          FilemanagerApp.clipboard = [
            path,
            location.split("/").at(-2),
            true,
            location,
          ];

          await el.paste();
        }
      },
    );

    if (startFolder) {
      el.redirect(startFolder);
    }

    FilemanagerAppList.push(el);

    return el;
  }

  states = {
    currentFolder: "/",
    loading: false,
    _rightClicks: [],
    _globalRight: undefined,
    type: undefined,
    callback: undefined,
  };
  win;

  constructor(win) {
    // Do not use this constructor. Use static function init instead.
    this.win = win;
  }
}
