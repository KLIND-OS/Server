class ImageEditorApp {
  win;

  // Current states
  states = {
    brightness: "100",
    saturation: "100",
    inversion: "0",
    grayscale: "0",
    rotate: 0,
    flipHorizontal: 1,
    flipVertical: 1,
  };

  applyFilter() {
    const previewImg = this.win.querySelector(".img-prev");
    previewImg.style.transform = `rotate(${this.states.rotate}deg) scale(${this.states.flipHorizontal}, ${this.states.flipVertical})`;
    previewImg.style.filter = `brightness(${this.states.brightness}%) saturate(${this.states.saturation}%) invert(${this.states.inversion}%) grayscale(${this.states.grayscale}%)`;
  }

  save() {
    const previewImg = this.win.querySelector(".img-prev");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;
    ctx.filter = `brightness(${this.states.brightness}%) saturate(${this.states.saturation}%) invert(${this.states.inversion}%) grayscale(${this.states.grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if (this.states.rotate !== 0) {
      ctx.rotate((this.states.rotate * Math.PI) / 180);
    }
    ctx.scale(this.states.flipHorizontal, this.states.flipVertical);
    ctx.drawImage(
      previewImg,
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height,
    );
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
  }

  resetFilter() {
    this.states.brightness = "100";
    this.states.saturation = "100";
    this.states.inversion = "0";
    this.states.grayscale = "0";
    this.states.rotate = 0;
    this.states.flipHorizontal = 1;
    this.states.flipVertical = 1;

    Array.from(this.win.querySelector(".filter-options").children)[0].click();

    this.applyFilter();
  }

  loadImg(path) {
    const previewImg = this.win.querySelector(".img-prev");
    previewImg.src = "http://localhost:9999" + path;
    previewImg.addEventListener("load", () => {
      this.resetFilter();
    });
  }

  chooseImage() {
    parent.control.fileManager.fileSelect({
      success: (path) => this.loadImg(path),
      closed: () => {},
    });
  }

  constructor(win) {
    this.win = win;

    const filterSlider = win.querySelector(".slider input");
    const filterValue = win.querySelector(".filter-info .value");

    Array.from(win.querySelector(".filter-options").children).forEach(
      (option) => {
        option.addEventListener("click", () => {
          win.querySelector(".active").classList.remove("active");
          option.classList.add("active");

          win.querySelector(".filter-info .name").innerText = option.innerText;

          if (option.dataset.type === "brightness") {
            filterSlider.max = "200";
            filterSlider.value = this.states.brightness;
            filterValue.innerText = `${this.states.brightness}%`;
          } else if (option.dataset.type === "saturation") {
            filterSlider.max = "200";
            filterSlider.value = this.states.saturation;
            filterValue.innerText = `${this.states.saturation}%`;
          } else if (option.dataset.type === "inversion") {
            filterSlider.max = "100";
            filterSlider.value = this.states.inversion;
            filterValue.innerText = `${this.states.inversion}%`;
          } else {
            filterSlider.max = "100";
            filterSlider.value = this.states.grayscale;
            filterValue.innerText = `${this.states.grayscale}%`;
          }
        });
      },
    );

    filterSlider.addEventListener("input", () => {
      filterValue.innerText = `${filterSlider.value}%`;
      const selectedFilter = win.querySelector(".active");

      if (selectedFilter.dataset.type === "brightness") {
        this.states.brightness = filterSlider.value;
      } else if (selectedFilter.dataset.type === "saturation") {
        this.states.saturation = filterSlider.value;
      } else if (selectedFilter.dataset.type === "inversion") {
        this.states.inversion = filterSlider.value;
      } else {
        this.states.grayscale = filterSlider.value;
      }
      this.applyFilter();
    });

    FileDraggingAPI.registerDroppable(
      win.querySelector(".img-prev"),
      true,
      false,
      Localization.getString("open"),
      (path) => this.loadImg(path),
    );

    win
      .querySelector(".select-img-f")
      .addEventListener("click", () => this.chooseImage());

    win
      .querySelector(".reset-filter-f")
      .addEventListener("click", () => this.resetFilter());

    win
      .querySelector(".save-img-f")
      .addEventListener("click", () => this.save());
  }
}
