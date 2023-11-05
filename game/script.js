function jump(){
  if(character.classList == "animate"){return;}
  character.classList.add("animate");
  setTimeout(function(){
    character.classList.remove("animate");
  },300);
}
function start(btn)  {
  btn.remove();

  var character = document.getElementById("character");
  var block = document.getElementById("block");
  block.classList.add("moving");
  var counter=0;
  var checkDead = setInterval(function() {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    if(blockLeft<20 && blockLeft>-20 && characterTop>=130){
      block.style.animation = "none";
      counter=0;
      block.style.animation = "block 1s infinite linear";
      window.location.reload();
    }else{
      counter++;
      document.getElementById("scoreSpan").innerHTML = Math.floor(counter/100);
    }
  }, 10);
}