function ObjectWorm() {
    this.image = new Image();
    this.image.src = "./textures/worm.png";
}

ObjectWorm.prototype.update = function(delta) {

};

ObjectWorm.prototype.draw = function(canvas, x, y) {
    var ctx = canvas.getContext("2d");
    var lSize = canvas.width * 0.75;
    ctx.drawImage(this.image, x, y, lSize, lSize);
    
};