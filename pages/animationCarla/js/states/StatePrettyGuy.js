function StatePrettyGuy(aArrayObjectsCount) {
    this.objects = [];
    for(var i = 0; i < aArrayObjectsCount.length; i++) {
        var lImage = sTextureManager.getRandomObject();
        for (var count = 0; count < aArrayObjectsCount[i]; count++) {
            var lAnim = new AnimationMoveAround(new ObjectWorm(lImage));
            lAnim.speedMoveCoeff = 0.2;
            lAnim.ampitudeCoeff = 0.4;
            lAnim.setSize(0.2);
            lAnim.setCenter(0.6, 0.4);
            this.objects.push(lAnim);
        }
    }
    this.time = 0;
    this.timerCloseEyes = 1;
    this.closeEyes = false;
};

StatePrettyGuy.prototype.update = function(delta) {
    for(var i = 0; i < this.objects.length; i++) {
        this.objects[i].update(delta);
    }
    this.time += delta;
    this.timerCloseEyes -= delta;
    if(this.timerCloseEyes <= 0) {
        this.closeEyes = !this.closeEyes;
        this.timerCloseEyes = 0.5 + Math.random() * 2;
        if(!this.closeEyes){
            this.timerCloseEyes += 2;
        }
    }
};

StatePrettyGuy.prototype.draw = function(canvas) {
    var ctx = canvas.getContext("2d");

    sTextureManager.drawImage(ctx, sTextureManager.prettyGuyBackground[0], 0,0, canvas.width, canvas.height);

    for(var i = 0; i < this.objects.length; i+=2) {
        this.objects[i].draw(canvas);
    }

    var lTimeLimHeart = 10;
    if(this.time > lTimeLimHeart) {
        var lTimeHeart = Math.max(this.time - lTimeLimHeart, 0);
        var lX = lTimeHeart * canvas.width * 0.1;
        var lY = Math.sin(lTimeHeart * 2) * canvas.width * 0.02;
        sTextureManager.drawImage(ctx, sTextureManager.prettyGuyBackground[4], lX,lY, canvas.width, canvas.height);
    }
    sTextureManager.drawImage(ctx, sTextureManager.prettyGuyBackground[1], 0,0, canvas.width, canvas.height);
    if(this.closeEyes) {
        sTextureManager.drawImage(ctx, sTextureManager.prettyGuyBackground[3], 0,0, canvas.width, canvas.height);
    }

    for(var i = 1; i < this.objects.length; i+=2) {
        this.objects[i].draw(canvas);
    }


    sTextureManager.drawImage(ctx, sTextureManager.prettyGuyBackground[2], 0,0, canvas.width, canvas.height);
};

StatePrettyGuy.prototype.isDone = function() {
    return this.time >= 15;
};