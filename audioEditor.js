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
                element.querySelector("input").value = parseInt(volume);
                element.querySelector(".value").textContent = volume + "%";
                var select = element.querySelector(".outputSelect");
                window.LowLevelApi.Volume.Devices.getAll((all) => {
                    window.LowLevelApi.Volume.Devices.getDefault((df) => {
                        for (const device of all) {
                            var dev = device.trim();
                            df = df.trim();
                            var el = document.createElement("option");
                            el.value = dev;
                            el.textContent = dev;
                            if (dev == df) {
                                el.setAttribute("selected", "true");
                            }
                            select.appendChild(el);
                        }
                    });
                });
            });
        }
        AudioEditor.opened = !AudioEditor.opened;
    },
    input: (e) => {
        var {value} = e;
        e.parentElement.querySelector(".value").textContent = value + "%";
        window.LowLevelApi.Volume.change(value);
    },
    inputOutput(e) {
        var {value} = e;
        window.LowLevelApi.Volume.Devices.set(value);
        setTimeout(() => {
            window.LowLevelApi.Volume.getVolume((volume) => {
                e.parentElement.querySelector(".slider").value = parseInt(volume);
                e.parentElement.querySelector(".value").textContent = volume + "%";
            });
        }, 10);
    },
    popup: {
        showed: false,
        timeout: undefined,
        rest: () => {
            var el = document.querySelector(".shortcut-media-popup");
            if (AudioEditor.popup.showed) {
                clearTimeout(AudioEditor.popup.timeout);
                AudioEditor.popup.timeout = setTimeout(() => {
                    el.style.opacity = "0";
                    setTimeout(() => {
                        el.style.display = "none";
                    }, 500);
                    AudioEditor.popup.showed = false;
                }, 3000);
            }
            else {
                el.style.display = "flex";
                setTimeout(() => {
                    el.style.opacity = "1";
                }, 10);
                AudioEditor.popup.showed = true;
                AudioEditor.popup.timeout = setTimeout(() => {
                    el.style.opacity = "0";
                    setTimeout(() => {
                        el.style.display = "none";
                    }, 500);
                    AudioEditor.popup.showed = false;
                }, 3000);
            }
        },
        // Popup functions
        pause: () => {
            document.querySelectorAll(".shortcut-media-popup img").forEach(el => el.style.display = "none");
            document.querySelector(".shortcut-media-popup .pause-icon-popup").style.display = "block";
            AudioEditor.popup.rest();
        },
        previous: () => {
            document.querySelectorAll(".shortcut-media-popup img").forEach(el => el.style.display = "none");
            document.querySelector(".shortcut-media-popup .previous-icon-popup").style.display = "block";
            AudioEditor.popup.rest();
        },
        next: () => {
            document.querySelectorAll(".shortcut-media-popup img").forEach(el => el.style.display = "none");
            document.querySelector(".shortcut-media-popup .next-icon-popup").style.display = "block";
            AudioEditor.popup.rest();
        },
        volumeUp: () => {
            document.querySelectorAll(".shortcut-media-popup img").forEach(el => el.style.display = "none");
            document.querySelector(".shortcut-media-popup .up-icon-popup").style.display = "block";
            AudioEditor.popup.rest();
        },
        volumeDown: () => {
            document.querySelectorAll(".shortcut-media-popup img").forEach(el => el.style.display = "none");
            document.querySelector(".shortcut-media-popup .down-icon-popup").style.display = "block";
            AudioEditor.popup.rest();
        },
        volumeMute: () => {
            document.querySelectorAll(".shortcut-media-popup img").forEach(el => el.style.display = "none");
            document.querySelector(".shortcut-media-popup .mute-icon-popup").style.display = "block";
            AudioEditor.popup.rest();
        }
    }
};