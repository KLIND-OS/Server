class DiskManager {
  static disks = {};
  static add(disk, partitions) {
    DiskManager.disks[disk] = partitions.split(",");
    spawnNotification("Správce disků", `Disk ${disk} byl připojen!`);
  }
  static remove(disk) {
    delete DiskManager.disks[disk];
    spawnNotification("Správce disků", `Disk ${disk} byl odpojen!`);
  }
  static getAllDisks() {
    return DiskManager.disks;
  }
  static init(win) {
    var element = win.querySelector(".disks");
    element.innerHTML = "";
    for (const disk in DiskManager.disks) {
      var div = document.createElement("div");
      var h1 = document.createElement("h1");
      h1.textContent = "Disk: "+disk;
      div.appendChild(h1);
      DiskManager.disks[disk].forEach(partition => {
        var p = document.createElement("p");
        p.textContent = "Oddíl: " + partition;
        div.appendChild(p);
        var button1 = document.createElement("button");
        button1.textContent = "Přesunout celý oddíl do specifické šložky";
        button1.setAttribute("onclick", `DiskManager.partitionToMain('${partition}')`);
        div.appendChild(button1);
        var button2 = document.createElement("button");
        button2.textContent = "Přepsat celý oddíl složkou ze správce souborů";
        button2.setAttribute("onclick", `DiskManager.mainToPartition('${partition}')`);
        div.appendChild(button2);
      });
      element.appendChild(div);
    }
  }

  static partitionToMain(partition) {
    if (mainFileManager.folderExist("/"+partition)) {
      spawnNotification("Správce disků", "Složka s názvem " + partition + " již existuje v kořenovém adresáři.");
    }
    else {
      spawnNotification("Správce disků", "Kopírování bylo zahájeno");
      var temp = JSON.parse(localStorage.getItem("folders-uploaded"));
      if (temp) {
        temp.push([partition, "/"]);
      }
      else {
        temp = [[partition, "/"]];
      }
      localStorage.setItem("folders-uploaded", JSON.stringify(temp));
      window.LowLevelApi.readDiskFromStorage(partition, "/" + partition);
      spawnNotification("Správce disků", "Kopírování bylo dokončeno");
    }
  }

  static mainToPartition(partition) {
    BPrompt.prompt("Zadejte cestu složky", (folder) => {
      folder = folder.endsWith("/") ? folder : folder + "/";
      if (mainFileManager.folderExist(folder)) {
        window.LowLevelApi.writeDiskFromStorage(folder, partition);
      }
      else {
        spawnNotification("Správce disků", "Tato složka neexistuje!");
      }
    });
  }
}