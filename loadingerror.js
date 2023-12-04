setTimeout(() => {
  var isloadid = "";
  try { isloadid = document.querySelector(".displaynoneimpor").classList[1] == "displaynoneimpor"; }
  catch {
    isloadid = false;
  }
  if (isloadid == false) {
    setTimeout(() => {
      error("0x0000572", "KLIND OS cannot load | KLIND OS se nemohl spustit", "KLIND OS | Load");
    }, 500);
  }

}, 30 * 1000);
/*
  Nic mi nedává smysl: žít, programovat, učit se.
  Nemám rád svůj život. Nevím jestli chci vůbec programovat, ale je to jediné co umít.
  Nerad říkám že mám deprese, ale lidi mi to někdy říkají. Druzí říkají:
  "Je to jenom obdobím. Měl bys jít na vojnu aby si neměl takové myšlenky.
  Na vojně jsme neměli čas nad tím přemýšlet". Fakt díky, to mi pomohlo.
*/
