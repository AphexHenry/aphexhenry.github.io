
function Tools() {

}

Tools.prototype.clamp = function(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
};