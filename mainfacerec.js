async function loadface() {
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
loadface();
