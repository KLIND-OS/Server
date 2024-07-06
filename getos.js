var OSName = "Unknown OS";
if (navigator.userAgent.indexOf("Win") != -1) OSName = "Windows";
else if (navigator.userAgent.indexOf("Mac") != -1) OSName = "MacOS";
else if (navigator.userAgent.indexOf("Linux") != -1) OSName = "Linux";
else OSName = "Other";

if (developermode == "false") {
  if (OSName == "MacOS") {
    error("0x0000297", "Not supported OS!", "KLIND OS | Load");
  }
  else if (OSName === "Windows") {
    // OK
  }
  else if (OSName === "Linux") {
    // OK
  }
  else {
    error("0x0000297", "Not supported OS!", "KLIND OS | Load");
  }
}
