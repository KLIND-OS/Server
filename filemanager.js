function lengthInUtf8Bytes(str) {
    // Matches only the 10.. bytes that are non-initial characters in a multi-byte sequence.
    var m = encodeURIComponent(str).match(/%[89ABab]/g);
    return str.length + (m ? m.length : 0);
}
function removebyindex(array, index) {
    var doacgajs = []
    for (var i = 0; i < array.length; i++) {
        if (i != index) {
            doacgajs.push(array[i])
        }
    }
    return doacgajs
}
function humanFileSize(bytes, si=false, dp=1) {
    const thresh = si ? 1000 : 1024;
  
    if (Math.abs(bytes) < thresh) {
      return bytes + ' B';
    }
  
    const units = si 
      ? ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] 
      : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10**dp;
  
    do {
      bytes /= thresh;
      ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);
  
  
    return bytes.toFixed(dp) + ' ' + units[u];
}
var mainFileManager = {
    openWith: [],
    open: (file) => {
        for (var i = 0; i < mainFileManager.openWith.length; i++) {
            for (var j in mainFileManager.openWith[i][0]) {
                if (mainFileManager.openWith[i][0][j] == file[2]) {
                    mainFileManager.openWith[i][1](file)
                    return;
                }
            }
        }
        if (file[2].split("/")[0]=="audio") {
            parent.windows.open("musicplayer",{filePath:file[5]+file[0]})
        }
        else if (file[2] == "klindos/app") {
            parent.windows.open(file[4].split(":")[1])
        }
        else {
            windows.open("fileeditor", {
                file: file
            })
        }
    },
    properties: (file) => {
        document.querySelector("#filename").innerHTML = file[0]
        document.querySelector("#filesize").innerHTML = humanFileSize(file[1],true)
        document.querySelector("#filechange").innerHTML = file[3]
        document.querySelector("#filelocation").innerHTML = file[5]+file[0]
        if (file[2] != "") {
            document.querySelector("#filetype").innerHTML = file[2]
        }
        else {
            document.querySelector("#filetype").innerHTML = "neznámé"
        }
        windows.open("fileproperties")
    },
    save: (location, file) => {
        var value = JSON.parse(localStorage.getItem("files-uploaded"))
        for (var i = 0; i < value.length; i++) {
            if (value[i][5]+value[i][0]==location) {
                var time = new Date().toString();
                value[i][1]=lengthInUtf8Bytes(file)
                value[i][3]=time
                value[i][4]=file
                continue
            }
        }
        try {
            localStorage.setItem("files-uploaded",JSON.stringify(value))
        }catch(e) {
            spawnNotification("Správce souborů","Tento soubor je moc velký na to aby byl uložen.")
            console.log("File is too big to be saved. Error: "+e.toString())
        }
        var windowasjdh = document.querySelectorAll(".window")
        for (var i = 0; i < windowasjdh.length; i++) {
            if (windowasjdh[i].querySelector("#filemanageriframe") != undefined) {
                windowasjdh[i].querySelector("#filemanageriframe").contentWindow.FileManager.readFiles()
            }
        }

        
    },
    setWallpaper: (location) => {
        localStorage.setItem("background", location)
        document.getElementById("klindows").style.backgroundImage = "url("+mainFileManager.getContent(location)+")";
    },
    getContent: (location) => {
        try {
            locationsplit = location.split("/");
            namefile = locationsplit[locationsplit.length-1]
            folder = removebyindex(locationsplit, locationsplit.length-1).join("/")+"/"
            var stored = JSON.parse(localStorage.getItem("files-uploaded"));
            if (stored) {
                for (var i = 0; i < stored.length; i++) {
                    if (stored[i][5] == folder) {
                        if (stored[i][0] == namefile) {
                            return stored[i][4]
                        }
                    }
                }
            }
            return false;
        }
        catch {
            return false
        }
    },
    folderExist: (location) => {
        try {
            var stored = JSON.parse(localStorage.getItem("folders-uploaded"));
        }
        catch {
            return false;
        }
        if (stored == null) return false;
        for (var i = 0; i < stored.length; i++) {
            if (stored[i][1]+stored[i][0]==location) {
                return true;
            }
        }
        return false;
    },
    allFiles: (folder) => {
        try {
            var stored = JSON.parse(localStorage.getItem("files-uploaded"));
        }
        catch {
            return new Array();
        }
        var files = new Array();
        if (folder != "/") folder=folder+"/"
        for (var i = 0; i < stored.length; i++) {
            if (stored[i][5]==folder) {
                files.push(stored[i])
            }
        }
        return files
    },
    getFile: (location) => {
        var stored = JSON.parse(localStorage.getItem("files-uploaded"));
        for (var i = 0; i < stored.length; i++) {
            if (stored[i][5]+stored[i][0]==location) {
                return stored[i]
            }
        }
    },
    createAppShortCut: (appName,fileName) => {
        var stored = localStorage.getItem("files-uploaded");
        if (stored == null) stored = new Array()
        else stored=JSON.parse(stored)
        const time = new Date().toString();
        const content = "open:"+appName;

        if (mainFileManager.getContent("/"+fileName) == false) {
            stored.push([fileName,lengthInUtf8Bytes(content),"klindos/app",time,content,"/"])
            localStorage.setItem("files-uploaded",JSON.stringify(stored));

            var windowasjdh = document.querySelectorAll(".window")
            for (var i = 0; i < windowasjdh.length; i++) {
                if (windowasjdh[i].querySelector("#filemanageriframe") != undefined) {
                    windowasjdh[i].querySelector("#filemanageriframe").contentWindow.FileManager.readFiles()
                }
            }

        }
        else {
            mainFileManager.createAppShortCut(appName, fileName+"x")
        }
    },
    createFile: ({name, type="textPlain", content="", parentFolder="/"}) => {
        if (mainFileManager.getContent(name+parentFolder)===false) {
            name = "x"+name;
            mainFileManager.createFile({name, type, content, parentFolder});
        }
        var array = JSON.parse(localStorage.getItem("files-uploaded"))
        var add = [name, lengthInUtf8Bytes(content), type, new Date().toString(), content, parentFolder]
        array.push(add)
        localStorage.setItem("files-uploaded", JSON.stringify(array))
        return add
    },
    fileExists: (path) => {
        if (mainFileManager.getContent(path) === false) {
            return false
        }
        return true
    },
    addProgramToOpenApps: (typesOfFilesShouldBeOpened, scriptThatWillBeExecuted) => {
        list = typeof typesOfFilesShouldBeOpened == "object" ? typesOfFilesShouldBeOpened : [typesOfFilesShouldBeOpened]
        script = scriptThatWillBeExecuted
        mainFileManager.openWith.push([list, script])
    }
}
class File {
    constructor(file) {
        if (!file) throw new Error("File does not exist!")
        this.name = file[0]
        this.size = file[1]
        this.type = file[2]
        this.lastChange = file[3]
        this.content = file[4]
        this.parentFolder = file[5]
        this.fullPath = this.parentFolder + this.name
    }
    decodeToArray() {
        return [this.name, this.size, this.type, this.lastChange, this.content, this.parentFolder]
    }
    open() {
        return mainFileManager.open(this.decodeToArray())
    }
    save(content) {
        this.content = content
        mainFileManager.save(this.fullPath, this.content)
    }
    remove() {
        var value = JSON.parse(localStorage.getItem("files-uploaded"))
        for (var i = 0; i < value.length; i++) {
            if (value[i][5]+value[i][0] === this.fullPath) {
                var newarray = removebyindex(value, i)
                localStorage.setItem("files-uploaded", JSON.stringify(newarray))
                return true
            }
        }
        throw new Error("File does not exist!")
    }
}
function fileManagerOpen() {
    if (localStorage.getItem('mode') == "dark") {
        for (var i = 0; i < document.querySelectorAll("#filemanageriframe").length; i++) {
            document.querySelectorAll("#filemanageriframe")[i].src="/filemanager/?dark"
        }
        for (var i = 0; i < document.querySelectorAll("#textareafileeditorimage").length; i++) {
            document.querySelectorAll("#textareafileeditorimage")[i].style.color="white";
        }
    }
    else {
        for (var i = 0; i < document.querySelectorAll("#filemanageriframe").length; i++) {
            document.querySelectorAll("#filemanageriframe")[i].src="/filemanager/"
        }
        for (var i = 0; i < document.querySelectorAll("#textareafileeditorimage").length; i++) {
            document.querySelectorAll("#textareafileeditorimage")[i].style.color="black";
        }
    }
}