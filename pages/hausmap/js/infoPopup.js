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