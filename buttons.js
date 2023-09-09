document.addEventListener("click", evt => {
    const flyoutElement = document.getElementById("backsix");
    const flyoutElements = document.getElementById("logo");
    let targetElement = evt.target; // clicked element

    do {
        if (targetElement == flyoutElement | targetElement == flyoutElements) {
            return;
        }
        targetElement = targetElement.parentNode;
    } while (targetElement);

    sdjhahsdjhasdjsd = 0;
    document.getElementById("items-1").style.top = "0px";
    document.getElementById("items-4").style.left = "0px";
    document.getElementById("items-2").style.top = "25px";
    document.getElementById("items-3").style.left = "25px";

    document.querySelector(".startmenu").classList.remove("opened");
    setTimeout(() => {
        document.querySelector(".startmenu").classList.remove("display");
    }, 130);
});
var cookieEnabled = navigator.cookieEnabled;
if (!cookieEnabled) {
    alert('Tato stránka vyžaduje cookies. Prosím zapněte je v nastavení prohlížeče.');
    window.location.reload();
}
var sdjhahsdjhasdjsd = 0;
function openstartmenu() {
    setTimeout(() => {
        document.getElementById("searchstartmenu").focus();
    }, 130);

    if (sdjhahsdjhasdjsd == 0) {
        sdjhahsdjhasdjsd++

        document.getElementById("items-1").style.top = "25px";
        document.getElementById("items-4").style.left = "25px";
        document.getElementById("items-2").style.top = "0px";
        document.getElementById("items-3").style.left = "0px";

        document.querySelector(".startmenu").classList.toggle("display");
        setTimeout(() => {
            document.querySelector(".startmenu").classList.toggle("opened");
        }, 20);
    }
    else {
        sdjhahsdjhasdjsd = 0;
        document.getElementById("items-1").style.top = "0px";
        document.getElementById("items-4").style.left = "0px";
        document.getElementById("items-2").style.top = "25px";
        document.getElementById("items-3").style.left = "25px";

        document.querySelector(".startmenu").classList.toggle("opened");
        setTimeout(() => {

            document.querySelector(".startmenu").classList.toggle("display");
        }, 130);
    }
}
var showversionontitle;
function customappopensadj(name, code) {
    document.getElementById("cusakodshad").innerHTML = name;
    var iframe = document.getElementById("sdhahijsdhgjasihdijahsdjh");
    iframe.src = code;
}

function opendate() {
    document.querySelector(".clockdate").classList.toggle("displayblock")
}
function searchstartmenu() {
    var a, txtValue; 
    var input = document.getElementById('searchstartmenu'); 
    var filter = input.value.toUpperCase(); 
    var ul = document.getElementById("liststartmenu"); 
    var li = ul.getElementsByTagName('li'); 
    for (var i = 0; i < li.length; i++) { 
        a = li[i].getElementsByTagName("a")[0]; 
        txtValue = a.textContent || a.innerText; 
        if (txtValue.toUpperCase().indexOf(filter) > -1) { 
            li[i].style.display = ""; 
        } 
        else { 
            li[i].style.display = "none"; 
        }
    }
};

document.addEventListener("DOMContentLoaded",() => {
    document.querySelector("#searchstartmenu").addEventListener("keydown", (e) => {
        if (e.key === "Enter" && e.target.value !== "") {
            e.preventDefault();
            var allElement = document.querySelector("#liststartmenu").querySelectorAll("li")
            for (const el of allElement) {
                if (el.style.display !== "none") {
                    el.querySelector("a").click()
                    break
                }
            }
        }
    })
})

function custompozadisubmit() {
    var checkBoxnas = document.getElementById("custombackcheck");

    if (checkBoxnas.checked == true) {
        document.getElementById("inputpozadi").style.display = "block"
    } else {
        document.getElementById("inputpozadi").style.display = "none"
        document.getElementById("klindows").style.backgroundImage = defaltvzhled;
    }
}
function submitcss(value) {
    var path = new File(value).fullPath
    var contentoffile = mainFileManager.getContent(path)
    var element = document.getElementById("customcssstyleelement")
    element.innerHTML = contentoffile
    localStorage.setItem("customcss", path)
}
//sdasd
var mode = {
    light: () => {
        var x, i;
        x = document.querySelectorAll(".window");
        for (i = 0; i < x.length; i++) {
            x[i].style.backgroundColor = "white";
            x[i].classList.remove("black");
        }
        localStorage.setItem("mode", "light");
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
        fileManagerOpen();
    }
}
var clickstajnever = 0;
function tajnever() {
    clickstajnever++
    if (clickstajnever == 1) {
        setTimeout(() => {
            if (clickstajnever == 5) {
                document.getElementById("tajne").style.display = "block";
                clickstajnever = 0;
            }
            else {
                clickstajnever = 0;
            }
        }, 2000);
    }
    else if (clickstajnever == 5) {
        document.getElementById("tajne").style.display = "block";
        clickstajnever = 0;
    }
}
var sadjaijsdhijasdhasd = "false";
var clickstajnevers = 0;
function starttajne() {
    clickstajnevers++
    if (clickstajnevers == 1) {
        setTimeout(() => {
            if (clickstajnevers == 6) {
                clickstajnevers = 0;
                sadjaijsdhijasdhasd = "true";
            }
            else {
                clickstajnevers = 0;
            }
        }, 2000);
    }
    else if (clickstajnevers == 6) {
        clickstajnevers = 0;
        sadjaijsdhijasdhasd = "true";
    }
}
var sadhiashdijahsdn = "false";
var sdjadasdjiasd = 0;
var clickstajneverass = 0;
var customtajne;
function starttajnedva() {
    if (sadjaijsdhijasdhasd == "true") {

        clickstajneverass++
        if (clickstajneverass == 1) {
            setTimeout(() => {
                clickstajneverass = 0;
            }, 3500);
        }
        else if (clickstajneverass == 9) {
            sadjaijsdhijasdhasd = "false";
            clickstajneverass = 0;
            var customtajne = Math.floor(Math.random() * 30);
            if (customtajne > -1 && customtajne < 10) {
                openbrowser('jebaited.mp4');
            }
            else if (customtajne > 9 && customtajne < 21) {
                openbrowser('jebaitedcz.mp4');
            }
            else if (customtajne > 20 && customtajne < 28) {
                openbrowser('rickroll.mp4');
            }
            else {
                console.log("Never gonna give you up!")
                sadhiashdijahsdn = "true";
                skjdoahsdijhasd = 0;
            }
        }
    }
    else {
    }
}
var skjdoahsdijhasd = 0;
function tajnettri() {
    skjdoahsdijhasd++
    if (skjdoahsdijhasd == 69) {
        if (sadhiashdijahsdn == "true") {
            skjdoahsdijhasd = 0;
            openbrowser('putin.mp4');
        }
    }
}
function startgame() {
    document.getElementById("hratajna").style.display = "block";
    document.getElementById("startgame").style.display = "none";
    document.getElementById('hratajna').focus();
}
function closealertcookies() {
    document.getElementById("alertcookies").style.display = "none";
    localStorage.setItem("showedalertcookies", "true")
}
function getCssProperty(elmId, property) {
    var elem = document.getElementById(elmId);
    return window.getComputedStyle(elem, null).getPropertyValue(property);
}
function turnoff() {
    document.body.style.display = "none";
    setTimeout(() => {
        alert('Vypnuto');
    }, 200);
    window.close();
}
function openbrowser(url) {
    windows.open('brow', [url]);

}
var dt = new Date();
var year = dt.getFullYear();
setInterval(() => {
    if (consolelog != "false") {
        console.clear();
        console.log("%cVarování!", "color: red; font:bold; font-family:monospace; font-size: 40px");
        console.log("Chyby můžete nahlašovat na stránku https://github.com/JZITNIK-github/KLIND-OS/issues");
        console.log("Používáním téhlé stránky soulasíte s tím že stránka bude do vašeho počítače ukládat soubory cookies.");
        console.log('KLIND OS od KLIND');
    }
}, 5000);
function changefavicon(vari) {
    try {
        document.getElementById('favicon').setAttribute("href", vari);
    } catch {

    }
}

function loadbetaicon() {
    if (beta) {
        document.querySelector(".betadiv").classList.add("openedwin");
    }
    else if (version.indexOf("alpha") > -1) {
        document.querySelector(".betadiv").classList.add("openedwin");
        setTimeout(() => {
            document.title = titleklindows + " " + version + " | Pouze pro testovací účely!";
        }, 10000);
    }
}
//CONFIG VARS
var login;
var autolocklogin;
var developermode;
function onclickbody() {

}
function fixWindow() {
    var x = document.querySelectorAll(".window");
    for (i = 0; i < x.length; i++) {
        var rect = x[i].getBoundingClientRect();
        if (x[i].style.left == "") {
            var sirka = rect.left + x[i].offsetWidth
        }
        else {
            var sirka = parseInt(x[i].style.left.replace("px", "")) + x[i].offsetWidth
        }
        if (x[i].style.top == "") {
            var vyska = rect.top + x[i].offsetHeight
        }
        else {
            var vyska = parseInt(x[i].style.top.replace("px", "")) + x[i].offsetHeight
        }
        if (sirka > window.innerWidth) {
            if (window.innerWidth - x[i].offsetWidth > -1) {
                x[i].style.left = window.innerWidth - x[i].offsetWidth + "px"
            }
            else {
                x[i].style.left = "0px";
            }
        }
        if (vyska > window.innerHeight) {
            if (window.innerHeight - x[i].offsetHeight > -1) {
                x[i].style.top = window.innerHeight - x[i].offsetHeight + "px"
            }
            else {
                x[i].style.top = "0px";
            }
        }
        else {
            if (rect.left < 0) {
                x[i].style.left = "0px"
            }
            if (rect.top < 0) {
                x[i].style.top = "0px"
            }
        }
    }
    x = document.querySelectorAll(".ikonaklindows");
    for (i = 0; i < x.length; i++) {
        var rect = x[i].getBoundingClientRect();
        if (x[i].style.left == "") {
            var sirka = rect.left + x[i].offsetWidth
        }
        else {
            var sirka = parseInt(x[i].style.left.replace("px", "")) + x[i].offsetWidth
        }
        if (x[i].style.top == "") {
            var vyska = rect.top + x[i].offsetHeight
        }
        else {
            var vyska = parseInt(x[i].style.top.replace("px", "")) + x[i].offsetHeight
        }
        if (sirka > window.innerWidth) {
            x[i].style.left = "0px";
            x[i].style.top = "0px";
        }
        if (vyska > window.innerHeight) {
            x[i].style.left = "0px";
            x[i].style.top = "0px";
        }
        else {
            if (rect.left < 0) {
                x[i].style.left = "0px"
                x[i].style.top = "0px";
            }
            if (rect.top < 0) {
                x[i].style.top = "0px"
                x[i].style.left = "0px";
            }
        }

        var id = x[i].getAttribute("id")
        var array = JSON.parse(localStorage.getItem("desktop-icons"))
        array[id][2][0] = x[i].style.left.replace("px", "")
        array[id][2][1] = x[i].style.top.replace("px", "")
        localStorage.setItem("desktop-icons", JSON.stringify(array))
    }
}
window.addEventListener("resize", function () {
    fixWindow()
})
setInterval(() => {
    fixWindow()
}, 3000);