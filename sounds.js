function internet_down() {
  new Howl({
    src: ["sounds/internet-down.mp3"],
    autoplay: true,
  });
}
function internet_up() {
  new Howl({
    src: ["sounds/internet-up.mp3"],
    autoplay: true,
  });
}
// Todo: Make new sounds
function batteryIn() {
  new Howl({
    src: ["sounds/internet-up.mp3"],
    autoplay: true,
  });
}
function batteryOut() {
  new Howl({
    src: ["sounds/internet-down.mp3"],
    autoplay: true,
  });
}
