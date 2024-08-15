class DiskManager {
  static disks = {};
  static add(disk, partitions) {
    DiskManager.disks[disk] = partitions.split(",");
    Sounds.devicePlugIn();
    spawnNotification(
      Localization.getString("disk_manager"),
      Localization.getString("drive_was_connected").format(disk),
    );
  }
  static remove(disk) {
    delete DiskManager.disks[disk];
    Sounds.devicePlugOut();
    spawnNotification(
      Localization.getString("disk_manager"),
      Localization.getString("drive_was_disconnected").format(disk),
    );
  }
  static getAllDisks() {
    return DiskManager.disks;
  }
  static async unmount(disk, parentel) {
    const response = await LowLevelApi.DiskManagement.unmount(disk);
    if (response) {
      parentel.remove();
      spawnNotification(
        Localization.getString("disk_manager"),
        Localization.getString("now_can_disconnect"),
      );
    }
  }
  static init(win) {
    var element = win.querySelector(".disks");
    element.innerHTML = "";
    for (const disk in DiskManager.disks) {
      var div = document.createElement("div");
      var h1 = document.createElement("h1");
      h1.textContent = Localization.getString("drive") + ": " + disk;
      div.appendChild(h1);
      var button1 = document.createElement("button");
      button1.textContent = Localization.getString("safely_disconnect_drive");
      button1.setAttribute(
        "onclick",
        `DiskManager.unmount('${disk}', this.parentElement)`,
      );
      div.appendChild(button1);

      DiskManager.disks[disk].forEach((partition) => {
        var p = document.createElement("p");
        p.textContent = Localization.getString("partition") + ": " + partition;
        div.appendChild(p);
      });
      element.appendChild(div);
    }
  }
}
