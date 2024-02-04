function loadBattery() {
  navigator.getBattery()
    .then(battery => {
      const level = Math.round(battery.level * 100);
      document.querySelector("#batteryLevel").textContent = `${level}%`

      if (battery.charging) {
        document.querySelector("#batteryIcon").src = "icons/batteryCharging.png";
      }
      else {
        document.querySelector("#batteryIcon").src = "icons/battery.png";
      }
    })
    .catch(err => {
      error()
    })
}

setInterval(loadBattery, 2000)
loadBattery()

