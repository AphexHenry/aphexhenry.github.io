function InstructionManager(aScene)
{
    this.names = [
        this.makeName("durinère", true),
        this.makeName("puticule", true),
        this.makeName("païson", false),
        this.makeName("gironette", true),
        this.makeName("bétanette", true),
        this.makeName("sucruteuse", true),
        this.makeName("ventrenet", false)
    ];
    this.verbs = ["mettre dans la pitouille", "suruter", "gueulater", "murmurer aux oreilles de", "court cuicuiter", "nasauter", "bouldinguer", "emensurer", "canuler"];
    this.numbers = [];
}

InstructionManager.prototype.makeName = function(name, isFeminin) {
    return {name:name, isFeminin:isFeminin, plural:name + "s"};
};

InstructionManager.prototype.getRandomSentence = function(aDelta) {
    var lNameCount = 1 + sTools.getRandomInt(3);
    var lIndexVerb = sTools.getRandomInt(this.verbs.length);
    var lPhrase = this.verbs[lIndexVerb] + " ";
    this.numbers = [];
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
    var indexName = sTools.getRandomInt(this.names.length);
    var quantity = 1 + sTools.getRandomInt(6);
    // we store those numbers.
    this.numbers.push(quantity);
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

InstructionManager.prototype.getNumbers = function() {
    return this.numbers;
};