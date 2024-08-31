var timebudik;
var budikarraymax = 0;
var budikarray = new Array();
var budiksplit;
var hoursss;
var minutesss;
var budikasndjbasjdbhajksbdkjasdjk = 0;
var localstoragebudiky;
setInterval(() => {
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
  timebudik = hourss + ":" + minutess;
});
function addbudik() {
  var budik = document.getElementById("timebudik").value;
  if (budikarray.indexOf(budik) > -1) {
    // idk
  } else {
    if (budik != "") {
      budikarray[budikarraymax] = budik;
      budikarraymax++;
      budikasndjbasjdbhajksbdkjasdjk++;
      document.getElementById("budiky").innerHTML =
        parent.Localization.getString("active_alarm_clocks") +
        ": " +
        budikarray.join() +
        "<br>" +
        parent.Localization.getString("number_active_alarms") +
        ": " +
        budikasndjbasjdbhajksbdkjasdjk;
      localstoragebudiky = budikarray.join("-");
      localStorage.setItem("budiky", localstoragebudiky);
      parent.spawnNotification(
        parent.Localization.getString("alarm_clock"),
        parent.Localization.getString("alarm_created"),
      );
    } else {
      parent.spawnNotification(
        parent.Localization.getString("alarm_clock"),
        parent.Localization.getString("failed_create_alarm"),
      );
    }
  }
}
function removebudik(id) {
  budikarray[id] = "";
}
setInterval(() => {
  if (budikarray.indexOf(timebudik) > -1) {
    budikarray[budikarray.indexOf(timebudik)] = "";
    soundssadsadasdsa = new Howl({
      src: ["/sounds/alarm.mp3"],
      volume: 0.5,
    });
    soundssadsadasdsa.play();
    budikasndjbasjdbhajksbdkjasdjk--;
    document.getElementById("budiky").innerHTML =
      parent.Localization.getString("active_alarm_clocks") +
      ": " +
      budikarray.join() +
      "<br>" +
      parent.Localization.getString("number_active_alarms") +
      ": " +
      budikasndjbasjdbhajksbdkjasdjk;
    localstoragebudiky = budikarray.join("-");
    localStorage.setItem("budiky", localstoragebudiky);
    parent.spawnNotification(
      parent.Localization.getString("alarm_clock"),
      parent.Localization.getString("alarm_ringing"),
    );
  }
}, 1);
function loadbudiky() {
  try {
    localstoragebudiky = localStorage.getItem("budiky");
    if (
      localstoragebudiky != null ||
      (localstoragebudiky != "") |
        (localstoragebudiky != " ") |
        (localstoragebudiky != undefined)
    ) {
      budikarray = localstoragebudiky.split("-");
      budikarraymax = budikarray.length;
      budikasndjbasjdbhajksbdkjasdjk = budikarray.length;
      document.getElementById("budiky").innerHTML =
        parent.Localization.getString("active_alarm_clocks") +
        ": " +
        budikarray.join() +
        "<br>" +
        parent.Localization.getString("number_active_alarms") +
        ": " +
        budikasndjbasjdbhajksbdkjasdjk;
    }
  } catch {
    // Ignore error
  }
}
function deleteallbudiky() {
  budikarray = new Array();
  budikarraymax = 0;
  budikasndjbasjdbhajksbdkjasdjk = 0;
  document.getElementById("budiky").innerHTML =
    parent.Localization.getString("active_alarm_clocks") +
    ": " +
    budikarray.join() +
    "<br>" +
    parent.Localization.getString("number_active_alarms") +
    ": " +
    budikasndjbasjdbhajksbdkjasdjk;
  localStorage.removeItem("budiky");
  parent.spawnNotification(
    parent.Localization.getString("alarm_clock"),
    parent.Localization.getString("alarm_clocks_removed"),
  );
}
