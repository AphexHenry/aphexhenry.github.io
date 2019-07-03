"use strict";
function StepManager()
{
    this.steps = [];
    this.time = 0;
    this.stepCountTotal = 0;
    this.textInBetweenScreen = new TextInBetween();
    this.instructionManager = new InstructionManager();
    this.timeLast = new Date();
    this.States = {STATE_INIT_ANIMATION:0, STATE_RUN_ANIMATION:1, STATE_INIT_INSTRUCTIONS:2, STATE_RUN_INSTRUCTIONS:3};
    this.state = this.States.STATE_INIT_INSTRUCTIONS;
}

StepManager.prototype.init = function(aNumPt) {

};

StepManager.prototype.update = function() {
    var timeNow = new Date();
    var timeElasped = timeNow - this.timeLast;
    this.timeLast = timeNow;
    this.time -= timeElasped;
    timeElasped = timeElasped / 1000;

    switch (this.state) {
        case this.States.STATE_INIT_INSTRUCTIONS:
            this.stepCountTotal++;
            this.time = 1000; // duration instruction.
            this.textInBetweenScreen.setText(this.instructionManager.getRandomSentence());
            this.textInBetweenScreen.setIndex(this.stepCountTotal);
            this.state = this.States.STATE_RUN_INSTRUCTIONS;
            $("#backgroundInstruction")[0].style.visibility = "visible";
            break;
        case this.States.STATE_RUN_INSTRUCTIONS:
            if(this.time <= 0) {
                this.state = this.States.STATE_INIT_ANIMATION;
            }
            break;
        case this.States.STATE_INIT_ANIMATION:
            $("#backgroundInstruction")[0].style.visibility = "hidden";
            this.currentState = new StateMoveAround(this.instructionManager.getNumbers());
            this.state = this.States.STATE_RUN_ANIMATION;
            this.time = 20000; // duration instruction.
            break;
        case this.States.STATE_RUN_ANIMATION:
            this.currentState .update(timeElasped);
            if(this.time <= 0) {
                this.state = this.States.STATE_INIT_INSTRUCTIONS;
            }
            break;
    }


};

StepManager.prototype.draw= function(canvas) {
    switch (this.state) {
        case this.States.STATE_INIT_ANIMATION:
            var lCtx = canvas.getContext("2d");
            lCtx.clearRect(0, 0, canvas.width, canvas.height);

            break;
        case this.States.STATE_RUN_ANIMATION:
            this.currentState.draw(canvas);
            break;
    }
};