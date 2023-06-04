var openednotifi = false;
      function spawnNotification(appname, text) {
        if (openednotifi != true) {
          document.getElementById("hinotifi").innerHTML = appname;
          document.getElementById("pnotifi").innerHTML = text;
          document.querySelector(".notifidiv").classList.add("openedlol");
          setTimeout(() => {
            document.querySelector(".notifidiv").classList.remove("dnlol");
          }, 500);
          openednotifi = true;
          dagbdhvbahsd = setTimeout(() => {
            closenotifi();
          }, 5000);
        }
        else {
          setTimeout(() => {
            spawnNotification(appname, text);
          }, 1000);
        }
      }
      function closenotifi() {
        document.querySelector(".notifidiv").classList.remove("openedlol");
        clearTimeout(dagbdhvbahsd);
        setTimeout(() => {
          document.querySelector(".notifidiv").classList.add("dnlol");
          setTimeout(() => {
            openednotifi = false;
          }, 200);
        }, 500);
      }