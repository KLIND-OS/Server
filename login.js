setInterval(() => {
  var d = new Date();
  if (d.getHours() < 10) {
    var hour = "0" + d.getHours();
  } else {
    var hour = d.getHours();
  }
  if (d.getMinutes() < 10) {
    var minutes = "0" + d.getMinutes();
  } else {
    var minutes = d.getMinutes();
  }
  document.querySelector(".timelogin").innerHTML = hour + ":" + minutes;
  document.querySelector(".datelogin").innerHTML =
    d.getDate() +
    ". " +
    [
      "ledna",
      "února",
      "března",
      "dubna",
      "května",
      "června",
      "července",
      "srpna",
      "zaří",
      "října",
      "listopadu",
      "prosince",
    ][d.getMonth()] +
    " " +
    d.getFullYear();
}, 1000);
async function loadBackgroundLockScreen() {
  var path = localStorage.getItem("background-lockScreen");
  if (path == "" || path == null) {
  } else if (await mainFileManager.fileExists(path)) {
    document.querySelector(".loginfirst").style.backgroundImage =
      "url(http://localhost:9999" + path + ")";
  } else {
    control.dowhenlogin.add(() => {
      spawnNotification("UI", "Obrázek pro zamykací obrazovku nebyl nalezen!");
    });
  }
}
loadBackgroundLockScreen();
$(function () {
  $(".loginfirst").draggable({
    axis: "y",
    scroll: false,
    start: (e) => {
      e.target.style.transition = "";
    },
    stop: (e) => {
      var top = e.target.style.top.replace("px", "");
      var windowHeight = window.innerHeight;
      if (e.target.style.top.replace("px", "") > 0) {
        e.target.style.transition = "ease 0.7s top";
        e.target.style.top = "0px";
        setTimeout(() => {
          e.target.style.transition = "";
        }, 700);
      } else if (Math.abs(top) > windowHeight / 2) {
        e.target.style.transition = "ease 0.7s top";
        e.target.style.top = "-100vh";
        setTimeout(() => {
          e.target.style.transition = "";
        }, 700);
      } else {
        e.target.style.transition = "ease 0.7s top";
        e.target.style.top = "0px";
        setTimeout(() => {
          e.target.style.transition = "";
        }, 700);
      }
    },
  });
});
const passwordcookie = localStorage.getItem("password");
if (localStorage.getItem("customicon") != null) {
  const customicon = localStorage.getItem("customicon");
  if (customicon == "") {
    document.getElementById("userimg").src = "icons/user.svg";
  } else {
    const content = mainFileManager.getContent(customicon);
    if (content == false) {
      control.dowhenlogin.add(() => {
        spawnNotification(
          "Uživatelské rozhraní",
          "Profilovka nebyla nalazena v souborech!",
        );
      });
    } else {
      document.getElementById("userimg").src = content;
    }
  }
}
function logout() {
  document.querySelector(".loginfirst").style.top = "0px";
  control.loged = false;
  document.querySelector(".login").classList.remove("displaynone");
  setTimeout(() => {
    document.querySelector(".login").style.opacity = "1";
  }, 10);
}
if (localStorage.getItem("username") != null) {
  const usernamecookie = localStorage.getItem("username");
  document.getElementById("username").innerHTML = usernamecookie;
}
function loginCorrect() {
  pokusy = 5;
  document.querySelector(".login").style.opacity = "0";
  control.dowhenlogin.loged();
  control.loged = true;
  setTimeout(() => {
    document.querySelector(".login").classList.add("displaynone");
    document.querySelector("#password").value = "";
    document.getElementById("pokusy").innerHTML = "";
    document.querySelector(".dsaigsdiasd").style.display = "none";
    document.querySelector("#hasdgashdjasj").src = "about:blank"
  }, 500);
}
var pokusy = 5;
function submitlogin() {
  var password = document.getElementById("password").value;
  var hashed = hashCode(password);
  if (pokusy == 0) {
  } else if (password == "") {
  } else if (hashed == passwordcookie) {
    loginCorrect();
  } else {
    if (pokusy == 1) {
      pokusy--;
      var casyasjk = 60;
      document.getElementById("pokusy").innerHTML =
        "Na 60s se ti<br>zablokuje přihlášení.";
      var asdhjklasjd = setInterval(() => {
        casyasjk--;
        document.getElementById("pokusy").innerHTML =
          "Na " + casyasjk + "s se ti<br>zablokuje přihlášení.";
      }, 1000);
      setTimeout(() => {
        document.getElementById("pokusy").innerHTML = "";
        document.getElementById("password").value = "";
        pokusy = 5;
        clearInterval(asdhjklasjd);
      }, 60000);
    } else {
      document.getElementById("password").value = "";
      pokusy--;
      document.getElementById("pokusy").innerHTML =
        "Zbývající pokusy: " + pokusy;
    }
  }
}
var formulelogin;
function loadfaces() {
  document.getElementById("hasdgashdjasj").src = "face";
  document.getElementById("dsaigsdiasd").style.display = "block";
}
var url = window.location.href;

if (facerecognition == "false") {
  document.getElementById("sdsdaasd").style.display = "none";
}
document.querySelector(".loginpass").addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    submitlogin();
  }
});
