var currentfunprompt;
var currentfunconfirm;
var BPrompt = {
    prompt: (message, functio) => {
        currentfunprompt = functio
        document.querySelector(".message-box").textContent = message
        document.querySelector(".prompt-element").style.display = "block";
    },
    confirm: (message, functio) => {
        currentfunconfirm = functio
        document.querySelector(".message-box-confirm").textContent = message
        document.querySelector(".confirm-element").style.display = "block";
    }
}
function submitMessage() {
    var value = document.querySelector(".input-box").value
    if (value != "") {
        currentfunprompt(value)
        document.querySelector(".prompt-element").style.display = "none";
        document.querySelector(".input-box").value = ""
    }
}
function submitConfirm(answer) {
    currentfunconfirm(answer)
    document.querySelector(".confirm-element").style.display = "none";
}