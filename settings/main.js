if (localStorage.getItem("mode") == "dark") {
  document.body.classList.add("dark");
}

parent.Localization.loadDOM(document.body);
