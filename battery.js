let previousBatteryState = "notcharging";

async function loadBattery() {
  const { status, percentage, battery } = await LowLevelApi.Battery.getBattery();

  if (!battery) {
    document.querySelector(".batteryStatus").style.display = "none";
    return;
  }

  document.querySelector(".batteryStatus").style.display = "block";
  document.querySelector("#batteryLevel").textContent = percentage.trim();

  if (status.trim() === "Discharging" && previousBatteryState !== "notcharging") {
    document.querySelector("#batteryIcon").style.display = "block";
    document.querySelector("#batteryIconCharging").style.display = "none";
    batteryOut();
    previousBatteryState = "notcharging";
  } else if (status.trim() === "Charging" && previousBatteryState !== "charging") {
    document.querySelector("#batteryIcon").style.display = "none";
    document.querySelector("#batteryIconCharging").style.display = "block";
    batteryIn();
    previousBatteryState = "charging";
  }
}

document.querySelector("#batteryIcon").style.display = "block";
document.querySelector("#batteryIconCharging").style.display = "none";
setInterval(loadBattery, 5000);
loadBattery();
