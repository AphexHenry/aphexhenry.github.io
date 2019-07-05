function ObjectWorm(aImage) {
    this.image = aImage;
    this.scale = 1;
    this.scaleX = 1;
    this.scaleY = 1;
}

ObjectWorm.prototype.update = function(delta) {

};

ObjectWorm.prototype.draw = function(canvas, x, y, angleInRadians) {
    var ctx = canvas.getContext("2d");
    var lSize = canvas.width * 0.75 * this.scale;
    var lSizeX = lSize * this.scaleX;
    var lSizeY = lSize * this.scaleY;

    ctx.translate(x, y);
    ctx.rotate(angleInRadians);
    ctx.drawImage(this.image, -lSizeX / 2, -lSizeY / 2, lSizeX, lSizeY);
    ctx.rotate(-angleInRadians);
    ctx.translate(-x, -y);

};