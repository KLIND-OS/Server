class FileDraggingAPI {
  static data = {
    filesDrop: [],
    foldersDrop: [],
  };

  static tools = {
    getAncestors: (el) => {
      const ancestors = [];
      while (el.parentElement) {
        el = el.parentElement;
        ancestors.push(el);
      }
      return ancestors;
    },
    isHoveringFile: (elementUnderCursor, start) => {
      const ancestors = FileDraggingAPI.tools.getAncestors(elementUnderCursor);

      let ret = [false];

      for (const el of FileDraggingAPI.data.filesDrop) {
        if (el == undefined) {
          continue;
        }
        if (
          ancestors.some(
            (e) => e.isSameNode(el.element) && !e.isSameNode(start),
          ) ||
          (elementUnderCursor.isSameNode(el.element) &&
            !elementUnderCursor.isSameNode(start))
        ) {
          ret = [true, el];
          el.hoverCallback(true, "file");
        } else {
          el.hoverCallback(false, "file");
        }
      }

      return ret;
    },
    isHoveringFolder: (elementUnderCursor, start) => {
      const ancestors = FileDraggingAPI.tools.getAncestors(elementUnderCursor);

      let ret = [false];

      for (const el of FileDraggingAPI.data.foldersDrop) {
        if (el == undefined) {
          continue;
        }
        if (
          ancestors.some(
            (e) => e.isSameNode(el.element) && !e.isSameNode(start),
          ) ||
          (elementUnderCursor.isSameNode(el.element) &&
            !elementUnderCursor.isSameNode(start))
        ) {
          ret = [true, el];
          el.hoverCallback(true, "folder");
        } else {
          el.hoverCallback(false, "folder");
        }
      }

      return ret;
    },
    drag: (event, ui, isHovering) => {
      var x = event.pageX;
      var y = event.pageY;

      var elementUnderCursor = document.elementFromPoint(x, y);

      const [dragging, elt] = isHovering(
        elementUnderCursor || document,
        event.target,
      );

      const helper = ui.helper[0];
      const helperText = helper.querySelector("p");

      if (!dragging) {
        if (helperText) {
          helperText.remove();
        }

        return;
      }

      if (!helperText) {
        const helperTextNew = document.createElement("p");
        helperTextNew.textContent = elt.dropText;
        helper.appendChild(helperTextNew);
      }
    },
    drop: (event, ui, isHovering, type) => {
      var x = event.pageX;
      var y = event.pageY;

      var elementUnderCursor = document.elementFromPoint(x, y);

      const [dragging, elt] = isHovering(elementUnderCursor);

      if (!dragging) {
        return;
      }

      if (event.target.isSameNode(elt.element)) {
        return;
      }
      elt.hoverCallback(false, type);
      elt.callback(ui.helper[0].dataset.fileLocation, type);
    },
  };

  static registerFile(element, filename, fileLocation) {
    $(element).draggable({
      scroll: false,
      drag: function (event, ui) {
        FileDraggingAPI.tools.drag(
          event,
          ui,
          FileDraggingAPI.tools.isHoveringFile,
        );
      },
      stop: function (event, ui) {
        FileDraggingAPI.tools.drop(
          event,
          ui,
          FileDraggingAPI.tools.isHoveringFile,
          "file",
        );
      },
      helper: function () {
        const draggingFile = document.createElement("div");
        draggingFile.className = "dragging-file";
        draggingFile.dataset.fileLocation = fileLocation;
        if (localStorage.getItem("mode") == "dark") {
          draggingFile.classList.add("dark");
        }

        const img = document.createElement("img");
        img.src = "icons/file.png";
        draggingFile.appendChild(img);

        const text = document.createElement("h3");
        text.textContent = filename;
        draggingFile.appendChild(text);

        var helperContainer = $(draggingFile);
        $(".filesDragging").append(helperContainer);
        return helperContainer;
      },
    });
  }

  static registerFolder(element, foldername, folderLocation) {
    $(element).draggable({
      scroll: false,
      drag: function (event, ui) {
        FileDraggingAPI.tools.drag(
          event,
          ui,
          FileDraggingAPI.tools.isHoveringFolder,
        );
      },
      stop: function (event, ui) {
        FileDraggingAPI.tools.drop(
          event,
          ui,
          FileDraggingAPI.tools.isHoveringFolder,
          "folder",
        );
      },
      helper: function () {
        const draggingFile = document.createElement("div");
        draggingFile.className = "dragging-file";
        draggingFile.dataset.fileLocation = folderLocation;
        if (localStorage.getItem("mode") == "dark") {
          draggingFile.classList.add("dark");
        }

        const img = document.createElement("img");
        img.src = "icons/folder.svg";
        draggingFile.appendChild(img);

        const text = document.createElement("h3");
        text.textContent = foldername;
        draggingFile.appendChild(text);

        var helperContainer = $(draggingFile);
        $(".filesDragging").append(helperContainer);
        return helperContainer;
      },
    });
  }

  static registerDroppable(
    element,
    allowFile,
    allowFolder,
    dropText,
    callback,
    hoverCallback = () => {},
  ) {
    let x = [];
    if (allowFile) {
      x.push(this.data.filesDrop.length);
      this.data.filesDrop.push({
        element,
        callback,
        dropText,
        hoverCallback,
      });
    } else {
      x.push(undefined);
    }

    if (allowFolder) {
      x.push(this.data.foldersDrop.length);
      this.data.foldersDrop.push({
        element,
        callback,
        dropText,
        hoverCallback,
      });
    } else {
      x.push(undefined);
    }

    return x;
  }

  static unregister(id) {
    if (id[0]) {
      this.data.filesDrop[id[0]] = undefined;
    }
    if (id[1]) {
      this.data.foldersDrop[id[1]] = undefined;
    }
  }
}
