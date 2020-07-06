var itemsManager = function() {
    this.items = [];
    this.loadXml();
}

itemsManager.prototype.loadXml = function () {
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        var xmlhttp=new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var that = this;
    xmlhttp.onload = function() {
        var xmlDoc = new DOMParser().parseFromString(xmlhttp.responseText,'text/xml');

        console.log(xmlDoc);
        var itemsNode = xmlDoc.children[0];

        for(var i = 0; i < itemsNode.children.length; i++) {
            var node = itemsNode.children[i];
            var newItem = new item(node);
            that.items.push(newItem);
        }

        // xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;
    }

    xmlhttp.open("GET","data/items.xml",false);
    xmlhttp.send();

}

itemsManager.prototype.getItemWithType = function(aTypeName) {
    for(var i = 0; i < this.items.length; i++) {
        if(this.items[i].type == aTypeName) {
            return this.items[i];
        }
    }
    return null;
}