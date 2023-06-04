setTimeout(() => {
    var isloadid="";
    try {isloadid = document.querySelector(".displaynoneimpor").classList[1]=="displaynoneimpor";}
    catch {
        isloadid=false
    }
    if (isloadid==false) {
        setTimeout(() => {
            error("0x0000572", "KLIND OS cannot load | KLIND OS se nemohl spustit", "KLIND OS | Load");
        }, 500);
    }
    
}, 30*1000);