class Sounds {
  static batteryIn() {
    new Howl({
      src: ["sounds/battery-plug-in.mp3"],
      autoplay: true,
    });
  }
  static batteryOut() {
    new Howl({
      src: ["sounds/battery-plug-out.mp3"],
      autoplay: true,
    });
  }
  static devicePlugIn() {
    new Howl({
      src: ["sounds/device-plug-in.mp3"],
      autoplay: true,
    });
  }
  static devicePlugOut() {
    new Howl({
      src: ["sounds/device-plug-out.mp3"],
      autoplay: true,
    });
  }
}
