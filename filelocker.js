class FileLocker {
  static _lockedFiles = new Set();
  static _intervals = {};
  static _lockedStatus = {};
  static _bypass = {};

  static test(file, bypass) {
    if (this._bypass[file] == bypass && bypass != undefined) {
      return false
    }

    if (this._lockedFiles.has(file)) {
      return true
    }

    return (
      [...this._lockedFiles].some((item) => item.startsWith(file))
    );
  }

  static remove(file, bypass) {
    if (this._bypass[file] !== bypass) {
      return
    }

    this._lockedFiles.delete(file);
    clearInterval(this._intervals[file]);
    delete this._intervals[file];
    delete this._lockedStatus[file];
  }

  static add(file) {
    if (this.test(file)) {
      return;
    }

    this._lockedFiles.add(file);
    this._lockedStatus[file] = new Date().getTime();

    const id = setInterval(() => {
      const time = this._lockedStatus[file];
      const now = new Date().getTime();

      if (now - time > 10000) {
        this.remove(file, bypass);
      }
    }, 5200);

    this._intervals[file] = id;

    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this._bypass[file] = result;

    return result;
  }

  static _generate() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    if (Object.keys(this._intervals).includes(result)) {
      return this._generate();
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
    BPrompt.alert(`Tento soubor je používán jiným programem!`);
  }

  static fullTest(file) {
    if (this.test(file)) {
      this.lockedError();
      throw new FileUsedError("This file is alredy used!");
    }
  }
}

class FileAlreadyLockedError extends Error {
  constructor(message) {
    this.message = message;
    this.name = "FileAlreadyLockedError";
  }
}

class FileUsedError {
  constructor(message) {
    this.message = message;
    this.name = "FileAlreadyLockedError";
  }
}

window.FileLocker = FileLocker;
