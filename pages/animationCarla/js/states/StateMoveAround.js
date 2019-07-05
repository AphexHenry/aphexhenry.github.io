function StateMoveAround(aArrayObjectsCount) {
    this.objects = [];
    for(var i = 0; i < aArrayObjectsCount.length; i++) {
        var lImage = sTextureManager.getRandomObject();
        for (var count = 0; count < aArrayObjectsCount[i]; count++) {
            var lAnim = new AnimationMoveAround(new ObjectWorm(lImage));
            lAnim.speedMoveCoeff = 0.1;
            lAnim.ampitudeCoeff = 3;
            lAnim.setSize(0.31);

            this.objects.push(lAnim);
        }
    }
    this.time = 0;
    this.isFirstFrame = true;
};

StateMoveAround.prototype.update = function(delta) {
    for(var i = 0; i < this.objects.length; i++) {
        this.objects[i].update(delta);
    }
    this.time += delta;
};

StateMoveAround.prototype.draw = function(canvas) {
    var ctx = canvas.getContext("2d");
    if(this.isFirstFrame) {
        sTextureManager.drawImage(ctx, sTextureManager.comicBackground[0], 0,0, canvas.width, canvas.height);1
        this.isFirstFrame = false;
    }
    // ctx.fillStyle = "rgba(0,0,0,0.005)";1
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    for(var i = 0; i < this.objects.length; i++) {
        this.objects[i].draw(canvas);
    }1
};

StateMoveAround.prototype.isDone = function() {
    return this.time >= 15;
};