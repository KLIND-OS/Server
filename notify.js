var openednotifi = false;
var appnameinfo;
var textinfo;
function spawnNotification(appname, text) {
  if (DoNotDisturb.running) {
    NotificationCenter.add(appname, text);
  }
  else {
    if (openednotifi != true) {
      document.getElementById("hinotifi").innerHTML = appname;
      document.getElementById("pnotifi").innerHTML = text;
      document.querySelector(".notifidiv").classList.add("openedlol");
      setTimeout(() => {
        document.querySelector(".notifidiv").classList.remove("dnlol");
      }, 500);
      openednotifi = true;
      dagbdhvbahsd = setTimeout(() => {
        NotificationCenter.add(appname, text);
        closenotifi();
      }, 5000);
    }
    else {
      setTimeout(() => {
        spawnNotification(appname, text);
      }, 1000);
    }
  }
}
function closenotifi() {
  document.querySelector(".notifidiv").classList.remove("openedlol");
  clearTimeout(dagbdhvbahsd);
  setTimeout(() => {
    document.querySelector(".notifidiv").classList.add("dnlol");
    setTimeout(() => {
      openednotifi = false;
    }, 200);
  }, 500);
}

class NotificationCenter {
  static #opened = false;
  static moving = false;
  static show() {
    if (NotificationCenter.moving) return;

    if (!NotificationCenter.#opened) {
      NotificationCenter.moving = true;
      document.querySelector(".notification-center-element").style.display = "block";
      setTimeout(() => {
        document.querySelector(".notification-center-element").style.right = "10px";
        setTimeout(() => {
          NotificationCenter.moving = false;
        }, 600);
        NotificationCenter.#opened = true;
      }, 10);
    }
    else {
      document.querySelector(".notification-center-element").style.right = "-350px";
      NotificationCenter.moving = true;
      setTimeout(() => {
        document.querySelector(".notification-center-element").style.display = "none";
        NotificationCenter.#opened = false;
        NotificationCenter.moving = false;
      }, 600);
        
    }
  }
  static add(appname, text) {
    var notification = document.createElement("div");
    notification.classList.add("notification");
    var h1 = document.createElement("h1");
    h1.innerHTML = appname;
    var p = document.createElement("p");
    p.innerHTML = text;
    var closebtn = document.createElement("div");
    closebtn.classList.add("closebtn");
    closebtn.innerHTML = "X";
    closebtn.onclick = () => {
      NotificationCenter.closeNotification(notification);
    };
    notification.appendChild(h1);
    notification.appendChild(p);
    notification.appendChild(closebtn);
    document.querySelector(".notification-center-element").appendChild(notification);
  }
  static closeNotification(notification) {
    notification.remove();
  }
}
