var compositionManager = function() {
    this.items = [];
    this.loadXml();
}

compositionManager.prototype.loadXml = function () {
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
        var compositionNode = xmlDoc.children[0];

        for(var i = 0; i < compositionNode.children.length; i++) {
            var node = compositionNode.children[i];
            var newItem = new displayItem(node);
            that.items.push(newItem);
        }

        // xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;
    }

    xmlhttp.open("GET","data/composition.xml",false);
    xmlhttp.send();

}

compositionManager.prototype.draw = function (ctx) {
    for(var i = 0; i < this.items.length; i++) {
        this.items[i].draw(ctx);
    }
}