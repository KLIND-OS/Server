function updateWindowAnimation() {
  const option = localStorage.getItem("windowanimation") || "false";

  if (document.body.classList.contains("disablewindowanimation")) {
    if (option == "true") {
      document.body.classList.remove("disablewindowanimation");
    }
  } else if (!document.body.classList.contains("disablewindowanimation")) {
    if (option == "false") {
      document.body.classList.add("disablewindowanimation");
    }
  }
}
updateWindowAnimation();
