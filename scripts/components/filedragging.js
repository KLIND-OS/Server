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
    isHoveringFile: (elementUnderCursor) => {
      const ancestors = FileDraggingAPI.tools.getAncestors(elementUnderCursor);

      let ret = [false];

      for (const el of FileDraggingAPI.data.filesDrop) {
        if (
          ancestors.some((e) => e.isSameNode(el.element)) ||
          elementUnderCursor.isSameNode(el.element)
        ) {
          ret = [true, el];
          el.hoverCallback(true);
        } else {
          el.hoverCallback(false);
        }
      }

      return ret;
    },
    isHoveringFolder: (elementUnderCursor) => {
      const ancestors = FileDraggingAPI.tools.getAncestors(elementUnderCursor);

      let ret = [false];

      for (const el of FileDraggingAPI.data.foldersDrop) {
        if (
          ancestors.some((e) => e.isSameNode(el.element)) ||
          elementUnderCursor.isSameNode(el.element)
        ) {
          ret = [true, el];
          el.hoverCallback(true);
        } else {
          el.hoverCallback(false);
        }
      }

      return ret;
    },
    drag: (event, ui, isHovering) => {
      var x = event.pageX;
      var y = event.pageY;

      var elementUnderCursor = document.elementFromPoint(x, y);

      const [dragging, elt] = isHovering(elementUnderCursor || document);

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
    drop: (event, ui, isHovering) => {
      var x = event.pageX;
      var y = event.pageY;

      var elementUnderCursor = document.elementFromPoint(x, y);

      const [dragging, elt] = isHovering(elementUnderCursor);

      if (!dragging) {
        return;
      }
      elt.callback(ui.helper[0].dataset.fileLocation);
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

  static registerDroppable(
    element,
    allowFile,
    allowFolder,
    dropText,
    callback,
    hoverCallback = () => {},
  ) {
    if (allowFile) {
      this.data.filesDrop.push({
        element,
        callback,
        dropText,
        hoverCallback
      });
    }
    if (allowFolder) {
      this.data.foldersDrop.push({
        element,
        callback,
        dropText,
        hoverCallback
      });
    }
  }
}
