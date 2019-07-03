
"use strict";
function TextInBetween(aScene)
{
    this.text = "";
    this.index = 0;
}

TextInBetween.prototype.setText = function(aText) {
    this.text = aText;
    document.getElementById("instructionsText").innerHTML = this.text;
};

TextInBetween.prototype.setIndex = function(aIndex) {
    this.index = aIndex;
    document.getElementById("stepText").innerHTML = "etape " + this.index;
};

TextInBetween.prototype.update = function(aDelta) {

};

TextInBetween.prototype.draw= function(canvas) {

};
