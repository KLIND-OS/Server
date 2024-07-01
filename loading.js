// Needs to be outside of the setup function
setTimeout(
  () => {
    var isloadid = "";
    try {
      isloadid =
        document.querySelector(".displaynoneimpor").classList[1] ==
        "displaynoneimpor";
    } catch {
      isloadid = false;
    }
    if (isloadid == false) {
      setTimeout(() => {
        error(
          "0x0000572",
          "KLIND OS cannot load | KLIND OS se nemohl spustit",
          "KLIND OS | Load",
        );
      }, 500);
    }
  },
  3 * 60 * 1000,
);

class Loading {
  static setup() {
    setTimeout(() => {
      document.querySelector(".loading").style.top = "-100vh";
      setTimeout(() => {
        document.querySelector(".loading").classList.add("displaynoneimpor");
        if (!Boot.safeBoot) control.dowhenlogin.loaded();
        new Howl({
          src: ["sounds/startup.mp3"],
          autoplay: true,
        });
      }, 700);
      document.getElementById("favicon").setAttribute("href", "logo.ico");
      document.title = titleklindows + " " + version;
    }, 790);
    document.getElementById("password").focus();
    document.getElementById("password").select();
  }
}
