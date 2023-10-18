function updatereload() {
    if (connectedsss == "false") {
        spawnNotification("Aktualizace", "Internet není k dispozici! Aktualizace nelze načíst!");
    }
    else {
        localStorage.setItem("adasjdsad", "dbajsdbjhansbd");
        window.location.reload();
    }
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