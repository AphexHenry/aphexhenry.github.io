function StateMoveAround(aArrayObjectsCount) {
    this.objects = [];
    for(var i = 0; i < aArrayObjectsCount.length; i++) {
        for (var count = 0; count < aArrayObjectsCount[i]; count++) {
            this.objects.push(new AnimationMoveAround(new ObjectWorm(i)));
        }
    }
};

StateMoveAround.prototype.update = function(delta) {
    for(var i = 0; i < this.objects.length; i++) {
        this.objects[i].update(delta);
    }
};

StateMoveAround.prototype.draw = function(canvas) {
    var ctx = canvas.getContext("2d");
    // ctx.fillStyle = "rgba(0,0,0,0.005)";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    for(var i = 0; i < this.objects.length; i++) {
        this.objects[i].draw(canvas);
    }
};