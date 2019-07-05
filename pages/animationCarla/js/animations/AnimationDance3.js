function AnimationDance3(object){
    this.x = Math.random();
    this.y = Math.random();
    this.speedx = Math.random() - 0.5;
    this.speedy = Math.random() - 0.5;
    this.targetx = 0.5;
    this.targety = 0.5;
    this.jumpAmplitude = Math.random();
    this.randomFast = Math.random() * 0.05 + 0.8; // jump speed
    this.randomAngle = Math.random() - 0.5;
    this.angle = 0;
    this.time = 0;
    this.object = object;
    this.speedMoveCoeff = 1;
    this.ampitudeCoeff = 1;
    this.centerX = 0.5;
    this.centerY = 0.5;
    this.jumpPhase = 0;
    this.jumpValue = 0;
    this.reverseX = false;
}

AnimationDance3.prototype.update = function(delta) {
    this.time += delta;
    // this.targetx = 0;//sTools.clamp(this.targetx, 0, 1);
    this.targety = 0;//sTools.clamp(this.targety, 0, 1);

    this.angle += Math.cos(this.time) * delta;

    var realTargetX = 0;//this.jumpAmplitude * 0.15 * Math.cos(this.time * this.randomFast);
    var lPhase = (Math.cos(this.time * 2.31)) * 2.31 * this.randomFast + this.jumpPhase * 3.14;
    var jumpSin = Math.sin(lPhase + this.jumpPhase);

    var lScaleTarget = (jumpSin < -0.1) ? -1 : 1;
    var maxScale = 1;
    this.object.scaleX += lScaleTarget * delta * 3;
    this.object.scaleX = sTools.clamp(this.object.scaleX, 0, maxScale);
    this.object.scaleY = this.object.scaleX;

    jumpSin *= jumpSin * jumpSin;

    var realTargetY = 0;//  this.jumpAmplitude * 0.15 * jumpSin;
    if(jumpSin < 0) {
        realTargetY = 0;
    }
    else {
        this.targetx += -delta * 0.05;

    }
    realTargetX += this.targetx;

    // this.speedx += (realTargetX - this.x) * delta;
    // this.speedy += (realTargetY - this.y) * delta;
    // this.x += this.speedx * delta * this.speedMoveCoeff;
    // this.y += this.speedy * delta * this.speedMoveCoeff;
    this.x = realTargetX;
    this.y = -realTargetY;
};

AnimationDance3.prototype.draw = function(canvas) {
    var lX = this.x + this.centerX;
    var lY = this.y + this.centerY;
    if(this.reverseX) {
        lX = 1 - lX;
    }
    this.object.draw(canvas, lX * canvas.width, lY * canvas.height, this.angle);
};

AnimationDance3.prototype.isDone = function() {
    return this.time > 15000;
};

AnimationDance3.prototype.setSize = function(scale) {
    this.object.scale = scale;

};

AnimationDance3.prototype.setCenter = function(x,y) {
    this.centerX = x;
    this.centerY = y;
};