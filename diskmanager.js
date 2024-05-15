class DiskManager {
  static disks = {};
  static add(disk, partitions) {
    DiskManager.disks[disk] = partitions.split(",");
    Sounds.devicePlugIn();
    spawnNotification("Správce disků", `Disk ${disk} byl připojen!`);
  }
  static remove(disk) {
    delete DiskManager.disks[disk];
    Sounds.devicePlugOut();
    spawnNotification("Správce disků", `Disk ${disk} byl odpojen!`);
  }
  static getAllDisks() {
    return DiskManager.disks;
  }
  static async unmount(disk, parentel) {
    const response = await LowLevelApi.DiskManagement.unmount(disk);
    if (response) {
      parentel.remove();
      spawnNotification("Správce disků", `Nyní můžete disk bezpečně odpojit.`);
    }
  }
  static init(win) {
    var element = win.querySelector(".disks");
    element.innerHTML = "";
    for (const disk in DiskManager.disks) {
      var div = document.createElement("div");
      var h1 = document.createElement("h1");
      h1.textContent = "Disk: " + disk;
      div.appendChild(h1);
      var button1 = document.createElement("button");
      button1.textContent = "Bezpečně odpojit disk";
      button1.setAttribute(
        "onclick",
        `DiskManager.unmount('${disk}', this.parentElement)`,
      );
      div.appendChild(button1);

      DiskManager.disks[disk].forEach((partition) => {
        var p = document.createElement("p");
        p.textContent = "Oddíl: " + partition;
        div.appendChild(p);
      });
      element.appendChild(div);
    }
  }
}
