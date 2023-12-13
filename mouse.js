var x;
var y;
var cursortype = "normal";

setInterval(() => {
  const allIframes = document.querySelectorAll("iframe");
  allIframes.forEach(iframe => {
    if (iframe.getAttribute("iframeEdited") !== "ano" && iframe.className !== "tox-edit-area__iframe") {
      iframe.setAttribute("iframeEdited", "ano")
      const div = document.createElement("div");
      div.className = "iframeWrapper";
      iframe.parentNode.insertBefore(div, iframe);
      div.appendChild(iframe);
    }
  })
}, 1000)

document.addEventListener("mousemove", e => {
  const tgt = e.target;
  const classofelement = tgt.classList.value;
  // TODO: Be able to catch mousemove event when on iframe.
  if (tgt.tagName === "WEBVIEW" || tgt.classList.contains("iframeWrapper")) {
    printMouseout();
  }
  else if (
    classofelement.indexOf("items-1") > -1 ||
        classofelement.indexOf("items-2") > -1 ||
        classofelement.indexOf("items-3") > -1 ||
        classofelement.indexOf("items-4") > -1 ||
        classofelement.indexOf("element-power-inner-box") > -1 ||
        tgt.getAttribute("cursor") == "pointer" ||
        tgt.classList.contains("close") ||
        tgt.classList.contains("mini") ||
        tgt.classList.contains("ikonadown") ||
        tgt.tagName == "BUTTON" ||
        tgt.tagName == "A"


        && cursortype != "down"
        && cursortype != "downpointer"
        && tgt.getAttribute("cursor") !== "default"
  ) {
    cursortype = "pointer";
    document.getElementById("firstcursor").style.width = "3em";
    document.getElementById("firstcursor").style.height = "3em";
    document.getElementById("firstcursor").style.marginLeft = "-0.5em";
    document.getElementById("firstcursor").style.marginTop = "-0.5em";
  }
  else if (cursortype == "down" || cursortype == "downpointer") {

  }
  else {
    cursortype = "normal";
    document.getElementById("secondcursor").style.backgroundColor = "black";
    document.getElementById("firstcursor").style.width = "2em";
    document.getElementById("firstcursor").style.height = "2em";
    document.getElementById("firstcursor").style.marginLeft = "0em";
    document.getElementById("firstcursor").style.marginTop = "0em";
  }
});

function printMousePos(event) {
  x = event.clientX;
  y = event.clientY;
  document.getElementById("secondcursor").style.top = y - 1.5 + "px";
  document.getElementById("secondcursor").style.left = x - 1.5 + "px";
  try {
    if (!Boot.safeBoot) {
      document.getElementById("firstcursor").style.top = y - 17 + "px";
      document.getElementById("firstcursor").style.left = x - 17 + "px";
    }
  }
  catch {
    document.getElementById("firstcursor").style.top = y - 17 + "px";
    document.getElementById("firstcursor").style.left = x - 17 + "px";
  }
}
function printMouseover() {
  document.getElementById("secondcursor").style.display = "block";
  try {
    if (!Boot.safeBoot) {
      document.getElementById("firstcursor").style.display = "block";
    }
  }
  catch {
    document.getElementById("firstcursor").style.display = "block";
  }
}
function printMouseout() {
  document.getElementById("firstcursor").style.display = "none";
  document.getElementById("secondcursor").style.display = "none";
}
document.addEventListener("mousemove", printMousePos);
document.addEventListener("mouseover", printMouseover);
document.addEventListener("mouseout", printMouseout);
function mouseDown() {
  if (cursortype == "pointer") {
    cursortype = "downpointer";
  }
  else {
    cursortype = "down";
  }
  document.getElementById("firstcursor").style.width = "1em";
  document.getElementById("firstcursor").style.height = "1em";
  document.getElementById("firstcursor").style.marginLeft = "0.5em";
  document.getElementById("firstcursor").style.marginTop = "0.5em";
}
function mouseUp() {
  if (cursortype == "downpointer") {
    document.getElementById("firstcursor").style.width = "3em";
    document.getElementById("firstcursor").style.height = "3em";
    document.getElementById("firstcursor").style.marginLeft = "-0.5em";
    document.getElementById("firstcursor").style.marginTop = "-0.5em";
    cursortype = "normal";
  }
  else {
    cursortype = "normal";
    document.getElementById("secondcursor").style.backgroundColor = "black";
    document.getElementById("firstcursor").style.width = "2em";
    document.getElementById("firstcursor").style.height = "2em";
    document.getElementById("firstcursor").style.marginLeft = "0em";
    document.getElementById("firstcursor").style.marginTop = "0em";
  }

}
try {
  if (Boot.safeBoot) {
    document.getElementById("firstcursor").style.display = "none";
  }
}
catch {}
