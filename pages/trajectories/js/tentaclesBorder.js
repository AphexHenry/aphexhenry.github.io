TentacleBorder.prototype = new Tentacles();
TentacleBorder.prototype.constructor=TentacleBorder;
function TentacleBorder(){
    this.pointToFollow = {xPos:0, yPos:0, xSpeed:0, ySpeed:0};
    this.str = 1;
}

TentacleBorder.prototype.updateGlobal = function() {
    var date = new Date();
    if(!TentacleBorder.lastUpdate || (date - TentacleBorder.lastUpdate) > 100) {
        TentacleBorder.lastUpdate = new Date();
        TentacleBorder.updateCanvasPos();
    }
};

TentacleBorder.prototype.updateInherited = function(aTimeInterval) {
    aTimeInterval *= 2;
    var lNewHead = {};
    var movSpeed = (0.5 + this.randomSeed * 0.2) * 0.3;
    var that = this;

    var getPositionOnCanvasFromCoeff = function(aCoeff) {
        if(!TentacleBorder.closestCanvas) {
            var pos = {};
            pos.x = Math.cos(that.timer * movSpeed + that.randomSeed) * Math.sin(that.timer * 0.8 * movSpeed + that.randomSeed * 2);
            pos.y = Math.cos(that.timer * 0.5 * movSpeed + that.randomSeed) * Math.sin(that.timer * 0.7 * movSpeed);
            pos.x = (1 + 0.3 * pos.x) * that.canvas.width;
            pos.y = (0.5 + 1.1 * pos.y) * that.canvas.height;

            return pos;
        }
        var rectOrig = TentacleBorder.closestCanvas.getBoundingClientRect();

        var spaceX = rectOrig.width * 0.01;
        var spaceY = rectOrig.height * 0.01;
        var rect = {};
        rect.left = rectOrig.left - spaceX;
        rect.right = rectOrig.right + spaceX;
        rect.top = rectOrig.top - spaceY;
        rect.bottom = rectOrig.bottom + spaceY;
        rect.width = rectOrig.width + 2 * spaceX;
        rect.height = rectOrig.height + 2 * spaceY;
        var totalLength = rect.width * 2 + rect.height * 2;
        var distanceFromCoeff = aCoeff * totalLength;

        if($(TentacleBorder.closestCanvas).hasClass('circle')) {
            return {x:0.5 * (rect.right + rect.left + rect.width * Math.cos(aCoeff * Math.PI * 2)) , y:0.5 * (rect.top + rect.bottom + rect.width * Math.sin(aCoeff * Math.PI * 2))};
        }

        if(distanceFromCoeff < rect.width) {
            return {x:rect.left + distanceFromCoeff, y:rect.top};
        }

        distanceFromCoeff -= rect.width;
        if(distanceFromCoeff < rect.height) {
            return {x:rect.right, y:rect.top + distanceFromCoeff};
        }

        distanceFromCoeff -= rect.height;
        if(distanceFromCoeff < rect.width) {
            return {x:rect.right - distanceFromCoeff, y:rect.bottom};
        }

        distanceFromCoeff -= rect.width;
        if(distanceFromCoeff < rect.height) {
            return {x:rect.left, y:rect.bottom - distanceFromCoeff};
        }
    };

    var speed = (1 + 2.5 * this.randomSeed);
    speed *= $(TentacleBorder.closestCanvas).hasClass('circle') ?  0.1 : 0.08;
    lNewHead = getPositionOnCanvasFromCoeff((this.randomSeed + speed * this.timer) % 1);
    lNewHead.y += Tentacles.scroll;

    var distanceX = lNewHead.x - this.pointToFollow.xPos;
    var distanceY = lNewHead.y - this.pointToFollow.yPos;

    if(TentacleBorder.closestCanvas) {
        this.str += (24 - this.str) * aTimeInterval;
    }
    else {
        this.str += (4 - this.str) * 0.3;
    }
    var str = this.str * aTimeInterval;
    this.pointToFollow.xSpeed += str * distanceX;
    this.pointToFollow.ySpeed += str * distanceY;
    this.pointToFollow.xPos += this.pointToFollow.xSpeed * aTimeInterval;
    this.pointToFollow.yPos += this.pointToFollow.ySpeed * aTimeInterval;
    var friction = $(TentacleBorder.closestCanvas).hasClass('circle') ? 0.91 : 0.84;
    //var friction = 0.91;
    this.pointToFollow.ySpeed *= friction;
    this.pointToFollow.xSpeed *= friction;
    var speedLimit = that.canvas.width * 0.6;
    that.pointToFollow.xSpeed = Math.max(Math.min(that.pointToFollow.xSpeed, speedLimit), -speedLimit);
    that.pointToFollow.ySpeed = Math.max(Math.min(that.pointToFollow.ySpeed, speedLimit), -speedLimit);

    lNewHead.x = this.pointToFollow.xPos;
    lNewHead.y = this.pointToFollow.yPos;

    var distanceHead = this.getDistanceHead(lNewHead);
    if(distanceHead == null || distanceHead > 5) {
        if(this.lines.length > 120)
        {
            this.lines.pop();
        }
        this.lines.unshift(lNewHead);
    }
    else {
        this.lines[0] = lNewHead;
    }

    var sizeCanvas = 0.3 * this.canvas.width;
    var spaceCoeff = 2 * (Math.cos(this.randomSeed * 100) + 1) / sizeCanvas;
    var timeCoeff = 0.1 * (this.randomSeed * 9 + 7);
    var phase = this.randomSeed * 100;
    var modul = sizeCanvas * 0.01;

    for(var i in this.lines) {
        this.lines[i].xDraw = this.lines[i].x + (1 + i / this.lines.length) * Math.cos(phase + this.timer * timeCoeff + this.lines[i].y * spaceCoeff) * modul;
        this.lines[i].yDraw = this.lines[i].y - Tentacles.scroll + (1 + i / this.lines.length) * Math.cos(phase * 1.3 + this.timer * timeCoeff + this.lines[i].x * spaceCoeff) * modul;
    }
};

TentacleBorder.updateCanvasPos = function() {
    var canvasToTrack = $('.tentacleTrackCanvas');
    var closestDist;
    var closestCanvas;
    if(!canvasToTrack.length) {
        return;
    }

    for(var i = 0; i < canvasToTrack.length; i++) {
        var canvas = canvasToTrack[i];
        var rect =  canvas.getBoundingClientRect();
        var posY = (rect.top + rect.bottom) * 0.5;
        var distance = Math.abs(posY - window.innerHeight * 0.5);
        if(!closestDist || (distance < closestDist)) {
            closestDist = distance;
            closestCanvas = canvas;
        }
    }

    if(closestDist > window.innerHeight * 0.3) {
        TentacleBorder.closestCanvas = null;
    }
    else if(closestCanvas != this.closestCanvas) {
        TentacleBorder.closestCanvas = closestCanvas;
    }
};