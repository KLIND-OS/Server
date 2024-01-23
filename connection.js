var connectedsss = true;
function monitorConnection() {
  try {
    var predchozisad = "true";
    function ajax() {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", "https://jsonplaceholder.typicode.com/posts", true);
      xhr.onload = () => {
        if (xhr.status == 200 && xhr.status < 300) {
          try {
            document.getElementById("internetsss").textContent = "Připojeno";
            document.getElementById("internetno").style.display = "none";
            document.getElementById("intrnetyes").style.display = "block";
          } catch { }
          connectedsss = "true";
          if (predchozisad == "false") {
            internet_up();
          }
          predchozisad = "true";
        } else {
          offline();
        }
      };
      xhr.onerror = () => {
        offline();
      };
      xhr.send();
    }
    function offline() {
      document.getElementById("internetsss").textContent = "Odpojeno";
      connectedsss = "false";
      document.getElementById("internetno").style.display = "block";
      document.getElementById("intrnetyes").style.display = "none";
      if (predchozisad == "true") {
        internet_down();
      }
      predchozisad = "false";
    }
    setInterval(() => {
      ajax();
    }, 10000);
  }
  catch { }
}
