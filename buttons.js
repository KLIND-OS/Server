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
  
    sdjhahsdjhasdjsd=0;
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
if (!cookieEnabled){ 
    alert('Tato stránka vyžaduje cookies. Prosím zapněte je v nastavení prohlížeče.');
    window.location.reload();
}
var sdjhahsdjhasdjsd = 0;
function openstartmenu(){
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
        sdjhahsdjhasdjsd=0;
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
function confirmurlbrowser(element){
    try {
        var urlbrowser = element.querySelector("#url").value;
    }catch{}
    if (urlbrowser.indexOf('https://') > -1 | urlbrowser.indexOf('http://') > -1) {
        element.querySelector("#urlbrowseriframe").src = urlbrowser;
    }
    else {
        var nohttp = "http://"+urlbrowser;
        element.querySelector("#urlbrowseriframe").src = nohttp;
    }
}
function opendate() {
    document.querySelector(".clockdate").classList.toggle("displayblock")
}
function searchstartmenu() {var input, filter, ul, li, a, i, txtValue;input = document.getElementById('searchstartmenu');filter = input.value.toUpperCase();ul = document.getElementById("liststartmenu");li = ul.getElementsByTagName('li');for (i = 0; i < li.length; i++) {a = li[i].getElementsByTagName("a")[0];txtValue = a.textContent || a.innerText;if (txtValue.toUpperCase().indexOf(filter) > -1) {li[i].style.display = "";} else {li[i].style.display = "none";};};};

function custompozadisubmit() {
    var checkBoxnas = document.getElementById("custombackcheck");
  
  if (checkBoxnas.checked == true){
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
    localStorage.setItem("customcss",path)
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
            else if(customtajne>20 && customtajne<28) {
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
            skjdoahsdijhasd=0;
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
function getCssProperty(elmId, property){
    var elem = document.getElementById(elmId);
    return window.getComputedStyle(elem,null).getPropertyValue(property);
}
function turnoff() {
    document.body.style.display = "none";
    setTimeout(() => {
        alert('Vypnuto');
    }, 200);
    window.close();
}
function openbrowser(url) {
    windows.open('brow',[url]);
    
}
var dt = new Date();
var year = dt.getFullYear();
setInterval(() => {
    if (consolelog != "false") {
        console.clear();
        console.log("%cVarování!","color: red; font:bold; font-family:monospace; font-size: 40px");
        console.log("Chyby můžete nahlašovat na stránku https://github.com/JZITNIK-github/KLIND-OS/issues");
        console.log("Používáním téhlé stránky soulasíte s tím že stránka bude do vašeho počítače ukládat soubory cookies.");
        console.log('KLIND OS od KLIND');
    }
}, 5000);
function changefavicon(vari) {
    try {
        document.getElementById('favicon').setAttribute("href", vari);
    }catch {

    }
}

function loadbetaicon() {
    if (beta) {
        document.querySelector(".betadiv").classList.add("openedwin");
    }
    else if (version.indexOf("alpha") > -1) {
        document.querySelector(".betadiv").classList.add("openedwin");
        setTimeout(() => {
            document.title = titleklindows+" "+version+" | Pouze pro testovací účely!";
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
            var sirka = rect.left+x[i].offsetWidth
        }
        else {
            var sirka = parseInt(x[i].style.left.replace("px",""))+x[i].offsetWidth
        }
        if (x[i].style.top == "") {
            var vyska = rect.top+x[i].offsetHeight
        }
        else {
            var vyska = parseInt(x[i].style.top.replace("px",""))+x[i].offsetHeight
        }
        if (sirka > window.innerWidth) {
            if (window.innerWidth-x[i].offsetWidth >-1) {
                x[i].style.left = window.innerWidth-x[i].offsetWidth+"px"
            }
            else {
                x[i].style.left = "0px";
            }
        }
        if (vyska > window.innerHeight) {
            if (window.innerHeight-x[i].offsetHeight >-1) {
                x[i].style.top = window.innerHeight-x[i].offsetHeight+"px"
            }
            else {
                x[i].style.top = "0px";
            }
        }
        else {
            if (rect.left<0) {
                x[i].style.left = "0px"
            }
            if (rect.top<0) {
                x[i].style.top = "0px"
            }
        }
    }
    x = document.querySelectorAll(".ikonaklindows");
    for (i = 0; i < x.length; i++) {
        var rect = x[i].getBoundingClientRect();
        if (x[i].style.left == "") {
            var sirka = rect.left+x[i].offsetWidth
        }
        else {
            var sirka = parseInt(x[i].style.left.replace("px",""))+x[i].offsetWidth
        }
        if (x[i].style.top == "") {
            var vyska = rect.top+x[i].offsetHeight
        }
        else {
            var vyska = parseInt(x[i].style.top.replace("px",""))+x[i].offsetHeight
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
            if (rect.left<0) {
                x[i].style.left = "0px"
                x[i].style.top = "0px";
            }
            if (rect.top<0) {
                x[i].style.top = "0px"
                x[i].style.left = "0px";
            }
        }

        var id = x[i].getAttribute("id")
        var array = JSON.parse(localStorage.getItem("desktop-icons"))
        array[id][2][0] = x[i].style.left.replace("px","")
        array[id][2][1] = x[i].style.top.replace("px","")
        localStorage.setItem("desktop-icons", JSON.stringify(array))
    }
}
window.addEventListener("resize",function() {
    fixWindow()
})
setInterval(() => {
    fixWindow()
}, 3000);
var windows = {
    list:{
        names:    ["poznamky","kalk","stop","nas","brow",                                                          "ter","player","info","reg",                                                                               "kalen","budik","maps","prevod","update","nap","faceset","record","filemanager","fileproperties","fileeditor","zdroje","about","audioLevelEditor","installapp","procesy","viewtext","musicplayer"],
        classes:  [".poznamky",".kalkulacka",".stopky",".nastaveni",".browser",                            ".terminal",".player",".informationklindows",".reg",                                ".kalendar",".budik",".maps",".prevodsys",".updateklind",".napoveda",".faceset",".record",".filemanager",".fileproperties",".fileeditor",".zdroje",".about",".audioLevelEditor",".installapp",".procesy",".viewtext",".musicplayer"],
        ikonadown:[".poznamkyikonadown",".kalkikonadown",".stopikonadown",".nasikonadown",".browikonadown",".terikonadown",".playerikonadown",".infoikonadown",".regikonadown",".kalenikonadown",".budikikonadown",".mapsikonadown",".prevodikonadown",".updateikonadown",".napikonadown",".facesetikonadown",".recordikonadown",".filemanagerikonadown",false,".fileeditorikonadown",".zdrojeikonadown",".aboutikonadown",false, ".installappikonadown",".procesyikonadown",false,".musicplayerikonadown"],
        special:{
            poznamky: [(element)=>{loadpoznamky(element)},()=>{closepoznamkymenu()},false],
            info: [(element)=>{element.querySelector("#versionwrite").innerHTML = version;},false,false],
            my:   [(element)=>{element.querySelector("#myaccount").innerHTML = localStorage.getItem("username");},false,false],
            faceset:[(element)=>{if (facerecrpi){element.querySelector(".facesetiframe").src = "facesetrpi.html";}},false,false],
            filemanager: [(element, args)=>{
                var url = "/filemanager/"
                if (localStorage.getItem('mode')=="dark") url+="?dark"
                
                if (args && args.mode == "select") {
                    if (url.indexOf("?")!=-1) url+="?select"
                    else url+="&select"
                    var index = openGetFile.length
                    openGetFile.push([element, args.callBack])
                    element.querySelector(".close").setAttribute("onclick", "openGetFile["+index+"][1]['closed']();windows.close(this,'poznamky')")
                    element.querySelector(".mini").remove()
                    element.querySelector(".headerclass span").textContent = "Vyberte soubor";
                    url+="&index="+index
                }
                element.querySelector("#filemanageriframe").src = url
            },false,false],
            fileeditor: [
                (element, args)=>{
                    var file = args.file;
                    if (file[2].split("/")[0]=="text") {
                        element.querySelector(".fileeditorimage").style.display = "none";
                        element.querySelector(".fileeditortext").style.display = "block";
                        element.querySelector(".fileeditorvideo").style.display = "none";
                        element.querySelector("#textareafileeditorimage").value = file[4]
                        element.setAttribute("filelocation", file[5]+file[0])
                        element.querySelector(".filesavefileconfig").style.display = "block";
                        element.querySelector(".imgwallpaperfileconfig").style.display = "none";
                        
                    }
                    else if (file[2].split("/")[0]=="image") {
                        element.querySelector(".fileeditorimage").style.display = "block";
                        element.querySelector(".fileeditortext").style.display = "none";
                        element.querySelector(".fileeditorvideo").style.display = "none";
                        element.querySelector("#fileeditorimageimg").src = file[4]
                        element.setAttribute("filelocation", file[5]+file[0])
                        element.querySelector(".filesavefileconfig").style.display = "none";
                        element.querySelector(".imgwallpaperfileconfig").style.diousplay = "block";
                    }
                    else if (file[2].split("/")[0]=="video") {
                        element.querySelector(".fileeditorimage").style.display = "none";
                        element.querySelector(".fileeditortext").style.display = "none";
                        element.querySelector(".filesavefileconfig").style.display = "none";
                        element.querySelector(".fileeditorvideo").style.display = "flex";
                        element.querySelector(".imgwallpaperfileconfig").style.diousplay = "none";
                        element.querySelector("video source").setAttribute("type", file[2])
                        element.querySelector("video source").setAttribute("src", file[4])
                        const player = new Plyr(document.querySelectorAll("#player")[1], {
                            iconUrl: "icons/plyr.svg"
                        })
                        player.play();
                    }
                    else {
                        element.querySelector(".fileeditorimage").style.display = "none";
                        element.querySelector(".fileeditortext").style.display = "block";
                        element.querySelector(".fileeditoraudio").style.display = "none";
                        element.querySelector(".fileeditorvideo").style.display = "none";
                        element.querySelector("#textareafileeditorimage").value = file[4]
                        element.setAttribute("filelocation", file[5]+file[0])
                        element.querySelector(".filesavefileconfig").style.display = "block";
                        element.querySelector(".imgwallpaperfileconfig").style.display = "none";
                    }
                    if (localStorage.getItem('mode')=="dark"){
                        element.querySelector("#textareafileeditorimage").style.color="white";
                    }
                    else{
                        element.querySelector("#textareafileeditorimage").style.color="black";
                    }
                },
                false,
                false
            ],
            brow: [(element, args) => {
                if (args !== undefined) {
                    element.querySelector("#urlbrowseriframe").src = args[0];
                    element.querySelector("#url").value = args[0];
                }
            },false,false],
            installapp: [
                (element) => {
                    CustomApp.loadWindow(element)
                },
                false,false
            ],
            viewtext: [
                (element, args) => {
                    if (args.text) {
                        element.querySelector('textarea').value = args.text.toString();
                    }
                    if (args.title) {
                        element.querySelector('.widget-header .headerclass span').textContent = args.title.toString();
                    }
                },
                false,false
            ],
            musicplayer: [
                (element, args) => {
                    element.querySelector("iframe").src = "/music?filePath="+args.filePath;
                },false,false
            ]
        },
        appIds: {

        }
    },
    open:(name, args)=> {
        var location = windows.list.names.indexOf(name)
        var classofelement = windows.list.classes[location]
        if (classofelement == false) {
            error("0x0000144", "Pokus o otevření pragramu které nemá okno.", "KLIND OS | Window Manager");
        }
        else {
            var special = windows.list.special[name]
            var element = document.querySelector(".oknadisplaynone").querySelector(classofelement)
            let newelement = element.cloneNode(true)
            newelement.classList.add("window")
            newelement.classList.add("openedwin")
            document.querySelector(".oknepatrizde").appendChild(newelement)
            reloaddraggable();
            if (localStorage.getItem("mode")== "dark") {
                var x, i;
                x = document.querySelectorAll(".window");
                for (i = 0; i < x.length; i++) {
                    x[i].style.backgroundColor = "#3b3838";
                    x[i].classList.add("black");
                }
            }
            else {
                var x, i;
                x = document.querySelectorAll(".window");
                for (i = 0; i < x.length; i++) {
                    x[i].style.backgroundColor = "white";
                    x[i].classList.remove("black");
                }
            }
            if (special!=undefined&&special[0]!==false) {
                special[0](newelement, args)
            }
            changewindowmain(newelement)
            return newelement
        }
    },
    close:(element, name)=>{
        var special = windows.list.special[name]
        element.parentElement.parentElement.parentElement.remove();
        if (special!=undefined&&special[1]!==false) {
            special[1]()
        }
    },
    mini:(element, name)=> {
        var location = windows.list.names.indexOf(name)
        var special = windows.list.special[name]
        var ikonadown = windows.list.ikonadown[location]
        var mainElement = element.parentElement.parentElement.parentElement
        if (ikonadown===false) {
            error("0x0000142", "Pokus o minimalizaci okna, které nemá script na minimalizaci.", "KLIND OS | Window Manager");
        }
        else {
            var icon = document.querySelector(".downiconsAppNone "+ikonadown);
            var newElement = icon.cloneNode(true);
            var key = windows.getRandomKey();
            windows.list.appIds[key] = mainElement;
            newElement.setAttribute("windowId", key);
            newElement.style.transform = "scale(0)";
            if (special!=undefined&&special[2]!==false) {
                special[2](mainElement);
            }
            var el = document.querySelector(".downiconsApps").appendChild(newElement)
            mainElement.classList.remove("openedwin");
            setTimeout(() => {
                el.style.transform = ""
                el.addEventListener("click",() => {
                    var appdiv = document.querySelector(".appdiv")
                    appdiv.querySelector(".canvasSection").innerHTML = ""
                    appdiv.style.display = "none";
                })
                el.addEventListener("mouseover",(e) => {
                    if (localStorage.getItem("filePreview")) {
                        var el = e.target;
                        var id = el.getAttribute("windowId");
                        var element = windows.list.appIds[id]
                        element.style.display = "block";
                        var appdiv = document.querySelector(".appdiv")
                        appdiv.querySelector(".canvasSection").innerHTML = '<div class="loading">Loading&#8230;</div>'
                        appdiv.querySelector("h1").textContent = element.querySelector(".headerclass span").textContent;
                        var left = e.clientX-150;
                        if (left < 10) {
                            appdiv.style.left = "10px"
                        }
                        else {
                            appdiv.style.left = left+"px"
                        }
                        appdiv.style.display = "block";
                        element.style.clipPath = "inset(0 100% 0 0)"
                        html2canvas(element).then(function(canvas) {
                            canvas.style.height = "auto";
                            canvas.style.width = "auto";
                            canvas.style.maxHeight = "100%";
                            canvas.style.maxWidth = "100%";
                            canvas.style.borderRadius = "10px";
                            element.style.clipPath = ""
                            element.style.display = "none";
                            appdiv.querySelector(".canvasSection").innerHTML = ""
                            appdiv.querySelector(".canvasSection").appendChild(canvas)
                        });
                    }
                })
                el.addEventListener("mouseout",(e) => {
                    var appdiv = document.querySelector(".appdiv")
                    appdiv.querySelector(".canvasSection").innerHTML = "";
                    appdiv.style.display = "none";
                });
            });
        }
    },
    getRandomKey: () => {
        var number = Math.floor(Math.random()*3500);
        if (windows.list.appIds[number] == undefined) {
            return number;
        }
        else {
            return windows.getRandomKey();
        }
    },
    miniOpen: (_, thiselement) => {
        setTimeout(() => {
            var id = thiselement.getAttribute("windowId")
            var mainElement = windows.list.appIds[id];
            mainElement.classList.add("openedwin");
            thiselement.style.transform = "scale(0)"
            windows.list.appIds[id] = undefined;
            setTimeout(() => {
                thiselement.remove();
            }, 200);
        }, 150);
    }
}