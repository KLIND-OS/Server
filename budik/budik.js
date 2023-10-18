var timebudik;
var budikarraymax = 0;
var budikarray = new Array();
var budiksplit;
var hoursss;
var minutesss;
var budikasndjbasjdbhajksbdkjasdjk=0;
var localstoragebudiky;
setInterval(()=>{
    let dates = new Date();
    let hourss = dates.getHours();
    let minutess = dates.getMinutes();
    let secondss = dates.getSeconds();
    if(hourss > 24){
        hourss = hourss - 24;
    }
    if(secondss < 10){
        secondss = "0" + secondss;
    }
    if(minutess < 10){
        minutess = "0" + minutess;
    }
    if(hourss < 10){
        hourss = "0" + hourss;
    }
    timebudik = hourss + ":" + minutess;
});
function addbudik() {
    var budik = document.getElementById("timebudik").value;
    if (budikarray.indexOf(budik)>-1) {} 
    else {
        if (budik != "") {
            budikarray[budikarraymax] = budik;
            budikarraymax++;
            budikasndjbasjdbhajksbdkjasdjk++;
            document.getElementById("budiky").innerHTML = "Active alarms: "+budikarray.join()+"<br>"+"Number of active alarms: "+budikasndjbasjdbhajksbdkjasdjk;
            localstoragebudiky = budikarray.join("-");
            localStorage.setItem("budiky", localstoragebudiky);
            parent.spawnNotification("Alarm clock", "The alarm clock has been created!");
        }
        else {
            parent.spawnNotification("Alarm clock", "The alarm could not be created!");
        }
    }
}
function removebudik(id) {
    budikarray[id]="";
}
setInterval(() => {
    if (budikarray.indexOf(timebudik)>-1) {
        budikarray[budikarray.indexOf(timebudik)]="";
        soundssadsadasdsa = new Howl({
            src: ["/alarm.mp3"],
            volume: 0.5
        });
        soundssadsadasdsa.play();
        budikasndjbasjdbhajksbdkjasdjk--;
        document.getElementById("budiky").innerHTML = "Active alarms: "+budikarray.join()+"<br>"+"Number of active alarms: "+budikasndjbasjdbhajksbdkjasdjk;
        localstoragebudiky = budikarray.join("-");
        localStorage.setItem("budiky", localstoragebudiky);
        parent.spawnNotification("Alarm clock", "Your alarm clock is ringing! It will stop ringing in a few seconds.");
    }
}, 1);
function loadbudiky() {
    try {
        localstoragebudiky = localStorage.getItem("budiky");
        if (localstoragebudiky != null||localstoragebudiky != ""|localstoragebudiky != " "|localstoragebudiky != undefined) {
            budikarray = localstoragebudiky.split("-");
            budikarraymax = budikarray.length;
            budikasndjbasjdbhajksbdkjasdjk = budikarray.length;
            document.getElementById("budiky").innerHTML = "Active alarms: "+budikarray.join()+"<br>"+"Number of active alarms: "+budikasndjbasjdbhajksbdkjasdjk;
        }}catch {}
}
function deleteallbudiky() {
    budikarray = new Array();
    budikarraymax = 0;
    budikasndjbasjdbhajksbdkjasdjk = 0;
    document.getElementById("budiky").innerHTML = "Active alarms: "+budikarray.join()+"<br>"+"Number of active alarms: "+budikasndjbasjdbhajksbdkjasdjk;
    localStorage.removeItem("budiky");
    parent.spawnNotification("Budík", "All alarms have been deleted!");
}
