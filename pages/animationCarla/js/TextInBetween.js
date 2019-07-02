
"use strict";
function TextInBetween(aScene)
{
    this.text = "";
}

TextInBetween.prototype.setText = function(aText) {
    this.text = aText;
};

TextInBetween.prototype.update = function(aDelta) {

};

TextInBetween.prototype.draw= function(canvas) {
        var ctx = canvas.getContext("2d");

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Hello World", canvas.width/2, canvas.height/2);
};