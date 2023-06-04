function superbouncy() {
    var random = Math.floor(Math.random() * 3)
    if (random == 0) {
        document.body.style.animation = "gelatine 0.6s infinite"
    }
    else if (random == 1) {
        document.body.style.animation = "hithere 0.6s infinite"
    }
    else {
        document.body.style.animation = "bounsdce 0.6s infinite"
    }
    openbrowser('jebaitedcz.mp4');
}