function ObjectWorm(indexTexture) {
    this.image = new Image();
    switch (indexTexture) {
        case 0:
            this.image.src = "./textures/worm.png";
            break;
        default:
            this.image.src = "./textures/worm2.png";
            break;
    }
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