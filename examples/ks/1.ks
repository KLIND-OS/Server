:: Toto je ukázka, co je to .ks script.
:: .ks script je velice jednoduchý programovací jazyk pro KLIND OS terminál. Pokud umíte JavaScript, bude to jednoduché.

:: 1. Komentáře:
:: Komentáře se píšou pomocí dvou dvojteček. Tak jak je to na řádku který čtete. Toto je komentář.

:: 2. Echo / Print

:: Takto nějak funguje echo. Printne to string do konzole. Nějak takto:
echo: "Script is starting"

:: 3. Run
:: Pomocí .ks scriptu můžete spouštět JavaScript příkazy. Nějak takto:

:: Po zkončení tohoto JavaScriptu nebude nic vráceno do konzole. To co bylo vráceno nebude zobrazeno.
run: parent.windows.open("poznamky")
:: parent.windows.open("poznamky") otevře poznámky

:: Po zkončení tohoto Javascriptu bude vrácena hodnota do konzole.
run:: parent.window.location.href
:: parent.window.location.href vrátí url adresu serveru na kterém běží KLIND OS.

:: Je to velice jednoduché!
:: Klidně si tento soubor spušťte a uvidíte že to všechno funguje jak má!