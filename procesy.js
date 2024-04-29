var Procesy = {
  intervals: [],
  iframes: [],
  events: [],
  analyze: (con) => {
    for (var i = 0; i < Procesy.intervals.length; i++) {
      var p = document.createElement("p");
      p.textContent = "Interval: " + Procesy.intervals[i][0] + " ";

      var open = document.createElement("span");
      open.textContent = "Open code ";
      open.style.color = "blue";
      open.setAttribute("ss", i);
      open.onclick = (e) => {
        Procesy.openIn(e.target.getAttribute("ss"));
      };

      var end = document.createElement("span");
      end.textContent = "End process";
      end.style.color = "blue";
      end.setAttribute("ss", i);
      end.onclick = (e) => {
        Procesy.endInterval(e.target);
      };

      p.appendChild(open);
      p.appendChild(end);
      con.appendChild(p);
    }

    Procesy.events = [];
    var eventListeners = listAllEventListeners();
    for (const event of eventListeners) {
      Procesy.events.push(event);
      var p = document.createElement("p");
      p.textContent = `Element: ${event.node.tagName} Type: ${event.type}`;

      var open = document.createElement("span");
      open.textContent = "Open code ";
      open.style.color = "blue";
      open.setAttribute("ss", Procesy.events.length - 1);
      open.onclick = (e) => {
        Procesy.openEvent(e.target.getAttribute("ss"));
      };

      p.appendChild(open);
      con.appendChild(p);
    }
  },
  openIn: (i) => {
    try { windows.open("viewtext", { text: Procesy.intervals[i][1].toString(), title: "Zobrazení procesu" }); } catch (e) { }
  },
  openEvent: (i) => {
    try {
      windows.open("viewtext", { text: Procesy.events[i].func.toString(), title: "Zobrazení eventu" });
    } catch (e) { }
  },
  endInterval: (e) => {
    try { clearInterval(Procesy.intervals[e.getAttribute("ss")][0]); } catch (e) { }
    e.parentElement.remove();
  },

  load: async (el) => {
    el.innerHTML = "";
    const systemProcesses = await LowLevelApi.TaskManager.getSystemProcesses();

    for (const {pid, name} of systemProcesses) {
      var p = document.createElement("p");
      p.textContent = "Systémový proces: " + name + " ID: " + pid + " ";

      var kill = document.createElement("span");
      kill.textContent = "Kill";
      kill.style.color = "blue";
      kill.onclick = () => {
        LowLevelApi.TaskManager.killProcess(pid);
        p.remove();
      };

      p.appendChild(kill)
      el.appendChild(p)
      
    }

    Procesy.analyze(el);
  },

  init: (win) => {
    const update = async () => {
      const processor = await LowLevelApi.TaskManager.getProcessorInfo();
      win.querySelector(".processorname").textContent = processor.name;
      win.querySelector(".processorusage").textContent = processor.usage + "%";

      const memory = await LowLevelApi.TaskManager.getRamInfo();
      win.querySelector(".memorytotal").textContent = humanFileSize(memory.total * 1000);
      win.querySelector(".memoryused").textContent = humanFileSize(memory.used * 1000);
      win.querySelector(".memoryfree").textContent = humanFileSize(memory.free * 1000);
    }
    const intervalId = setInterval(update, 500)

    win.setAttribute("updateProcessId", intervalId);
    update();
  },
  end: (win) => {
    const updateProcessId = win.getAttribute("updateProcessId");
    clearInterval(updateProcessId);
  },

  infoShow: (win) => {
    win.querySelector(".infoProcesy").style.display = "block";
    win.querySelector(".procesyProcesy").style.display = "none"
  },
  procesyShow: (win) => {
    win.querySelector(".infoProcesy").style.display = "none";
    win.querySelector(".procesyProcesy").style.display = "block";
    Procesy.load(win.querySelector(".procesyProcesyContent"))
  },

};

function listAllEventListeners() {
  const allElements = Array.prototype.slice.call(document.querySelectorAll("*"));
  allElements.push(document);
  allElements.push(window);

  const types = [];

  for (let ev in window) {
    if (/^on/.test(ev)) types[types.length] = ev;
  }

  let elements = [];
  for (let i = 0; i < allElements.length; i++) {
    const currentElement = allElements[i];
    for (let j = 0; j < types.length; j++) {
      if (typeof currentElement[types[j]] === "function") {
        elements.push({
          "node": currentElement,
          "type": types[j],
          "func": currentElement[types[j]],
        });
      }
    }
  }

  return elements.sort(function (a, b) {
    return a.type.localeCompare(b.type);
  });
}

const originalSetInterval = window.setInterval;
window.setInterval = function (callback, delay) {
  const intervalId = originalSetInterval(callback, delay);
  Procesy.intervals.push([intervalId, callback]);
  return intervalId;
};
const originalClearInterval = window.clearInterval;
window.clearInterval = function (id) {
  var ne = new Array();
  for (var i = 0; i < Procesy.intervals.length; i++) {
    if (Procesy.intervals[i][0] != id) {
      ne.push(Procesy.intervals[i]);
    } else {
      ne.push(undefined);
    }
  }
  Procesy.intervals = ne;
  originalClearInterval(id);
};



setInterval(() => {
  Procesy.iframes = new Array();
  var iframes = document.querySelectorAll("iframe");
  for (var i = 0; i < iframes.length; i++) {
    Procesy.iframes.push(iframes[i]);
  }
}, 5000);
