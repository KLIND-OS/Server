function internet_down() {
    new Howl({
        src: ['sounds/internet-down.mp3'],
        volume: control.getVolume(),
        autoplay: true,
    });
}
function internet_up() {
    new Howl({
        src: ['sounds/internet-down.mp3'],
        volume: control.getVolume(),
        autoplay: true,
    });
}