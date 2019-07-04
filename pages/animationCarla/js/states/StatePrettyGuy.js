function StatePrettyGuy(aArrayObjectsCount) {
    this.objects = [];
    for(var i = 0; i < aArrayObjectsCount.length; i++) {
        var lImage = sTextureManager.getRandomObject();
        for (var count = 0; count < aArrayObjectsCount[i]; count++) {
            var lAnim = new AnimationMoveAround(new ObjectWorm(lImage));
            lAnim.speedMoveCoeff = 0.2;
            lAnim.ampitudeCoeff = 3;
            this.objects.push(lAnim);
        }
    }
    this.time = 0;
};

StatePrettyGuy.prototype.update = function(delta) {
    for(var i = 0; i < this.objects.length; i++) {
        this.objects[i].update(delta);
    }
    this.time += delta;
};

StatePrettyGuy.prototype.draw = function(canvas) {
    var ctx = canvas.getContext("2d");
    // ctx.fillStyle = "rgba(0,0,0,0.005)";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    for(var i = 0; i < this.objects.length; i++) {
        this.objects[i].draw(canvas);
    }
};

StatePrettyGuy.prototype.isDone = function() {
    return this.time >= 15;
};