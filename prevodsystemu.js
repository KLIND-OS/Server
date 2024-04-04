async function prevedsystem() {
  const writeFile = LowLevelApi.filesystem.writeFile;
  const exec = LowLevelApi.filesystem.promisify(LowLevelApi.child_process.exec);
  function allStorage() {
    var archive = [],
      keys = Object.keys(localStorage),
      i = 0,
      key;
    for (; (key = keys[i]); i++) {
      archive.push([key, localStorage.getItem(key)]);
    }
    return archive;
  }

  const storage = allStorage();
  const path = LowLevelApi.filesystem.os.homedir();
  spawnNotification("Převod", "Začínám vytvářet soubor");
  const filename =
    new Date().toISOString().replace("T", " ").split(".")[0] + ".klindos";

  await writeFile(
    LowLevelApi.filesystem.path.join(path, "localStorage.json"),
    JSON.stringify(storage),
    {
      encoding: "UTF-8",
    },
  );
  await writeFile(
    LowLevelApi.filesystem.path.join(path, "version.data"),
    version,
  );
  await exec(`zip -r '.prevod.tmp' usrfiles localStorage.json version.data -x usrfiles/Devices usrfiles/root`, {
    cwd: path,
  });
  await exec(`rm localStorage.json`, {
    cwd: path,
  });
  await exec(`rm version.data`, {
    cwd: path,
  });
  await exec(`mv .prevod.tmp 'usrfiles/${filename}'`, {
    cwd: path,
  });
  spawnNotification("Převod", `Soubor byl vytvořen: ${filename}`);
}

async function submitPrevodFile(filepath) {
  const readFile = LowLevelApi.filesystem.readFile;
  const exec = LowLevelApi.filesystem.promisify(LowLevelApi.child_process.exec);
  const path = LowLevelApi.filesystem.os.homedir();
  const pathModule = LowLevelApi.filesystem.path;
  await exec("mkdir .prevod.tmp", { cwd: path });

  await exec(`unzip 'usrfiles${filepath}' -d .prevod.tmp`, { cwd: path });
  
  // Copy localStorage
  localStorage.clear();
  const storageJSON = await readFile(
    `${pathModule.join(path, ".prevod.tmp", "localStorage.json")}`,
    { encoding: "UTF-8" },
  );
  const storage = JSON.parse(storageJSON);

  for (const item of storage) {
    localStorage.setItem(item[0], item[1]);
  }

  // Copy files
  await exec(`rm -rf ~/usrfiles`);
  await exec(`mv ~/.prevod.tmp/usrfiles ~/usrfiles`)

  await exec(`rm -rf ~/.prevod.tmp`)
}
function submitnjahsbdjksabd() {
  control.fileManager.fileSelect({
    success: async (filePath) => {
      await submitPrevodFile(filePath);
    },
    closed: () => {},
  });
}
