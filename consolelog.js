class mainConsole {
  static logs = [];
  static log = console.log;
}

class Logs {
  static init(win) {
    function load() {
      var logSpan = win.querySelector(".logsspan");
      logSpan.innerHTML = "";
      for (const log of mainConsole.logs) {
        var p = document.createElement("p");
        p.textContent = log;
        logSpan.appendChild(p);
      }
    }
    win.setAttribute("inter", setInterval(load, 200));
    load();
  }
  static initNohup(win) {
    function load() {
      var logSpan = win.querySelector(".logsspan");
      logSpan.innerHTML = "";
      LowLevelApi.Logs.getNohupLogs((callback) => {
        for (const log of callback) {
          var p = document.createElement("p");
          p.textContent = log;
          logSpan.appendChild(p);
        }
      })
    }
    win.setAttribute("inter", setInterval(load, 2000));
    load();

  }
  static close(win) {
    clearInterval(win.getAttribute("inter"));
  }
}


console.log = function () {
  try {
    var message = "";
    for (var i = 0; i < arguments.length; i++) {
      if (typeof arguments[i] == "object") {
        message += (JSON && JSON.stringify ? JSON.stringify(arguments[i]) : arguments[i]) + " ";
      } else {
        message += arguments[i] + " ";
      }
    }
    mainConsole.logs.push(message);
    mainConsole.log(message);
  }
  catch {
    console.error("Nepovedlo se uložit log do databáze.")
    console.log(arguments)
  }
};

console.log("Spouštím log daemon...");
