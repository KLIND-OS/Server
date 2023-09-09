function equal(x) {
    if (x.querySelector('.cacl').querySelector('.jgahsdkga').value != '') {
        var vysledek = eval(x.querySelector('.cacl').querySelector('.jgahsdkga').value)
        if (vysledek == Infinity) {
            idiot()
            x.querySelector('.cacl').querySelector('.jgahsdkga').value = 'You are an idiot!'
        }
        else {
            x.querySelector('.cacl').querySelector('.jgahsdkga').value = vysledek
        }
    }
}