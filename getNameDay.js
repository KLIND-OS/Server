fetch("https://svatky.adresa.info/json").then(function (response) { return response.json(); }).then(function (data) {
    document.querySelector("#svatekname").textContent = data[0].name;
}).catch(function (err) {
    console.log("Svátek nemohl být načten! Chyba: " + err)
});