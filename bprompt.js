var currentfunprompt;
var currentfunconfirm;
var BPrompt = {
  prompt: (message, functio) => {
    currentfunprompt = functio;
    document.querySelector(".message-box").innerHTML = message;
    document.querySelector(".prompt-element").style.display = "block";
    document.querySelector(".prompt-element .input-box").focus();
    document.querySelector(".prompt-element .input-box").addEventListener("keypress", (e) => {
      if (e.key == "Enter") {
        submitMessage();
      }
    })
  },
  confirm: (message, functio) => {
    currentfunconfirm = functio;
    document.querySelector(".message-box-confirm").innerHTML = message;
    document.querySelector(".confirm-element").style.display = "block";
    document.querySelector(".submit-box-confirm.submit-box-confirm-left").focus();
  }
};
function submitMessage() {
  var value = document.querySelector(".input-box").value;
  if (value != "") {
    currentfunprompt(value);
    document.querySelector(".prompt-element").style.display = "none";
    document.querySelector(".input-box").value = "";
  }
}
function submitConfirm(answer) {
  currentfunconfirm(answer);
  document.querySelector(".confirm-element").style.display = "none";
}
