function ObjectWorm() {
    this.image = new Image();
    this.image.src = "/textures/worm.png";
}

ObjectWorm.prototype.update = function(delta) {

};

ObjectWorm.prototype.draw = function(canvas, x, y) {
    var ctx = aCanvas.getContext("2d");
    ctx.drawImage(this.image, x, y);
};