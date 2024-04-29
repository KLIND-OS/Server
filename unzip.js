class UnZip {
  static async init(win, path) {
    const exec = LowLevelApi.filesystem.promisify(
      LowLevelApi.child_process.exec,
    );
    const relativePath = LowLevelApi.filesystem.path.join(
      LowLevelApi.filesystem.os.homedir(),
      "usrfiles",
      path,
    );
    const parts = path.split("/");
    const filename = parts[parts.length - 1];
    const folderName = filename.replace(new RegExp(".zip$"), "");
    const currentFolder = path.replace(new RegExp("/" + filename + "$"), "");
    const relativePathFolder = LowLevelApi.filesystem.path.join(
      LowLevelApi.filesystem.os.homedir(),
      "usrfiles",
      currentFolder,
      folderName,
    );

    if (
      await mainFileManager.folderExist(
        LowLevelApi.filesystem.path.join(currentFolder, folderName),
      )
    ) {
      spawnNotification("UnZip", "Složka se stejným názvem již existuje!");
      win.querySelector(".headerclass .close").click();
      return;
    }

    await exec(`mkdir ${relativePathFolder}`);
    await exec(`unzip ${relativePath} -d ${relativePathFolder}`);

    win.querySelector("h1").textContent = "Otevírání bylo dokončeno!";

    setTimeout(() => {
      win.querySelector(".headerclass .close").click();
    }, 3000);
  }
}
