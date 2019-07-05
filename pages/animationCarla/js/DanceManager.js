"use strict";
function DanceManager()
{
    this.isBeat = false;
}

DanceManager.prototype.setBeat = function() {
    this.isBeat = true;
};

DanceManager.prototype.reset = function() {
    this.isBeat = false;
};

