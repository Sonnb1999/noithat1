
var topIMG = "../assets/images/logo1.png";
var sclIMG = "../assets/images/logo2.png";

$('img[alt="Gabriela Silveira"]').attr("class", "default_logo")

// scroll
window.addEventListener("scroll", function () {
    var value = $(this).scrollTop();
    if (value > 50) {
        $(".default_logo").attr("src", sclIMG);
    }
    else
        $(".default_logo").attr("src", topIMG);
})

//detail
$(".img_producto_container")
    // tile mouse actions
    .on("mouseover", function () {
        $(this)
            .children(".img_producto")
            .css({ transform: "scale(" + $(this).attr("data-scale") + ")" });
    })
    .on("mouseout", function () {
        $(this)
            .children(".img_producto")
            .css({ transform: "scale(1)" });
    })
    .on("mousemove", function (e) {
        $(this)
            .children(".img_producto")
            .css({
                "transform-origin":
                    ((e.pageX - $(this).offset().left) / $(this).width()) * 100 +
                    "% " +
                    ((e.pageY - $(this).offset().top) / $(this).height()) * 100 +
                    "%"
            });
    });






