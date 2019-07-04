function StateDog(aArrayObjectsCount) {
    this.imageBackground = new Image();
    this.waterBack = new Image();
    this.waterFront = new Image();
    this.imageDog = new Image();
    this.imageHand = new Image();
    this.imageBackground.src = "./textures/backgroundDog.jpg";
    this.waterBack.src = "./textures/waterBack.png";
    this.waterFront.src = "./textures/waterFront.png";
    this.imageDog.src = "./textures/dog.png";

    this.objects = [];

            var lAnim = new AnimationDogSaliva();
            lAnim.speedMoveCoeff = 0;
            this.objects.push(lAnim);

    this.timer = 15;
    this.handPos = 0;
};

StateDog.prototype.update = function(delta) {
    this.timer -= delta;
    for(var i = 0; i < this.objects.length; i++) {
        this.objects[i].update(delta);
    }

    if(this.timer < 10) {
        this.handPos += delta * 0.5;
    }

};

StateDog.prototype.draw = function(canvas) {
    var ctx = canvas.getContext("2d");

    ctx.drawImage(this.imageBackground, 0, 0, canvas.width, canvas.height);

    var lSize = canvas.width;
    for(var i = 0; i < this.objects.length; i++) {
        this.objects[i].draw(canvas);
    }
};

StateDog.prototype.isDone = function() {
    return this.timer <= 0;
};