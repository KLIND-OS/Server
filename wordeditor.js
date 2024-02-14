class WordEditor {
  static save(element) {
    const fileLocation = element.getAttribute("filelocation");
    let lastSlashIndex = fileLocation.lastIndexOf("/");
    let directory = fileLocation.substring(0, lastSlashIndex + 1);
    let filename = fileLocation.substring(lastSlashIndex + 1);
    const content = element.querySelector(".tox-edit-area__iframe").contentWindow.document.body.innerHTML;
    var file = mainFileManager.getFile(fileLocation);

    if (file[2] == "text/html") {
      mainFileManager.saveText(fileLocation, content);
    }
    else {
      BPrompt.confirm("Soubor musí být převeden do formátu HTML aby se mohl uložit. Chcete pokračovat?", reponse => {
        if (reponse) {
          var storage = storage.getSync(directory);
          for (var i = 0; i < storage.length; i++) {
            if (storage[i][0] == filename) {
              storage[i][2] = "text/html";
              storage[i][4] = content;
              storage[i][1] = lengthInUtf8Bytes(content);
              storage.setSync(directory, storage);
    
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
      });
    }
  }
}