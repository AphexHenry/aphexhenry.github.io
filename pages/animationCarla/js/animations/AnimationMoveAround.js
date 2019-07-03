function AnimationMoveAround(object){
    this.x = 0;
    this.y = 0;
    this.speedx = Math.random();
    this.speedy = Math.random();
    this.targetx = 0.5;
    this.targety = 0.5;
    this.time = 0;

    this.object = object;
}

AnimationMoveAround.prototype.update = function(delta) {
    this.time += delta;
    this.targetx += Math.random() - 0.5 * delta;
    this.targetx = Tools.clamp(this.targetx, 0, 1);
    this.targetx += Math.random() - 0.5 * delta;
    this.targety = Tools.clamp(this.targety, 0, 1);

    var realTargetX = this.targetx + Math.cos(this.time);
    var realTargetY = this.targety + Math.sin(this.time * 1.31);
    this.speedx += (this.x - realTargetX) * delta;
    this.speedy += (this.y - realTargetY) * delta;
    this.x += this.speedx * delta;
    this.y += this.speedy * delta;
};

AnimationMoveAround.prototype.draw = function(canvas) {
    this.object.draw(canvas, this.x, this.y);
};