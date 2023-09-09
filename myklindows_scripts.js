function changepass(element) {
    var newpass = element.querySelector("#changepassinputvalue").value;
    if (login == "false") {
        localStorage.setItem("reg.login", newpass + "**.false")
    }
    else if (login == "true") {
        localStorage.setItem("reg.login", newpass + "**.true")
    }
    if (consolelog == "false") {
        localStorage.setItem("reg.consolelog", newpass + "**.false")
    }
    else if (consolelog == "true") {
        localStorage.setItem("reg.consolelog", newpass + "**.true")
    }
    if (autolocklogin == "false") {
        localStorage.setItem("reg.autolocklogin", newpass + "**.false")
    }
    else if (autolocklogin == "false") {
        localStorage.setItem("reg.autolocklogin", newpass + "**.true")
    }
    localStorage.setItem("password", newpass);
    window.location.reload();
}
function newnameset(element) {
    var newname = element.querySelector("#changenameinputvalue").value;
    localStorage.setItem("username", newname);
    window.location.reload();
}
function newiconuserset(element) {
    var newicon = element.querySelector("#changeusericoninputvalueas").value;
    if (newicon == myklindowstajne) {
        document.getElementById("klindowsrightclickmenu").style.opacity = "0";
        setTimeout(() => {
            document.getElementById("klindowsrightclickmenu").style.display = "none";
            document.getElementById("tajnedva").style.display = "block";
            setTimeout(() => {
                document.getElementById("tajnedva").style.opacity = "1";
            }, 200);
        }, 2000);
    }
    else {
        localStorage.setItem("customicon", newicon);
        window.location.reload();
    }
}

///////////////////////////////////

function closetajnedva() {
    document.getElementById("tajnedva").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("tajnedva").style.display = "none";
        setTimeout(() => {
            document.getElementById("klindowsrightclickmenu").style.display = "block";
            setTimeout(() => {
                document.getElementById("klindowsrightclickmenu").style.opacity = "1";
            }, 2000);
        }, 200);
    }, 500);
}