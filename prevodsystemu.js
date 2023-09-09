function allStorage() {

    var archive = [],
        keys = Object.keys(localStorage),
        i = 0, key;

    for (; key = keys[i]; i++) {
        archive.push([key, localStorage.getItem(key)]);
    }

    return archive;
}
function downloadAsFile(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function prevedsystem() {
    var as = new Date
    downloadAsFile(as.getDate().toString() + "." + (as.getMonth() + 1) + "." + as.toString().split(" ")[3] + ".klindos", JSON.stringify(allStorage()))
}
function submitnjahsbdjksabd() {
    input = document.createElement("input")
    input.type = "file"
    input.style.display = "none";
    input.addEventListener("change", (e) => {
        e = e.target.files[0]
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            var result = JSON.parse(reader.result)
            var make = false;
            for (var i = 0; i < result.length; i++) {
                if (result[i][0] == "updatesklindows" && result[i][1] == version) {
                    make = true;
                    break
                }
            }
            if (make) {
                localStorage.clear()
                for (var i = 0; i < result.length; i++) {
                    localStorage.setItem(result[i][0], result[i][1])
                }
                window.location.reload()
            }
            else {
                spawnNotification("Převod systému", "Tento soubor je na jinou verzi KLIND OS. Aktualizujte soubor.")
            }
            input.remove()
        })
        reader.readAsText(e)
    })
    var element = document.body.appendChild(input)
    element.click()
}