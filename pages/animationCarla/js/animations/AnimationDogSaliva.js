function AnimationDogSaliva(){
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
    this.object = new ObjectDog();
    this.speedMoveCoeff = 1;
    this.ampitudeCoeff = 1;
    this.sizeCoeff = 1;
}

AnimationDogSaliva.prototype.update = function(delta) {
    this.time += delta;
    this.object.update(delta);
};

AnimationDogSaliva.prototype.draw = function(canvas) {
    var lX = (this.x - 0.5) * this.ampitudeCoeff + 0.5;
    var lY = (this.y - 0.5) * this.ampitudeCoeff + 0.5;
    this.object.draw(canvas, lX * canvas.width, lY * canvas.height, 0);
};

AnimationDogSaliva.prototype.isDone = function() {
    return this.time > 15000;
};