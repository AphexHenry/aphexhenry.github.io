"use strict";
function StepManager()
{
    this.steps = [];
    this.time = 0;
    this.stepCountTotal = 0;
    this.textInBetweenScreen = new TextInBetween();
}

StepManager.prototype.init = function(aNumPt) {

};

StepManager.prototype.update = function(aDelta) {
    this.time -= aDelta;
    if(this.time <= 0) {
        this.stepCountTotal++;

    }
};

StepManager.prototype.draw= function(aCanvas) {
    this.textInBetweenScreen.draw(aCanvas);
};