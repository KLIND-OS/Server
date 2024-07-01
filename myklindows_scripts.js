class MyKLINDOS {
  static changepass(element) {
    var newpass = hashCode(
      element.querySelector("#changepassinputvalue").value,
    );
    localStorage.setItem("password", newpass);
    window.location.reload();
  }
  static newnameset(element) {
    var newname = element.querySelector("#changenameinputvalue").value;
    localStorage.setItem("username", newname);
    window.location.reload();
  }
  static newiconuserset(element) {
    var newicon = element.querySelector("#changeusericoninputvalueas").value;
    localStorage.setItem("customicon", newicon);
    window.location.reload();
  }
}

window.MyKLINDOS = MyKLINDOS;
