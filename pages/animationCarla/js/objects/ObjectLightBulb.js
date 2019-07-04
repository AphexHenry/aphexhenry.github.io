function ObjectLightBulb(indexTexture) {
    this.imageLightBulbOff = new Image();
    this.imageLightBulbOn = new Image();
    this.imageLightBulbOff.src = "./textures/lampOff.png";
    this.imageLightBulbOn.src = "./textures/lampOn.png";
    this.size = 1;
    this.timer = 0;
    this.isOn = true;
    this.frequency = 1; // blink every second.
}

ObjectLightBulb.prototype.update = function(delta) {
    this.timer += delta;
    if(this.timer >= 1/this.frequency) {
        this.isOn = !this.isOn;
        this.timer = 0;
    }
};

ObjectLightBulb.prototype.draw = function(canvas, x, y, angleInRadians) {
    var ctx = canvas.getContext("2d");
    var lSize = canvas.width * 0.75 * this.size;
    var image = this.isOn ? this.imageLightBulbOff : this.imageLightBulbOn;
    ctx.translate(x, y);
    ctx.rotate(angleInRadians);
    ctx.drawImage(image, -canvas.width / 2, -canvas.height / 2, lSize, lSize);
    ctx.rotate(-angleInRadians);
    ctx.translate(-x, -y);
};