function error(code, info, app) {
  if (developermode == "false") {
    new Howl({
      src: ["sounds/error.mp3"],
      volume: 1,
      autoplay: true,
    });
    document.querySelector("#codeerror").innerHTML = code;
    document.querySelector("#infoerror").innerHTML = info;
    document.querySelector("#createdapp").innerHTML = app;
    document.querySelector("#error").style.display = "flex";
    console.error("Error code: " + code + " Informations: " + info + " Created error by: " + app + " Chyba byla vytvořena chybou v kódu KLIND OS nebo externí aplikace!");
  }
}

