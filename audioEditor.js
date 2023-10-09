var AudioEditor = {
    opened: false,
    change: (value) => {
        LowLevelApi.Volume.change(value);
    },
    toggle: (e) => {
        if (AudioEditor.opened) {
            windows.close(document.querySelector(".window.audioLevelEditor div div div"), "audioLevelEditor");
        }
        else {
            var element = windows.open("audioLevelEditor");
            window.LowLevelApi.Volume.getVolume((volume) => {
                element.querySelector("input").value = parseInt(volume)
                element.querySelector(".value").textContent = volume + "%"
                var select = element.querySelector(".outputSelect")
                window.LowLevelApi.Volume.Devices.getAll((all) => {
                    window.LowLevelApi.Volume.Devices.getDefault((df) => {
                        for (const device of all) {
                            var dev = device.trim()
                            df = df.trim();
                            var el = document.createElement("option")
                            el.value = dev
                            el.textContent = dev
                            if (dev == df) {
                                el.setAttribute("selected", "true")
                            }
                            select.appendChild(el);
                        }
                    })
                })
            })
        }
        AudioEditor.opened = !AudioEditor.opened;
    },
    input: (e) => {
        var {value} = e;
        e.parentElement.querySelector(".value").textContent = value + "%";
        window.LowLevelApi.Volume.change(value)
    },
    inputOutput(e) {
        var {value} = e
        window.LowLevelApi.Volume.Devices.set(value)
    }
}