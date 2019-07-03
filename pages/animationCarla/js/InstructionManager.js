function InstructionManager(aScene)
{
    this.names = [this.makeName("durinère", true), this.makeName("suticule", true), this.makeName("païson", false), this.makeName("giron", false)];
    this.verbs = ["mettre dans la boîte", "suturer", "couper", "murmurer doucement aux oreilles de", "court cuicuiter", "nasauter", "caliner"];
}

InstructionManager.prototype.makeName = function(name, isFeminin) {
    return {name:name, isFeminin:isFeminin, plural:name + "s"};
};

InstructionManager.prototype.getRandomSentence = function(aDelta) {
    var lNameCount = 1 + this.getRandomInt(3);
    var lIndexVerb = this.getRandomInt(this.verbs.length);
    var lPhrase = this.verbs[lIndexVerb] + " ";
    for(var i = 0;i < lNameCount; i++) {
        lPhrase += this.getRandomNameWithArticle();
        if(i < lNameCount - 2 && lNameCount > 2) {
            lPhrase += ", ";
        }
        else if(i == lNameCount - 2) {
            lPhrase += " et ";
        }
    }
    return lPhrase;
};

InstructionManager.prototype.getRandomNameWithArticle = function() {
    var indexName = this.getRandomInt(this.names.length);
    var quantity = 1 + this.getRandomInt(6);
    var nameAccorde = quantity <= 1 ? this.names[indexName].name : this.names[indexName].plural;

    var lArticle;
    if(quantity <= 1) {
        lArticle = this.names[indexName].isFeminin ? "une" : "un";
    }
    else {

        switch (quantity) {
            case 2:
                lArticle = "deux";
                break;
            case 3:
                lArticle = "trois";
                break;
            case 4:
                lArticle = "quatre";
                break;
            case 5:
                lArticle = "cinq";
                break;
            case 6:
                lArticle = "six";
                break;
            default:
                lArticle = "" + quantity;
        }
    }
    return lArticle + " " + nameAccorde;
};

InstructionManager.prototype.getRandomInt = function(aMax) {
    return Math.floor(Math.random() * Math.floor(aMax));
};