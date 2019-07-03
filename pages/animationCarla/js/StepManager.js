"use strict";
function StepManager()
{
    this.steps = [];
    this.time = 0;
    this.stepCountTotal = 0;
    this.textInBetweenScreen = new TextInBetween();
    this.instructionManager = new InstructionManager();
    this.timeLast = new Date();
}

StepManager.prototype.init = function(aNumPt) {

};

StepManager.prototype.update = function() {
    var timeNow = new Date();
    var timeElasped = timeNow - this.timeLast;
    this.timeLast = timeNow;
    this.time -= timeElasped;
    if(this.time <= 0) {
        this.stepCountTotal++;
        this.time = 5000;
        this.textInBetweenScreen.setText(this.instructionManager.getRandomSentence());
        this.textInBetweenScreen.setIndex(this.stepCountTotal);
    }
};

StepManager.prototype.draw= function(aCanvas) {
    this.textInBetweenScreen.draw(aCanvas);
};