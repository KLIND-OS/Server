class Theme {
  static dark() {
    const x = document.querySelectorAll(".window");
    for (let i = 0; i < x.length; i++) {
      x[i].style.backgroundColor = "#3b3838";
      x[i].classList.add("black");
    }
    localStorage.setItem("mode", "dark");
    if (localStorage.getItem("background") == null)
      document.getElementById("klindows").style.backgroundImage =
        "url(wallpapers/dark.jpg)";
  }
  static light() {
    const x = document.querySelectorAll(".window");
    for (let i = 0; i < x.length; i++) {
      x[i].style.backgroundColor = "white";
      x[i].classList.remove("black");
    }
    localStorage.setItem("mode", "light");
    if (localStorage.getItem("background") == null)
      document.getElementById("klindows").style.backgroundImage =
        "url(wallpapers/light.jpg)";
  }
}

window.Theme = Theme;
