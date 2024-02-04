function allStorage() {

  var archive = [],
    keys = Object.keys(localStorage),
    i = 0, key;

  for (; key = keys[i]; i++) {
    archive.push([key, localStorage.getItem(key)]);
  }

  return archive;
}
function downloadAsFile(filename, text) {
  var element = document.createElement("a");
  element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
function allFiles(callback) {
  storage.getAll((error, data) => {
    const newObj = {};
    for (const key in data) {
      newObj[key.replaceAll("$", "/")] = data[key];
    }
    callback(newObj)
  })
}

function prevedsystem() {
  var as = new Date;
  allFiles((data) => {
    downloadAsFile(as.getDate().toString() + "." + (as.getMonth() + 1) + "." + as.toString().split(" ")[3] + ".klindos", JSON.stringify({
      localStorage: allStorage(),
      files: data
    }));
  })
}
function submitnjahsbdjksabd() {
  control.fileManager.fileSelect({
    success: (file_array) => {
      var result = JSON.parse(file_array[4]);
      var make = false;
      for (var i = 0; i < result.localStorage.length; i++) {
        if (result.localStorage[i][0] == "updatesklindows" && result.localStorage[i][1] == version) {
          make = true;
          break;
        }
      }
      if (make) {
        localStorage.clear();
        for (var i = 0; i < result.localStorage.length; i++) {
          localStorage.setItem(result.localStorage[i][0], result.localStorage[i][1]);
        }
        storage.clear(function(error) {
          if (error) throw error;
          for (const key in result.files) {
            window.storage.setSync(key, result.files[key])
          }
          window.location.reload();
        });
      }
      else {
        spawnNotification("Převod systému", "Tento soubor je na jinou verzi KLIND OS. Aktualizujte soubor.");
      }
    },closed: () => {}
  });
}
