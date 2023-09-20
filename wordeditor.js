class WordEditor {
    static save(element) {
        const fileLocation = element.getAttribute("filelocation");
        const content = element.querySelector(".tox-edit-area__iframe").contentWindow.document.body.innerHTML
        var file = mainFileManager.getFile(fileLocation)

        if (file[2] == "text/html") {
            var storage = JSON.parse(localStorage.getItem("files-uploaded"))
            for (var i = 0; i < storage.length; i++) {
                if (storage[i][5] + storage[i][0] == fileLocation) {
                    storage[i][4] = content;
                    localStorage.setItem("files-uploaded", JSON.stringify(storage));

                    var windowasjdh = document.querySelectorAll(".window");
                    for (var i = 0; i < windowasjdh.length; i++) {
                        if (windowasjdh[i].querySelector("#filemanageriframe") != undefined) {
                            windowasjdh[i]
                            .querySelector("#filemanageriframe")
                            .contentWindow.FileManager.readFiles();
                        }
                    }
                    return;
                }
            }
        }
        else {
            BPrompt.confirm("Soubor musí být převeden do formátu HTML aby se mohl uložit. Chcete pokračovat?", reponse => {
                if (reponse) {
                    var storage = JSON.parse(localStorage.getItem("files-uploaded"))
                    for (var i = 0; i < storage.length; i++) {
                        if (storage[i][5] + storage[i][0] == fileLocation) {
                            storage[i][2] = "text/html"
                            storage[i][4] = content;
                            localStorage.setItem("files-uploaded", JSON.stringify(storage));
    
                            var windowasjdh = document.querySelectorAll(".window");
                            for (var i = 0; i < windowasjdh.length; i++) {
                                if (windowasjdh[i].querySelector("#filemanageriframe") != undefined) {
                                    windowasjdh[i]
                                    .querySelector("#filemanageriframe")
                                    .contentWindow.FileManager.readFiles();
                                }
                            }
                            return;
                        }
                    }
                }
            })
        }
    }
}