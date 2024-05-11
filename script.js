var sdjhahsdjhasdjsd = 0;
document.addEventListener("click", (evt) => {
  const flyoutElement = document.getElementById("backsix");
  const flyoutElements = document.getElementById("logo");
  let targetElement = evt.target; // clicked element

  do {
    if ((targetElement == flyoutElement) | (targetElement == flyoutElements)) {
      return;
    }
    targetElement = targetElement.parentNode;
  } while (targetElement);

  if (sdjhahsdjhasdjsd == 1) {
    sdjhahsdjhasdjsd = 0;
    document.getElementById("items-1").style.top = "0px";
    document.getElementById("items-4").style.left = "0px";
    document.getElementById("items-2").style.top = "25px";
    document.getElementById("items-3").style.left = "25px";

    document.querySelector(".startmenu").classList.remove("opened");
    openingtrue = true;
    setTimeout(() => {
      document.querySelector(".startmenu").classList.remove("display");
      openingtrue = false;
    }, 500);
  }
});
var cookieEnabled = navigator.cookieEnabled;
if (!cookieEnabled) {
  alert(
    "Tato stránka vyžaduje cookies. Prosím zapněte je v nastavení prohlížeče.",
  );
  window.location.reload();
}
var openingtrue = false;
function openstartmenu() {
  if (!openingtrue) {
    setTimeout(() => {
      document.getElementById("searchstartmenu").focus();
    }, 130);

    if (sdjhahsdjhasdjsd == 0) {
      sdjhahsdjhasdjsd++;

      document.getElementById("items-1").style.top = "25px";
      document.getElementById("items-4").style.left = "25px";
      document.getElementById("items-2").style.top = "0px";
      document.getElementById("items-3").style.left = "0px";

      document.querySelector(".startmenu").classList.add("display");
      openingtrue = true;
      setTimeout(() => {
        document.querySelector(".startmenu").classList.add("opened");
      }, 20);
      setTimeout(() => {
        openingtrue = false;
      }, 500);
    } else {
      sdjhahsdjhasdjsd = 0;
      document.getElementById("items-1").style.top = "0px";
      document.getElementById("items-4").style.left = "0px";
      document.getElementById("items-2").style.top = "25px";
      document.getElementById("items-3").style.left = "25px";

      document.querySelector(".startmenu").classList.remove("opened");
      openingtrue = true;
      setTimeout(() => {
        document.querySelector(".startmenu").classList.remove("display");
        openingtrue = false;
      }, 500);
    }
  }
}
var showversionontitle;
var clockmenuopened = false;
var clockmenuopening = false;
function opendate() {
  if (!clockmenuopening) {
    if (!clockmenuopened) {
      document.querySelector(".clockdate").classList.add("displayblock");
      setTimeout(() => {
        document.querySelector(".clockdate").style.bottom = "50px";
        clockmenuopening = true;
        setTimeout(() => (clockmenuopening = false), 500);
      }, 10);
      clockmenuopened = true;
    } else {
      document.querySelector(".clockdate").style.bottom = "-600px";
      clockmenuopening = true;
      setTimeout(() => {
        document.querySelector(".clockdate").classList.remove("displayblock");
        clockmenuopening = false;
      }, 500);
      clockmenuopened = false;
    }
  }
}
function odstranitDiakritiku(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function searchstartmenu() {
  var a, txtValue;
  var input = document.getElementById("searchstartmenu");
  var ul = document.getElementById("liststartmenu");
  var li = ul.getElementsByTagName("li");
  var isShowed = false;
  ul.querySelector(".searchHelpLi").style.display = "none";
  for (var i = 0; i < li.length; i++) {
    if (li[i].classList.contains("searchHelpLi")) continue;
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    var text = odstranitDiakritiku(txtValue.toUpperCase()).trim();
    var filterText = odstranitDiakritiku(input.value.toUpperCase()).trim();
    if (text.indexOf(filterText) > -1) {
      isShowed = true;
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
  if (!isShowed) {
    if (input.value.length > 20) {
      var showInputValue = input.value.split("", 20).join("").trim() + "...";
    } else {
      var showInputValue = input.value;
    }
    ul.querySelector(".searchHelpLi #searchHelpText").textContent =
      showInputValue;
    ul.querySelector(".searchHelpLi").style.display = "";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector("#searchstartmenu")
    .addEventListener("keydown", (e) => {
      if (e.key === "Enter" && e.target.value !== "") {
        e.preventDefault();
        var allElement = document
          .querySelector("#liststartmenu")
          .querySelectorAll("li");
        for (const el of allElement) {
          if (el.style.display !== "none") {
            el.querySelector("a").click();
            break;
          }
        }
      }
    });
});

function searchSearchedOnInternet() {
  const defaultSearchEngine = SearchEngine.default;
  SearchEngine.search(
    document.querySelector("#searchstartmenu").value,
    defaultSearchEngine,
  );
}

function custompozadisubmit() {
  var checkBoxnas = document.getElementById("custombackcheck");

  if (checkBoxnas.checked == true) {
    document.getElementById("inputpozadi").style.display = "block";
  } else {
    document.getElementById("inputpozadi").style.display = "none";
    document.getElementById("klindows").style.backgroundImage = defaltvzhled;
  }
}
function submitcss(value) {
  var path = new File(value).fullPath;
  var contentoffile = mainFileManager.getContent(path, "utf8");
  var element = document.getElementById("customcssstyleelement");
  element.innerHTML = contentoffile;
  localStorage.setItem("customcss", path);
}

var mode = {
  light: () => {
    var x, i;
    x = document.querySelectorAll(".window");
    for (i = 0; i < x.length; i++) {
      x[i].style.backgroundColor = "white";
      x[i].classList.remove("black");
    }
    localStorage.setItem("mode", "light");
    if (localStorage.getItem("background") == null)
      document.getElementById("klindows").style.backgroundImage =
        "url(wallpapers/light.jpg)";
    fileManagerOpen();
  },
  dark: () => {
    var x, i;
    x = document.querySelectorAll(".window");
    for (i = 0; i < x.length; i++) {
      x[i].style.backgroundColor = "#3b3838";
      x[i].classList.add("black");
    }
    localStorage.setItem("mode", "dark");
    if (localStorage.getItem("background") == null)
      document.getElementById("klindows").style.backgroundImage =
        "url(wallpapers/dark.jpg)";
    fileManagerOpen();
  },
};

var skjdoahsdijhasd = 0;
function tajnettri() {
  skjdoahsdijhasd++;
  if (skjdoahsdijhasd == 69) {
    skjdoahsdijhasd = 0;
    windows.open("brow", "putin.mp4");
  }
}
function startgame() {
  document.getElementById("hratajna").style.display = "block";
  document.getElementById("startgame").style.display = "none";
  document.getElementById("hratajna").focus();
}
function closealertcookies() {
  document.getElementById("alertcookies").style.display = "none";
  localStorage.setItem("showedalertcookies", "true");
}
function getCssProperty(elmId, property) {
  var elem = document.getElementById(elmId);
  return window.getComputedStyle(elem, null).getPropertyValue(property);
}

setInterval(() => {
  if (consolelog != "false") {
    console.clear();
    mainConsole.log(
      "%cVarování!",
      "color: red; font:bold; font-family:monospace; font-size: 40px",
    );
    mainConsole.log(
      "Pokud Vám někdo řekl ať sem něco pošlete, tak se na 99% procent jedná o PODVOD!",
    );
    mainConsole.log(
      "Podvodník tímto způsubem může získat Vaše heslo nebo Vaše soukromé soubory.",
    );
    mainConsole.log(
      "Předtím než sem něco pošlete buďte si 100% jistí, co dělate.",
    );
    mainConsole.log(
      "Chyby můžete nahlašovat na stránku https://klindos.jzitnik.dev/report",
    );
    mainConsole.log("KLIND OS od JZITNIK");
  }
}, 5000);

function loadbetaicon() {
  if (beta) {
    document.querySelector(".betadiv").classList.add("openedwin");
  } else if (version.indexOf("alpha") > -1) {
    document.querySelector(".betadiv").classList.add("openedwin");
    setTimeout(() => {
      document.title =
        titleklindows + " " + version + " | Pouze pro testovací účely!";
    }, 10000);
  }
}
//CONFIG VARS
var login;
var autolocklogin;
var developermode;

window.close = () => {
  throw new Error(
    "Don't use window.close. Use LowLevelApi.Program.close(). GUI will start again right after that.",
  );
};

async function fileEditorSaveText(location, text, bypass) {
  try {
    await mainFileManager.save(location, text, bypass, "utf8");
  } catch (FileUsedError) {
    FileLocker.lockedError();
  }
}
