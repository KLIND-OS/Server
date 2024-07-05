class WordEditor {
  static async save(element) {
    const fileLocation = element.getAttribute("filelocation");
    const bypass = element.getAttribute("bypass");

    let lastSlashIndex = fileLocation.lastIndexOf("/");
    let directory = fileLocation.substring(0, lastSlashIndex + 1);
    let filename = fileLocation.substring(lastSlashIndex + 1);
    const content = element.querySelector(".tox-edit-area__iframe")
      .contentWindow.document.body.innerHTML;

    const parts = fileLocation.split(".");
    const end = parts[parts.length - 1];

    if (end == "html") {
      try {
        await mainFileManager.save(fileLocation, content, bypass, "utf8");
      } catch {
        FileLocker.lockedError();
      }
    } else {
      BPrompt.confirm(
        Localization.getString("convert_to_html"),
        async (reponse) => {
          if (reponse) {
            await mainFileManager.createFile({
              name: filename + ".html",
              parentFolder: directory,
            });
            await mainFileManager.save(
              fileLocation + ".html",
              content,
              undefined,
              "utf8",
            );
          }
        },
      );
    }
  }
}
