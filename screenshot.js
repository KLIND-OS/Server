var screenshot = {
    take: () => {
        let div = document.body;
        html2canvas(div).then(
            function (canvas) {
                document.body.appendChild(canvas);
                console.log(canvas.toDataURL());
            });
    }
};
//window.addEventListener("DOMContentLoaded", () => {
//    screenshot.take();
//})