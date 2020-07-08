function displayItem(xmlRoot) {
    var displayElement = xmlRoot.getElementsByTagName("DISPLAY")[0];
    this.x = displayElement.getAttribute("x");
    this.y = displayElement.getAttribute("y");
    this.width = displayElement.getAttribute("width");
    this.height = displayElement.getAttribute("height");
    this.scale = displayElement.getAttribute("scale");
    this.debug = displayElement.getAttribute("debug");
    this.density = displayElement.getAttribute("density");

    var typeName = xmlRoot.tagName;
    this.item = sItemManager.getItemWithType(typeName);

    if(!this.height) {
        this.instanciateCanvas(this.x, this.y);
    }
    else {
        if(this.debug) {
            this.instanciateDebug();
        }
        else {
            this.instanciateArea();
        }
    }

    var descriptionElement = xmlRoot.getElementsByTagName("DESCRIPTION")[0];
    if(!descriptionElement) {
        this.description = this.item.description;
    }
    else {
        this.description = descriptionElement.getAttribute("value");
    }

    var infoElement = xmlRoot.getElementsByTagName("INFOS")[0];
    if (infoElement) {
        this.name = infoElement.getAttribute("name");
        this.birthYear = infoElement.getAttribute("year");
    }
}

displayItem.prototype.instanciateArea = function() {
    var numFlowers = this.density * this.width * this.height / 100;
    for(var i = 0; i < numFlowers; i++) {
        this.instanciateCanvas(Math.random() * parseFloat(this.width) + parseFloat(this.x), Math.random() * parseFloat(this.width) + parseFloat(this.y));
    }
}

displayItem.prototype.instanciateDebug = function() {
    if(this.width && this.height) {
        var lDebugElement = document.createElement("img");
        var src = document.getElementById("myCanvas");
        lDebugElement.style.position = "absolute";
        lDebugElement.style.width = this.width + "%";
        lDebugElement.style.height = this.height + "%";
        lDebugElement.style.zIndex = 40;
        lDebugElement.style.left = this.x + "%";
        lDebugElement.style.top = this.y + "%";
        src.appendChild(lDebugElement);

    }
}

displayItem.prototype.instanciateCanvas = function(x, y) {
    this.img = document.createElement("img");
    this.img.src = this.item.img.src;
    var src = document.getElementById("myCanvas");
    this.img.style.position = "absolute";
    this.img.style.width = this.scale + "%";
    this.img.style.zIndex = y;
    this.img.style.left = x + "%";
    this.img.style.top = y + "%";
    this.img.className = "item";
    src.appendChild(this.img);

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