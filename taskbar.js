class Taskbar {
  static val = false;

  static load() {
    if (localStorage.getItem("autotaskschovat") == "true") {
      Taskbar.val = true;
      document.getElementById("downbar").style.bottom = "-50px";
    }

    $(function () {
      $(".fakedownbar").on({
        mouseover: function () {
          Taskbar.downbarover();
        },
        mouseout: function () {
          Taskbar.downbarout();
        },
      });
    });
    $(function () {
      $(".downbar").on({
        mouseover: function () {
          Taskbar.downbarover();
        },
        mouseout: function () {
          Taskbar.downbarout();
        },
      });
    });
  }

  static downbarover() {
    if (Taskbar.val) document.getElementById("downbar").style.bottom = "0";
  }
  static downbarout() {
    if (Taskbar.val) document.getElementById("downbar").style.bottom = "-50px";
  }

  static set(value) {
    if (value) {
      Taskbar.val = true;
      localStorage.setItem("autotaskschovat", "true");
      document.getElementById("downbar").style.bottom = "-50px";
    } else {
      Taskbar.val = false;
      localStorage.setItem("autotaskschovat", "false");
      document.getElementById("downbar").style.bottom = "0";
    }
  }
}

window.Taskbar = Taskbar;
