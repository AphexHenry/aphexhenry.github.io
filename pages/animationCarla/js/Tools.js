
function Tools() {

}

Tools.prototype.clamp = function(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
};

Tools.prototype.getRandomInt = function(aMax) {
    return Math.floor(Math.random() * Math.floor(aMax));
};