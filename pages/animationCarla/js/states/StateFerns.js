function StateFerns() {

}

StateFerns.prototype.update = function() {
    var endTime = new Date();
    var timeDiff = (endTime - startTime) / 1000;
    var lSwitchFaster = timeDiff > 60 * 1;

    for(var i = 0; i < 200; i++) {

        if(Math.random() < params.probabilitySwitchTriangle) {
            var lPt = sTriangles[sIndexTriangle].lastPt;
            sIndexTriangle++;
            sIndexTriangle = sIndexTriangle % sTriangles.length;
            sTriangles[sIndexTriangle].lastPt = lPt;
        }
        if(!lSwitchFaster)
            sTriangles[sIndexTriangle].drawNewPoint(sCanvasFractals);
    }

    for(var i = 0; i < 200; i++) {
        sFerns[0].drawNewPoint(sCanvasFerns);
        if(lSwitchFaster)
            sFerns[1].drawNewPoint(sCanvasFerns);
    }
    sFerns[0].drawImg(sCanvasFerns);
};