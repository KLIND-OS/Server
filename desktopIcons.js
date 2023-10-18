var DesktopIcons = {
    load: () => {
        var storage = localStorage.getItem("desktop-icons");
        if (storage) {
            storage = JSON.parse(storage);
            for (var i = 0; i < storage.length; i++) {
                var element = document.createElement("div");
                element.classList.add("ikonaklindows");
                element.classList.add("drageble");
                element.setAttribute("ondblclick", storage[i][0]);
                element.setAttribute("id", i);
                element.setAttribute("oncontextmenu", "rightClickIcon(this)");
                if (storage[i][3]) {
                    var text = document.createElement("span");
                    text.textContent = storage[i][3];
                    element.appendChild(text);
                }
                var elmnt = document.querySelector(".iconsKLINDOS").appendChild(element);
                elmnt.style.backgroundImage = "url(" + storage[i][1] + ")";
                try {
                    element.style.inset = storage[i][2][1] + "px auto auto " + storage[i][2][0] + "px";
                } catch { }
            }
            dragingikonaklindows();
        }
    },
    stopMoving: (element) => {
        var left = element.style.left.replace("px", "");
        var top = element.style.top.replace("px", "");
        var id = element.getAttribute("id");
        var array = JSON.parse(localStorage.getItem("desktop-icons"));
        array[id][2][0] = left;
        array[id][2][1] = top;
        localStorage.setItem("desktop-icons", JSON.stringify(array));
    },
    add: ({ run, icon, name }) => {
        var storage = localStorage.getItem("desktop-icons");
        if (storage) {
            storage = JSON.parse(storage);
        }
        else {
            storage = [];
        }
        storage.push([run, icon, ["0", "0"], name]);
        localStorage.setItem("desktop-icons", JSON.stringify(storage));
        document.querySelector(".iconsKLINDOS").innerHTML = "";
        DesktopIcons.load();
    },
};
