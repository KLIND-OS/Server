class FileLocker {
  static _lockedFiles = new Set();
  static _intervals = {};
  static _lockedStatus = {};
  static _bypass = {};

  static test(file, bypass) {
    if (this._bypass[file] == bypass && bypass != undefined) {
      return false;
    }

    if (this._lockedFiles.has(file)) {
      return true;
    }

    return [...this._lockedFiles].some((item) => item.startsWith(file));
  }

  static remove(file, bypass) {
    if (this._bypass[file] !== bypass) {
      return;
    }

    this._lockedFiles.delete(file);
    clearInterval(this._intervals[file]);
    delete this._intervals[file];
    delete this._lockedStatus[file];
  }

  static add(file) {
    const bypass = this._generate();
    if (this.test(file)) {
      return;
    }

    const id = setInterval(() => {
      const time = this._lockedStatus[file];
      const now = new Date().getTime();

      if (now - time > 10000) {
        this.remove(file, bypass);
      }
    }, 5200);

    this._lockedFiles.add(file);
    this._lockedStatus[file] = new Date().getTime();
    this._intervals[file] = id;
    this._bypass[file] = bypass;

    return bypass;
  }

  static _generate() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < 20; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  static continue(file) {
    if (!Object.keys(this._lockedStatus).includes(file)) {
      return;
    }
    const time = new Date().getTime();
    this._lockedStatus[file] = time;
  }
  static lockedError() {
    BPrompt.alert(Localization.getString("this_file_is_used"));
  }

  static fullTest(file) {
    if (this.test(file)) {
      this.lockedError();
      throw new FileUsedError("This file is already used!");
    }
  }
}

class FileUsedError {
  constructor(message) {
    this.message = message;
    this.name = "FileUsedError";
  }
}

window.FileLocker = FileLocker;
