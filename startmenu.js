class StartMenu {
  static opened = false;
  static opening = false;

  static load() {
    document.addEventListener("click", (evt) => {
      const flyoutElement = document.getElementById("backsix");
      const flyoutElements = document.getElementById("logo");
      let targetElement = evt.target;

      do {
        if (
          (targetElement == flyoutElement) |
          (targetElement == flyoutElements)
        ) {
          return;
        }
        targetElement = targetElement.parentNode;
      } while (targetElement);

      if (StartMenu.opened) {
        StartMenu.close();
      }
    });
  }

  static close() {
    StartMenu.opened = false;
    document.getElementById("items-1").style.top = "0px";
    document.getElementById("items-4").style.left = "0px";
    document.getElementById("items-2").style.top = "25px";
    document.getElementById("items-3").style.left = "25px";

    document.querySelector(".startmenu").classList.remove("opened");
    StartMenu.opening = true;
    setTimeout(() => {
      document.querySelector(".startmenu").classList.remove("display");
      StartMenu.opening = false;
    }, 500);
  }

  static open() {
    if (StartMenu.opening) {
      return;
    }

    if (!StartMenu.opened) {
      StartMenu.opened = true;

      document.getElementById("items-1").style.top = "25px";
      document.getElementById("items-4").style.left = "25px";
      document.getElementById("items-2").style.top = "0px";
      document.getElementById("items-3").style.left = "0px";

      document.querySelector(".startmenu").classList.add("display");
      StartMenu.opening = true;
      setTimeout(() => {
        document.querySelector(".startmenu").classList.add("opened");
      }, 20);
      setTimeout(() => {
        StartMenu.opening = false;
      }, 500);

      setTimeout(() => {
        document.getElementById("searchstartmenu").focus();
      }, 130);
    } else {
      StartMenu.opened = false;

      document.getElementById("items-1").style.top = "0px";
      document.getElementById("items-4").style.left = "0px";
      document.getElementById("items-2").style.top = "25px";
      document.getElementById("items-3").style.left = "25px";

      document.querySelector(".startmenu").classList.remove("opened");
      StartMenu.opening = true;
      setTimeout(() => {
        document.querySelector(".startmenu").classList.remove("display");
        StartMenu.opening = false;
      }, 500);
    }
  }

  static Search = class {
    static _normalize(text) {
      return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    static search() {
      var a, txtValue;
      var input = document.getElementById("searchstartmenu");
      var ul = document.getElementById("liststartmenu");
      var li = ul.getElementsByTagName("li");
      var isShowed = false;
      ul.querySelector(".searchHelpLi").style.display = "none";
      for (var i = 0; i < li.length; i++) {
        if (li[i].classList.contains("searchHelpLi")) continue;
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        var text = StartMenu.Search._normalize(txtValue.toUpperCase()).trim();
        var filterText = StartMenu.Search._normalize(
          input.value.toUpperCase(),
        ).trim();
        if (text.indexOf(filterText) > -1) {
          isShowed = true;
          li[i].style.display = "";
        } else {
          li[i].style.display = "none";
        }
      }
      if (!isShowed) {
        if (input.value.length > 20) {
          var showInputValue =
            input.value.split("", 20).join("").trim() + "...";
        } else {
          var showInputValue = input.value;
        }
        ul.querySelector(".searchHelpLi #searchHelpText").textContent =
          showInputValue;
        ul.querySelector(".searchHelpLi").style.display = "";
      }
    }
    static load() {
      document
        .querySelector("#searchstartmenu")
        .addEventListener("keydown", (e) => {
          if (e.key === "Enter" && e.target.value !== "") {
            e.preventDefault();
            var allElement = document
              .querySelector("#liststartmenu")
              .querySelectorAll("li");
            for (const el of allElement) {
              if (el.style.display !== "none") {
                el.querySelector("a").click();
                break;
              }
            }
          }
        });
    }
    static searchSearchedOnInternet() {
      const defaultSearchEngine = SearchEngine.default;
      SearchEngine.search(
        document.querySelector("#searchstartmenu").value,
        defaultSearchEngine,
      );
    }
  };
}
