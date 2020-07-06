function displayItem(xmlRoot) {
    var displayElement = xmlRoot.getElementsByTagName("DISPLAY")[0];
    this.x = displayElement.getAttribute("x");
    this.y = displayElement.getAttribute("y");
    this.scale = displayElement.getAttribute("scale");
    var typeName = xmlRoot.tagName;
    this.item = sItemManager.getItemWithType(typeName);
    this.img = document.createElement("img");
    this.img.src = this.item.img.src;
    var src = document.getElementById("myCanvas");
    this.img.style.position = "absolute";
    this.img.style.width = this.scale + "%";
    this.img.style.zIndex = this.y;
    this.img.style.left = this.x + "%";
    this.img.style.top = this.y + "%";
    this.img.className = "item";
    src.appendChild(this.img);

    var descriptionElement = xmlRoot.getElementsByTagName("DESCRIPTION")[0];
    this.description = descriptionElement.getAttribute("value");

    var infoElement = xmlRoot.getElementsByTagName("INFOS")[0];
    if (infoElement) {
        this.name = infoElement.getAttribute("name");
        this.birthYear = infoElement.getAttribute("year");
    }

    var that = this;
    this.img.onmouseover = function () {
        sInfoPopup.setHeader(that.item.name);
        var lInfoHtml = that.getInfoHtml();
        sInfoPopup.setInfoHtml(lInfoHtml);
        sInfoPopup.setVisible(true);
    }
    this.img.onmouseleave = function () {
        sInfoPopup.setVisible(false);
    }
}

displayItem.prototype.getInfoHtml = function() {
    var lHtml = "";
    if(this.name)
    if(this.name.length > 0) {
        // lHtml += '<p><b>name: </b>' + this.name + '</p>';
        lHtml += '<p><b>' + this.name + '</b></p>';
    }

    if(this.description)
        if(this.description.length > 0) {
            lHtml += '<p>' + this.description +'</p>';
        }
    return lHtml;
}


displayItem.prototype.draw = function(ctx) {
    let xPx = this.x * ctx.canvas.width / 10;
    let yPx = this.x * ctx.canvas.height / 10;
    let widthPx = this.scale * ctx.canvas.width / 20;
    let heightPx = widthPx;
    ctx.drawImage(this.item.img, xPx, yPx, widthPx, heightPx);
}