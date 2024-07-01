var currentfunprompt;
var currentfunconfirm;
var currentfunlist;
var BPrompt = {
  prompt: (message, functio, defaultValue = "") => {
    currentfunprompt = functio;
    document.querySelector(".message-box").innerHTML = message;
    document.querySelector(".prompt-element").style.display = "block";
    const input = document.querySelector(".prompt-element .input-box");
    input.value = defaultValue;
    input.focus();
    document
      .querySelector(".prompt-element .input-box")
      .addEventListener("keypress", (e) => {
        if (e.key == "Enter") {
          submitMessage();
        }
      });
    document
      .querySelector(".prompt-element .input-box")
      .addEventListener("keydown", (e) => {
        if (e.key == "Escape") {
          document.querySelector(".prompt-element").style.display = "none";
          document.querySelector(".input-box").value = "";
        }
      });
  },
  confirm: (message, functio) => {
    currentfunconfirm = functio;
    document.querySelector(".message-box-confirm").innerHTML = message;
    document.querySelector(".confirm-element").style.display = "block";
    document
      .querySelector(".submit-box-confirm.submit-box-confirm-left")
      .focus();
  },
  alert: (message) => {
    document.querySelector(".message-box-alert").innerHTML = message;
    document.querySelector(".alert-element").style.display = "block";
    document.querySelector(".submit-box-alert").focus();
  },
  list: (message, array, functio) => {
    currentfunlist = functio;
    document.querySelector(".message-box-list").innerHTML = message;
    document.querySelector(".list-element").style.display = "block";

    const select = document.querySelector(".list-input-box");
    select.innerHTML = "";
    for (const el of array) {
      const option = document.createElement("option");
      option.value = el;
      option.textContent = el;
      select.appendChild(option);
    }

    select.focus();
  },
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
function submitList() {
  const { value } = document.querySelector(".list-input-box");
  currentfunlist(value);
  document.querySelector(".list-element").style.display = "none";
}
