class DeveloperMode {
  static load() {
    if (developermode == "true") {
      try {
        window.open("developer.html");
      } catch {
        alert(
          "Vývojový mód je zapnutý. Toto nastavení vypne všechnu ochranu. V případě že najdete v této verzi chybu, nenahlašujte ji. Toto nastavení nedoporučujeme pokud nejste vývojář.",
        );
      }
    }
  }
}
