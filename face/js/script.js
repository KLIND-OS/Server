let localStoragePaths;

document.body.onload = async () => {
  var isinstalled = localStorage.getItem("fa1c2e");
  localStoragePaths = JSON.parse(localStorage.getItem("fa1c2e"));
  if (
    isinstalled == null ||
    isinstalled == "" ||
    (await parent.mainFileManager.fileExists(
      JSON.parse(localStorage.getItem("fa1c2e"))[0],
    )) == false ||
    (await parent.mainFileManager.fileExists(
      JSON.parse(localStorage.getItem("fa1c2e"))[1],
    )) == false
  ) {
    window.location.replace("/notinstalled.html");
  }

  const video = document.getElementById("videoInput");
  Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
    faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
  ]).then(start);

  async function start() {
    try {
      navigator.getUserMedia(
        { video: {} },
        (stream) => (video.srcObject = stream),
        (err) =>
          (document.getElementById("messagespan").innerHTML =
            "Při načítání fotoaparátu došlo k chybě. Zkuste to znovu a povolte fotoaparát. Chcete-li znovu načíst, klikněte pravým tlačítkem a klikněte na znovu načíst. Error:" +
            err),
      );
    } catch (e) {
      document.getElementById("messagespan").innerHTML =
        "Váš prohlížeč zabránil požádat vás o kameru. Je to pravděpodobně proto, že vaše stránka nepoužívá https://, ale http:// nebo že nemáte žádnou kameru.";
      setTimeout(() => {
        window.location.replace("about:blank");
        parent.document.querySelector("#dsaigsdiasd").style.display = "none";
      }, 5000);
    }

    async function loadLabeledImages() {
      const descriptions = [];
      for (let i = 1; i <= 2; i++) {
        const img = await faceapi.fetchImage(
          "http://localhost:9999" + localStoragePaths[i - 1],
        );
        const detections = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();
        descriptions.push(detections.descriptor);
      }
      return new faceapi.LabeledFaceDescriptors("nice", descriptions);
    }

    const labeledDescriptors = await loadLabeledImages();
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.7);

    video.addEventListener("play", async () => {
      const canvas = faceapi.createCanvasFromMedia(video);
      document.body.append(canvas);

      const displaySize = { width: video.width, height: video.height };
      faceapi.matchDimensions(canvas, displaySize);

      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(video)
          .withFaceLandmarks()
          .withFaceDescriptors();

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize,
        );

        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

        const results = resizedDetections.map((d) => {
          return faceMatcher.findBestMatch(d.descriptor);
        });

        for (const result of results) {
          if (result._label == "nice") {
            parent.loginCorrect();
            return;
          }
        }
      }, 100);
    });
    video.play();
  }
};
