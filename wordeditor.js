class WordEditor {
  static async save(element) {
    const fileLocation = element.getAttribute("filelocation");
    let lastSlashIndex = fileLocation.lastIndexOf("/");
    let directory = fileLocation.substring(0, lastSlashIndex + 1);
    let filename = fileLocation.substring(lastSlashIndex + 1);
    const content = element.querySelector(".tox-edit-area__iframe")
      .contentWindow.document.body.innerHTML;

    const parts = fileLocation.split(".");
    const end = parts[parts.length - 1];

    if (end == "html") {
      try {
        await mainFileManager.saveText(fileLocation, content);
      } catch {
        FileLocker.lockedError();
      }
    } else {
      BPrompt.confirm(
        "Soubor musí být převeden do formátu HTML aby se mohl uložit. Chcete pokračovat?",
        async (reponse) => {
          if (reponse) {
            await mainFileManager.createFile({
              name: filename + ".html",
              parentFolder: directory,
            });
            await mainFileManager.saveText(fileLocation + ".html", content);
          }
        },
      );
    }
  }
}
