window.addEventListener("click", function (e) {
  if (!document.querySelector(".openopenedapps").contains(e.target)) {
    if (appsopened.oppened) {
      appsopened.close();
    }
  }
});
// Menu opened apps
var appsopened = {
  count: 0,
  list: [],
  oppened: false,
  selected: undefined,
  openwin: (value) => {
    var element = document.querySelectorAll(".window.openedwin")[value];
    ZIndexer.focus(element);
    element.focus();
    appsopened.close();
  },
  open: () => {
    var element = document.querySelector(".openopenedapps");
    if (appsopened.count != 0) {
      var innerHTMLvalue = "";
      if (appsopened.selected !== undefined) {
        for (var i = 0; i < appsopened.count; i++) {
          if (i == appsopened.selected) {
            innerHTMLvalue +=
              "<div class=\"selected buttonopenedapps " +
              appsopened.list[i][0] +
              "vybranydiv\" onclick=\"appsopened.openwin(" +
              i +
              ")\">" +
              appsopened.list[i][1] +
              "</div>";
          } else {
            innerHTMLvalue +=
              "<div class=\"buttonopenedapps " +
              appsopened.list[i][0] +
              "vybranydiv\" onclick=\"appsopened.openwin(" +
              i +
              ")\">" +
              appsopened.list[i][1] +
              "</div>";
          }
        }
      } else {
        for (let i = 0; i < appsopened.count; i++) {
          if (appsopened.list[i][2] == ZIndexer.current) {
            innerHTMLvalue +=
              "<div class=\"selected buttonopenedapps " +
              appsopened.list[i][0] +
              "vybranydiv\" onclick=\"appsopened.openwin(" +
              i +
              ")\">" +
              appsopened.list[i][1] +
              "</div>";
            appsopened.selected = i;
          } else {
            innerHTMLvalue +=
              "<div class=\"buttonopenedapps " +
              appsopened.list[i][0] +
              "vybranydiv\" onclick=\"appsopened.openwin(" +
              i +
              ")\">" +
              appsopened.list[i][1] +
              "</div>";
          }
        }
        if (appsopened.selected === undefined) {
          appsopened.selected = 0;
        }
      }
      element.innerHTML = innerHTMLvalue;
    } else {
      element.innerHTML = "Nejsou otevřené žádné okna";
    }
    appsopened.oppened = true;
    element.style.display = "block";
  },
  close: () => {
    appsopened.oppened = false;
    var element = document.querySelector(".openopenedapps");
    element.style.display = "none";
    appsopened.selected = undefined;
  },
};
setInterval(() => {
  appsopened.list = [];
  var elements = document.querySelectorAll(".window.openedwin");
  for (var i = 0; i < elements.length; i++) {
    try {
      appsopened.list.push([
        elements[i].classList[0],
        elements[i].querySelector(".headerclass span").innerHTML,
        elements[i],
      ]);
    } catch {
      // Ignore error
    }
  }
  appsopened.count = appsopened.list.length;
}, 500);
document.addEventListener("keypress", (e) => {
  if (appsopened.oppened) {
    if (e.key == "a") {
      if (appsopened.selected !== undefined) {
        if (appsopened.selected == 0) {
          return;
        }
        appsopened.selected--;
      }
      appsopened.open();
    } else if (e.key == "d") {
      if (appsopened.selected !== undefined) {
        if (appsopened.selected == appsopened.count - 1) {
          return;
        }
        appsopened.selected++;
      }
      appsopened.open();
    } else if (e.key == "Enter") {
      appsopened.openwin(appsopened.selected);
    } else if (e.key == "q") {
      appsopened.close();
    }
  }
});
