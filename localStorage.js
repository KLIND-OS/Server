class LocalStorage {
    static systemLocalStorage = [
        "volume",
        "customcss",
        "mode",
        "showedalertcookies",
        "desktop-icons",
        "clocktype",
        "customapps",
        "desktop-icons",
        "fa1c2e",
        "files-uploaded",
        "background",
        "folders-uploaded",
        "installed",
        "adasjdsad",
        "autotaskschovat",
        "username",
        "password",
        "updatesklindows",
        "background-lockScreen",
        "customicon",
        "reg.login",
        "reg.consolelog",
        "reg.autolocklogin",
        "ajdhasgdhagsdhjgasdghjasdbbbvjihztterw",
        "poznamkysave",
        "velikostpismapoznamky",
        "barvapismapoznamky",
        "welcomepage",
        "filePreview",
        "budiky",
        "login-background",
        "bootType",
        "getStartedClosed"
    ]
    static startsWith = [
        "tinymce-",
        "SandboxConsole"
    ]
    static customApps = []
    static getAllLocalStorages() {
        return [LocalStorage.systemLocalStorage.concat(LocalStorage.customApps), LocalStorage.startsWith]
    }
}