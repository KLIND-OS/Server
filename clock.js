class Clock {
  static load() {
    if (localStorage.getItem("clocktype") == "first") {
      Clock.first();
    } else if (localStorage.getItem("clocktype") == "second") {
      Clock.second();
    }

    setInterval(() => {
      const time = document.querySelector("#time");
      let date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      let day_night = "AM";
      if (hours > 12) {
        day_night = "PM";
        hours = hours - 12;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (hours < 10) {
        hours = "0" + hours;
      }
      time.innerHTML = hours + ":" + minutes + ":" + seconds + " " + day_night;
    }, 1000);

    setInterval(() => {
      const timedva = document.querySelector("#timedva");
      let dates = new Date();
      let hourss = dates.getHours();
      let minutess = dates.getMinutes();
      let secondss = dates.getSeconds();

      if (hourss > 24) {
        hourss = hourss - 24;
      }
      if (secondss < 10) {
        secondss = "0" + secondss;
      }
      if (minutess < 10) {
        minutess = "0" + minutess;
      }
      if (hourss < 10) {
        hourss = "0" + hourss;
      }
      timedva.textContent = hourss + ":" + minutess + ":" + secondss + " ";
    }, 1000);
  }

  static first() {
    document.querySelector(".jednaclock").classList.add("openedclock");
    document.querySelector(".jednaclock").classList.remove("closedclock");
    document.querySelector(".dvaclock").classList.remove("openedclock");
    document.querySelector(".dvaclock").classList.add("closedclock");
    localStorage.setItem("clocktype", "first");
  }

  static second() {
    document.querySelector(".jednaclock").classList.remove("openedclock");
    document.querySelector(".jednaclock").classList.add("closedclock");
    document.querySelector(".dvaclock").classList.add("openedclock");
    document.querySelector(".dvaclock").classList.remove("closedclock");
    localStorage.setItem("clocktype", "second");
  }
}

window.Clock = Clock;
