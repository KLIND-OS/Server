var DesktopIcons = {
  load: () => {
    var storage = localStorage.getItem("desktop-icons");
    if (storage) {
      storage = JSON.parse(storage);
      for (var i = 0; i < storage.length; i++) {
        var element = document.createElement("div");
        element.classList.add("ikonaklindows");
        element.classList.add("drageble");
        element.setAttribute("ondblclick", storage[i][0]);
        element.setAttribute("id", i);
        element.setAttribute("oncontextmenu", "rightClickIcon(this)");
        if (storage[i][3]) {
          var text = document.createElement("span");
          text.textContent = storage[i][3];
          element.appendChild(text);
        }
        var elmnt = document
          .querySelector(".iconsKLINDOS")
          .appendChild(element);
        elmnt.style.backgroundImage = "url(" + storage[i][1] + ")";

        if (storage[i][4]) {
          mainFileManager.links.linkFile(storage[i][4], (type) => {
            if (
              type == mainFileManager.links.linkUpdateType.REMOVED ||
              type == mainFileManager.links.linkUpdateType.RENAMED
            ) {
              // TODO: delete icon
              elmnt.remove();
            }
          });
        }

        try {
          element.style.inset =
            storage[i][2][1] + "px auto auto " + storage[i][2][0] + "px";
        } catch {
          // Ignore error
        }
      }
      DraggableElements.reloadDesktopIcons();
    }
  },
  stopMoving: (element) => {
    var left = element.style.left.replace("px", "");
    var top = element.style.top.replace("px", "");
    var id = element.getAttribute("id");
    var array = JSON.parse(localStorage.getItem("desktop-icons"));
    array[id][2][0] = left;
    array[id][2][1] = top;
    localStorage.setItem("desktop-icons", JSON.stringify(array));
  },
  add: ({ run, icon, name, linkPath }) => {
    var storage = localStorage.getItem("desktop-icons");
    if (storage) {
      storage = JSON.parse(storage);
    } else {
      storage = [];
    }
    storage.push([run, icon, ["0", "0"], name, linkPath]);
    localStorage.setItem("desktop-icons", JSON.stringify(storage));
    document.querySelector(".iconsKLINDOS").innerHTML = "";
    DesktopIcons.load();
  },
  addFile: ({ folder, path, name }) => {
    var fun = `try{mainFileManager.open('${folder}', '${path}')}catch {spawnNotification(Localization.getString("file_manager"),Localization.getString("file_not_found"))}`;
    DesktopIcons.add({
      run: fun,
      icon: "icons/filemanagerfile.png",
      name,
      linkPath: folder + path,
    });
  },
};
