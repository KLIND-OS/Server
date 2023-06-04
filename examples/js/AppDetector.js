appdetectorapp = new App({
    name: "AppDetector",
    onStart: () => {

    },
    hidden: false,
})
appdetectorapp.createWindow({
    buttons: {
        close: () => {

        },
        mini: () => {

        }
    },
    content: '<input placeholder="AppName"></input><button onclick="appdetectorsubmit(this.parentElement)">Submit</button><br><button onclick="appnotminidetect()">Detekovat aplikace bez minimalizace</button>'
})
appdetectorapp.createMiniIcon();

function appnotminidetect() {
    var list = []
    for (var i = 0; i < windows.list.ikonadown.length; i++) {
        if (windows.list.ikonadown[i]==false) {
            list.push(windows.list.names[i])
        }
    }
    alert("Aplikace bez minimalizace:\n\n"+list.join(","))
}
function appdetectorsubmit(element) {
    var value = element.querySelector("input").value
    var position = windows.list.names.indexOf(value)
    var classe = windows.list.classes[position]
    var sd = windows.list.ikonadown[position]
    alert("AppDetector output: \nName: "+value+"\nClass: "+classe+"\nDownIcon: "+sd)
}