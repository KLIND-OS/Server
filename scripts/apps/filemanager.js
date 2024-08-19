class FilemanagerApp {
  static clipboard;

  tools = {
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

  async redirect(newFolder) {
    this.states.currentFolder = newFolder;
    await this.reloadWin();
  }

  __loadBredcrumbItem(breadcrumb, name, url, trail = false) {
    const liText = document.createElement("li");
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

  _loadButtons(buttonsDiv) {
    this._loadButton(buttonsDiv, "icons/reload.png", () => this.reloadWin());
    this._loadButton(buttonsDiv, "icons/file.png", () => {
      BPrompt.prompt(
        Localization.getString("enter_file_name"),
        async (name) => {
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
        },
      );
    });
    this._loadButton(buttonsDiv, "icons/folder.svg", () => {
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
    });
  }

  async openFile(filename, ignorepreference = false) {
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

          const item = new ContextMenu(element, [
            new ContextMenuItem(Localization.getString("copy"), (file) => {
              const filename = file.textContent;
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
            new ContextMenuItem(Localization.getString("open_with"), (file) => {
              this.openFile(file.querySelector("h3").textContent, true);
            }),
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
                var fun = `try{mainFileManager.open('${this.states.currentFolder}', '${file.querySelector("h3").textContent}')}catch {spawnNotification(Localization.getString("file_manager"),Localization.getString("file_not_found"))}`;
                DesktopIcons.add({
                  run: fun,
                  icon: "filemanager/images/file.png",
                });
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

                parent.mainFileManager.properties(path);
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
  }

  async loadWin() {
    this._loadBreadcrumb(
      this.win.querySelector(".breadcrumb-container nav ol"),
      this.states.currentFolder.split("/"),
    );
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

  static async init(win) {
    const el = new this(win);
    await el.loadWin();
    el._loadButtons(win.querySelector(".buttons-container"));
    el.registerGlobalRight();

    return el;
  }

  states = {
    currentFolder: "/",
    loading: false,
    _rightClicks: [],
    _globalRight: undefined,
  };
  win;

  constructor(win) {
    // Do not use this constructor. Use static function init instead.
    this.win = win;
  }
}
