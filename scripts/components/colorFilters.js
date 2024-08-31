class ColorFilters {
  static filters = [];
  static onLoadLoad() {
    const filters = JSON.parse(localStorage.getItem("color-filters") || "[]");
    ColorFilters.filters = filters;
    ColorFilters.loadFilters();
  }
  static init(win) {
    win.querySelector(".activeFilters").innerHTML = "";
    if (ColorFilters.filters.length == 0) {
      win.querySelector(".activeFilters").textContent =
        "Žádné aktivované filtry.";
      return;
    }
    for (var i = 0; i < ColorFilters.filters.length; i++) {
      var filter = ColorFilters.filters[i];
      var div = document.createElement("div");
      var span = document.createElement("span");
      span.textContent = `${Localization.getString("filter")}: ${filter[0]}, ${Localization.getString("value")}: ${filter[1]}`;
      div.appendChild(span);
      var button = document.createElement("button");
      button.setAttribute(
        "onclick",
        `ColorFilters.removeFilter(this.parentElement,${i})`,
      );
      button.textContent = Localization.getString("remove");
      div.appendChild(button);
      win.querySelector(".activeFilters").appendChild(div);
    }
  }
  static removeFilter(el, index) {
    ColorFilters.filters.splice(index, 1);
    ColorFilters.loadFilters();
    ColorFilters.init(el.parentElement.parentElement);
    localStorage.setItem("color-filters", JSON.stringify(ColorFilters.filters));
  }
  static loadFilters() {
    var str = "";
    for (const filter of ColorFilters.filters) {
      str += `${filter[0]}(${filter[1]}) `;
    }
    document.querySelector(".filter").style.backdropFilter = str;
  }
  static changeSelection(select) {
    const { value, parentElement } = select;
    const helpTexts = parentElement.querySelectorAll(".values-helptext div");
    for (const div of helpTexts) {
      div.style.display = "none";
    }
    try {
      parentElement.querySelector(".values-helptext ." + value).style.display =
        "block";
    } catch {
      console.log("INFO: Helper doesn't exist");
    }
  }
  static addFilter(parent) {
    const filter = parent.querySelector(".filterSelect").value;
    const { value } = parent.querySelector(".valueFilter");
    ColorFilters.filters.push([filter, value]);
    ColorFilters.loadFilters();
    ColorFilters.init(parent.parentElement);
    localStorage.setItem("color-filters", JSON.stringify(ColorFilters.filters));
  }
  static deactivateAll() {
    ColorFilters.filters = [];
    document.querySelector(".filter").style.backdropFilter = "";
    localStorage.setItem("color-filters", "[]");
  }
}
