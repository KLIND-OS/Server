var videofileids = [];

var windows = {
  shadowDom: undefined,
  lastSlotId: 0,
  list: {
    names: [
      "poznamky",
      "kalk",
      "stop",
      "nas",
      "brow",
      "ter",
      "player",
      "info",
      "kalen",
      "budik",
      "update",
      "nap",
      "faceset",
      "record",
      "filemanager",
      "fileproperties",
      "fileeditor",
      "zdroje",
      "about",
      "audioLevelEditor",
      "installapp",
      "procesy",
      "viewtext",
      "musicplayer",
      "cleaner",
      "emergencyMenu",
      "wordeditor",
      "sheetseditor",
      "diskmanager",
      "getstarted",
      "screenfilter",
      "imageeditor",
      "printermanager",
      "packageinstaller",
      "inputdevices",
      "logs",
      "nohuplogs",
      "unzip",
    ],
    classes: [
      ".poznamky",
      ".kalkulacka",
      ".stopky",
      ".nastaveni",
      ".browser",
      ".terminal",
      ".player",
      ".informationklindows",
      ".kalendar",
      ".budik",
      ".updateklind",
      ".napoveda",
      ".faceset",
      ".record",
      ".filemanager",
      ".fileproperties",
      ".fileeditor",
      ".zdroje",
      ".about",
      ".audioLevelEditor",
      ".installapp",
      ".procesy",
      ".viewtext",
      ".musicplayer",
      ".cleaner",
      ".emergencymenu",
      ".wordeditor",
      ".sheetseditor",
      ".diskmanager",
      ".getstarted",
      ".screenfilter",
      ".imageeditor",
      ".printermanager",
      ".packageinstaller",
      ".inputdevices",
      ".logs",
      ".nohuplogs",
      ".unzip",
    ],
    ikonadown: [
      ".poznamkyikonadown",
      ".kalkikonadown",
      ".stopikonadown",
      ".nasikonadown",
      ".browikonadown",
      ".terikonadown",
      ".playerikonadown",
      ".infoikonadown",
      ".kalenikonadown",
      ".budikikonadown",
      ".updateikonadown",
      ".napikonadown",
      ".facesetikonadown",
      ".recordikonadown",
      ".filemanagerikonadown",
      false,
      ".fileeditorikonadown",
      ".zdrojeikonadown",
      ".aboutikonadown",
      false,
      ".installappikonadown",
      ".procesyikonadown",
      false,
      ".musicplayerikonadown",
      ".cleanerikonadown",
      false,
      ".wordeditorikonadown",
      ".sheeteditorikonadown",
      ".diskmanagerikonadown",
      false,
      ".screenfilterikonadown",
      ".imageeditorikonadown",
      ".printermanagerikonadown",
      false,
      ".inputdevicesikonadown",
      ".logsikonadown",
      ".nohuplogsikonadown",
      false,
    ],
    focusedAction: [
      (win) => win.querySelector("textarea").focus(),
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],

    special: {
      info: [infoApp.loadInfo, false, false],
      filemanager: [
        (element, args) => {
          const win = element.querySelector(".filemanager-content");

          if (args && args.mode && args.callBack) {
            return FilemanagerApp.init(win, args.mode, args.callBack);
          }

          if (args && args.startFolder) {
            return FilemanagerApp.init(
              win,
              undefined,
              undefined,
              args.startFolder,
            );
          }
          FilemanagerApp.init(win);
        },
        (win) => {
          FilemanagerApp.destroy(win.dataset.id);
        },
        false,
      ],
      fileeditor: [
        async (element, args) => {
          var { path } = args;
          let type;
          if (!path.includes(".")) {
            type = "txt";
          } else {
            const parts = path.split(".");
            type = parts[parts.length - 1];
          }
          const bypass = FileLocker.add(path);
          const intervalID = setInterval(() => {
            FileLocker.continue(path);
          }, 2000);

          element.setAttribute("filelocation", path);
          element.setAttribute("intervalID", intervalID);
          element.setAttribute("bypass", bypass);

          if (type == "txt") {
            element.querySelector(".fileeditorimage").style.display = "none";
            element.querySelector(".fileeditortext").style.display = "block";
            element.querySelector(".fileeditorvideo").style.display = "none";
            element.querySelector(".fileeditoraudio").style.display = "none";
            element.querySelector(".filesavefileconfig").style.display =
              "block";
            element.querySelector(".imgwallpaperfileconfig").style.display =
              "none";

            const { size } = await mainFileManager.stat(path);
            if (size / (1024 * 1024) > 1) {
              BPrompt.confirm(
                Localization.getString("file_over_1mb"),
                async (response) => {
                  if (response) {
                    const content = await mainFileManager.getContent(
                      path,
                      "utf8",
                    );
                    element.querySelector("#textareafileeditorimage").value =
                      content;
                  } else {
                    clearInterval(intervalID);
                    FileLocker.remove(path, bypass);
                    element.querySelector(".headerclass .close").click();
                  }
                },
              );
              return;
            }

            const content = await mainFileManager.getContent(path, "utf8");
            element.querySelector("#textareafileeditorimage").value = content;
          } else if (
            ["jpg", "png", "gif", "svg", "webp", "ico"].includes(type)
          ) {
            element.querySelector(".fileeditorimage").style.display = "block";
            element.querySelector(".fileeditortext").style.display = "none";
            element.querySelector(".fileeditorvideo").style.display = "none";
            element.querySelector(".fileeditoraudio").style.display = "none";
            element.querySelector("#fileeditorimageimg").src =
              "http://localhost:9999" + path;
            element.querySelector(".filesavefileconfig").style.display = "none";
            element.querySelector(".imgwallpaperfileconfig").style.display =
              "block";
          } else if (
            [
              "mp4",
              "avi",
              "mov",
              "mkv",
              "wmv",
              "mpg",
              "mpeg",
              "webm",
              "3gp",
              "ogv",
            ].includes(type)
          ) {
            element.querySelector(".fileeditorimage").style.display = "none";
            element.querySelector(".fileeditortext").style.display = "none";
            element.querySelector(".filesavefileconfig").style.display = "none";
            element.querySelector(".fileeditoraudio").style.display = "none";
            element.querySelector(".fileeditorvideo").style.display = "flex";
            element.querySelector(".imgwallpaperfileconfig").style.display =
              "none";
            element
              .querySelector("video source")
              .setAttribute(
                "type",
                LowLevelApi.filesystem.mimeTypes.lookup(type),
              );
            element
              .querySelector("video source")
              .setAttribute("src", "http://localhost:9999" + path);
            const player = new Plyr(element.querySelectorAll("#player"), {
              iconUrl: "icons/plyr.svg",
              controls: [
                "play-large",
                "play",
                "progress",
                "current-time",
                "mute",
                "volume",
                "captions",
                "settings",
                "airplay",
                "fullscreen",
              ],
            });
            videofileids.push(player);
            element.setAttribute("plyr-id", videofileids.length - 1);
            element.setAttribute("file-type", "video");
            player.play();
          } else {
            element.querySelector(".fileeditorimage").style.display = "none";
            element.querySelector(".fileeditortext").style.display = "block";
            element.querySelector(".fileeditorvideo").style.display = "none";
            element.querySelector(".fileeditoraudio").style.display = "none";
            element.querySelector(".filesavefileconfig").style.display =
              "block";
            element.querySelector(".imgwallpaperfileconfig").style.display =
              "none";

            const { size } = await mainFileManager.stat(path);
            if (size / (1024 * 1024) > 1) {
              BPrompt.confirm(
                Localization.getString("file_over_1mb"),
                async (response) => {
                  if (response) {
                    const content = await mainFileManager.getContent(
                      path,
                      "utf8",
                    );
                    element.querySelector("#textareafileeditorimage").value =
                      content;
                  } else {
                    clearInterval(intervalID);
                    FileLocker.remove(path, bypass);
                    element.querySelector(".headerclass .close").click();
                  }
                },
              );
              return;
            }

            const content = await mainFileManager.getContent(path, "utf8");
            element.querySelector("#textareafileeditorimage").value = content;
          }
          if (localStorage.getItem("mode") == "dark") {
            element.querySelector("#textareafileeditorimage").style.color =
              "white";
          } else {
            element.querySelector("#textareafileeditorimage").style.color =
              "black";
          }
        },
        (win) => {
          const intervalID = win.getAttribute("intervalID");
          const path = win.getAttribute("filelocation");
          const bypass = win.getAttribute("bypass");

          clearInterval(intervalID);
          FileLocker.remove(path, bypass);

          if (win.getAttribute("file-type") == "video") {
            const windowId = win.getAttribute("plyr-id");
            videofileids[windowId].destroy();
            delete videofileids[windowId];
          }
        },
        false,
      ],
      brow: [
        (element, args) => {
          Browser.init(element);
          if (args) {
            setTimeout(() => {
              Browser.changeUrl(element, args, true);
              element.querySelector("#url").value = args;
            }, 300);
          }
        },
        false,
        false,
      ],
      installapp: [
        (element, args) => {
          CustomApp.loadWindow(element);
          if (args?.path) {
            CustomApp.loadFromPath(args.path);
          }
        },
        false,
        false,
      ],
      viewtext: [
        (element, args) => {
          if (args.text) {
            element.querySelector("textarea").value = args.text.toString();
          }
          if (args.title) {
            element.querySelector(
              ".window-header .headerclass span",
            ).textContent = args.title.toString();
          }
        },
        false,
        false,
      ],
      musicplayer: [
        (element, args) => {
          element.querySelector("iframe").src =
            "/music?filePath=" + encodeURIComponent(args.filePath);
        },
        false,
        false,
      ],
      cleaner: [(win) => Cleaner.load(win), false, false],
      ter: [
        (win, args) => {
          if (args && args.path) {
            var wind = win.querySelector("iframe").contentWindow;

            wind.addEventListener("DOMContentLoaded", () => {
              wind.sandbox.specialCommands(":run " + args.path);
            });
          }
        },
        false,
        false,
      ],
      wordeditor: [
        (win, args) => {
          if (!(args && args.path)) {
            throw new Error("File must be specified");
          }
          const { path } = args;
          const bypass = FileLocker.add(path);
          const intervalID = setInterval(() => {
            FileLocker.continue(path);
          }, 5000);
          win.setAttribute("filelocation", path);
          win.setAttribute("bypass", bypass);
          win.setAttribute("intervalID", intervalID);

          async function convertDataUriToHtml(path) {
            const binaryData = await mainFileManager.getContent(path);
            const arrayBuffer = Uint8Array.from(binaryData, (char) =>
              char.charCodeAt(0),
            );
            const html = await mammoth.convertToHtml({ arrayBuffer });
            return html.value;
          }

          let skin;

          if (localStorage.getItem("mode") == "dark") {
            skin = "oxide-dark";
          } else {
            skin = "oxide";
          }

          tinymce.init({
            selector: ".window.wordeditor .wordeditor-element",
            menubar: "edit insert format",
            plugins: "advlist autolink lists link image charmap anchor",
            toolbar:
              "fontselect fontsizeselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
            theme: "silver",
            skin: skin,
            resize: false,
            height: "calc(100% - 20px)",
            language: localStorage.getItem("lang") || "cs",
            setup: function (editor) {
              editor.on("init", async function () {
                const parts = path.split(".");
                const end = parts[parts.length - 1];
                if (end == "html") {
                  editor.setContent(
                    await mainFileManager.getContent(path, "utf8"),
                  );
                } else {
                  editor.setContent(await convertDataUriToHtml(path));
                }
              });
            },
          });
        },
        (win) => {
          const bypass = win.getAttribute("bypass");
          const intervalID = win.getAttribute("intervalID");
          const path = win.getAttribute("filelocation");

          FileLocker.remove(path, bypass);
          clearInterval(intervalID);
        },
        false,
      ],
      sheetseditor: [
        (win, args) => {
          if (args && args.path) {
            SheetsEditor.init(win, args.path);
          } else {
            throw new Error("File must be specified");
          }
        },
        (win) => SheetsEditor.close(win),
        false,
      ],
      diskmanager: [(win) => DiskManager.init(win), false, false],
      getstarted: [(win) => GetStarted.init(win), false, false],
      screenfilter: [(win) => ColorFilters.init(win), false, false],
      printermanager: [(win) => PrinterManagerApp.init(win), false, false],
      packageinstaller: [
        (win, args) => PackageInstaller.init(win, args),
        false,
        false,
      ],
      inputdevices: [(win) => InputDevices.init(win), false, false],
      update: [
        (win) => {
          LowLevelApi.Branch.getSelected((selectedBranch) => {
            LowLevelApi.Branch.getAvailable((availableBranches) => {
              const select = win.querySelector(".branchChoice");
              select.innerHTML = "";

              for (const branch of availableBranches) {
                const option = document.createElement("option");
                option.textContent = branch;
                option.value = branch;
                option.selected = selectedBranch == branch;
                select.appendChild(option);
              }
            });
          });
          win.querySelector(".branchChoice").onchange = () => {
            const value = win.querySelector(".branchChoice").value;
            LowLevelApi.Branch.setBranch(value, (response) => {
              if (response) {
                spawnNotification(
                  Localization.getString("branch_manager"),
                  Localization.getString("branch_updated"),
                );
              } else {
                spawnNotification(
                  Localization.getString("branch_manager"),
                  Localization.getString("error"),
                );
              }
            });
          };
        },
        (win) => Updates.closeWindow(win),
        false,
      ],
      logs: [(win) => Logs.init(win), (win) => Logs.close(win), false],
      nohuplogs: [
        (win) => Logs.initNohup(win),
        (win) => Logs.close(win),
        false,
      ],
      unzip: [(win, args) => UnZip.init(win, args.path), false, false],
      procesy: [(win) => Procesy.init(win), (win) => Procesy.end(win), false],
    },
    appIds: {},
  },

  load: () => {
    const shadowDom = document
      .querySelector(".oknapatrizde")
      .attachShadow({ mode: "open" });
    windows.shadowDom = shadowDom;
  },
  _createSlot: () => {
    const slot = document.createElement("slot");
    const name = "winslotid-" + ++windows.lastSlotId;
    slot.name = name;
    windows.shadowDom.appendChild(slot);

    return name;
  },
  open: (name, args) => {
    var location = windows.list.names.indexOf(name);
    var classofelement = windows.list.classes[location];
    if (classofelement == false) {
      error(
        "0x0000144",
        "App doesn't have any window.",
        "KLIND OS | Window Manager",
      );
    } else {
      var special = windows.list.special[name];
      var element = document
        .querySelector(".oknadisplaynone")
        .querySelector(classofelement);
      let newelement = element.cloneNode(true);
      newelement.classList.add("window");
      newelement.classList.add("openedwin");
      newelement.style.opacity = "0";
      newelement.style.scale = "0.9";
      newelement.setAttribute("name", name);

      newelement.slot = windows._createSlot();

      var resizeObserver = new ResizeObserver((e) => {
        const { target } = e[0];
        const width = target.offsetWidth;

        target.classList.remove(
          "view-sm",
          "view-md",
          "view-lg",
          "view-xl",
          "view-2xl",
        );

        if (width >= 1536) {
          target.classList.add("view-2xl");
        } else if (width >= 1280) {
          target.classList.add("view-xl");
        } else if (width >= 1024) {
          target.classList.add("view-lg");
        } else if (width >= 768) {
          target.classList.add("view-md");
        } else if (width >= 640) {
          target.classList.add("view-sm");
        }
      });
      resizeObserver.observe(newelement);

      document.querySelector(".oknapatrizde").appendChild(newelement);
      DraggableElements.reload();
      if (
        newelement.querySelector(".headerclass") &&
        newelement.getAttribute("notresizable") !== "true"
      ) {
        newelement
          .querySelector(".headerclass")
          .addEventListener("dblclick", (e) => {
            if (newelement.getAttribute("isFullscreen") == "true") {
              DraggableElements.windowSizing.default(newelement, e);
            } else {
              DraggableElements.windowSizing.full(newelement);
            }
          });
      }
      if (localStorage.getItem("mode") == "dark") {
        newelement.style.backgroundColor = "#3b3838";
        newelement.classList.add("black");
      } else {
        newelement.style.backgroundColor = "white";
        newelement.classList.remove("black");
      }
      newelement.style.opacity = "1";
      newelement.style.scale = "1";

      setTimeout(() => {
        ZIndexer.focus(newelement, true);
        StartMenu.close();
      });
      if (special != undefined && special[0] !== false) {
        special[0](newelement, args);
      }
      return newelement;
    }
  },
  close: async (element, name, event) => {
    if (event) {
      event.stopPropagation();
    }
    var el = element.parentElement.parentElement.parentElement;
    var special = windows.list.special[name];
    let returnValue;
    if (special != undefined && special[1] !== false) {
      returnValue = await special[1](el);
    } else {
      returnValue = undefined;
    }
    if (returnValue !== true) {
      el.style.scale = "0.9";
      el.style.opacity = "0";

      setTimeout(() => {
        el.assignedSlot.remove();
        el.remove();
        ZIndexer.current = undefined;
      }, 200);
    }
  },
  mini: (element, name, event) => {
    if (event) {
      event.stopPropagation();
    }
    var location = windows.list.names.indexOf(name);
    var special = windows.list.special[name];
    var ikonadown = windows.list.ikonadown[location];
    var mainElement = element.parentElement.parentElement.parentElement;
    if (ikonadown === false) {
      error(
        "0x0000142",
        "App doesn't support minimizing.",
        "KLIND OS | Window Manager",
      );
    } else {
      var icon = document.querySelector(".downiconsAppNone " + ikonadown);
      var newElement = icon.cloneNode(true);
      var key = windows.getRandomKey();
      windows.list.appIds[key] = mainElement;
      newElement.setAttribute("windowId", key);
      newElement.style.transform = "scale(0)";
      if (special != undefined && special[2] !== false) {
        special[2](mainElement);
      }
      var el = document.querySelector(".downiconsApps").appendChild(newElement);
      mainElement.style.opacity = "0";
      mainElement.style.scale = "0.9";

      setTimeout(() => {
        mainElement.classList.remove("openedwin");
      }, 200);
      setTimeout(() => {
        el.style.transform = "";
        el.addEventListener("click", () => {
          var appdiv = document.querySelector(".appdiv");
          appdiv.querySelector(".canvasSection").innerHTML = "";
          appdiv.style.display = "none";
        });
        el.addEventListener("mouseover", (e) => {
          if (localStorage.getItem("filePreview")) {
            var el = e.target;
            var id = el.getAttribute("windowId");
            var element = windows.list.appIds[id];
            var appdiv = document.querySelector(".appdiv");
            appdiv.querySelector(".canvasSection").innerHTML =
              "<div class=\"loading\">Loading&#8230;</div>";
            appdiv.querySelector("h1").textContent =
              element.querySelector(".headerclass span").textContent;
            var left = e.clientX - 150;
            if (left < 10) {
              appdiv.style.left = "10px";
            } else {
              appdiv.style.left = left + "px";
            }
            appdiv.style.display = "block";
            element.style.display = "block";
            element.style.opacity = "1";
            element.style.scale = "1";
            const oldinset = element.style.inset;
            element.style.inset = "auto";
            const oldboxshadow = element.style.boxShadow;
            element.style.boxShadow = "none";

            element
              .querySelectorAll(".ui-resizable-handle")
              .forEach((handle) => (handle.style.display = "none"));
            domtoimage.toPng(element).then((result) => {
              const image = document.createElement("img");
              image.src = result;
              image.style.height = "auto";
              image.style.width = "auto";
              image.style.maxHeight = "100%";
              image.style.maxWidth = "100%";
              image.style.borderRadius = "10px";
              element.style.display = "none";
              element.style.opacity = "0";
              element.style.scale = "0.9";
              element.style.inset = oldinset;
              element.style.boxShadow = oldboxshadow;
              element
                .querySelectorAll(".ui-resizable-handle")
                .forEach((handle) => (handle.style.display = ""));

              appdiv.querySelector(".canvasSection").innerHTML = "";
              appdiv.querySelector(".canvasSection").appendChild(image);
            });
          }
        });
        el.addEventListener("mouseout", () => {
          var appdiv = document.querySelector(".appdiv");
          appdiv.querySelector(".canvasSection").innerHTML = "";
          appdiv.style.display = "none";
        });
      });
    }
  },
  getRandomKey: () => {
    var number = Math.floor(Math.random() * 1000000);
    if (windows.list.appIds[number] == undefined) {
      return number;
    } else {
      return windows.getRandomKey();
    }
  },
  miniOpen: (_, thiselement) => {
    setTimeout(() => {
      var id = thiselement.getAttribute("windowId");
      var mainElement = windows.list.appIds[id];
      mainElement.classList.add("openedwin");
      setTimeout(() => {
        mainElement.style.opacity = "1";
        mainElement.style.scale = "1";
        thiselement.style.transform = "scale(0)";
        windows.list.appIds[id] = undefined;
        setTimeout(() => {
          thiselement.remove();

          mainElement.click();
        }, 200);
      }, 10);
    }, 150);
  },
};

var Apps = {};
