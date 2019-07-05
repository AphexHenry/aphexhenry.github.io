function StateDanceMove(aArrayObjectsCount) {
    this.objects = [];
    var phase =false;
    this.idAnimationStart = sTools.getRandomInt(10);
    for(var i = 0; i < aArrayObjectsCount.length; i++) {
        var lImage = sTextureManager.getRandomObject();
        for (var count = 0; count < aArrayObjectsCount[i]; count++) {
            var lAnim = this.getAnimationFromId(i, lImage);
            lAnim.speedMoveCoeff = 0.2;
            lAnim.ampitudeCoeff = 3;
            lAnim.setSize(0.5 / Math.sqrt(aArrayObjectsCount.length));
            phase = !phase;
            lAnim.jumpPhase = phase ? 1 : 0;
            lAnim.reverseX = ((i % 2) == 0);
            lAnim.setCenter(count / aArrayObjectsCount[i], (i + 1)/(1 + aArrayObjectsCount.length));
            this.objects.push(lAnim);
        }
    }
    this.time = 0;
    this.durationIntro = 3;

};

StateDanceMove.prototype.getAnimationFromId = function(id, img) {
    id = (id + this.idAnimationStart) % 4;
    switch (id) {
        case 0:
        case 3:
            return new AnimationDance(new ObjectWorm(img))
            break;
        case 1:
            return new AnimationDance2(new ObjectWorm(img))
            break;
        case 2:
            return new AnimationDance3(new ObjectWorm(img))
            break;
    }
};

StateDanceMove.prototype.update = function(delta) {

    this.time += delta;
    if(this.time < this.durationIntro)
    {

    }
    else {
        for(var i = 0; i < this.objects.length; i++) {
            this.objects[i].update(delta);
        }
    }
};

StateDanceMove.prototype.draw = function(canvas) {
    var ctx = canvas.getContext("2d");


    if(this.time < this.durationIntro) {
        var xMoon = this.time * canvas.width / 20;
        var yMoon = this.time * canvas.width / 30;
        var lPhaseArrow = Math.cos(this.time * 2);
        var yArrow = lPhaseArrow * lPhaseArrow * canvas.height / 50;
        sTextureManager.drawImage(ctx, sTextureManager.microscopeIntro[0], 0,0, canvas.width, canvas.height);
        sTextureManager.drawImage(ctx, sTextureManager.microscopeIntro[2], xMoon,-yMoon, canvas.width, canvas.height);
        sTextureManager.drawImage(ctx, sTextureManager.microscopeIntro[1], 0,0, canvas.width, canvas.height);
        sTextureManager.drawImage(ctx, sTextureManager.microscopeIntro[3], 0,yArrow, canvas.width, canvas.height);
    }
    else {
        sTextureManager.drawImage(ctx, sTextureManager.microscope[0], 0,0, canvas.width, canvas.height);

        for(var i = 0; i < this.objects.length; i++) {
            this.objects[i].draw(canvas);
        }

        sTextureManager.drawImage(ctx, sTextureManager.microscope[1], 0,0, canvas.width, canvas.height);
    }



};

StateDanceMove.prototype.isDone = function() {
    return this.time >= 15;
};