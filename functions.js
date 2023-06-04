var todos = []
var openGetFile = []
var playingSounds = []
var playingSongs = []
var control = {
    dowhenlogin: {
        add: (x) => {
            if (typeof x === 'function') {
                todos.push(x)
            }
        },
        loged: () => {
            for (var i = 0; i < todos.length; i++) {
                todos[i]()
            }
            todos = []
        },
        loaded: () =>{
            if (login != "true") {
                setTimeout(() => {
                    for (var i = 0; i < todos.length; i++) {
                        todos[i]()
                    }
                    todos = []
                }, 790);
            }
        }
    },
    error: (type) => {
        if (type == "fatal") {
            return (info, appName) => {
                error("0x0000241", info, "Chyba vyvolána aplikací: "+appName)
            }
        }
        else if (type == "warn") {
            return (info, appName) => {
                spawnNotification(appName+" - Varování", info)
            }
        }
        else {
            return () => {
                throw new Error("Uknown type of error: "+type)
            }
        }
    },
    loged: false,
    functions: {
        logout: (app) => {
            var appName = app.info.name
            spawnNotification(appName, "Budete odhlášen za 5 sekund.")
            setTimeout(() => {
                logout();
            }, 5000);
        },
        reboot: (app) => {
            var appName = app.info.name
            BPrompt.confirm("Chcete aplikaci "+appName+" povolit restartovat Váš počítač?", (x) => {
                if (x) {
                    spawnNotification(appName, "Systém bude restartován za 5 sekund!")
                    setTimeout(() => {
                        window.location.reload()
                    }, 5000);
                }
            })
        }
    },
    playSound: (location) => {
        var x = new Howl({
            src: [location],
            volume: Math.round((AudioEditor.value/100) * 10) / 10,
            autoplay: true
        });
        x.on('end', function() {
            playingSounds = removebyindex(playingSounds, playingSounds.indexOf(x))
        })
        playingSounds.push(x);
        return x;
    },
    playSong: (location, otherSettings, autoplay) => {
        var x = new Howl({
            src: [location],
            volume: Math.round((AudioEditor.value/100) * 10) / 10,
            autoplay: autoplay || true,
            ...otherSettings
        });
        x.on('end', function() {
            playingSongs = removebyindex(playingSongs, playingSongs.indexOf(x))
        })
        playingSongs.push(x);
        return x;
    },
    getVolume: () => Math.round((AudioEditor.value/100) * 10) / 10,
    notify: spawnNotification,
    fileManager: Object.assign({}, {
        fileSelect: (callBack) => {
            windows.open("filemanager", {mode:"select",callBack:callBack})
        },
        FileConstructor: File
    },mainFileManager),
    message: BPrompt,
    printScreen: (callback) => {
        html2canvas(document.querySelector("#klindows"),{useCORS: true,
            allowTaint: true,}).then(function(canvas) {
            callback(canvas.toDataURL())
        });
    }
}
class App {
    constructor({name, onStart, hidden}) {
        if (windows.list.names.includes(name)) {
            throw new Error("App with this name already exists. Name must be a unique.")
        }
        else {
            if (hidden === false) {
                var element = document.createElement("li")
                var a = document.createElement("a")
                a.textContent = name
                a.onclick = () => {windows.open(name);}
                element.appendChild(a)
                document.querySelector("#liststartmenu").appendChild(element)
            }
            else {
                hidden = true
            }
            windows.list.names.push(name)
            windows.list.classes.push(false)
            windows.list.ikonadown.push(false)
            windows.list.special[name] = [onStart, false, false]
            this.info = {
                name: name,
                onStart: onStart,
                inStartMenu: hidden,
            }
        }
    }
    createWindow({buttons, content}) {
        var name = this.info.name
        
        var okno = document.createElement('div')
        okno.classList.add('widgetList')
        okno.classList.add(name.replaceAll(" ",""))
        okno.classList.add('Resizabl')
        okno.setAttribute("onclick", "changewindowmain(this);")

        var widgetHeader = document.createElement('div')
        widgetHeader.classList.add("widget-header")

        var headerClass = document.createElement('div')
        headerClass.classList.add("headerclass")

        var spanName = document.createElement('span')
        spanName.textContent = name
        headerClass.appendChild(spanName)
        if (buttons.close != undefined) {
            var closeBtn = document.createElement('div')
            closeBtn.classList.add("close")
            closeBtn.setAttribute("onclick", "windows.close(this,'"+name+"')")
            headerClass.appendChild(closeBtn)
            var closeaction = buttons.close
        }
        else {
            var closeaction = false
        }
        if (buttons.mini != undefined) {
            var miniBtn = document.createElement('div')
            miniBtn.classList.add("mini")
            miniBtn.setAttribute("onclick", "windows.mini(this,'"+name+"')")
            headerClass.appendChild(miniBtn)
            var miniaction = buttons.mini
        }
        else {
            var miniaction = false
        }

        windows.list.special[name][1] = closeaction
        windows.list.special[name][2] = miniaction
        
        widgetHeader.appendChild(headerClass)

        okno.appendChild(widgetHeader)
        okno.classList.add("customAppResizable")

        var final = document.querySelector(".oknadisplaynone").appendChild(okno)
        final.innerHTML += content

        var location = windows.list.names.indexOf(name)
        windows.list.classes[location] = "."+name.replaceAll(" ","")

        this.window = final;
    }
    createMiniIcon() {
        var appname = this.info.name
        
        var element = document.createElement("img")
        element.src = CustomApp.getIcon(appname)
        element.alt = appname
        element.setAttribute("onclick", "windows.miniOpen('"+appname+"',this)")
        element.classList.add("ikonadown")
        element.classList.add(appname.replaceAll(" ","")+"ikonadown")

        var final = document.querySelector(".downiconsAppNone").appendChild(element)

        var location = windows.list.names.indexOf(appname)
        windows.list.ikonadown[location] = "."+appname.replaceAll(" ","")+"ikonadown"

        this.miniIcon = final;
    }
    storage = {
        set: (key,value) => {
            var storage = JSON.parse(localStorage.getItem(this.info.name)) || {}
            storage[key] = value;
            localStorage.setItem(this.info.name, JSON.stringify(storage));
        },
        get: (key) => {
            var storage = JSON.parse(localStorage.getItem(this.info.name)) || {}
            return storage[key]
        },
        remove: (key) => {
            var storage = JSON.parse(localStorage.getItem(this.info.name));
            delete storage[key];
        },
        clear: () => {
            var name = this.info.name
            localStorage.removeItem(name)
        }
    }
}