function turnoff() {
  LowLevelApi.Power.poweroff();
}
var Power = {
  open: () => {
    document.querySelector(".power-element").style.display = "block";
    setTimeout(() => {
      document.querySelector(".power-background").classList.add("openBackground");
      setTimeout(() => {
        document.querySelector(".inner-box-power").classList.add("openBackground");
      }, 200);
    }, 50);
  },
  close: () => {
    document.querySelector(".inner-box-power").classList.remove("openBackground");
    setTimeout(() => {
      document.querySelector(".power-background").classList.remove("openBackground");
      setTimeout(() => {
        document.querySelector(".power-element").style.display = "none";
      }, 200);
    }, 350);
  },
  lock: () => {
    Power.close();
    setTimeout(() => {
      logout();
    }, 600);
  },
  reload: () => {
    document.querySelector(".inner-box-power").classList.remove("openBackground");
    setTimeout(() => {
      LowLevelApi.Power.reboot();
    }, 800);
  },
  turnoff: () => {
    document.querySelector(".inner-box-power").classList.remove("openBackground");
    setTimeout(() => {
      turnoff();
    }, 800);
  }
};
