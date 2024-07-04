class Calculator {
  static equal(x) {
    if (x.querySelector(".calcinput").value != "") {
      var vysledek = eval(x.querySelector(".calcinput").value);
      if (vysledek == Infinity) {
        idiot();
        x.querySelector(".calcinput").value = "You are an idiot!";
      } else {
        x.querySelector(".calcinput").value = vysledek;
      }
    }
  }
  static del(el) {
    var x = el.querySelector(".calcinput").value;
    el.querySelector(".calcinput").value = x.substr(0, x.length - 1);
  }

  static sin(btn) {
    const input = btn.parentElement.parentElement.querySelector(".calcinput");
    input.value = Math.sin(input.value);
  }

  static cos(btn) {
    const input = btn.parentElement.parentElement.querySelector(".calcinput");
    input.value = Math.cos(input.value);
  }

  static tan(btn) {
    const input = btn.parentElement.parentElement.querySelector(".calcinput");
    input.value = Math.tan(input.value);
  }

  static log(btn) {
    const input = btn.parentElement.parentElement.querySelector(".calcinput");
    input.value = Math.log(input.value);
  }

  static pow(btn, times) {
    const input = btn.parentElement.parentElement.querySelector(".calcinput");
    input.value = Math.pow(input.value, times);
  }

  static sqrt(btn) {
    const input = btn.parentElement.parentElement.querySelector(".calcinput");
    input.value = Math.sqrt(input.value);
  }

  static cbrt(btn) {
    const input = btn.parentElement.parentElement.querySelector(".calcinput");
    input.value = Math.cbrt(input.value);
  }

  static push(btn) {
    const input = btn.parentElement.parentElement.querySelector(".calcinput");
    input.value += btn.textContent.trim();
  }

  static clear(btn) {
    btn.parentElement.parentElement.querySelector(".calcinput").value = "";
  }
}
