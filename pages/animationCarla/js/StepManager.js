"use strict";
function StepManager()
{
    this.steps = [];
    this.time = 0;
    this.stepCountTotal = 0;
    this.textInBetweenScreen = new TextInBetween();
    this.instructionManager = new InstructionManager();
    this.timeLast = new Date();
    this.state = 0;
    this.States = {STATE_INIT_ANIMATION:0, STATE_RUN_ANNIMATION:1, STATE_INIT_INSTRUCTIONS:2, STATE_RUN_INSTRUCTIONS:3};
}

StepManager.prototype.init = function(aNumPt) {

};

StepManager.prototype.update = function() {
    var timeNow = new Date();
    var timeElasped = timeNow - this.timeLast;
    this.timeLast = timeNow;
    this.time -= timeElasped;

    switch (this.state) {
        case this.States.STATE_INIT_INSTRUCTIONS:
            this.currentState = new StateMoveAround(this.instructionManager.getNumbers());
            break;
        case this.States.STATE_RUN_INSTRUCTIONS:
            if(this.time <= 0) {
                this.stepCountTotal++;
                this.time = 5000; // duration instruction.
                this.textInBetweenScreen.setText(this.instructionManager.getRandomSentence());
                this.textInBetweenScreen.setIndex(this.stepCountTotal);
                this.state = this.States.STATE_INIT_ANIMATION;
            }
            break;
    }


};

StepManager.prototype.draw= function(aCanvas) {
    this.textInBetweenScreen.draw(aCanvas);
};