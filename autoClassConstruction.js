class ClassConstructor {
  static _getRandomName() {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 20) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    if (Object.keys(ClList).includes(result)) {
      return this._getRandomName();
    }
    return result;
  }
  static add(classVar) {
    const randomName = this._getRandomName();
    ClList[randomName] = new classVar(randomName);
  }
}
const ClList = {

};
