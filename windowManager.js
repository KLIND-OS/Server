var videofileids = []

var windows = {
    list: {
        names: ["poznamky", "kalk", "stop", "nas", "brow", "ter", "player", "info", "reg", "kalen", "budik", "prevod", "update", "nap", "faceset", "record", "filemanager", "fileproperties", "fileeditor", "zdroje", "about", "audioLevelEditor", "installapp", "procesy", "viewtext", "musicplayer", "cleaner", "emergencyMenu", "wordeditor", "sheetseditor"],
        classes: [".poznamky", ".kalkulacka", ".stopky", ".nastaveni", ".browser", ".terminal", ".player", ".informationklindows", ".reg", ".kalendar", ".budik", ".prevodsys", ".updateklind", ".napoveda", ".faceset", ".record", ".filemanager", ".fileproperties", ".fileeditor", ".zdroje", ".about", ".audioLevelEditor", ".installapp", ".procesy", ".viewtext", ".musicplayer", ".cleaner", ".emergencymenu", ".wordeditor", ".sheetseditor"],
        ikonadown: [".poznamkyikonadown", ".kalkikonadown", ".stopikonadown", ".nasikonadown", ".browikonadown", ".terikonadown", ".playerikonadown", ".infoikonadown", ".regikonadown", ".kalenikonadown", ".budikikonadown", ".prevodikonadown", ".updateikonadown", ".napikonadown", ".facesetikonadown", ".recordikonadown", ".filemanagerikonadown", false, ".fileeditorikonadown", ".zdrojeikonadown", ".aboutikonadown", false, ".installappikonadown", ".procesyikonadown", false, ".musicplayerikonadown", ".cleanerikonadown", false, ".wordeditorikonadown", ".sheeteditorikonadown"],
        special: {
            poznamky: [(element) => { loadpoznamky(element) }, () => { closepoznamkymenu() }, false],
            info: [infoApp.loadInfo, false, false],
            my: [(element) => { element.querySelector("#myaccount").innerHTML = localStorage.getItem("username"); }, false, false],
            faceset: [(element) => { if (facerecrpi) { element.querySelector(".facesetiframe").src = "facesetrpi.html"; } }, false, false],
            filemanager: [(element, args) => {
                var url = "/filemanager/"
                if (localStorage.getItem('mode') == "dark") url += "?dark"

                if (args && args.mode == "select") {
                    if (url.indexOf("?") != -1) url += "?select"
                    else url += "&select"
                    var index = openGetFile.length
                    openGetFile.push([element, args.callBack])
                    element.querySelector(".close").setAttribute("onclick", "openGetFile[" + index + "][1]['closed']();windows.close(this,'poznamky')")
                    element.querySelector(".mini").remove()
                    element.querySelector(".headerclass span").textContent = "Vyberte soubor";
                    url += "&index=" + index
                }
                element.querySelector("#filemanageriframe").src = url
            }, false, false],
            fileeditor: [
                (element, args) => {
                    var file = args.file;
                    if (file[2].split("/")[0] == "text") {
                        element.querySelector(".fileeditorimage").style.display = "none";
                        element.querySelector(".fileeditortext").style.display = "block";
                        element.querySelector(".fileeditorvideo").style.display = "none";
                        element.querySelector("#textareafileeditorimage").value = file[4]
                        element.setAttribute("filelocation", file[5] + file[0])
                        element.querySelector(".filesavefileconfig").style.display = "block";
                        element.querySelector(".imgwallpaperfileconfig").style.display = "none";

                    }
                    else if (file[2].split("/")[0] == "image") {
                        element.querySelector(".fileeditorimage").style.display = "block";
                        element.querySelector(".fileeditortext").style.display = "none";
                        element.querySelector(".fileeditorvideo").style.display = "none";
                        element.querySelector("#fileeditorimageimg").src = file[4]
                        element.setAttribute("filelocation", file[5] + file[0])
                        element.querySelector(".filesavefileconfig").style.display = "none";
                        element.querySelector(".imgwallpaperfileconfig").style.display = "block";
                    }
                    else if (file[2].split("/")[0] == "video") {
                        element.querySelector(".fileeditorimage").style.display = "none";
                        element.querySelector(".fileeditortext").style.display = "none";
                        element.querySelector(".filesavefileconfig").style.display = "none";
                        element.querySelector(".fileeditorvideo").style.display = "flex";
                        element.querySelector(".imgwallpaperfileconfig").style.display = "none";
                        element.querySelector("video source").setAttribute("type", file[2])
                        element.querySelector("video source").setAttribute("src", file[4])
                        const player = new Plyr(element.querySelectorAll("#player"), {
                            iconUrl: "icons/plyr.svg"
                        })
                        videofileids.push(player)
                        element.setAttribute("plyr-id", videofileids.length - 1)
                        element.setAttribute("file-type", "video")
                        player.play();
                    }
                    else {
                        element.querySelector(".fileeditorimage").style.display = "none";
                        element.querySelector(".fileeditortext").style.display = "block";
                        element.querySelector(".fileeditoraudio").style.display = "none";
                        element.querySelector(".fileeditorvideo").style.display = "none";
                        element.querySelector("#textareafileeditorimage").value = file[4]
                        element.setAttribute("filelocation", file[5] + file[0])
                        element.querySelector(".filesavefileconfig").style.display = "block";
                        element.querySelector(".imgwallpaperfileconfig").style.display = "none";
                    }
                    if (localStorage.getItem('mode') == "dark") {
                        element.querySelector("#textareafileeditorimage").style.color = "white";
                    }
                    else {
                        element.querySelector("#textareafileeditorimage").style.color = "black";
                    }
                },
                (win) => {
                    if (win.getAttribute("file-type") == "video") {
                        const windowId = win.getAttribute("plyr-id");
                        videofileids[windowId].destroy()
                        delete videofileids[windowId]
                    }
                },
                false
            ],
            brow: [(element, args) => {
                Browser.init(element)
                if (args) {
                    setTimeout(() => {
                        Browser.changeUrl(element, args)
                        element.querySelector("#url").value = args
                    }, 300);
                }
            }, false, false],
            installapp: [
                (element, args) => {
                    CustomApp.loadWindow(element)
                    if (args?.file) {
                        CustomApp.loadFromUri(args.file[4])
                    }
                },
                false, false
            ],
            viewtext: [
                (element, args) => {
                    if (args.text) {
                        element.querySelector('textarea').value = args.text.toString();
                    }
                    if (args.title) {
                        element.querySelector('.widget-header .headerclass span').textContent = args.title.toString();
                    }
                },
                false, false
            ],
            musicplayer: [
                (element, args) => {
                    element.querySelector("iframe").src = "/music?filePath=" + args.filePath;
                }, false, false
            ],
            cleaner: [
                (win) => Cleaner.load(win), false, false
            ],
            ter: [
                (win, args) => {
                    if (args && args.file) {
                        var wind = win.querySelector("iframe").contentWindow

                        wind.addEventListener("DOMContentLoaded", () => {
                            wind.sandbox.specialCommands(":run "+args.file)
                        })
                    }
                },
                false,
                false
            ],
            wordeditor: [
                (win, args) => {
                    if (!(args && args.file)) {
                        throw new Error("File must be specified");
                    }
                    win.setAttribute("filelocation", args.file[5] + args.file[0])

                    function convertDataUriToHtml(dataUri, successCallback, errorCallback) {
                        const base64Data = dataUri.split(",")[1];
                    
                        const arrayBuffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0)).buffer;
                    
                        mammoth.convertToHtml({ arrayBuffer })
                        .then((result) => {
                            successCallback(result.value);
                        })
                        .catch((error) => { errorCallback(error)})
                    }

                    if (localStorage.getItem("mode") == "dark") {
                        var skin = "oxide-dark"
                    }
                    else {
                        var skin = "oxide"
                    }

                    tinymce.init({
                        selector: ".window.wordeditor .wordeditor-element",
                        height: '400px',
                        menubar: 'edit insert format',
                        plugins: 'advlist autolink lists link image charmap anchor',
                        toolbar: 'fontselect fontsizeselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                        theme: "silver",
                        skin: skin,
                        resize: false,
                        height: "calc(100% - 20px)",
                        language: "cs",
                        setup: function (editor) {
                            editor.on('init', function () {
                                if (args.file[2] == "text/html") {
                                    editor.setContent(args.file[4])
                                }
                                else {
                                    convertDataUriToHtml(args.file[4], (html)  => {
                                        editor.setContent(html)
                                    }, (error) => console.error(error))
                                }
                            });
                        }
                    })

                },
                false,
                false
            ],
            sheetseditor: [
                (win, args) => {
                    if (args && args.file) {
                        SheetsEditor.init(win, args.file)
                    }
                    else {
                        throw new Error("File must be specified");
                    }
                },
                false,
                false
            ]
        },
        appIds: {}
    },
    open: (name, args) => {
        var location = windows.list.names.indexOf(name)
        var classofelement = windows.list.classes[location]
        if (classofelement == false) {
            error("0x0000144", "Pokus o otevření pragramu které nemá okno.", "KLIND OS | Window Manager");
        }
        else {
            var special = windows.list.special[name]
            var element = document.querySelector(".oknadisplaynone").querySelector(classofelement)
            let newelement = element.cloneNode(true)
            newelement.classList.add("window")
            newelement.classList.add("openedwin")
            document.querySelector(".oknepatrizde").appendChild(newelement)
            reloaddraggable();
            if (localStorage.getItem("mode") == "dark") {
                var x, i;
                x = document.querySelectorAll(".window");
                for (i = 0; i < x.length; i++) {
                    x[i].style.backgroundColor = "#3b3838";
                    x[i].classList.add("black");
                }
            }
            else {
                var x, i;
                x = document.querySelectorAll(".window");
                for (i = 0; i < x.length; i++) {
                    x[i].style.backgroundColor = "white";
                    x[i].classList.remove("black");
                }
            }
            newelement.click()
            
            if (special != undefined && special[0] !== false) {
                special[0](newelement, args)
            }
            return newelement
        }
    },
    close: (element, name) => {
        var special = windows.list.special[name]
        if (special != undefined && special[1] !== false) {
            special[1](element.parentElement.parentElement.parentElement)
        }
        element.parentElement.parentElement.parentElement.remove();
    },
    mini: (element, name) => {
        var location = windows.list.names.indexOf(name)
        var special = windows.list.special[name]
        var ikonadown = windows.list.ikonadown[location]
        var mainElement = element.parentElement.parentElement.parentElement
        if (ikonadown === false) {
            error("0x0000142", "Pokus o minimalizaci okna, které nemá script na minimalizaci.", "KLIND OS | Window Manager");
        }
        else {
            var icon = document.querySelector(".downiconsAppNone " + ikonadown);
            var newElement = icon.cloneNode(true);
            var key = windows.getRandomKey();
            windows.list.appIds[key] = mainElement;
            newElement.setAttribute("windowId", key);
            newElement.style.transform = "scale(0)";
            if (special != undefined && special[2] !== false) {
                special[2](mainElement);
            }
            var el = document.querySelector(".downiconsApps").appendChild(newElement)
            mainElement.classList.remove("openedwin");
            setTimeout(() => {
                el.style.transform = ""
                el.addEventListener("click", () => {
                    var appdiv = document.querySelector(".appdiv")
                    appdiv.querySelector(".canvasSection").innerHTML = ""
                    appdiv.style.display = "none";
                })
                el.addEventListener("mouseover", (e) => {
                    if (localStorage.getItem("filePreview")) {
                        var el = e.target;
                        var id = el.getAttribute("windowId");
                        var element = windows.list.appIds[id]
                        element.style.display = "block";
                        var appdiv = document.querySelector(".appdiv")
                        appdiv.querySelector(".canvasSection").innerHTML = '<div class="loading">Loading&#8230;</div>'
                        appdiv.querySelector("h1").textContent = element.querySelector(".headerclass span").textContent;
                        var left = e.clientX - 150;
                        if (left < 10) {
                            appdiv.style.left = "10px"
                        }
                        else {
                            appdiv.style.left = left + "px"
                        }
                        appdiv.style.display = "block";
                        element.style.clipPath = "inset(0 100% 0 0)"
                        html2canvas(element).then(function (canvas) {
                            canvas.style.height = "auto";
                            canvas.style.width = "auto";
                            canvas.style.maxHeight = "100%";
                            canvas.style.maxWidth = "100%";
                            canvas.style.borderRadius = "10px";
                            element.style.clipPath = ""
                            element.style.display = "none";
                            appdiv.querySelector(".canvasSection").innerHTML = ""
                            appdiv.querySelector(".canvasSection").appendChild(canvas)
                        });
                    }
                })
                el.addEventListener("mouseout", (e) => {
                    var appdiv = document.querySelector(".appdiv")
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
        }
        else {
            return windows.getRandomKey();
        }
    },
    miniOpen: (_, thiselement) => {
        setTimeout(() => {
            var id = thiselement.getAttribute("windowId")
            var mainElement = windows.list.appIds[id];
            mainElement.classList.add("openedwin");
            mainElement.click()
            thiselement.style.transform = "scale(0)"
            windows.list.appIds[id] = undefined;
            setTimeout(() => {
                thiselement.remove();
            }, 200);
        }, 150);
    }
}



