function asdkjasldjklasdjkl(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
function idiot() {
  var app = new App({
    name: "Idiot",
    hidden: true,
  });
  app.createWindow({
    name: "Idiot",
    buttons: {},
    content: "<h1>You are an idiot!</h1>",
    defaultWindow: true,
    onStart: () => {},
    _forcePlainHTML: true,
  });
  var x = 0;
  setInterval(() => {
    if (x < 50) {
      windows.open(Apps["Idiot"]);
      x++;
    }
  }, 500);
  setInterval(() => {
    var windows = document.querySelectorAll(".window");
    var width = window.innerWidth;
    var height = window.innerHeight;
    for (var i = 0; i < windows.length; i++) {
      var top = asdkjasldjklasdjkl(0, height - 200);
      var left = asdkjasldjklasdjkl(0, width - 200);
      windows[i].style.top = top + "px";
      windows[i].style.left = left + "px";
    }
  }, 200);
  var sound = new Howl({
    src: ["/yaanidiot.mp3"],
    volume: 0.5,
    loop: true,
  });
  sound.play();
  spawnNotification("Idiot!", "Restart your PC.");
}
