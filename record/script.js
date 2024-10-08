"use strict";

let mediaRecorder;
let recordedBlobs;

const errorMsgElement = document.querySelector("span#errorMsg");
const recordedVideo = document.querySelector("video#recorded");
const recordButton = document.querySelector("button#record");
const playButton = document.querySelector("button#play");
const downloadButton = document.querySelector("button#download");

recordButton.addEventListener("click", () => {
  if (recordButton.textContent === parent.Localization.getString("record")) {
    startRecording();
  } else {
    stopRecording();
    recordButton.textContent = parent.Localization.getString("record");
    playButton.disabled = false;
    downloadButton.disabled = false;
  }
});

playButton.addEventListener("click", () => {
  const superBuffer = new Blob(recordedBlobs, { type: "video/webm" });
  recordedVideo.src = null;
  recordedVideo.srcObject = null;
  recordedVideo.src = window.URL.createObjectURL(superBuffer);
  recordedVideo.controls = true;
  recordedVideo.play();
});

downloadButton.addEventListener("click", async () => {
  await parent.control.fileManager.createFile({
    name: "record.mp4",
  });
  const blob = recordedBlobs[recordedBlobs.length - 1];
  const reader = new FileReader();
  reader.onload = async function () {
    const binary = reader.result;
    await parent.mainFileManager.save("/record.mp4", binary);
    parent.spawnNotification(
      parent.Localization.getString("video_recorder"),
      parent.Localization.getString("file_was_saved"),
    );
    parent.windows.open("filemanager");
  };
  reader.readAsBinaryString(blob);
});

function handleDataAvailable(event) {
  console.log("handleDataAvailable", event);
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}

function startRecording() {
  recordedBlobs = [];
  let options = { mimeType: "video/webm;codecs=vp9,opus" };
  try {
    mediaRecorder = new MediaRecorder(window.stream, options);
  } catch (e) {
    console.error("Exception while creating MediaRecorder:", e);
    errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`;
    return;
  }

  console.log("Created MediaRecorder", mediaRecorder, "with options", options);
  recordButton.textContent = parent.Localization.getString("stop_recording");
  playButton.disabled = true;
  downloadButton.disabled = true;
  mediaRecorder.onstop = (event) => {
    console.log("Recorder stopped: ", event);
    console.log("Recorded Blobs: ", recordedBlobs);
  };
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start();
  console.log("MediaRecorder started", mediaRecorder);
}

function stopRecording() {
  mediaRecorder.stop();
}

function handleSuccess(stream) {
  recordButton.disabled = false;
  console.log("getUserMedia() got stream:", stream);
  window.stream = stream;

  const gumVideo = document.querySelector("video#gum");
  gumVideo.srcObject = stream;
}

async function init(constraints) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
  } catch (e) {
    console.error("navigator.getUserMedia error:", e);
    errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
  }
}

document.querySelector("button#start").addEventListener("click", async () => {
  const hasEchoCancellation =
    document.querySelector("#echoCancellation").checked;
  const constraints = {
    audio: {
      echoCancellation: { exact: hasEchoCancellation },
    },
    video: {
      width: 1280,
      height: 720,
    },
  };
  console.log("Using media constraints:", constraints);
  await init(constraints);
});
