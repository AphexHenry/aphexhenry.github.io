function StateTakeInBubble(aArrayObjectsCount) {
    this.imageFront = new Image();
    this.imageBack = new Image();
    this.imageHand = new Image();
    this.imageFront.src = "./textures/bubble1Front.png";
    this.imageBack.src = "./textures/bubble1Back.png";
    this.imageHand.src = "./textures/hand.png";

    this.objects = [];
    for(var i = 0; i < aArrayObjectsCount.length; i++) {
        var lImage = sTextureManager.getRandomObject();
        for (var count = 0; count < aArrayObjectsCount[i]; count++) {
            var lAnim = new AnimationMoveAround(new ObjectWorm(lImage));
            lAnim.speedMoveCoeff = 0;
            this.objects.push(lAnim);
        }
    }

    this.timer = 15;
    this.handPos = 0;
};

StateTakeInBubble.prototype.update = function(delta) {
    this.timer -= delta;
    for(var i = 0; i < this.objects.length; i++) {
        this.objects[i].update(delta);
    }

    if(this.timer < 10) {
        this.handPos += delta * 0.5;
    }

};

StateTakeInBubble.prototype.draw = function(canvas) {
    var ctx = canvas.getContext("2d");
    var lSize = canvas.width
    ctx.drawImage(this.imageBack, (canvas.width  - lSize)/ 2, (canvas.height - lSize) / 2, lSize, lSize);
    for(var i = 0; i < this.objects.length; i++) {
        this.objects[i].draw(canvas);
    }
    ctx.drawImage(this.imageFront, (canvas.width  - lSize)/ 2, (canvas.height - lSize) / 2, lSize, lSize);

    var lHandSize = canvas.width * (1 + 0.1 * Math.cos(this.handPos * 3));
    var lHandPosCoeff = Math.min(this.handPos, 1);
    var lHandX = lHandPosCoeff * canvas.width * 0.8 - lHandSize;
    var lHandY = canvas.height - lHandPosCoeff * canvas.height * 0.8;
    ctx.drawImage(this.imageHand, lHandX, lHandY, lHandSize, lHandSize);
};

StateTakeInBubble.prototype.isDone = function() {
    return this.timer <= 0;
};