function changeArray(index, arr) {
  const firstPart = arr.slice(index);
  const secondPart = arr.slice(0, index);
  return firstPart.concat(secondPart);
}

const urlParams = new URLSearchParams(document.location.search);

var filePath = urlParams.get("filePath");
var startFile = filePath.split("/")[filePath.split("/").length - 1];
var fileFolder = filePath
  .replace(filePath.split("/")[filePath.split("/").length - 1], "")
  .split("/");
fileFolder.pop();
fileFolder = fileFolder.join("/");

// Load songs

function playPlaylist(playlist, sliderElement) {
  var currentIndex = 0;
  var player = null;
  var isSeeking = false;

  function playTrack() {
    if (player) {
      player.stop();
      player.unload();
      player = null;
    }
    if (currentIndex >= playlist.length) {
      return;
    }
    const parts = playlist[currentIndex].split("/");
    var songname = parts[parts.length - 1];
    document.getElementById("name").textContent = songname;
    var track = playlist[currentIndex];
    player = new Howl({
      src: [track],
      onend: function () {
        currentIndex++;
        playTrack();
      },
      onplay: function () {
        requestAnimationFrame(updateSlider);
      },
    });
    player.play();
  }

  function pauseTrack() {
    if (player) {
      player.pause();
    }
  }

  function resumeTrack() {
    if (player) {
      player.play();
    }
  }

  function setTrackPosition(percent) {
    if (player) {
      var duration = player.duration();
      var position = duration * percent;
      player.seek(position);
    }
  }

  function updateSlider() {
    if (!isSeeking && player) {
      var duration = player.duration();
      var position = player.seek();
      var percent = (position / duration) * 100;
      sliderElement.value = percent;
    }
    requestAnimationFrame(updateSlider);
  }

  sliderElement.addEventListener("mousedown", function () {
    isSeeking = true;
  });

  sliderElement.addEventListener("mouseup", function () {
    isSeeking = false;
    var percent = sliderElement.value / 100;
    setTrackPosition(percent);
  });

  playTrack();
  function nextTrack() {
    currentIndex++;
    if (currentIndex >= playlist.length) {
      currentIndex = 0;
    }
    playTrack();
  }

  function previousTrack() {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = playlist.length - 1;
    }
    playTrack();
  }
  return {
    pause: pauseTrack,
    play: resumeTrack,
    setTrackPosition: setTrackPosition,
    next: nextTrack,
    previous: previousTrack,
  };
}
var sliderElement, playlistPlayer, playing;

(async () => {
  var allSongsFromFolder = await parent.mainFileManager.allFiles(fileFolder);
  var allFiltered = new Array();
  allSongsFromFolder.forEach((x) => {
    const parts = x.split(".");
    if (
      ["mp3", "waw", "ogg", "aac", "m4a", "wma"].includes(
        parts[parts.length - 1],
      )
    )
      allFiltered.push(x);
  });
  var startIndex;
  for (var i = 0; i < allFiltered.length; i++) {
    if (allFiltered[i] == startFile) {
      startIndex = i;
      break;
    }
  }

  var playlistFull = changeArray(startIndex, allFiltered);
  var finalPlayList = new Array();
  for (let i = 0; i < playlistFull.length; i++) {
    finalPlayList.push(
      "http://localhost:9999" + fileFolder + "/" + playlistFull[i],
    );
  }

  sliderElement = document.getElementById("slider");

  playlistPlayer = playPlaylist(finalPlayList, sliderElement);
  playing = true;
})();

function playPause() {
  if (playing) {
    playlistPlayer.pause();
    document.getElementById("playpause").textContent = "Play";
    playing = false;
  } else {
    playlistPlayer.play();
    document.getElementById("playpause").textContent = "Pause";
    playing = true;
  }
}
