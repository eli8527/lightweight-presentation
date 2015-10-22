(function () {
    var moving;

    // set up
    $(document).ready(function () {
        $(".slide").hide();
        $(".slide").first().addClass("active");
        $(".active").show();
        $(".controls").hide();
        $(".fullscreen").height($(document).height());
        runLogo();
    });

    $(window).resize(function () {
        $(".fullscreen").height($(document).height());
    });

    // handle key commands
    $(document).keydown(function (e) {
        switch (e.which) {
            case 37: // left
                previousSlide();
                break;

            case 39: // right
                nextSlide();
                break;

            case 70: //f
                toggleFullScreen();
                break;

            default:
                return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });

    // show controls on mouse move
    $(document).mousemove(function (e) {
        $(".controls").fadeIn(500);
        if (moving) {
            clearTimeout(moving);
            moving = null;
        }
        moving = setTimeout(function () {
            moving = false;
            $(".controls").fadeOut(500);
        }, 2000);
    });
})();

function nextSlide() {
    var active = $(".active");
    $('.btn').blur();
    if (!$(".slide").last().hasClass("active")) {
        active.hide();
        active.next().show();
        active.next().addClass("active");
        active.removeClass("active");
    }
}

function previousSlide() {
    var active = $(".active");
    $('.btn').blur();
    if (!$(".slide").first().hasClass("active")) {
        active.hide();
        active.prev().show();
        active.prev().addClass("active");
        active.removeClass("active");
    }
}

function toggleFullScreen() {
    if (!document.fullscreenElement && // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) { // current working methods
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}
