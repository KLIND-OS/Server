var noresizeClasslist = [
  "terminal",
  "audioLevelEditor"
];
function reloaddraggable() {
  $(function () {
    var $widget = $(".window.widgetList");
    var $widgetResizable = $widget.find(".widgetResizable");
    $widgetResizable.css("height", "170px");
    $widget.draggable({
      cursor: "move",
      handle: ".widget-header",
      scroll: false,
      containment: "window",
      iframeFix: true,
      stop: (e) => {
        e.target.style.opacity = "1";
        if (!noresizeClasslist.includes(e.target.classList[1])) {
          var target = e.target;
          var left = parseInt(target.style.left.replace("px", ""));
          var top = parseInt(target.style.top.replace("px", ""));
          var height = target.offsetHeight;
          var width = target.offsetWidth;
          var centerOfElement = left + (width / 2);
          var centerOfElementY = top + (height / 2);
          var widthOfWindow = window.innerWidth;
          var heightOfWindow = window.innerHeight;
          var centerOfWindow = widthOfWindow / 2;
          var centerOfWindowY = heightOfWindow / 2;
          
          var odchylka = 3;
          if (target.getAttribute("isFullscreen") == "true") {
            windowSizing.default(target, e.originalEvent.originalEvent)
          }
          else {
            target.setAttribute("isFullscreen", "false");
            if (
              top <= odchylka * 7 &&
                centerOfElement < centerOfWindow + (centerOfWindow / odchylka) &&
                centerOfElement > centerOfWindow - (centerOfWindow / odchylka)
            ) {
              windowSizing.full(target);
            }
            else if (
              left <= odchylka * 7 &&
                centerOfElementY < centerOfWindowY + (centerOfWindowY / odchylka) &&
                centerOfElementY > centerOfWindowY - (centerOfWindowY / odchylka)
            ) {
              windowSizing.left(target);
            }
            else if (
              widthOfWindow - (left + width) <= odchylka * 7 &&
                centerOfElementY < centerOfWindowY + (centerOfWindowY / odchylka) &&
                centerOfElementY > centerOfWindowY - (centerOfWindowY / odchylka)
            ) {
              windowSizing.right(target);
            }
          }
        }
      },
      start: (e) => {
        e.target.style.opacity = "0.85";
      }
    });
  });
  // Resizing is still in beta version UPDATE: now it's not
  var sddsaelements = document.querySelectorAll(".window");
  for (var i = 0; i < sddsaelements.length; i++) {
    $(sddsaelements[i]).resizable({
      handles: "all",
      minWidth: window.getComputedStyle(sddsaelements[i]).getPropertyValue("min-width").replace("px", ""),
      minHeight: parseInt(window.getComputedStyle(sddsaelements[i]).getPropertyValue("min-height").replace("px", "")),
      start: (targets) => {
        var target = targets.target;
        target.setAttribute("isFullscreen", "false");
        document.querySelectorAll("iframe").forEach(node => {
          node.style.pointerEvents = "none";
        })
      },
      stop: (targets) => {
        document.querySelectorAll("iframe").forEach(node => {
          node.style.pointerEvents = "";
        })
      }
    });
  }
  for (var i = 0; i < noresizeClasslist.length; i++) {
    var all = document.querySelectorAll(".window." + noresizeClasslist[i]);
    for (var j = 0; j < all.length; j++) {
      $(all[j]).resizable("destroy");
      all[j].setAttribute("notresizable", "true")
    }
  }
}

const windowSizing = {
  full: (target) => {
    if (target.getAttribute("notresizable") === "true") return
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
    if (target.getAttribute("notresizable") === "true") return
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
    if (target.getAttribute("notresizable") === "true") return
    var widthOfWindow = window.innerWidth;
    var heightOfWindow = window.innerHeight;
    target.style.transition = "ease 0.1s all";
    setTimeout(() => {
      target.style.top = "0px";
      target.style.left = parseInt(window.innerWidth / 2) + "px";
      target.style.height = heightOfWindow - 50 + "px";
      target.style.width = parseInt(widthOfWindow / 2) + "px";
      target.setAttribute("isFullscreen", "true");
      setTimeout(() => {
        target.style.transition = "";
      }, 200);
    }, 10);
  },
  default: (target, e) => {
    if (target.getAttribute("notresizable") === "true") return
    var mouseX = e.clientX;
    var mouseY = e.clientY;
    var minWidth = parseInt($(target).css("min-width").replace("px", ""));
    var minHeight = parseInt($(target).css("min-height").replace("px", ""));
    target.style.transition = "ease 0.1s all";
    setTimeout(() => {
      target.setAttribute("isFullscreen", "false");
      target.style.width = minWidth + "px";
      target.style.height = minHeight + "px";
      $(target).css("left", parseInt(mouseX - (minWidth / 2)));
      $(target).css("top", mouseY - 10 + "px");
      setTimeout(() => {
        target.style.transition = "";
      }, 200);
    }, 10);
  },
  defaultNonEvent: (target, left, top) => {
    if (target.getAttribute("notresizable") === "true") return
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

  }
}

$(function () {
  $(".dragebleiconondesktop").draggable({
    start: function (event, ui) {
      $(this).addClass("dragging");
    },
    stop: function (event, ui) {
      $(this).removeClass("dragging");
    }
  });
});
$(function () {
  $(".drageblepoznamky").draggable({
    scroll: false,
    start: function (event, ui) {
      $(this).addClass("dragdrageble");
    },
    stop: function (event, ui) {
      $(this).removeClass("dragdrageble");
    }
  });
});
function dragingikonaklindows() {
  $(function () {
    $(".ikonaklindows").draggable({
      scroll: false,
      grid: [64, 64],
      start: function (event, ui) {
        $(this).addClass("dragdrageble");
      },
      stop: function (event, ui) {
        $(this).removeClass("dragdrageble");
        DesktopIcons.stopMoving(this);
      },
    });
  });
}
