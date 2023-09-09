class Cleaner {
    static load(win) {
        var loadedStorage = Cleaner.loadStorage()
        var content = win.querySelector(".keys")
        content.innerHTML = ""

        for (const key of loadedStorage) {
            var element = document.createElement("div")
            element.textContent = key
            content.appendChild(element)
        }
    }
    static loadStorage() {
        var correctStorages = LocalStorage.getAllLocalStorages()
        var allStorages = Object.keys(localStorage)
        var badLocalStorages = []
        for (const key of allStorages) {
            if (!correctStorages.includes(key)) {
                badLocalStorages.push(key)
            }
        }
        return badLocalStorages
    }
    static clean() {
        const remove = Cleaner.loadStorage()
        for (const key of remove) {
            localStorage.removeItem(key)
        }
    }
}