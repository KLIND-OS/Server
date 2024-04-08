var videofileids = [];

var windows = {
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
      "reg",
      "kalen",
      "budik",
      "prevod",
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
      ".reg",
      ".kalendar",
      ".budik",
      ".prevodsys",
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
      ".regikonadown",
      ".kalenikonadown",
      ".budikikonadown",
      ".prevodikonadown",
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
    special: {
      poznamky: [
        (element) => {
          loadpoznamky(element);
        },
        () => {
          closepoznamkymenu();
          closepoznamkynas();
        },
        false,
      ],
      info: [infoApp.loadInfo, false, false],
      my: [
        (element) => {
          element.querySelector("#myaccount").innerHTML =
            localStorage.getItem("username");
        },
        false,
        false,
      ],
      filemanager: [
        (element, args) => {
          var url = "/filemanager/";
          if (localStorage.getItem("mode") == "dark") url += "?dark";

          if (args && args.mode == "select") {
            if (url.indexOf("?") == -1) url += "?select";
            else url += "&select";
            var index = openGetFile.length;
            openGetFile.push([element, args.callBack]);
            element
              .querySelector(".close")
              .setAttribute(
                "onclick",
                "openGetFile[" +
                  index +
                  "][1]['closed']();windows.close(this,'filemanager')",
              );
            element.querySelector(".mini").remove();
            element.querySelector(".headerclass span").textContent =
              "Vyberte soubor";
            url += "&index=" + index;
          }
          element.querySelector("#filemanageriframe").src = url;
        },
        false,
        false,
      ],
      fileeditor: [
        async (element, args) => {
          var { path } = args;
          if (!path.includes(".")) {
            var type = "txt";
          } else {
            const parts = path.split(".");
            var type = parts[parts.length - 1];
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
                "Tento soubor je větší jak 1MB. Tento soubor otevíráte v text editoru. Počítač se může zaseknout. Opravdu chcete tento soubor otevřít?",
                async (response) => {
                  if (response) {
                    const content = await mainFileManager.getTextContent(path);
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

            const content = await mainFileManager.getTextContent(path);
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
                "Tento soubor je větší jak 1MB. Tento soubor otevíráte v text editoru. Počítač se může zaseknout. Opravdu chcete tento soubor otevřít?",
                async (response) => {
                  if (response) {
                    const content = await mainFileManager.getTextContent(path);
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

            const content = await mainFileManager.getTextContent(path);
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
              ".widget-header .headerclass span",
            ).textContent = args.title.toString();
          }
        },
        false,
        false,
      ],
      musicplayer: [
        (element, args) => {
          element.querySelector("iframe").src =
            "/music?filePath=" + args.filePath;
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
          win.setAttribute("filelocation", path);

          async function convertDataUriToHtml(path) {
            const binaryData = await mainFileManager.getContent(path);

            const arrayBuffer = Uint8Array.from(binaryData, (char) =>
              char.charCodeAt(0),
            );

            const html = await mammoth.convertToHtml({ arrayBuffer });

            return html.value;
          }

          if (localStorage.getItem("mode") == "dark") {
            var skin = "oxide-dark";
          } else {
            var skin = "oxide";
          }

          tinymce.init({
            selector: ".window.wordeditor .wordeditor-element",
            height: "400px",
            menubar: "edit insert format",
            plugins: "advlist autolink lists link image charmap anchor",
            toolbar:
              "fontselect fontsizeselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
            theme: "silver",
            skin: skin,
            resize: false,
            height: "calc(100% - 20px)",
            language: "cs",
            setup: function (editor) {
              editor.on("init", async function () {
                const parts = path.split(".");
                const end = parts[parts.length - 1];
                if (end == "html") {
                  editor.setContent(await mainFileManager.getTextContent(path));
                } else {
                  editor.setContent(await convertDataUriToHtml(path));
                }
              });
            },
          });
        },
        false,
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
        false,
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
                  "Branch Manager",
                  "Branch byl úspěšně přepsán! Nový build dostanete při aktualizaci.",
                );
              } else {
                spawnNotification("Branch Manager", "Nastala chyba");
              }
            });
          };
        },
        (win) => closeUpdates(win),
        false,
      ],
      logs: [(win) => Logs.init(win), (win) => Logs.close(win), false],
      nohuplogs: [
        (win) => Logs.initNohup(win),
        (win) => Logs.close(win),
        false,
      ],
      unzip: [(win, args) => UnZip.init(win, args.path), false, false],
      procesy: [
        (win) => Procesy.init(win),
        (win) => Procesy.end(win),
        false
      ]
    },
    appIds: {},
  },
  open: (name, args) => {
    var location = windows.list.names.indexOf(name);
    var classofelement = windows.list.classes[location];
    if (classofelement == false) {
      error(
        "0x0000144",
        "Pokus o otevření pragramu které nemá okno.",
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
      document.querySelector(".oknepatrizde").appendChild(newelement);
      reloaddraggable();
      if (
        newelement.querySelector(".headerclass") &&
        newelement.getAttribute("notresizable") !== "true"
      ) {
        newelement
          .querySelector(".headerclass")
          .addEventListener("dblclick", (e) => {
            if (newelement.getAttribute("isFullscreen") == "true") {
              windowSizing.default(newelement, e);
            } else {
              windowSizing.full(newelement);
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

      newelement.click();
      if (special != undefined && special[0] !== false) {
        special[0](newelement, args);
      }
      return newelement;
    }
  },
  close: (element, name) => {
    var el = element.parentElement.parentElement.parentElement;
    var special = windows.list.special[name];
    if (special != undefined && special[1] !== false) {
      var returnValue = special[1](el);
    } else {
      var returnValue = undefined;
    }
    if (returnValue !== true) {
      el.style.scale = "0.9";
      el.style.opacity = "0";

      setTimeout(() => {
        el.remove();
      }, 200);
    }
  },
  mini: (element, name) => {
    var location = windows.list.names.indexOf(name);
    var special = windows.list.special[name];
    var ikonadown = windows.list.ikonadown[location];
    var mainElement = element.parentElement.parentElement.parentElement;
    if (ikonadown === false) {
      error(
        "0x0000142",
        "Pokus o minimalizaci okna, které nemá script na minimalizaci.",
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
              '<div class="loading">Loading&#8230;</div>';
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
        el.addEventListener("mouseout", (e) => {
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
        mainElement.click();
        thiselement.style.transform = "scale(0)";
        windows.list.appIds[id] = undefined;
        setTimeout(() => {
          thiselement.remove();
        }, 200);
      }, 10);
    }, 150);
  },
};

var Apps = {};
