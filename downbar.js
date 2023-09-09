$(function () {
    $(".fakedownbar").on({
        mouseover: function () {
            downbarover()
        },
        mouseout: function () {
            downbarout()
        }
    });
});
$(function () {
    $(".downbar").on({
        mouseover: function () {
            downbarover()
        },
        mouseout: function () {
            downbarout()
        }
    });
});