function ObjectGeneral(src) {
    this.image = new Image();
    this.image.src = src;
}

ObjectGeneral.prototype.update = function(delta) {
    this.dropPos += delta * (1 + this.dropPos);
};

ObjectGeneral.prototype.draw = function(canvas, x, y, angleInRadians) {
    var ctx = canvas.getContext("2d");
    var lSize = canvas.width * 0.75 * this.size;
    var lSizeDrop = this.dropPos * canvas.width * 0.2;
    ctx.translate(x, y);
    ctx.rotate(angleInRadians);
    ctx.drawImage(this.image, -canvas.width / 2, -canvas.height / 2, lSize, lSize);
    ctx.drawImage(this.imageDrop, -canvas.width / 2, -canvas.height / 2 + this.dropPos * canvas.height, lSizeDrop, lSizeDrop);
    ctx.rotate(-angleInRadians);
    ctx.translate(-x, -y);
};