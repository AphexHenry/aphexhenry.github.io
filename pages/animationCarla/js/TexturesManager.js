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

}

TexturesManager.prototype.addTextureObject = function(name, extension) {
    var lImage = new Image();
    lImage.src = "./textures/" + name + "." + extension;
    this[name] = lImage;
    var lObj = {img:lImage};
    this.textures.push(lObj);
};

TexturesManager.prototype.getRandomObject = function() {
    var lIndex = sTools.getRandomInt(this.textures.length);
    return this.textures[lIndex].img;
};