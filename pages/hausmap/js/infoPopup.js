var infoPopup = function() {
    this.div = $("#infoPopup");
}

infoPopup.prototype.setHeader = function(aName) {
    $("#infoHeader").html(aName);
}

infoPopup.prototype.setInfoHtml = function (aHtml) {
    $("#infoContent").html(aHtml);
}

infoPopup.prototype.setVisible = function (aVisible) {
    if(aVisible) {
        this.div.addClass("show");
    }
    else {
        this.div.removeClass("show");
    }
}

infoPopup.prototype.setPosition = function (x, y, displayLeft) {
    if(displayLeft) {
        this.div[0].style.left = "";
        this.div[0].style.right = (100 - x) + "%";
    }
    else {
        this.div[0].style.left = x + "%";
        this.div[0].style.right = "";
    }

    this.div[0].style.top = y + "%";
}