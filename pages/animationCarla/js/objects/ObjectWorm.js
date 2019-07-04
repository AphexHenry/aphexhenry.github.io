function ObjectWorm(aImage) {
    this.image = aImage;
}

ObjectWorm.prototype.update = function(delta) {

};

ObjectWorm.prototype.draw = function(canvas, x, y, angleInRadians) {
    var ctx = canvas.getContext("2d");
    var lSize = canvas.width * 0.75;
    ctx.translate(x, y);
    ctx.rotate(angleInRadians);
    ctx.drawImage(this.image, -canvas.width / 2, -canvas.height / 2, lSize, lSize);
    ctx.rotate(-angleInRadians);
    ctx.translate(-x, -y);

};