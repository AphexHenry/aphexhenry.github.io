function ObjectWorm(aImage) {
    this.image = aImage;
    this.scale = 1;
}

ObjectWorm.prototype.update = function(delta) {

};

ObjectWorm.prototype.draw = function(canvas, x, y, angleInRadians) {
    var ctx = canvas.getContext("2d");
    var lSize = canvas.width * 0.75 * this.scale;

    // x = lTranslate + x;
    ctx.translate(x, y);
    ctx.rotate(angleInRadians);
    ctx.drawImage(this.image, -lSize / 2, -lSize / 2, lSize, lSize);
    ctx.rotate(-angleInRadians);
    ctx.translate(-x, -y);

};