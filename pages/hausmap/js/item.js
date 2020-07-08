function item(xmlRoot) {
    this.type = xmlRoot.tagName;
    this.path = xmlRoot.getElementsByTagName("PATH")[0].getAttribute("value");
    this.name = xmlRoot.getElementsByTagName("NAME")[0].getAttribute("value");
    this.description = this.getValue(xmlRoot, "DESCRIPTION");
    this.img = new Image();
    this.img.src = "img/items/" + this.path + "/default.png";
}

item.prototype.getValue = function(xmlRoot, fieldName) {
    var el = xmlRoot.getElementsByTagName(fieldName);
    if(el.length) {
        return el[0].getAttribute("value");
    }
    else {
        return undefined;
    }
}