class ContextMenuItem {
  function;
  name;

  constructor(name, funct) {
    this.function = funct;
    this.name = name;
  }
}

class ContextMenu {
  menu;
  manualTrigger;

  constructor(trigger, menulist, isArray = false) {
    const menu = document.createElement("ul");
    menu.id = "menu";
    menu.oncontextmenu = () => {
      return false;
    };

    for (const menuItem of menulist) {
      const li = document.createElement("li");
      li.onclick = () => {
        menu.classList.remove("show");
        document.getElementById("outclick").style.display = "none";

        menuItem.function(contextMenuSelectedTrigger);
        contextMenuSelectedTrigger = undefined;
      };
      li.textContent = menuItem.name;
      li.className = "menu-item";
      menu.appendChild(li);
    }

    const menuFinal = document
      .querySelector(".contextmenulist")
      .appendChild(menu);

    contextMenuList.push(menuFinal);

    this.menu = menuFinal;

    if (trigger) {
      if (isArray) {
        trigger.forEach((element) => {
          element.addEventListener("contextmenu", (e) => {
            e.preventDefault();

            manualTrigger(e.clientX, e.clientY, element);
          });
        });
      } else {
        trigger.addEventListener("contextmenu", (e) => {
          e.preventDefault();
          manualTrigger(e.clientX, e.clientY, trigger);
        });
      }
    }

    function manualTrigger(x, y, trig) {
      if (document.getElementById("outclick").style.display == "block") {
        return;
      }

      menuFinal.style.top = `${y}px`;
      menuFinal.style.left = `${x}px`;
      menuFinal.classList.add("show");

      document.getElementById("outclick").style.display = "block";

      contextMenuSelectedTrigger = trig;
    }

    this.manualTrigger = manualTrigger;
  }
}

class ContextMenuApi {
  static closeAll() {
    contextMenuList.forEach((e) => e.classList.remove("show"));
    document.getElementById("outclick").style.display = "none";
  }
}

const contextMenuList = [];
var contextMenuSelectedTrigger;
