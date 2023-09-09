class Boot {
    static safeBoot = localStorage.getItem("bootType") == "safe"
    static rebootAsSafeMode(x) {
        if (x) {
            localStorage.setItem("bootType", "safe")
            window.location.reload()
        }
        else {
            BPrompt.confirm("Opravdu chcete restartovat Váš počítač do safe módu?", (ans) => {
                if (ans) {
                    localStorage.setItem("bootType", "safe")
                    window.location.reload()
                }
            })
        }
    }
    static disableMessageSafeMode() {
        if (Boot.safeBoot) {
            clearInterval(bootMessageId)
            console.clear()
            console.log("%cSafeMode: Bezpečnostní zpráva byla vypnuta!", "color: red; font:bold; font-family:monospace; font-size: 30px");
        }
        else {
            console.log("%cSafeMode: Systém není spuštěn v nouzovém módu!", "color: red; font:bold; font-family:monospace; font-size: 30px");
        }
    }
}



if (Boot.safeBoot) {
    localStorage.setItem("bootType", "normal")
    setInterval(() => consolelog = "false", 50)
    var bootMessageId = setInterval(() => {
        console.clear()
        console.log("%cSafeMode!", "color: red; font:bold; font-family:monospace; font-size: 40px");
        console.log("%cPočítač je spuštěný v nouzovém režimu! Některé funkce nemusí fungovat.", "color: red; font:bold; font-family:monospace; font-size: 25px");
        console.log("%cPokud chcete vypnout tuhle zprávu pošlete 'Boot.disableMessageSafeMode()", "color: green; font:bold; font-family:monospace; font-size: 15px")
    }, 200);
}

