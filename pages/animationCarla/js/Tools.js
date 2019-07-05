
function Tools() {

}

Tools.prototype.clamp = function(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
};

Tools.prototype.getRandomInt = function(aMax) {
    return Math.floor(Math.random() * Math.floor(aMax));
};

Tools.prototype.getRandomColor = function() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};