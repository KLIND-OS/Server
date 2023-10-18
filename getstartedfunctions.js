class GetStarted {
    static globalWindow;
    static init(win) {
        const width = win.offsetWidth;
        const height = win.offsetHeight;
        var ww = window.innerWidth;
        var wh = window.innerHeight;

        const finalw = (ww / 2) - (width / 2);
        const finalh = (wh / 2) - (height / 2);

        win.style.inset = finalh + "px auto auto " + finalw + "px";
    }
    static zaciname(win) {
        win.querySelector(".page1").style.display = "none";
        win.querySelector(".page2").style.display = "flex";
        win.querySelector(".arrowdownhelp").style.display = "block";
        win.style.transition = "ease 0.5s all";
        setTimeout(() => {
            win.style.height = "500px";
            win.style.minHeight = "500px";
            win.style.width = "300px";
            win.style.minWidth = "300px";
            win.style.inset = (window.innerHeight - 500 - 50 - 10) + "px auto auto " + "10px";
            setTimeout(() => {
                win.style.transition = "";
            }, 500);
        }, 10);
    }
    static nextStart(win) {
        win.querySelector(".page2").style.display = "none";
        win.querySelector(".page3").style.display = "flex";
        win.querySelector(".arrowdownhelp").style.rotate = "90deg";
        win.style.transition = "ease 0.5s all";
        setTimeout(() => {
            win.style.inset = (window.innerHeight - 500 - 50 - 100) + "px auto auto " + "480px";
            setTimeout(() => {
                win.style.transition = "";
            }, 500);
            openstartmenu();
        }, 10);
    }
    static nextMenu(win) {
        win.querySelector(".page3").style.display = "none";
        win.querySelector(".page4").style.display = "flex";
        win.style.transition = "ease 0.5s all";
        setTimeout(() => {
            win.style.inset = "77px auto auto 715px";
            setTimeout(() => {
                win.style.transition = "";
            }, 500);
            GetStarted.globalWindow = windows.open("poznamky");
        }, 10);
    }
    static nextApp(win) {
        win.querySelector(".page4").style.display = "none";
        win.querySelector(".page5").style.display = "flex";
        win.querySelector(".arrowdownhelp").style.display = "none";
        win.style.transition = "ease 0.5s all";
        setTimeout(() => {
            win.style.inset = "20px auto auto 20px";
            setTimeout(() => {
                win.style.transition = "";
            }, 500);
            setTimeout(() => {
                GetStarted.globalWindow.style.transition = "ease 0.6s all";
                var ww = window.innerWidth;
                var wh = window.innerHeight;
                GetStarted.globalWindow.style.inset = parseInt(wh / 3) + "px auto auto " + parseInt(wh / 1.4) + "px";
                setTimeout(() => {
                    GetStarted.globalWindow.style.inset = parseInt(wh / 2.5) + "px auto auto " + parseInt(wh / 1.8) + "px";
                }, 800);
                setTimeout(() => {
                    GetStarted.globalWindow.style.inset = parseInt(wh / 4) + "px auto auto " + parseInt(wh / 2) + "px";
                    setTimeout(() => {
                        GetStarted.globalWindow.style.transition = "";
                    }, 650);
                }, 1500);
            }, 200);
        }, 10);
    }
    static nextDrag(win) {
        win.querySelector(".page5").style.display = "none";
        win.querySelector(".page6").style.display = "flex";
        win.querySelector(".arrowdownhelp").style.display = "none";
        win.style.transition = "ease 0.5s all";
        win.querySelector(".arrowdownhelp").style.rotate = "0deg";
        win.querySelector(".arrowdownhelp").style.display = "block";
        setTimeout(() => {
            win.style.inset = (window.innerHeight - 500 - 50 - 10) + "px auto auto " + "50px";
            setTimeout(() => {
                win.style.transition = "";
            }, 500);
            setTimeout(() => {
                windows.mini(GetStarted.globalWindow.querySelector(".mini"), "poznamky");
            }, 200);
        }, 10);
    }
    static nextMini(win) {
        win.querySelector(".page6").style.display = "none";
        win.querySelector(".page7").style.display = "flex";
        win.querySelector(".arrowdownhelp").style.display = "none";
        win.style.transition = "ease 0.5s all";
        win.querySelector(".arrowdownhelp").style.rotate = "90deg";
        setTimeout(() => {
            win.style.inset = "15px auto auto 15px";
            setTimeout(() => {
                win.style.transition = "";
            }, 500);
            setTimeout(() => {
                document.querySelector(".downiconsApps .ikonadown.poznamkyikonadown").click();
            }, 200);
        }, 10);
    }
    static nextOpen(win) {
        win.querySelector(".page7").style.display = "none";
        win.querySelector(".page8").style.display = "flex";
        win.querySelector(".arrowdownhelp").style.display = "none";
        win.style.transition = "ease 0.5s all";
        win.querySelector(".arrowdownhelp").style.rotate = "90deg";
        setTimeout(() => {
            var ww = window.innerWidth;
            var wh = window.innerHeight;
            const finalw = (ww / 2) - (600 / 2);
            const finalh = (wh / 2) - (600 / 2);

            win.style.height = "600px";
            win.style.minHeight = "600px";
            win.style.width = "600px";
            win.style.minWidth = "550px";
            win.style.inset = finalh + "px auto auto " + finalw + "px";
            setTimeout(() => {
                win.style.transition = "";
            }, 500);
            setTimeout(() => {
                windows.close(GetStarted.globalWindow.querySelector(".close"), "poznamky");
                GetStarted.globalWindow = undefined;
            }, 200);
        }, 10);
    }
    static closeApp(win) {
        windows.close(win.querySelector(".close"), "getstarted");
        localStorage.setItem("getStartedClosed", "true");
    }
}

if (localStorage.getItem("getStartedClosed") !== "true") {
    windows.open("getstarted");
}