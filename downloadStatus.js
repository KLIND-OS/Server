const downloadStatusStorage = [];

class _DownloadStatus {
  static content = {};
  static add({ name }) {
    const randomNumber = Math.floor(Math.random() * 101);
    if (Object.keys(_DownloadStatus.content).includes(randomNumber)) {
      return add({ name: name });
    }
    const el = document.createElement("div");
    el.className = "download";
    el.style.opacity = "0";
    el.innerHTML = `
      <div class="rowDownload">
        <p>${name}</p>
        <p id="percentage">0%</p>
      </div>
      <div class="progressbarDownload">
        <div class="progressDownload" style="width: 0%;"></div>
      </div>
    `;
    const element = document.querySelector(".downloadList").appendChild(el);
    _DownloadStatus.content[randomNumber] = element;
    setTimeout(() => {
      element.style.opacity = "1";
    }, 10);
    return randomNumber;
  }
}

class DownloadStatus {
  id;
  constructor(filename) {
    const id = _DownloadStatus.add({
      name: filename,
    });
    this.id = id;
  }
  updatePercentage(percentage) {
    const element = _DownloadStatus.content[this.id];
    element.querySelector("#percentage").textContent = `${percentage}%`;
    element.querySelector(".progressDownload").style.width = `${percentage}%`;
  }
  finish() {
    const element = _DownloadStatus.content[this.id];
    element.querySelector("#percentage").textContent = Localization.getString("finished");
    element.querySelector(".progressDownload").style.width = "100%";
    this.id = null;

    setTimeout(() => {
      element.style.opacity = "0";
      setTimeout(() => {
        element.remove();
      }, 200);
    }, 1200);
  }
  error() {
    const element = _DownloadStatus.content[this.id];
    const percentageel = element.querySelector("#percentage");
    percentageel.textContent = Localization.getString("error") + "!";
    percentageel.style.color = "red";

    element.querySelector(".progressDownload").style.width = "0%";
    this.id = null;

    setTimeout(() => {
      element.style.opacity = "0";
      setTimeout(() => {
        element.remove();
      }, 200);
    }, 5000);
  }
  converting() {
    const element = _DownloadStatus.content[this.id];
    const percentageel = element.querySelector("#percentage");
    percentageel.textContent = Localization.getString("converting") + "...";

    element.querySelector(".progressDownload").style.width = "0%";
  }
  customMessage(message) {
    const element = _DownloadStatus.content[this.id];
    const percentageel = element.querySelector("#percentage");
    percentageel.textContent = message;

    element.querySelector(".progressDownload").style.width = "0%";
  }
}

window.DownloadStatus = DownloadStatus;
window.TrackingStatus = DownloadStatus;
