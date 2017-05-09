/**
 * Created by baptistebohelay on 17/01/17.
 */
"use strict";
function Fern()
{
    this.params = {
        p1: 0.01,
        a2: 0.85,
        b2: 0.04,
        c2:-0.04,
        d2: 0.85,
        f2:1.60,
        p2:0.85,
        a3: 0.20,
        b3: -0.26,
        c3:-0.23,
        d3: 0.22,
        f3:1.60,
        p3:0.07
    };


    this.lastPt = new THREE.Vector2();
    this.timeOutCoeff = 0.7;
    this.sizeCoeff = 1.;
    this.time = 0;
    this.eraseCounter = 0;
    this.opacity = 0.25;
    this.init();
    this.initMove();

    this.img     = new Image();
    this.img.src     = 'textures/mask2.png';

    this.upsideDown = false;

}

Fern.prototype.init = function(aNumPt) {
    this.posX = 0;//Math.random() * window.innerWidth;
    this.params.b2 = Math.random() * 0.15 + 0.03;
    this.params.f2 = 0;//Math.random() + 1;
    this.params.a3 = Math.random() * 0.2 + 0.1;
    this.params.d3 = Math.random() * 0.2 + 0.12;
    var that = this;
    var swith = function() {

        that.time++;
        that.upsideDown = Math.random() < 0.7;
        var lRand = Math.random();
        that.params.f2 = 0.03 + lRand * lRand * 1.8;
        that.params.b2 = (Math.random() - 0.5) * 0.3;
        that.params.b2 = Math.max(Math.min(that.params.b2, 0.16), -0.05);
        //that.posX += window.innerWidth * 0.075;
        that.posX = Math.random() * window.innerWidth;
        var divider = 0.5 * (0.05 + that.params.f2) + 0.5 * Math.sqrt(0.02 + that.params.f2);
        that.sizeCoeff = (0.3 + 0.7 * Math.random()) * 100 / divider;
        if(that.posX >= window.innerWidth)
        {
            that.init();
        }
        else {
            setTimeout(swith, (Math.random() * 3000 + that.params.f2 * 4000) * that.timeOutCoeff);
        }
    };

    swith();
};

Fern.prototype.initMove = function() {
    var that = this;

    var move = function() {
        that.params.b2 += (Math.random() - 0.5) * 0.2;
        that.params.b2 = Math.max(Math.min(that.params.b2, 0.16), -0.05);
        var timeoutTime = 0;
        if(Math.random() < 0.1) {
            timeoutTime = 3000 + Math.random() * 3000;
            that.color= new THREE.Color(0x39ff39).multiplyScalar(Math.random() * 0.25 + 0.75);
            that.opacity = 0.2 + Math.random() * 0.25;
        }
        else {
            that.color = new THREE.Color().setHSL( Math.random() * 0.65, 1, 0.5 );
            timeoutTime = 300 + that.params.f2 * 300;
            that.opacity = 0.15 + Math.random() * 0.15;
        }
        if(that.time > 40)
        {
            that.color.multiplyScalar(Math.random() * 0.1);
            that.params.f2 = Math.random() * 0.5 + 1.2;
            if(that.time > 48)
            {
                that.time = 0;
            }
        }
        setTimeout(move, timeoutTime * that.timeOutCoeff);
    };
    move();
};

Fern.prototype.getNewPoint = function() {
    var lRand = Math.random();
    if(lRand < this.params.p1) {
        this.lastPt.x = 0;
        this.lastPt.y = 0.16 * this.lastPt.y;
    }
    else if(lRand < this.params.p2 + this.params.p1) {
        this.lastPt.x = this.params.a2 * this.lastPt.x + this.params.b2 * this.lastPt.y;
        this.lastPt.y = this.params.c2 * this.lastPt.x + this.params.d2 * this.lastPt.y + this.params.f2;
    }
    else if(lRand < this.params.p2 + this.params.p1 + this.params.p3) {
        this.lastPt.x = this.params.a3 * this.lastPt.x + this.params.b3 * this.lastPt.y;
        this.lastPt.y = this.params.c3 * this.lastPt.x + this.params.d3 * this.lastPt.y + this.params.f3;
    }
    else {
        this.lastPt.x = -0.15 * this.lastPt.x + 0.28 * this.lastPt.y;
        this.lastPt.y = 0.26 * this.lastPt.x + 0.24 * this.lastPt.y + 0.44;
    }
    return this.lastPt;
};

Fern.prototype.drawNewPoint = function(aCanvas) {
    var newPoint = this.getNewPoint().clone();
    newPoint.multiplyScalar(this.sizeCoeff);
    newPoint.x += this.posX;
    if(this.upsideDown) {
        newPoint.y = window.innerHeight - newPoint.y + 100;
    }
    else {
        newPoint.y = newPoint.y - 100;
    }
    var ctx = aCanvas.getContext("2d");
    ctx.globalAlpha = 0.35;//this.opacity;

    var hex = this.color.getHexString();
    var lColor = '#' + hex;
    ctx.fillStyle = lColor;
    ctx.fillRect(newPoint.x,newPoint.y,1,1);
};

Fern.prototype.drawImg = function(aCanvas) {
    this.eraseCounter++;
    if(this.eraseCounter % 90 == 0) {
        var ctx = aCanvas.getContext("2d");
        ctx.globalAlpha = 0.01;//this.opacity;
        ctx.drawImage(this.img, 0, 0, aCanvas.width, aCanvas.height);
    }
};

