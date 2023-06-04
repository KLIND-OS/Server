var AudioEditor = {
    opened: false,
    value: 50,
    change: (value) => {
        AudioEditor.value = value;
    },
    toggle: (e) => {
        if (AudioEditor.opened) {
            windows.close(document.querySelector(".window.audioLevelEditor div div div"),"audioLevelEditor");
        }
        else {
            var element = windows.open("audioLevelEditor");
            element.querySelector("input").value = AudioEditor.value
            element.querySelector(".value").textContent = AudioEditor.value + "%"
        }
        AudioEditor.opened = !AudioEditor.opened;
    },
    input: (e) => {
        var value = e.value;
        e.parentElement.querySelector(".value").textContent = value+"%";
        AudioEditor.value = parseInt(value)
        localStorage.setItem("volume", value)
        playingSounds.forEach((x) => {
            x.volume(AudioEditor.value/100)
        })
        playingSongs.forEach((x) => {
            x.volume(AudioEditor.value/100)
        })
    }
}
if (localStorage.getItem("volume")) {
    AudioEditor.value = localStorage.getItem("volume")
}