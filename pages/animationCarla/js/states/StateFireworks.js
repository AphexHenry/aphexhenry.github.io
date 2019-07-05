function StateFireworks(aArrayObjectsCount) {
    this.state = 0;
    this.stateTimer = 1;
    this.frameTimer = 0;
    this.time = 0;
    this.staticPicId = 0;
};

StateFireworks.prototype.update = function(delta) {
    this.time += delta;
    this.stateTimer -= delta;
    this.frameTimer -= delta;
    if(this.stateTimer <= 0) {
        this.state++;
        var lNumState = 6;
        this.state = this.state % lNumState;
        if(this.state == lNumState - 1) {
            this.stateTimer = 3;

        }
        else if(this.state == lNumState - 2) {
            this.stateTimer = 1;
            this.staticPicId = sTools.getRandomInt(9);

        }
        else {
            this.stateTimer = 0.5 + Math.random();

        }
    }


};

StateFireworks.prototype.draw = function(canvas) {
    var ctx = canvas.getContext("2d");
    switch (this.state) {
        case 0:
            sTextureManager.drawImage(ctx, sTextureManager.fireworks[0], 0,0, canvas.width, canvas.height); //back
            break;
        case 1:
            sTextureManager.drawImage(ctx, sTextureManager.fireworks[0], 0,0, canvas.width, canvas.height); //back
            sTextureManager.drawImage(ctx, sTextureManager.fireworks[1], 0,0, canvas.width, canvas.height); // instruction
            break;
        case 2:
            sTextureManager.drawImage(ctx, sTextureManager.fireworks[0], 0,0, canvas.width, canvas.height); //back
            sTextureManager.drawImage(ctx, sTextureManager.fireworks[1], 0,0, canvas.width, canvas.height); // instruction
            sTextureManager.drawImage(ctx, sTextureManager.fireworks[2], 0,0, canvas.width, canvas.height); // instruction
            break;
        case 3:
            sTextureManager.drawImage(ctx, sTextureManager.fireworks[0], 0,0, canvas.width, canvas.height); //back
            sTextureManager.drawImage(ctx, sTextureManager.fireworks[1], 0,0, canvas.width, canvas.height); // instruction
            sTextureManager.drawImage(ctx, sTextureManager.fireworks[2], 0,0, canvas.width, canvas.height); // instruction
            sTextureManager.drawImage(ctx, sTextureManager.fireworks[3], 0,0, canvas.width, canvas.height); // instruction
            break;
        case 4:
            if(this.frameTimer <= 0) {
                ctx.fillStyle = "rgba(0,0,0,1)";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                // ctx.globalCompositeOperation = "lighter";
                var lFirework = sTools.getRandomInt(9);
                var x = 0;
                var y = 0;
                var lAngle = Math.random() * 3;

                sTextureManager.drawImage(ctx, sTextureManager.fireworksXp[this.staticPicId], x, y, canvas.width, canvas.height, true);
                ctx.globalCompositeOperation = "source-over";
            }
            break;
        case 5:
            if(this.frameTimer <= 0) {
                this.frameTimer = (0.05 + Math.random() * 0.1) * (this.stateTimer) / 3;
                var r =
                ctx.fillStyle = sTools.getRandomColor();
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                // ctx.globalCompositeOperation = "lighter";
                var lFirework = sTools.getRandomInt(9);
                // sTextureManager.drawImage(ctx, sTextureManager.fireworksXp[lFirework], 0, 0, canvas.width, canvas.height); // instruction
                var x = (0.2 + 0.8 * Math.random()) * canvas.width;
                var y = (0.2 + 0.8 * Math.random()) * canvas.height;
                var lAngle = Math.random() * 3;
                sTextureManager.drawImageRotated(ctx, sTextureManager.fireworksXp[lFirework], x, y, canvas.width, canvas.height, lAngle)
            }
    }

};

StateFireworks.prototype.isDone = function() {
    return this.time >= 15;
};