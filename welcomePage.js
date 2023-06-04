

function loadWelcomePage() {
    document.querySelector(".welcomePage").style.display = "block";
    document.querySelector(".welcomePage video").play();
    setTimeout(() => {
        document.querySelector(".welcomePage video").muted = false;
        document.querySelector(".welcomePage video").onended = function() {
            document.querySelector(".welcomePage").style.display = "none";
            localStorage.removeItem("welcomePage");
        };
    }, 200);
}
function skipwelcomeVideo() {
    document.querySelector(".welcomePage").style.display = "none";
    document.querySelector(".welcomePage video").pause();
    document.querySelector(".welcomePage video").onended = () => {}
    localStorage.removeItem("welcomePage");
}
function welcomePageCheck() {
    if (localStorage.getItem("welcomePage") === "true") {
        //loadWelcomePage();
    }
}