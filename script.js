//CONFIG VARS
var login;
var developermode;

window.close = () => {
  throw new Error(
    "Don't use window.close. Use LowLevelApi.Program.close(). GUI will start again right after that. For turning off computer use LowLevelApi.Power.poweroff()",
  );
};

async function fileEditorSaveText(location, text, bypass) {
  try {
    await mainFileManager.save(location, text, bypass, "utf8");
  } catch (FileUsedError) {
    FileLocker.lockedError();
  }
}
