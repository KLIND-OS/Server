var OSName = "Unknown OS";
if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
else if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
else if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";
else OSName = "Other";

if (developermode == "false") {
  if (OSName == "MacOS") {
    error("0x0000297", "Nepodporovaný operační systém klienta. Zkuste Windows nebo Linux", "KLIND OS | Load");
  }
  else if (OSName === "Windows") {
        
  }
  else if (OSName === "Linux") {
        
  }
  else {
    error("0x0000297", "Nepodporovaný operační systém klienta. Zkuste Windows nebo Linux", "KLIND OS | Load");
  }
}