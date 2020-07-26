function Animation(frames, intervalMs, image) {
    this.frames = frames;
    this.indexFrame = 0;
    this.img = image;
    this.intervalMs = intervalMs;
    this.scale = 5;
    this.instanciateCanvas();
}

Animation.prototype.setScale = function(scale) {
    this.scale = scale;
    this.img.style.width = this.scale + "%";
}

Animation.prototype.instanciateCanvas = function() {
    this.img = document.createElement("img");
    var src = document.getElementById("myCanvas");
    this.img.style.positioinstanciateCanvasn = "absolute";
    this.img.style.width = this.scale + "%";
    // this.img.className = "item";
    src.appendChild(this.img);
}

Animation.prototype.setPosition = function(x, y){
    this.img.style.left = x + "%";
    this.img.style.top = y + "%";
    this.img.style.zIndex = Math.floor(parseFloat(y) + parseFloat(this.scale));
}

Animation.prototype.start = function () {
    var that = this;
    this.intervalId = setInterval(function () {
        that.tick();
    }, this.intervalMs)
}

Animation.prototype.stop = function () {
    var that = this;
    if(this.intervalId) {
        clearInterval(this.intervalId);
    }
}

Animation.prototype.tick = function () {
    this.indexFrame++;
    this.indexFrame = this.indexFrame % this.frames.length;
    var framePath = this.frames[this.indexFrame];
    this.img.src = "img/animated/" + framePath;
}