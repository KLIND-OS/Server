function fixWindow() {
  var x = document.querySelectorAll(".window");
  for (i = 0; i < x.length; i++) {
    let rect = x[i].getBoundingClientRect();
    let sirka;
    let vyska;

    if (x[i].style.left == "") {
      sirka = rect.left + x[i].offsetWidth;
    } else {
      sirka = parseInt(x[i].style.left.replace("px", "")) + x[i].offsetWidth;
    }
    if (x[i].style.top == "") {
      vyska = rect.top + x[i].offsetHeight;
    } else {
      vyska = parseInt(x[i].style.top.replace("px", "")) + x[i].offsetHeight;
    }

    if (sirka > window.innerWidth) {
      if (window.innerWidth - x[i].offsetWidth > -1) {
        x[i].style.left = window.innerWidth - x[i].offsetWidth + "px";
      } else {
        x[i].style.left = "0px";
      }
    }
    if (vyska > window.innerHeight) {
      if (window.innerHeight - x[i].offsetHeight > -1) {
        x[i].style.top = window.innerHeight - x[i].offsetHeight + "px";
      } else {
        x[i].style.top = "0px";
      }
    } else {
      if (rect.left < 0) {
        x[i].style.left = "0px";
      }
      if (rect.top < 0) {
        x[i].style.top = "0px";
      }
    }
  }
  x = document.querySelectorAll(".ikonaklindows");
  for (i = 0; i < x.length; i++) {
    let rect = x[i].getBoundingClientRect();
    let sirka;
    if (x[i].style.left == "") {
      sirka = rect.left + x[i].offsetWidth;
    } else {
      sirka = parseInt(x[i].style.left.replace("px", "")) + x[i].offsetWidth;
    }
    let vyska;
    if (x[i].style.top == "") {
      vyska = rect.top + x[i].offsetHeight;
    } else {
      vyska = parseInt(x[i].style.top.replace("px", "")) + x[i].offsetHeight;
    }
    if (sirka > window.innerWidth) {
      x[i].style.left = "0px";
      x[i].style.top = "0px";
    }
    if (vyska > window.innerHeight) {
      x[i].style.left = "0px";
      x[i].style.top = "0px";
    } else {
      if (rect.left < 0) {
        x[i].style.left = "0px";
        x[i].style.top = "0px";
      }
      if (rect.top < 0) {
        x[i].style.top = "0px";
        x[i].style.left = "0px";
      }
    }

    var id = x[i].getAttribute("id");
    var array = JSON.parse(localStorage.getItem("desktop-icons"));
    array[id][2][0] = x[i].style.left.replace("px", "");
    array[id][2][1] = x[i].style.top.replace("px", "");
    localStorage.setItem("desktop-icons", JSON.stringify(array));
  }
}
window.addEventListener("resize", fixWindow);
setInterval(fixWindow, 3000);
