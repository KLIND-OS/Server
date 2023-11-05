function resetklindows() {
  var cookiesprosmazani = document.cookie.split("; ");
  for (var i = 0; i < cookiesprosmazani.length; i++) {
    var nameofcookie = cookiesprosmazani[i].split("=")[0];
    document.cookie = nameofcookie + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }
  localStorage.clear();

  parent.window.location.reload();
}