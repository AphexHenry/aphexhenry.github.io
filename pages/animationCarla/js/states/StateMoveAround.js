function StateMoveAround(aArrayObjectsCount) {
    this.objects = [];
    for(var i = 0; i < aArrayObjectsCount.length; i++) {
        for(var count = 0; count < aArrayObjectsCount[i].length; count++) {
            this.objects.push(new AnimationMoveAround(new ObjectWorm()));
        }
    }
};

StateMoveAround.prototype.update = function(delta) {
    for(var i = 0; i < this.objects.length; i++) {
        this.objects[i].update(delta);
    }
};

StateMoveAround.prototype.draw = function(canvas) {
    for(var i = 0; i < this.objects.length; i++) {
        this.objects[i].draw(canvas);
    }
};