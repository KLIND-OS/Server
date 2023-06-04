// Toto je příklad jak si můžete vytvořit vlastní JavaScriptovou aplikaci do KLIND OS.

// Krok 1. Vytvoření aplikace:
var aplikace = new App({
    // Název aplikace (musí být stejné jaké budete zadávat do compileru)
    name: "Dobrá aplikace",
    // Funkce pro to co se má udělat při rozkliknutí programu
    onStart: (daneokno) => {
        // Zde se vkládá kód pro to když se aplikace spustí
        // Nemusíte zde zadávat že se má okno otevřít
        // Zde se vkládají pouze speciální funkce, které se mají vyvolat poté co uživatel aplikaci spustí
        var zprava = document.createElement("p")
        minutes = new Date().getMinutes()
        if(minutes < 10){
            minutes = "0" + minutes;
        }
        // Nastaví text s aktuálním česem do elementu
        zprava.textContent = "Aplikace byla spuštěna v: "+new Date().getHours()+":"+minutes
        // Vloží vloží element do daného okna
        daneokno.appendChild(zprava)
    },
    // Zde vložíte jestli má být aplikace skrytý ve start menu
    // true = ano
    // false = ne
    hidden: false
})

// Krok 2. Vytvoření okna
aplikace.createWindow({
    // Tlačítka které budou na okně
    buttons: {
        // Typ tlačítka a co se má udělat při stisku
        close: () => {
            // Zde se vkládá kód pro to když se tlačítko spustí
            // Nemusíte zde zadávat źe se má okno zavřít
            // Zde se vkládají pouze speciální funkce, které se mají vyvolat poté co uživatel zavře nebo minimalizuje okno
            console.log("Okno bylo zavřeno.")
        },
        mini: () => {
            console.log("Okno bylo minimalizováno")
        }
        // Podporované tlačítka: close, mini
    },
    // Obsah aplikace. Zde vkládáte HTML strukturu dané aplikace.
    content: "<h1>Moje nová aplikace!</h1>"
})

// Krok 3. Vytvoření scriptu pro minimalizaci
// Pokud nechcete mít u svého okna jste si nastavil že nemá mít minimalizaci, tento krok přeskočte
// Tento příkaz vytvoří ikonku minimalizace v taskbaru
var appIcon = aplikace.createMiniIcon()



// A je to. Nyní si můžete upravovat svoji aplikaci dle libosti.
// Do aplikace můžete za běhu také přidávat elementy pomocí funkce appendchild. Nějak takto:

// Vytvoří element h1
var dalsiH1 = document.createElement("h1")
// Vloží text do h1
dalsiH1.textContent = "Další h1"
// Vloží h1 do okna.
okno.appendChild(dalsiH1)

// Pokud by jste potřebovali pomoct, napište nám na podpora@klindos-main.ml