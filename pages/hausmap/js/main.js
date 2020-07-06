window.onload = function() {
    sItemManager = new itemsManager();
    sInfoPopup = new infoPopup();
    this.compositionManager = new compositionManager();

    $("#container")[0].onmousemove = function (event) {
        var lYMouse = event.layerY;
        checkTrees(lYMouse);
    }

    window.addEventListener('scroll', function(e) {
        var last_known_scroll_position = window.scrollY + window.innerHeight * 0.5;
        checkTrees(last_known_scroll_position);
    });

    function checkTrees(positionY) {
        var lHeight = $("#container")[0].clientHeight;
        var treesCanvas = $("#backgroundTrees");
        var disappearClassName = "disappear";
        var lIsDisappeared = treesCanvas.hasClass(disappearClassName);

        if(positionY < lHeight * 0.5) {
            if(!lIsDisappeared) {
                treesCanvas.addClass(disappearClassName);
            }
        }
        else if(positionY > lHeight * 0.55) {
            if(lIsDisappeared) {
                treesCanvas.removeClass(disappearClassName);
            }
        }
    }

    // var canvas = document.getElementById("myCanvas");
    // var ctx = canvas.getContext("2d");
    // ctx.fillStyle = "#FF0000";
    // ctx.fillRect(0, 0, 150, 75);
    // var that = this;
    // setInterval(function() {
        // canvas.height = document.getElementById("background").height;
        // that.compositionManager.draw(ctx);
    // }, 300);

}