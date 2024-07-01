class LocalStorage {
  static systemLocalStorage = [
    "customcss",
    "mode",
    "desktop-icons",
    "clocktype",
    "customapps",
    "desktop-icons",
    "fa1c2e",
    "background",
    "folders-uploaded",
    "installed",
    "autotaskschovat",
    "username",
    "password",
    "updatesklindows",
    "background-lockScreen",
    "customicon",
    "ajdhasgdhagsdhjgasdghjasdbbbvjihztterw",
    "poznamkysave",
    "velikostpismapoznamky",
    "barvapismapoznamky",
    "filePreview",
    "budiky",
    "login-background",
    "bootType",
    "getStartedClosed",
    "color-filters",
    "searchEngine",
    "zoom",
    "nodePackages",
    "windowanimation",
    "fileopenPreferences",
  ];
  static startsWith = ["tinymce-", "SandboxConsole", "plyr"];
  static customApps = [];
  static getAllLocalStorages() {
    return [
      LocalStorage.systemLocalStorage.concat(LocalStorage.customApps),
      LocalStorage.startsWith,
    ];
  }
}
