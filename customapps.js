var CustomApp = {
  icons: [],
  load: () => {
    var scripts = localStorage.getItem("customapps");
    if (scripts !== null) {
      var all = JSON.parse(scripts);
      for (var i = 0; i < all.length; i++) {
        CustomApp.icons.push([all[i][0], all[i][2]]);
        var element = document.createElement("script");
        element.innerHTML = all[i][1];
        document.body.appendChild(element);
      }
    }
  },
  getIcon: (name) => {
    for (var i = 0; i < CustomApp.icons.length; i++) {
      if (CustomApp.icons[i][0] === name) {
        return CustomApp.icons[i][1];
      }
    }
    return false;
  },
  loadWindow: (e) => {
    var div = e.querySelector(".allapps");
    div.innerHTML = "";
    var allscripts = localStorage.getItem("customapps");
    if (allscripts !== null) {
      var all = JSON.parse(allscripts);
      for (var i = 0; i < all.length; i++) {
        var element = document.createElement("div");
        element.classList.add("customappdiv");

        var span = document.createElement("span");
        span.textContent = all[i][0];

        var removebtn = document.createElement("button");
        removebtn.setAttribute("onclick", "CustomApp.remove('" + all[i][0] + "')");
        removebtn.textContent = "Odstranit";

        element.appendChild(span);
        element.appendChild(removebtn);

        div.appendChild(element);
      }
    }
    else {
      div.innerHTML = "Nemáte nainstalované žádné aplikace!";
    }
  },
  remove: (element) => {
    var scripts = JSON.parse(localStorage.getItem("customapps"));
    for (var i = 0; i < scripts.length; i++) {
      if (scripts[i][0] == element) {
        function removebyindex(array, index) {
          var doacgajs = [];
          for (var i = 0; i < array.length; i++) {
            if (i != index) {
              doacgajs.push(array[i]);
            }
          }
          return doacgajs;
        }
        localStorage.removeItem(scripts[i][0]);
        scripts = removebyindex(scripts, i);
        localStorage.setItem("customapps", JSON.stringify(scripts));
        break;
      }
    }
    window.location.reload();
  },
  add: (e, x=false) => {
    var d;
    if (x) {
      d = e;
    }
    else {
      d = e.files[0];
    }

    var new_zip = new JSZip();
    new_zip.loadAsync(d)
      .then(function (zip) {
        zip.file("script.js").async("text")
          .then(function success(asdtarsd) {
            var script = asdtarsd;
            zip.file("image.png").async("base64")
              .then(function success(adsdasdasd) {
                var image = "data:image/png;base64," + adsdasdasd;
                zip.file("name.txt").async("text")
                  .then(function success(sdajdh) {
                    if (zip.file("version.txt") == null) {
                      spawnNotification("Instalátor aplikací", "Tato aplikace je na jinou verzi KLIND OS.");
                    }
                    else {
                      zip.file("version.txt").async("text")
                        .then(function success(versionasd) {
                          zip.file("install.js").async("text")
                            .then(function success(installScript) {
                              if (versionasd.trim() === version.trim()) {
                                var name = sdajdh;
                                // name, script, image
                                var scripts = localStorage.getItem("customapps");
                                if (scripts !== null) {
                                  var all = JSON.parse(scripts);
                                  var not = false;
                                  for (var i = 0; i < all.length; i++) {
                                    if (all[i][0] === name) {
                                      spawnNotification("Instalátor aplikací", "Aplikace se stejným jménem je již nainstalována!");
                                      not = true;
                                      break;
                                    }
                                  }
                                  e.value = "";
                                  if (!not) {
                                    if (installScript.trim().startsWith('"use async"')) {
                                      this.window.installFinished = () => {
                                        all.push([name, script, image]);
                                        localStorage.setItem("customapps", JSON.stringify(all));
                                        window.location.reload();
                                      }
                                      eval(installScript)
                                    } else {
                                      eval(installScript);
                                      all.push([name, script, image]);
                                      localStorage.setItem("customapps", JSON.stringify(all));
                                      window.location.reload();
                                    }
                                  }
                                }
                                else {
                                  eval(installScript);
                                  localStorage.setItem("customapps", JSON.stringify([[name, script, image]]));
                                  if (!x) e.value = "";
                                  window.location.reload();
                                }
                              }
                              else {
                                spawnNotification("Instalátor aplikací", "Tato aplikace je na jinou verzi KLIND OS.");
                              }
                            });
                        }, function error(e) {
                          console.error(e);
                        });
                    }
                  }, function error(e) {
                    console.error(e);
                  });
              }, function error(e) {
                console.error(e);
              });
          }, function error(e) {
            console.error(e);
          });

      });
  },
  async loadFromUri(path) {
    const binaryData = await mainFileManager.getContent(path);
    const uint8Array = Uint8Array.from(binaryData, char => char.charCodeAt(0));

    var blob = new Blob([uint8Array], { type: "application/zip"});
    CustomApp.add(blob, true);
  }
};
