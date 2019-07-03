function AnimationMoveAround(object){
    this.x = 0;
    this.y = 0;
    this.speedx = Math.random() - 0.5;
    this.speedy = Math.random() - 0.5;
    this.targetx = 0.5;
    this.targety = 0.5;
    this.randomAmplitude = Math.random() + 0.5;
    this.randomFast = Math.random() + 0.5;
    this.randomAngle = Math.random() - 0.5;
    this.angle = this.randomFast;
    this.time = this.randomAmplitude + this.randomFast;
    this.object = object;
}

AnimationMoveAround.prototype.update = function(delta) {
    this.time += delta;
    this.targetx += (Math.random() - 0.5) * delta;
    this.targetx = sTools.clamp(this.targetx, 0, 1);
    this.targety += (Math.random() - 0.5) * delta;
    this.targety = sTools.clamp(this.targety, 0, 1);

    this.angle += this.randomAngle * delta;

    var realTargetX = this.targetx + this.randomAmplitude * 0.15 * Math.cos(this.time * this.randomFast);
    var realTargetY = this.targety + this.randomAmplitude * 0.15 * Math.sin(this.time * 1.31 * this.randomFast);
    this.speedx += (realTargetX - this.x) * delta;
    this.speedy += (realTargetY - this.y) * delta;
    this.x += this.speedx * delta;
    this.y += this.speedy * delta;
};

AnimationMoveAround.prototype.draw = function(canvas) {
    this.object.draw(canvas, this.x * canvas.width, this.y * canvas.height, this.angle);
};