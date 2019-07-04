function ObjectLightBulb(indexTexture) {
    this.imageLightBulbOff = new Image();
    this.imageLightBulbOn = new Image();
    this.imageLightBulbOff.src = "./textures/lampOff.png";
    this.imageLightBulbOn.src = "./textures/lampOn.png";
    this.size = 1;
    this.dropPos = 0
}

ObjectLightBulb.prototype.update = function(delta) {
    this.dropPos += 0.3 * delta * (1 + this.dropPos);
    if(this.dropPos > 1) {
        this.dropPos = 0;
    }
};

ObjectLightBulb.prototype.draw = function(canvas, x, y, angleInRadians) {
    var ctx = canvas.getContext("2d");
    var lSize = canvas.width * 0.75 * this.size;
    var lSizeDrop = this.dropPos * canvas.width * 0.2;
    var lPosY = Math.max(this.dropPos - 0.2, 0) * canvas.height;
    x += lSize * 0.25;
    ctx.translate(x, y);
    ctx.rotate(angleInRadians);
    ctx.drawImage(this.image, -canvas.width / 2, -canvas.height / 2, lSize, lSize);
    ctx.drawImage(this.imageDrop, -canvas.width / 2 + lSize * 0.3 - lSizeDrop * 0.5 , -canvas.height / 2 + lSize * 0.6 + lPosY, lSizeDrop, lSizeDrop);
    ctx.rotate(-angleInRadians);
    ctx.translate(-x, -y);
};