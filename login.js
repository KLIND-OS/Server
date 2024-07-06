class Login {
  static async loadBackgroundLockScreen() {
    var path = localStorage.getItem("background-lockScreen");
    if (path == "" || path == null) {
      // idk
    } else if (await mainFileManager.fileExists(path)) {
      document.querySelector(".loginfirst").style.backgroundImage =
        "url(http://localhost:9999" + path + ")";
    } else {
      control.dowhenlogin.add(() => {
        spawnNotification(
          "UI",
          Localization.getString("lock_wallpaper_not_found"),
        );
      });
    }
  }

  static logout() {
    document.querySelector(".loginfirst").style.top = "0px";
    control.loged = false;
    document.querySelector(".login").classList.remove("displaynone");
    setTimeout(() => {
      document.querySelector(".login").style.opacity = "1";
    }, 10);
  }

  static load() {
    setInterval(() => {
      var d = new Date();
      let hour;
      let minutes;
      if (d.getHours() < 10) {
        hour = "0" + d.getHours();
      } else {
        hour = d.getHours();
      }
      if (d.getMinutes() < 10) {
        minutes = "0" + d.getMinutes();
      } else {
        minutes = d.getMinutes();
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

    this.loadBackgroundLockScreen();

    if (localStorage.getItem("unsafe.login") == "false") {
      document.querySelector(".login").classList.add("displaynone");
    }

    if (localStorage.getItem("customicon") != null) {
      const customicon = localStorage.getItem("customicon");
      if (customicon == "") {
        document.getElementById("userimg").src = "icons/user.svg";
      } else {
        const content = mainFileManager.getContent(customicon);
        if (content == false) {
          control.dowhenlogin.add(() => {
            spawnNotification(
              "UI",
              Localization.getString("profile_picture_not_found"),
            );
          });
        } else {
          document.getElementById("userimg").src = content;
        }
      }
    }

    if (localStorage.getItem("username") != null) {
      const usernamecookie = localStorage.getItem("username");
      document.getElementById("username").innerHTML = usernamecookie;
    }

    document.querySelector(".loginpass").addEventListener("keypress", (e) => {
      if (e.key == "Enter") {
        Login.submitLogin();
      }
    });
  }

  static submitLogin() {
    if (
      localStorage.getItem("password") ==
      hashCode(document.querySelector("#password").value)
    ) {
      return Login.login();
    }
    document.querySelector("#pokusy").innerHTML = Localization.getString("invalid_password");
    document.querySelector("#password").value = "";
  }

  static loadFaces() {
    document.getElementById("facerecif").src = "face";
    document.getElementById("facerec").style.display = "block";
  }

  static login() {
    document.querySelector(".login").style.opacity = "0";
    control.dowhenlogin.loged();
    control.loged = true;
    setTimeout(() => {
      document.querySelector(".login").classList.add("displaynone");
      document.querySelector("#password").value = "";
      document.getElementById("pokusy").innerHTML = "";
      document.querySelector(".facerec").style.display = "none";
      document.querySelector("#facerecif").src = "about:blank";
    }, 500);
  }

  static async loadFaceButton() {
    if (
      localStorage.getItem("fa1c2e") == null ||
      localStorage.getItem("fa1c2e") == "" ||
      (await parent.mainFileManager.fileExists(
        JSON.parse(localStorage.getItem("fa1c2e"))[0],
      )) == false ||
      (await parent.mainFileManager.fileExists(
        JSON.parse(localStorage.getItem("fa1c2e"))[1],
      )) == false
    ) {
      document.querySelector("#sdsdaasd").style.display = "none";
    } else {
      document.querySelector("#sdsdaasd").style.display = "block";
    }
  }
}

window.Login = Login;
