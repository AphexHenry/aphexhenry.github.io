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
    this.init();
    this.initMove();
}

Fern.prototype.init = function(aNumPt) {
    this.posX = 0;//Math.random() * window.innerWidth;
    this.params.b2 = Math.random() * 0.15 + 0.03;
    this.params.f2 = 0;//Math.random() + 1;
    this.params.a3 = Math.random() * 0.2 + 0.1;
    this.params.d3 = Math.random() * 0.2 + 0.12;
    var that = this;
    var swith = function() {

        that.params.f2 = 0.05 + Math.random() * 1.8;
        that.params.b2 = (Math.random() - 0.5) * 0.3;
        that.params.b2 = Math.max(Math.min(that.params.b2, 0.16), -0.05);
        //that.posX += window.innerWidth * 0.075;
        that.posX = Math.random() * window.innerWidth;

        if(that.posX >= window.innerWidth)
        {
            that.init();
        }
        else {
            setTimeout(swith, Math.random() * 2000 + that.params.f2 * 4000);
        }
    };


    swith();
};

Fern.prototype.initMove = function() {
    var that = this;

    var move = function() {
        that.params.b2 += (Math.random() - 0.5) * 0.2;
        that.params.b2 = Math.max(Math.min(that.params.b2, 0.16), -0.05);
        var timeoutTime = 300;
        if(Math.random() < 0.1) {
            timeoutTime = 3000 + Math.random() * 1000;
            var lColor = new THREE.Color(0x99ff99).multiplyScalar(Math.random() * 0.5 + 0.5);
            var hex = lColor.getHexString();
            that.color = '#' + hex;
        }
        else {
            var lColor = new THREE.Color(0x99ff99).multiplyScalar(Math.random() * 0.5 + 0.5);
            lColor.setHSL( Math.random(), 1,0.5 )

            var hex = lColor.getHexString();
            that.color = '#' + hex;
        }
        setTimeout(move, timeoutTime);
    };
    move();
}

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
}

Fern.prototype.drawNewPoint = function(aCanvas) {
    var newPoint = this.getNewPoint().clone();
    newPoint.multiplyScalar(50);
    newPoint.x += this.posX;
    newPoint.y = window.innerHeight - newPoint.y + 50;
    var ctx = aCanvas.getContext("2d");
    ctx.globalAlpha = 0.25;
    ctx.fillStyle = this.color;
    ctx.fillRect(newPoint.x,newPoint.y,1,1);
};


