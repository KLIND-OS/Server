// Right click menu

const clickable = document.getElementById('klindowsrightclickmenu');
const clickabledva = document.getElementById('klindowsrightclickmenu')
const menu = document.getElementById('menu');
const outClick = document.getElementById('outclick');

clickable.addEventListener('contextmenu', e => {
    e.preventDefault()

    document.getElementById('menu').style.top = `${e.clientY}px`
    document.getElementById('menu').style.left = `${e.clientX}px`
    document.getElementById('menu').classList.add('show')

    outClick.style.display = "block"
})
outClick.addEventListener('contextmenu', e => {
    e.preventDefault()

    document.getElementById('menu').style.top = `${e.clientY}px`
    document.getElementById('menu').style.left = `${e.clientX}px`
    document.getElementById('menu').classList.add('show')

    outClick.style.display = "block"
})
outClick.addEventListener('click', () => {
    document.getElementById('menu').classList.remove('show');
    document.getElementById("rightclickmenudowapps").style.display = "none";
    document.getElementById("rightclickmenuicons").style.display = "none";
    document.getElementById("rightclickmenuiconsdone").style.display = "none";
    outClick.style.display = "none";
    document.getElementById('menu').style.display = "";
})
function closeRightClickMenuMain() {
    document.getElementById('menu').classList.remove('show');
    document.getElementById("rightclickmenudowapps").style.display = "none";
    document.getElementById("rightclickmenuicons").style.display = "none";
    document.getElementById("rightclickmenuiconsdone").style.display = "none";
    outClick.style.display = "none";
    document.getElementById('menu').style.display = "";
}