class FileopenPreferences {
  static getApp(fileType) {
    const preferences = JSON.parse(
      localStorage.getItem("fileopenPreferences") || "{}",
    );
    return preferences[fileType];
  }
}
