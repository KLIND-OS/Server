class PrinterManagerApp {
    static init(win) {
        setTimeout(() => {
            win.querySelector("#webviewprinter").src = "http://localhost:631/";
        }, 200);
    }
}