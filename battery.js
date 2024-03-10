function loadBattery() {
  const { status, percentage, battery } = LowLevelApi.Battery.getBattery();

  if (!battery) {
    document.querySelector(".batteryStatus").style.display = "none";
    return
  }

    document.querySelector(".batteryStatus").style.display = "block";
  document.querySelector("#batteryLevel").textContent = percentage.trim();
  if (status.trim() == "Discharging") {
    document.querySelector("#batteryIcon").style.display = "block";
    document.querySelector("#batteryIconCharging").style.display = "none";
  } else {
    document.querySelector("#batteryIcon").style.display = "none";
    document.querySelector("#batteryIconCharging").style.display = "block";
  }
}

setInterval(loadBattery, 5000);
loadBattery();
