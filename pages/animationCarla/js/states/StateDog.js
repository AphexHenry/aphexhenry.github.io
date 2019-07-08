function StateDog(aArrayObjectsCount) {
    this.imageBackground = new Image();
    this.waterBack = new Image();
    this.waterFront = new Image();
    this.imageDog = new Image();

    this.imageBackground.src = "./textures/backgrounds/backgroundDog.jpg";
    this.waterBack.src = "./textures/waterBack.png";
    this.waterFront.src = "./textures/waterFront.png";
    this.imageDog.src = "./textures/dog.png";

    this.lightBulb = new ObjectLightBulb();

    this.levelSea = -0.2;

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

    this.lightBulb.update(delta);
};

StateDog.prototype.draw = function(canvas) {
    var ctx = canvas.getContext("2d");

    ctx.drawImage(this.imageBackground, 0, 0, canvas.width, canvas.height);
    var lHeightWaterFront = canvas.height - Math.min(this.levelSea , 1) * canvas.height;
    var lDelayBack = 0.4;
    var lHeightWaterBack = canvas.height - (Math.min(this.levelSea - lDelayBack, 1)) * canvas.height;; // delay
    var lPosBackX = Math.cos(this.timer * 2) * canvas.width * 0.03;
    var lPosBackY = Math.sin(this.timer * 2) * canvas.height * 0.03;
    ctx.drawImage(this.waterBack, lPosBackX, lHeightWaterBack + lPosBackY, canvas.width, canvas.height);

    var lSize = canvas.width;
    for(var i = 0; i < this.objects.length; i++) {
        this.objects[i].draw(canvas);
    }

    var lSizeLightbulb = 0.1 * canvas.height;
    this.lightBulb.size = 0.4;
    this.lightBulb.draw(canvas, canvas.width * 0.5, canvas.height * 0.5);

    var lPosFrontX = Math.cos(this.timer) * canvas.width * 0.05;
    var lPosFrontY = Math.sin(this.timer) * canvas.height * 0.05;
    ctx.drawImage(this.waterFront, lPosFrontX, lHeightWaterFront + lPosFrontY, canvas.width, canvas.height);
    sTextureManager.drawImage(ctx, sTextureManager.frames[0], 0,0, canvas.width, canvas.height);
};

StateDog.prototype.isDone = function() {
    return this.timer <= 0;
};