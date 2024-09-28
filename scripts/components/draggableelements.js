class DraggableElements {
  static noresizeClasslist = ["terminal", "audioLevelEditor"];

  static reload() {
    $(function () {
      var $widget = $(".window.window");
      var $widgetResizable = $widget.find(".widgetResizable");
      $widgetResizable.css("height", "170px");
      $widget.draggable({
        cursor: "move",
        handle: ".window-header",
        scroll: false,
        containment: "window",
        iframeFix: true,
        stop: (e) => {
          document
            .querySelectorAll("webview")
            .forEach((webview) => (webview.style.pointerEvents = ""));
          e.target.style.opacity = "1";
          if (
            !DraggableElements.noresizeClasslist.includes(e.target.classList[0])
          ) {
            var target = e.target;
            var left = parseInt(target.style.left.replace("px", ""));
            var top = parseInt(target.style.top.replace("px", ""));
            var height = target.offsetHeight;
            var width = target.offsetWidth;
            var centerOfElement = left + width / 2;
            var centerOfElementY = top + height / 2;
            var widthOfWindow = window.innerWidth;
            var heightOfWindow = window.innerHeight;
            var centerOfWindow = widthOfWindow / 2;
            var centerOfWindowY = heightOfWindow / 2;

            var odchylka = 3;
            if (target.getAttribute("isFullscreen") == "true") {
              DraggableElements.windowSizing.default(
                target,
                e.originalEvent.originalEvent,
              );
            } else {
              target.setAttribute("isFullscreen", "false");
              if (
                top <= odchylka * 7 &&
                centerOfElement < centerOfWindow + centerOfWindow / odchylka &&
                centerOfElement > centerOfWindow - centerOfWindow / odchylka
              ) {
                DraggableElements.windowSizing.full(target);
              } else if (
                left <= odchylka * 7 &&
                centerOfElementY <
                  centerOfWindowY + centerOfWindowY / odchylka &&
                centerOfElementY > centerOfWindowY - centerOfWindowY / odchylka
              ) {
                DraggableElements.windowSizing.left(target);
              } else if (
                widthOfWindow - (left + width) <= odchylka * 7 &&
                centerOfElementY <
                  centerOfWindowY + centerOfWindowY / odchylka &&
                centerOfElementY > centerOfWindowY - centerOfWindowY / odchylka
              ) {
                DraggableElements.windowSizing.right(target);
              }
            }
          }
        },
        start: (e) => {
          e.target.style.opacity = "0.85";
          document
            .querySelectorAll("webview")
            .forEach((webview) => (webview.style.pointerEvents = "none"));
        },
      });
    });
    // Resizing is still in beta version UPDATE: now it's not
    var sddsaelements = document.querySelectorAll(".window");
    for (var i = 0; i < sddsaelements.length; i++) {
      $(sddsaelements[i]).resizable({
        handles: "all",
        minWidth: window
          .getComputedStyle(sddsaelements[i])
          .getPropertyValue("min-width")
          .replace("px", ""),
        minHeight: parseInt(
          window
            .getComputedStyle(sddsaelements[i])
            .getPropertyValue("min-height")
            .replace("px", ""),
        ),
        start: (targets) => {
          var target = targets.target;
          target.setAttribute("isFullscreen", "false");
          document.querySelectorAll("iframe").forEach((node) => {
            node.style.pointerEvents = "none";
          });
          document
            .querySelectorAll("webview")
            .forEach((webview) => (webview.style.pointerEvents = "none"));
        },
        stop: () => {
          document.querySelectorAll("iframe").forEach((node) => {
            node.style.pointerEvents = "";
          });
          document
            .querySelectorAll("webview")
            .forEach((webview) => (webview.style.pointerEvents = ""));
        },
      });
    }
    for (let i = 0; i < DraggableElements.noresizeClasslist.length; i++) {
      var all = document.querySelectorAll(
        ".window." + DraggableElements.noresizeClasslist[i],
      );
      for (var j = 0; j < all.length; j++) {
        $(all[j]).resizable("destroy");
        all[j].setAttribute("notresizable", "true");
      }
    }
  }

  static windowSizing = {
    full: (target) => {
      if (target.getAttribute("notresizable") === "true") return;
      var widthOfWindow = window.innerWidth;
      var heightOfWindow = window.innerHeight;
      // Fullscreen
      target.style.transition = "ease 0.1s all";
      setTimeout(() => {
        target.style.left = "0px";
        target.style.top = "0px";
        target.style.width = widthOfWindow + "px";
        target.style.height = heightOfWindow - 50 + "px";
        target.setAttribute("isFullscreen", "true");
        setTimeout(() => {
          target.style.transition = "";
        }, 200);
      }, 10);
    },
    left: (target) => {
      if (target.getAttribute("notresizable") === "true") return;
      var widthOfWindow = window.innerWidth;
      var heightOfWindow = window.innerHeight;
      target.style.transition = "ease 0.1s all";
      setTimeout(() => {
        target.style.top = "0px";
        target.style.left = "0px";
        target.style.height = heightOfWindow - 50 + "px";
        target.style.width = parseInt(widthOfWindow / 2) + "px";
        target.setAttribute("isFullscreen", "true");
        setTimeout(() => {
          target.style.transition = "";
        }, 200);
      }, 10);
    },
    right: (target) => {
      if (target.getAttribute("notresizable") === "true") return;
      var widthOfWindow = window.innerWidth;
      var heightOfWindow = window.innerHeight;
      target.style.transition = "ease 0.1s all";
      setTimeout(() => {
        target.style.top = "0px";
        target.style.left = Math.ceil(window.innerWidth / 2) + "px";
        target.style.height = heightOfWindow - 50 + "px";
        target.style.width = Math.ceil(widthOfWindow / 2) + "px";
        target.setAttribute("isFullscreen", "true");
        setTimeout(() => {
          target.style.transition = "";
        }, 200);
      }, 10);
    },
    default: (target, e) => {
      if (target.getAttribute("notresizable") === "true") return;
      var mouseX = e.clientX;
      var mouseY = e.clientY;
      var minWidth = parseInt($(target).css("min-width").replace("px", ""));
      var minHeight = parseInt($(target).css("min-height").replace("px", ""));
      target.style.transition = "ease 0.1s all";
      setTimeout(() => {
        target.setAttribute("isFullscreen", "false");
        target.style.width = minWidth + "px";
        target.style.height = minHeight + "px";
        $(target).css("left", parseInt(mouseX - minWidth / 2));
        $(target).css("top", mouseY - 10 + "px");
        setTimeout(() => {
          target.style.transition = "";
        }, 200);
      }, 10);
    },
    defaultNonEvent: (target, left, top) => {
      if (target.getAttribute("notresizable") === "true") return;
      var minWidth = parseInt($(target).css("min-width").replace("px", ""));
      var minHeight = parseInt($(target).css("min-height").replace("px", ""));
      target.style.transition = "ease 0.1s all";
      setTimeout(() => {
        target.setAttribute("isFullscreen", "false");
        target.style.width = minWidth + "px";
        target.style.height = minHeight + "px";
        $(target).css("left", left + "px");
        $(target).css("top", top + "px");
        setTimeout(() => {
          target.style.transition = "";
        }, 200);
      }, 10);
    },
  };

  static reloadDesktopIcons() {
    $(function () {
      $(".ikonaklindows").draggable({
        scroll: false,
        grid: [64, 64],
        start: function (event) {
          event.target.style.opacity = "0.85";
        },
        stop: function (event) {
          event.target.style.opacity = "1";
          DesktopIcons.stopMoving(this);
        },
      });
    });
  }
}