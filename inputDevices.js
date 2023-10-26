class InputDevices {
    static init(win) {
        const select = win.querySelector(".select");
        LowLevelApi.InputSound.getAll(response => {
            LowLevelApi.InputSound.getDefault(resDefault => {
                for (const inputDevice of response) {
                    const choice = document.createElement("option");
                    choice.value = inputDevice;
                    choice.textContent = inputDevice;
                    if (inputDevice == resDefault) {
                        choice.selected = true;
                    }
                    select.appendChild(choice);
                }
            });
        });
        select.addEventListener("change", (e) => {
            const {value} = e.target;
            LowLevelApi.InputSound.set(value);
        });
    }
}