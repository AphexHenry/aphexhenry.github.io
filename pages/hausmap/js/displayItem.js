function displayItem(xmlRoot) {
    var displayElement = xmlRoot.getElementsByTagName("DISPLAY")[0];
    this.x = displayElement.getAttribute("x");
    this.y = displayElement.getAttribute("y");
    this.width = displayElement.getAttribute("width");
    this.height = displayElement.getAttribute("height");
    this.scale = displayElement.getAttribute("scale");
    this.debug = displayElement.getAttribute("debug");
    this.quantity = displayElement.getAttribute("quantity");

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
    var numFlowers = this.quantity;
    var width = parseFloat(this.width);
    var height = parseFloat(this.height);
    var pxCount = 10000 / numFlowers;
    for(var i = 0; i < numFlowers; i++) {
        var thisPx = i * pxCount + pxCount * 0.5 * Math.random();
        var x = Math.floor(thisPx / 100);
        var y = (thisPx - x * 100);
        x = width * x / 100;
        y = height * y / 100;
        // var x = Math.random() * parseFloat(this.width) + parseFloat(this.x);
        this.instanciateCanvas(x - this.scale * 0.5 + parseFloat(this.x), y + parseFloat(this.y) - this.scale);
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
    this.img.style.zIndex = Math.floor(parseFloat(y) + parseFloat(this.scale));
    this.img.style.left = x + "%";
    this.img.style.top = y + "%";
    this.img.className = "item";
    src.appendChild(this.img);

    var that = this;
    this.img.onmouseover = function (e) {
        sInfoPopup.setHeader(that.item.name);
        var xFloat = parseFloat(that.x);
        var widthSurface = that.width ? parseFloat(that.width) : parseFloat(that.scale);
        var lInfoHtml = that.getInfoHtml();
        sInfoPopup.setInfoHtml(lInfoHtml);
        var goesLeft = (xFloat + widthSurface * 0.5) > 50;
        sInfoPopup.setPosition(goesLeft ? xFloat : xFloat + widthSurface , that.y, goesLeft);
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