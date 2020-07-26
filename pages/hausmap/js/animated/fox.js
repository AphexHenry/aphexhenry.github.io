function fox() {
    var lFramesSleeping = ["fox/sleep1.png", "fox/sleep2.png"];
    var image = $("#fox")[0];
    this.animationSleeping = new Animation(lFramesSleeping, 2000);
    this.animationSleeping.setScale(6);
    this.animationSleeping.start();
    var that = this;
    this.updateInterval = 60;
    setInterval(function (){
        that.update();
    }, this.updateInterval);
    that.update();
}

fox.prototype.update = function(interval) {
    this.animationSleeping.setPosition(40, 70);
}