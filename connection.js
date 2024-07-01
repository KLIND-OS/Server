class Connection {
  static connected = true;
  static monitor() {
    try {
      function ajax() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "https://jsonplaceholder.typicode.com/posts", true);
        xhr.onload = () => {
          if (xhr.status == 200 && xhr.status < 300) {
            try {
              document.getElementById("internetnoicon").style.display = "none";
              document.getElementById("intrnetyesicon").style.display = "block";
            } catch {}
            Connection.connected = true;
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
        Connection.connected = false;
        try {
          document.getElementById("internetnoicon").style.display = "block";
          document.getElementById("intrnetyesicon").style.display = "none";
        } catch {}
      }
      setInterval(() => {
        ajax();
      }, 10000);
    } catch {}
  }
}
