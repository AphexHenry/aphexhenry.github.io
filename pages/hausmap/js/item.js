function item(xmlRoot) {
    this.type = xmlRoot.tagName;
    this.path = xmlRoot.getElementsByTagName("PATH")[0].getAttribute("value");
    this.name = xmlRoot.getElementsByTagName("NAME")[0].getAttribute("value");
    this.img = new Image();
    this.img.src = "img/items/" + this.path + "/default.png";
}