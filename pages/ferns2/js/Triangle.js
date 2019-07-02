/**
 * Created by baptistebohelay on 17/01/17.
 */
"use strict";
function Triangle()
{
    this.pts = [];
    this.lastPt = new THREE.Vector2(Math.random(), Math.random());
    this.init();
    function getRandomColor() {
        var colors = ['#DEB887', '#DC143C', '#FF8C00', '#00BFFF', '	#FFD700', '#F08080', '#FF00FF', '#C71585', '#FFE4B5', '	#00FF7F']

        return colors[Math.floor(Math.random() * colors.length)];
    }

    this.color = getRandomColor();
}

Triangle.prototype.init = function(aNumPt) {
    this.pts = [];
    aNumPt = aNumPt ? aNumPt : 3;
    for(var i = 0; i < aNumPt; i++)
    {
        this.pts.push(new THREE.Vector2(Math.random() * window.innerWidth, Math.random() * window.innerHeight));
    }
};

Triangle.prototype.drawTriangle = function(aCanvas) {
    for(var i = 0; i < this.pts.length; i++) {

        var ctx = aCanvas.getContext("2d");

        ctx.beginPath();
        var radius = 5;
        ctx.arc(this.pts[i].x,this.pts[i].y, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#003300';
        ctx.stroke();
    }
};

Triangle.prototype.drawNewPoint = function(aCanvas) {
    var newPoint = getNewPoint().clone();
    newPoint.multiplyScalar(50);
    newPoint.x += window.innerWidth * 0.5;
    newPoint.y = window.innerHeight - newPoint.y;
    var ctx = sCanvas.getContext("2d");
    ctx.globalAlpha = 0.25;
    ctx.fillStyle = "#99FF99";
    ctx.fillRect(newPoint.x,newPoint.y,1,1);
};

Triangle.prototype.getPtTouched = function(aPos) {
    for(var i = 0; i < this.pts.length; i++) {
        var lPtScreen = this.pts[i];
        if(aPos.distanceTo(lPtScreen) < 10) {
            return this.pts[i];
        }
    }
}

