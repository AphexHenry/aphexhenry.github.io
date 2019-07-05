function TexturesManager() {
    this.textures = [];
    this.addTextureObject("dog", "png");
    this.addTextureObject("worm", "png");
    this.addTextureObject("worm2", "png");
    this.addTextureObject("bubble1", "png");
    this.addTextureObject("bubble2", "png");
    this.addTextureObject("oreille1", "png");
    this.addTextureObject("oreille2", "png");
    this.addTextureObject("oreille3", "png");
    this.addTextureObject("huitre1", "png");
    this.addTextureObject("huitre2", "png");
    this.addTextureObject("huitre3", "png");
    this.addTextureObject("moon", "png");
    this.addTextureBackground("prettyGuyBackground", ["blueBackground.jpg", "prettyGuyMiddle.png", "prettyGuyFront.png", "prettyGuyMiddleCloseEyes.png"]);
    this.addTextureBackground("fireworks", ["fireworksBackground.png", "fireworks1.png", "fireworks2.png", "fireworks3.png", "fireworksbigBack.png", "fireworksbigFront.png"]);
    this.addTextureBackground("fireworksXp", ["fireworkXp1.jpg", "fireworkXp2.jpg", "fireworkXp3.jpg", "fireworkXp4.jpg","fireworkXp5.jpg", "fireworkXp6.jpg", "fireworkXp7.jpg", "fireworkXp8.jpg", "fireworkXp9.jpg"]);
    this.addTextureBackground("frames", ["frameL.png"]);
    this.addTextureBackground("dogBackground", ["backgroundDog.jpg"]);
    this.addTextureBackground("microscope", ["microscopeBack.png", "microscopeFront.png"]);
    this.addTextureBackground("microscopeIntro", ["microscopePhase1Back.png", "microscopePhase1Front.png", "microscopePhase1Moon.png", "microscopePhase1Arrow.png"]);
}

TexturesManager.prototype.addTextureObject = function(name, extension) {
    var lImage = new Image();
    lImage.src = "./textures/" + name + "." + extension;
    this[name] = lImage;
    var lObj = {img:lImage};
    this.textures.push(lObj);
};

TexturesManager.prototype.addTextureBackground= function(name, arrayOfNames) {
    this[name] = [];
    for(var i = 0; i < arrayOfNames.length; i++) {
        var lImage = new Image();
        lImage.src = "./textures/backgrounds/" + arrayOfNames[i];
        this[name].push(lImage);
    }
};

TexturesManager.prototype.getRandomObject = function() {
    var lIndex = sTools.getRandomInt(this.textures.length);
    return this.textures[lIndex].img;
};

TexturesManager.prototype.drawImage = function(ctx, img, x, y, width, height, keepRatio) {
    if(keepRatio == undefined)
        keepRatio = false;

    if(keepRatio) {
        var lRatioImg = img.width / img.height;
        height = width / lRatioImg;
    }

    ctx.drawImage(img, x, y, width, height);
};

TexturesManager.prototype.drawImageRotated = function(ctx, img, x, y, width, height, angleInRadians) {
    var lSizeX = width;
    var lSizeY = height;

    // x = lTranslate + x;
    ctx.translate(x, y);
    ctx.rotate(angleInRadians);
    ctx.drawImage(img, -lSizeX / 2, -lSizeY / 2, lSizeX, lSizeY);
    ctx.rotate(-angleInRadians);
    ctx.translate(-x, -y);
};