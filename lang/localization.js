class Localization {
  static _strings = {};

  static loadStrings() {
    const lang = localStorage.getItem("lang") || "cs";
    const request = new XMLHttpRequest();
    request.open("GET", `/lang/sources/${lang}/strings.json5`, false);
    request.send(null);

    if (request.status !== 200) {
      return;
    }

    const data = request.responseText;
    const strings = JSON5.parse(data);

    this._strings = strings;
  }

  static getString(x) {
    const value = this._strings[x];
    if (!value) {
      console.error("Invalid key:", x);
    }
    return value;
  }
  static loadDOM() {
    // I know, I know, this is shit. But like I don't want to have any localization tool for this.
    // I want to have full control over it and also, I didn't find any localization tool for web that whould do exactly this.
    // Probably because this is not the way you do it. But it is OS, not a website.

    const el = document.body;
    const allElements = Array.prototype.slice.call(
      el.getElementsByTagName("*"),
    );

    allElements.forEach((element) => {
      const contents = [
        [element.innerHTML, (data) => (element.innerHTML = data)],
        [element.placeholder, (data) => (element.placeholder = data)],
      ];

      for (const content of contents) {
        if (!content[0]) continue;

        const contentData = content[0]?.trim() || "";

        if (!contentData.startsWith("$[") || !contentData.endsWith("];")) {
          return;
        }

        const startIndex = contentData.indexOf("[") + 1;
        const endIndex = contentData.indexOf("]");

        if (!(startIndex > 0 && endIndex > startIndex)) {
          return console.error("Invalid format:", textContent);
        }
        const parsed = contentData.substring(startIndex, endIndex);

        const value = this.getString(parsed);

        if (!value) {
          return;
        }

        content[1](value);
      }
    });
  }
}
