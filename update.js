function updatereload(el) {
    const text = el.parentElement.querySelector(".updateStatus")
    LowLevelApi.Updates.update((percentage, t) => {
        if (percentage === true) {
            text.textContent = "Aktualizace dokončena! Systém bude restartován."
            setTimeout(() => {
                LowLevelApi.Power.reboot()
            }, 2000);
        }
        else {
            text.textContent = `${percentage} ${t}`
        }
    })
}
function detectUpdates() {
    if (localStorage.getItem("updatesklindows") != null) {
        try {
            const updateshotove = localStorage.getItem("updatesklindows");
            if (version == updateshotove) {

            }
            else {
                window.location.href = "update.html";
            }
        } catch { }
    }
    else {
        window.location.href = "update.html";
    }
}