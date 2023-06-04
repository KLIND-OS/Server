//terminal function

control.dowhenlogin.add(()=>{
    if (shellinklindosinstalled) {
        apps.createApp(
            "ShellInKLINDOS Client",
            () => {
                
            },
            true
        )
        var location = windows.list.names.indexOf("ShellInKLINDOS Client")
        windows.list.classes[location] = ".shellinklindos"
        windows.list.special["ShellInKLINDOS Client"] = [
            (elmnt) => {
                elmnt.querySelector("iframe").src = "https://"+window.location.hostname+":8439"
            },
            false,
            false
        ]
    }
})


function openserverterminal() {
    if (shellinklindosinstalled) {
        openbrowser('https://'+window.location.hostname+':8439')
        return "Shell In KLINDOS se spouští."
    }
    else {
        return "Shell In KLINDOS není zapnutý nebo povolený."
    }
}