var infolder = "/";
var storage = parent.storage;
function lengthInUtf8Bytes(str) {
  var m = encodeURIComponent(str).match(/%[89ABab]/g);
  return str.length + (m ? m.length : 0);
}
function downloadAsFile(filename, text) {
  var element = document.createElement("a");
  element.style.display = "none";
  element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

document.addEventListener("contextmenu", function (e) {
  if (!selectmode) {
    if (e.target.classList == "element") {
      rightclickad = document.querySelector(".rightclick");
      rightclickad.setAttribute("idel", e.target.getAttribute("idel"));
      rightclickad.style.left = e.clientX + "px";
      rightclickad.style.top = e.clientY + "px";
      rightclickad.style.display = "block";
    }
    else if (e.target.parentElement.classList == "element") {
      rightclickad = document.querySelector(".rightclick");
      rightclickad.setAttribute("idel", e.target.parentElement.getAttribute("idel"));
      rightclickad.style.left = e.clientX + "px";
      rightclickad.style.top = e.clientY + "px";
      rightclickad.style.display = "block";
    }
    else if (e.target.classList == "elmnt") {
      rightclickad = document.querySelector(".rightclicktwo");
      rightclickad.setAttribute("idel", e.target.querySelector("p").innerHTML);
      rightclickad.style.left = e.clientX + "px";
      rightclickad.style.top = e.clientY + "px";
      rightclickad.style.display = "block";
    }
    else if (e.target.parentElement.classList == "elmnt") {
      rightclickad = document.querySelector(".rightclicktwo");
      rightclickad.setAttribute("idel", e.target.parentElement.querySelector("p").innerHTML);
      rightclickad.style.left = e.clientX + "px";
      rightclickad.style.top = e.clientY + "px";
      rightclickad.style.display = "block";
    }
    else if (e.target.classList.contains("main")) {
      rightclickad = document.querySelector(".rightclickthree");
      rightclickad.style.left = e.clientX + "px";
      rightclickad.style.top = e.clientY + "px";
      rightclickad.style.display = "block";
    }
  }
  e.preventDefault();
}, false);

var parseExcel = function (file) {
  var reader = new FileReader();

  reader.onload = function (e) {
    var asdajksdhjasd = [];
    var data = e.target.result;
    var workbook = XLSX.read(data, {
      type: "binary"
    });

    workbook.SheetNames.forEach(function (sheetName) {
      // Here is your object
      var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);

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
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


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
  readFiles: () => {
    if (selectmode) {
      document.querySelector(".main").innerHTML = "<header><p>Správce Souborů <span>" + infolder + "</span></p></header>";
    }
    else {
      document.querySelector(".main").innerHTML = "<header><p>Správce Souborů <span>" + infolder + "</span></p><!--<div class=\"mainelement\" onclick=\"FileManager.upload();\"></div>--!><div class=\"secondelement\" onclick=\"FileManager.createFolder();\"></div><div class=\"thirdelement\" onclick=\"FileManager.createFile();\"></div><div class=\"fourthelement\" onclick=\"FileManager.readFiles();\"></div></header>";
    }
    if (infolder != "/") {
      var element = document.createElement("div");
      element.classList.add("elmnt");
      element.setAttribute("onclick", "FileManager.goto('..')");
      element.setAttribute("idel", i);
      element.setAttribute("cursor", "pointer");
      element.innerHTML = "<p cursor='pointer'>..</p>";

      document.querySelector(".main").appendChild(element);
    }
    var folders = JSON.parse(localStorage.getItem("folders-uploaded"));
    if (folders) {
      for (var i = 0; i < folders.length; i++) {
        if (folders[i][1] == infolder) {
          var element = document.createElement("div");
          element.classList.add("elmnt");
          element.setAttribute("onclick", "FileManager.goto('" + folders[i][0] + "/')");
          element.setAttribute("idel", i);
          element.setAttribute("cursor", "pointer");
          element.innerHTML = "<p cursor='pointer'>" + folders[i][0] + "</p>";

          document.querySelector(".main").appendChild(element);
        }
      }
    }
    var stored = storage.getSync(infolder);
    if (stored) {
      for (var i = 0; i < stored.length; i++) {
        var element = document.createElement("div");
        element.classList.add("element");
        element.setAttribute("onclick", "FileManager.openFile(" + i + ")");
        element.setAttribute("idel", i);
        element.setAttribute("cursor", "pointer");
        element.innerHTML = "<p cursor='pointer'>" + stored[i][0] + "</p><span>" + humanFileSize(stored[i][1], true) + "</span>";

        document.querySelector(".main").appendChild(element);
      }
    }
  },
  openFile: (isdd) => {
    if (!selectmode) {
      var stored = storage.getSync(infolder);
      var file = stored[isdd];
      if (file[2] == "klindos/shortcut") {
        var content = file[4];
        if (content.includes(":") && content.split(":")[0].trim() == "open" && content.split(":")[1] !== "") {
          var path = content.split(":")[1];
          if (parent.mainFileManager.fileExists(path)) {
            parent.mainFileManager.open(parent.mainFileManager.getFile(path));
          }
          else if (parent.mainFileManager.folderExist(path)) {
            FileManager.goto(path.replace("/", "") + "/");
          }
          else {
            parent.spawnNotification("Správce souborů", "Soubor nebo složka neexistuje!");
          }
        }
      }
      else if (file[2] == "klindos/script") {
        const path = file[5]+file[0];
        parent.windows.open("ter", {file:path});
      }
      else {
        parent.mainFileManager.open(stored[isdd]);
      }
    }
    else {
      var stored = storage.getSync(infolder);
      var index = window.location.href.split("index=")[1];
      parent.openGetFile[index][1]["success"](stored[isdd]);
      var element = parent.openGetFile[index][0].querySelector(".close");
      parent.openGetFile = removebyindex(parent.openGetFile, index);
      parent.windows.close(element, "filemanager");
    }
  },
  remove: (idel) => {
    var value = storage.getSync(infolder);
    var newarray = removebyindex(value, idel);
    storage.setSync(infolder, newarray);
    FileManager.readFiles();
  },
  removeFolder: (idel) => {
    var value = JSON.parse(localStorage.getItem("folders-uploaded"));
    for (var i = 0; i < value.length; i++) {
      if (value[i][1] == infolder && value[i][0] == idel) {
        value = removebyindex(value, i);
        continue;
      }
    }
    for (var i = 0; i < value.length; i++) {
      if (value[i][1].indexOf(infolder + idel + "/") == 0) {
        value = removebyindex(value, i);
        continue;
      }
    }
    storage.remove(infolder + idel + "/");
    if (value.length > 0) {
      localStorage.setItem("folders-uploaded", JSON.stringify(value));
    }
    else {
      localStorage.removeItem("folders-uploaded");
    }
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
    }
    else {
      infolder += folder;
      FileManager.readFiles();
    }
    document.querySelector("header p").innerHTML = "Správce Souborů <span>" + infolder + "</span>";
  },
  createFolder: () => {
    parent.BPrompt.prompt("Zadejte název složky:", (name) => {
      if (name == null || name.length == 0) {

      }
      else {
        if (name.indexOf("/") > -1 || name.indexOf(".") > -1) {
          parent.spawnNotification("Správce Souborů", "'/' a '.' jsou zakázané znaky!");
        }
        else {
          if (FileManager.folderExists(name)) {
            parent.spawnNotification("Správce Souborů", "Složka se stejným názvem již v této složce existuje.");
          }
          else {

            var array = JSON.parse(localStorage.getItem("folders-uploaded"));
            if (array) {
              array.push([name, infolder]);
            }
            else {
              array = [[name, infolder]];
            }
            localStorage.setItem("folders-uploaded", JSON.stringify(array));

            FileManager.readFiles();
          }
        }
      }
    });
  },
  folderExists: (name) => {
    var value = JSON.parse(localStorage.getItem("folders-uploaded"));
    if (value) {
      newarray = [];
      for (var i = 0; i < value.length; i++) {
        if (value[i][1] == infolder) {
          newarray.push(value[i]);
        }
      }
      for (var i = 0; i < newarray.length; i++) {
        if (newarray[i][0] == name) {
          return true;
        }
      }
    }
    return false;
  },
  fileExist: (name) => {
    var value = storage.getSync(infolder);
    if (value) {
      newarray = [];
      for (var i = 0; i < value.length; i++) {
        if (value[i][5] == infolder) {
          newarray.push(value[i]);
        }
      }
      for (var i = 0; i < newarray.length; i++) {
        if (newarray[i][0] == name) {
          return true;
        }
      }
    }
    return false;
  },
  rename: (idel) => {
    var value = storage.getSync(infolder);

    parent.BPrompt.prompt("Zadejte nové jméno souboru.", (newname) => {
      if (newname == null || newname.length == 0) {

      }
      else if (newname.length > 100) {
        parent.spawnNotification("Správce Souborů", "Název souborů nesmí být delší jak 100 znaků.");
      }
      else if (newname.indexOf("/") > -1 || newname.indexOf("\\") > -1) {
        parent.spawnNotification("Správce Souborů", "'/' a '\\' jsou zakázané znaky.");
      }
      else if (FileManager.fileExist(newname)) {
        parent.spawnNotification("Správce Souborů", "Tento název souboru je již v této složce použit!");
      }
      else {
        value[idel][0] = newname;
        storage.setSync(infolder, value);
      }
      FileManager.readFiles();
    });
  },
  copy: (idel) => {
    var value = storage.getSync(infolder);
    clipboard = value[idel];
    parent.spawnNotification("Správce Souborů", "Jděte do jakékoli složky a stiskněte CTRL + V pro vložení.");
  },
  paste: () => {
    if (clipboard != undefined) {
      var newclipboard = clipboard;
      if (FileManager.fileExist(newclipboard[0])) {
        parent.BPrompt.prompt("Soubor se stejným názvem již v této složce existuje. Zadejte nový název souboru.", (newname) => {
          if (newname != "" && newname != null) {
            clipboard[0] = newname;
            FileManager.paste();
          }
        });
      }
      else {
        var value = storage.getSync(infolder);
        if (Object.keys(value).length === 0) {
          value = [];
        }
        newclipboard[5] = infolder;
        value.push(newclipboard);
        try {
          storage.setSync(infolder, value);
        }
        catch (e) {
          parent.spawnNotification("Správce Souborů", "Není dostatek místa na úložišti. Více info <a href='https://www.gwtproject.org/doc/latest/DevGuideHtml5Storage.html'>zde</a>.");
          console.log("File is too big to be uploaded. Error message: " + e.toString());
        }

      }
      FileManager.readFiles();
    }
  },
  properties: (idel) => {
    var stored = storage.getSync(infolder);
    parent.mainFileManager.properties(stored[idel]);
  },
  createFile: () => {
    parent.BPrompt.prompt("Vložte název souboru.", (name) => {
      if (name == null || name.length == 0) {

      }
      else {
        if (FileManager.fileExist(name)) {
          parent.spawnNotification("Správce Souborů", "Soubor se stejným názvem už existuje.");
        }
        else {
          if (name.length > 100) {
            parent.spawnNotification("Správce Souborů", "Název souborů nesmí být delší jak 100 znaků.");
          }
          else {
            if (name.indexOf("/") > -1 || name.indexOf("\\") > -1) {
              parent.spawnNotification("Správce Souborů", "'/' a '\\' jsou zakázané znaky.");
            }
            else {
              var time = new Date().toString();
              var value = storage.getSync(infolder);
              if (Object.keys(value).length == 0) {
                value = [[name, 0, "text/plain", time, "", infolder]];
              }
              else {
                value.push([name, 0, "text/plain", time, "", infolder]);
              }
              storage.setSync(infolder, value);
            }
          }
        }
      }
      FileManager.readFiles();
    });

  },
  convertTo: (idel) => {
    var value = storage.getSync(infolder);
    parent.BPrompt.prompt("Převod:<br><br>1 - Text<br>2 - Obrázek<br>3 - Zvuk<br>4 - Video<br>5 - KLIND OS Script<br>6 - KLIND OS Instalační balíček<br>7 - Word dokument<br>8 - Excel dokument<br>9 - HTML dokument<br>c - Vlastní", (to) => {
      if (to == null || to.length == 0) {

      }
      else {
        if (to == "1") {
          value[idel][2] = "text/plain";
          storage.setSync(infolder, value);
        }
        else if (to == "2") {
          setTimeout(() => {
            parent.BPrompt.prompt("Vyberte formát: 1 - JPEG 2 - PNG", (format) => {
              if (format == "1") {
                value[idel][2] = "image/jpeg";
                storage.setSync(infolder, value);
              }
              else if (format == "2") {
                value[idel][2] = "image/png";
                storage.setSync(infolder, value);
              }
              else {
                parent.spawnNotification("Správce Souborů", "Neplatný výběr.");
              }
            });
          }, 200);
        }
        else if (to == "3") {
          value[idel][2] = "audio/mpeg";
          storage.setSync(infolder, value);
        }
        else if (to == "4") {
          value[idel][2] = "video/mp4";
          storage.setSync(infolder, value);
        }
        else if (to == "5") {
          value[idel][2] = "klindos/script";
          storage.setSync(infolder, value);
        }
        else if (to == "6") {
          value[idel][2] = "klindos/installer";
          storage.setSync(infolder, value);
        }
        else if (to == "7") {
          value[idel][2] = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
          storage.setSync(infolder, value);
        }
        else if (to == "8") {
          value[idel][2] = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
          storage.setSync(infolder, value);
        }
        else if (to == "9") {
          value[idel][2] = "text/html";
          storage.setSync(infolder, value);
        }
        else if (to == "c") {
          setTimeout(() => {
            parent.BPrompt.prompt("Vložte vlastní typ ve tvaru např. (text/plain)", (type) => {
              value[idel][2] = type;
              storage.setSync(infolder, value);
            });
          }, 200);
        }
        else {
          parent.spawnNotification("Správce Souborů", "Neplatný výběr.");
        }
      }
    });
    FileManager.readFiles();
  },
  downloadFile: (idel) => {
    var value = storage.getSync(infolder)[idel];
    if (value[2].split("/")[0] == "text") {
      downloadAsFile(value[0], value[4]);
    }
    else if (value[2].split("/")[0] == "image" || value[2].split("/")[0] == "audio") {
      if (value[4].indexOf("data:") > -1) {
        var element = document.createElement("a");
        element.href = value[4];
        element.setAttribute("download", value[0]);
        var elementdone = document.body.appendChild(element);
        parent.spawnNotification("Správce Souborů", "Stahování začalo.");
        elementdone.click();
        elementdone.remove();
      }
      else {
        parent.spawnNotification("Správce Souborů", "Obrázky z webu nemohou být stáhnuty.");
      }
    }
  },
  copyPath: (idel) => {
    var path = infolder + storage.getSync(infolder)[idel][0];
    parent.spawnNotification("Správce Souborů", "Cesta: " + path);
  },
  selectMode: () => {
    selectmode = true;
  },
  addShortcut: (idel) => {
    var file = storage.getSync(infolder)[idel];
    var path = infolder + file[0];

    var fun = `try{mainFileManager.open(mainFileManager.getFile("${path.replaceAll("'", "\\'")}"))}catch {spawnNotification("Správce souborů","Tento soubor nebyl nalezen!")}`;
    parent.DesktopIcons.add({ run: fun, icon: "filemanager/images/file.png" });
  },
  createShortcut: () => {
    parent.BPrompt.prompt("Vložte název zástupce.", (name) => {
      if (name == null || name.length == 0) {

      }
      else {
        if (FileManager.fileExist(name)) {
          parent.spawnNotification("Správce Souborů", "Soubor se stejným názvem už existuje.");
        }
        else {
          if (name.length > 100) {
            parent.spawnNotification("Správce Souborů", "Název souborů nesmí být delší jak 100 znaků.");
          }
          else {
            if (name.indexOf("/") > -1 || name.indexOf("\\") > -1) {
              parent.spawnNotification("Správce Souborů", "'/' a '\\' jsou zakázané znaky.");
            }
            else {
              setTimeout(() => {
                parent.BPrompt.prompt("Vložte cestu k souboru ke kterému chcete přidat zástupce.", (path) => {
                  var time = new Date().toString();
                  var value = storage.getSync(infolder);
                  var content = "open:" + path;
                  var file = [name, lengthInUtf8Bytes(content), "klindos/shortcut", time, content, infolder];

                  if (Object.keys(value).length == 0) {
                    value = [file];
                  }
                  else {
                    value.push(file);
                  }
                  storage.setSync(infolder, value);
                  FileManager.readFiles();
                });
              }, 50);
            }
          }
        }
      }
    });
  }
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
}
else {
  document.querySelector(".main").classList.add("light");
}
if (window.location.href.indexOf("select") > -1) {
  FileManager.selectMode();
}
