
class Battery {
  static previousState = "notcharging"

  static load() {
    document.querySelector("#batteryIcon").style.display = "block";
    document.querySelector("#batteryIconCharging").style.display = "none";
    setInterval(Battery.update, 5000);
    Battery.update();
  }

  static async update() {
    const { status, percentage, battery } =
      await LowLevelApi.Battery.getBattery();

    if (!battery) {
      document.querySelector(".batteryStatus").style.display = "none";
      return;
    }

    document.querySelector(".batteryStatus").style.display = "block";
    document.querySelector("#batteryLevel").textContent = percentage.trim();

    if (
      status.trim() === "Discharging" &&
      Battery.previousState !== "notcharging"
    ) {
      document.querySelector("#batteryIcon").style.display = "block";
      document.querySelector("#batteryIconCharging").style.display = "none";
      Sounds.batteryOut();
      Battery.previousState = "notcharging";
    } else if (
      status.trim() === "Charging" &&
      Battery.previousState !== "charging"
    ) {
      document.querySelector("#batteryIcon").style.display = "none";
      document.querySelector("#batteryIconCharging").style.display = "block";
      Sounds.batteryIn();
      Battery.previousState = "charging";
    }
  }
}
