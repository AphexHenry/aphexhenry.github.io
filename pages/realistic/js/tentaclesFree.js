TentacleFree.prototype = new Tentacles();
TentacleFree.prototype.constructor=TentacleFree;
function TentacleFree(){}

TentacleFree.prototype.init = function(options) {
    Tentacles.prototype.init.call(this, options);
    for(var i = 0; i < 200; i++) {
        this.update(0.03, true);
    }
};

TentacleFree.prototype.updateInherited = function() {
    var lNewHead = {};
    var movSpeed = (0.5 + this.randomSeed * 0.2) * 0.3;
    lNewHead.x = Math.cos(this.timer * movSpeed + this.randomSeed) * Math.sin(this.timer * 0.8 * movSpeed + this.randomSeed * 2);
    lNewHead.y = Math.cos(this.timer * 0.5 * movSpeed + this.randomSeed) * Math.sin(this.timer * 0.7 * movSpeed);
    lNewHead.x = (0.5 + 1.1 * lNewHead.x) * this.canvas.width;
    lNewHead.y = (0.5 + 1.1 * lNewHead.y) * this.canvas.height;

    var distanceHead = this.getDistanceHead(lNewHead);
    if(distanceHead == null || distanceHead > 70) {
        if(this.lines.length > 200)
        {
            this.lines.pop();
        }
        this.lines.unshift(lNewHead);
    }
    else {
        this.lines[0] = lNewHead;
    }

    //for(var i = this.lines.length - 1; i > Math.max(0, (this.lines.length - 10)); i--) {
    //  this.lines[i].x += 0.05 * (this.lines[i - 1].x - this.lines[i].x);
    //  this.lines[i].y += 0.05 * (this.lines[i - 1].y - this.lines[i].y);
    //}

    var gapRight = 300;
    var gapTop = 0.4 * this.canvas.height;
    var spaceCoeff = 10 / this.canvas.width;

    for(var i in this.lines) {
        this.lines[i].xDraw = gapRight + this.lines[i].x + (i / this.lines.length) * Math.cos(this.timer * 0.4 + this.lines[i].y * spaceCoeff) * this.canvas.width * 0.1;
        this.lines[i].yDraw = gapTop + this.lines[i].y + (i / this.lines.length) * Math.cos(this.timer * 0.9 + this.lines[i].x * spaceCoeff) * this.canvas.width * 0.1;
    }
};
