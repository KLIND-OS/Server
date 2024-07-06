window.addEventListener("DOMContentLoaded", () => {
  if (
    localStorage.getItem("fa1c2e") == null ||
    localStorage.getItem("fa1c2e") == "" ||
    parent.mainFileManager.getContent(
      JSON.parse(localStorage.getItem("fa1c2e"))[0],
    ) == false ||
    parent.mainFileManager.getContent(
      JSON.parse(localStorage.getItem("fa1c2e"))[1],
    ) == false
  ) {
    var value1 = document.createElement("button");
    var value2 = document.createElement("button");
    var submit = document.createElement("button");
    value1.textContent = parent.Localization.getString("select_first_image");
    value2.textContent = parent.Localization.getString("select_second_image");
    submit.textContent = parent.Localization.getString("submit");
    value1.onclick = () => {
      parent.control.fileManager.fileSelect({
        success: (path) => {
          value1.setAttribute("path", path);
          value1.textContent = path;
        },
        closed: () => {},
      });
    };
    value2.onclick = () => {
      parent.control.fileManager.fileSelect({
        success: (path) => {
          value2.setAttribute("path", path);
          value2.textContent = path;
        },
        closed: () => {},
      });
    };
    submit.onclick = () => {
      if (
        parent.mainFileManager.getContent(value1.getAttribute("path")) !=
          false &&
        parent.mainFileManager.getContent(value2.getAttribute("path")) != false
      ) {
        localStorage.setItem(
          "fa1c2e",
          JSON.stringify([
            value1.getAttribute("path"),
            value2.getAttribute("path"),
          ]),
        );
        parent.Login.loadFaceButton();
        window.location.reload();
      } else {
        parent.spawnNotification(
          parent.Localization.getString("face_recognition_settings"),
          parent.Localization.getString("image_not_found"),
        );
      }
    };
    document.body.appendChild(value1);
    document.body.appendChild(value2);
    document.body.appendChild(submit);
  } else {
    // Installed
    var removebtn = document.createElement("button");
    removebtn.textContent = parent.Localization.getString("remove");
    removebtn.onclick = () => {
      localStorage.removeItem("fa1c2e"), parent.Login.loadFaceButton();
      window.location.reload();
    };
    document.body.appendChild(removebtn);
  }
});
