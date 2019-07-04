function StateDog(aArrayObjectsCount) {
    this.imageBackground = new Image();
    this.waterBack = new Image();
    this.waterFront = new Image();
    this.imageDog = new Image();

    this.imageBackground.src = "./textures/backgroundDog.jpg";
    this.waterBack.src = "./textures/waterBack.png";
    this.waterFront.src = "./textures/waterFront.png";
    this.imageDog.src = "./textures/dog.png";


    this.levelSea = -0.3;

    this.objects = [];

            var lAnim = new AnimationDogSaliva();
            lAnim.speedMoveCoeff = 0;
            this.objects.push(lAnim);

    this.timer = 15;
    this.handPos = 0;
};

StateDog.prototype.update = function(delta) {
    this.timer -= delta;
    this.levelSea += delta * 0.1;
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
    var lHeightWaterFront = canvas.height - Math.min(this.levelSea , 1) * canvas.height;
    var lDelayBack = 0.3;
    var lHeightWaterBack = canvas.height - (Math.min(this.levelSea - lDelayBack, 1)) * canvas.height;; // delay
    ctx.drawImage(this.waterBack, 0, lHeightWaterBack, canvas.width, canvas.height);

    var lSize = canvas.width;
    for(var i = 0; i < this.objects.length; i++) {
        this.objects[i].draw(canvas);
    }

    ctx.drawImage(this.waterFront, 0, lHeightWaterFront, canvas.width, canvas.height);
};

StateDog.prototype.isDone = function() {
    return this.timer <= 0;
};