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
            document.getElementById("budiky").innerHTML = "Aktivní budíky: "+budikarray.join()+"<br>"+"Počet aktivních budíků: "+budikasndjbasjdbhajksbdkjasdjk;
            localstoragebudiky = budikarray.join("-");
            localStorage.setItem("budiky", localstoragebudiky);
            parent.spawnNotification("Alarm clock", "Budík byl vytvořen!");
        }
        else {
            parent.spawnNotification("Alarm clock", "Budík se nepovedlo vytvořit!");
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
        document.getElementById("budiky").innerHTML = "Aktivní budíky: "+budikarray.join()+"<br>"+"Počet aktivních budíků: "+budikasndjbasjdbhajksbdkjasdjk;
        localstoragebudiky = budikarray.join("-");
        localStorage.setItem("budiky", localstoragebudiky);
        parent.spawnNotification("Alarm clock", "Budík zvoní. Přestane za několik sekund.");
    }
}, 1);
function loadbudiky() {
    try {
        localstoragebudiky = localStorage.getItem("budiky");
        if (localstoragebudiky != null||localstoragebudiky != ""|localstoragebudiky != " "|localstoragebudiky != undefined) {
            budikarray = localstoragebudiky.split("-");
            budikarraymax = budikarray.length;
            budikasndjbasjdbhajksbdkjasdjk = budikarray.length;
            document.getElementById("budiky").innerHTML = "Aktivní budíky: "+budikarray.join()+"<br>"+"Počet aktivních budíků: "+budikasndjbasjdbhajksbdkjasdjk;
        }}catch {}
}
function deleteallbudiky() {
    budikarray = new Array();
    budikarraymax = 0;
    budikasndjbasjdbhajksbdkjasdjk = 0;
    document.getElementById("budiky").innerHTML = "Aktivní budíky: "+budikarray.join()+"<br>"+"Počet aktivních budíků: "+budikasndjbasjdbhajksbdkjasdjk;
    localStorage.removeItem("budiky");
    parent.spawnNotification("Budík", "Všechny budíky byly smazány!");
}
