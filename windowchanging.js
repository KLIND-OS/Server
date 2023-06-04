window.addEventListener('click', function(e){
    if (document.querySelector(".openopenedapps").contains(e.target)){
        // Clicked in box
    } else{
        if (appsopened.oppened) {
            appsopened.close();
        }
    }
});
// Menu opened apps
var appsopened = {
    count: 0,
    list: [],
    oppened: false,
    openwin: (value) => {
        var element = document.querySelectorAll(".window.openedwin")[value]
        changewindowmain(element);
        element.focus()
        appsopened.close();
    },
    open: () => {
        var element = document.querySelector(".openopenedapps")
        if (appsopened.count != 0) {
            var innerHTMLvalue = ""
            for (var i = 0; i < appsopened.count; i++) {
                if (appsopened.list[i][2]==openedwindowindex) {
                    innerHTMLvalue+='<div class="selected buttonopenedapps '+appsopened.list[i][0]+'vybranydiv" onclick="appsopened.openwin('+i+')">'+appsopened.list[i][1]+'</div>';
                }
                else {
                    innerHTMLvalue+='<div class="buttonopenedapps '+appsopened.list[i][0]+'vybranydiv" onclick="appsopened.openwin('+i+')">'+appsopened.list[i][1]+'</div>';
                }
            }
            element.innerHTML = innerHTMLvalue;
        }
        else {
            element.innerHTML = "Nejsou otevřené žádné okna"
        }
        appsopened.oppened = true;
        element.style.display="block";
    },
    close: () => {
        appsopened.oppened = false
        var element = document.querySelector(".openopenedapps")
        element.style.display = "none"
    }
}
setInterval(() => {
    appsopened.list = []
    var elements = document.querySelectorAll(".window.openedwin")
    for (var i = 0; i < elements.length; i++) {
        try{
            appsopened.list.push([elements[i].classList[1],elements[i].querySelector(".headerclass span").innerHTML,elements[i]])
        }catch{}
    }
    appsopened.count = appsopened.list.length
}, 500);