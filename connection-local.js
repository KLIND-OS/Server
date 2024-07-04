function changeAnimation() {
  var el = document.querySelector(".connection-lost .testingAnimation");
  if (el.textContent == ".") {
    el.textContent = "..";
  } else if (el.textContent == "..") {
    el.textContent = "...";
  } else if (el.textContent == "...") {
    el.textContent = ".";
  } else {
    el.textContent = "dumbass";
  }
}
setInterval(changeAnimation, 500);
setInterval(() => {
  fetch("/status", { cache: "no-store" })
    .then((res) => res.text())
    .then((res) => {
      if (res.trim() == "working") {
        document.querySelector(".connection-lost-element").style.display =
          "none";
      } else {
        document.querySelector(".connection-lost-element").style.display =
          "flex";
      }
    })
    .catch(() => {
      document.querySelector(".connection-lost-element").style.display = "flex";
    });
}, 1000);
