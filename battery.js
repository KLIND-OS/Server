function loadBattery() {
  navigator.getBattery()
    .then(battery => {
      const level = Math.round(battery.level * 100);
      document.querySelector("#batteryLevel").textContent = `${level}%`;

      if (battery.charging) {
        document.querySelector("#batteryIcon").style.display = "none";
        document.querySelector("#batteryIconCharging").style.display = "block";
      }
      else {
        document.querySelector("#batteryIcon").style.display = "block";
        document.querySelector("#batteryIconCharging").style.display = "none";
      }
    })
    .catch(err => {
      error();
    });
}

setInterval(loadBattery, 2000);
loadBattery();

