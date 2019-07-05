function AnimationMoveAround(object){
    this.x = Math.random();
    this.y = Math.random();
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
    this.speedMoveCoeff = 1;
    this.ampitudeCoeff = 1;
    this.centerX = 0.5;
    this.centerY = 0.5;
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
    this.x += this.speedx * delta * this.speedMoveCoeff;
    this.y += this.speedy * delta * this.speedMoveCoeff;

};

AnimationMoveAround.prototype.draw = function(canvas) {
    var lX = (this.x - 0.5) * this.ampitudeCoeff + this.centerX;
    var lY = (this.y - 0.5) * this.ampitudeCoeff + this.centerY;
    this.object.draw(canvas, lX * canvas.width, lY * canvas.height, this.angle);
};

AnimationMoveAround.prototype.isDone = function() {
    return this.time > 15000;
};

AnimationMoveAround.prototype.setSize = function(scale) {
    this.object.scale = scale;

};

AnimationMoveAround.prototype.setCenter = function(x,y) {
    this.centerX = x;
    this.centerY = y;
}