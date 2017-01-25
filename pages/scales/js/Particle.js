/**
 * Created by baptistebohelay on 17/01/17.
 */
"use strict";
function Particle(standardMaterial, aGeometry)
{
    var geometry = aGeometry;
    this.mesh = new THREE.Mesh( geometry, standardMaterial );
    //this.mesh.scale.set(0.1, 0.1, 0.1);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    //this.mesh.position.set(Math.random() * 100, Math.random() * 100, Math.random() * 100);
    this.mesh.rotation.set(Math.random() * 100, Math.random() * 100, Math.random() * 100);
    this.time = 0;
    this.positionInit = null;
    this.rotationInit = null;
    this.normHeight = 0;
}

Particle.prototype.setPosition = function(aPosition, normHeight){
    this.positionInit = aPosition.clone();
    this.normHeight = normHeight;
    this.mesh.position.set(aPosition.x, aPosition.y, aPosition.z);
};

Particle.prototype.setScale = function(aScale){
  this.mesh.scale.set(aScale, aScale, aScale);
};

Particle.prototype.setRotation = function(aPosition){
    this.mesh.rotation.set(aPosition.x, aPosition.y, aPosition.z);
};

Particle.prototype.lookAt = function(aPosition, rotateX){
    this.mesh.lookAt(aPosition);
    this.mesh.rotateY(Math.PI);
    this.mesh.rotateX(rotateX);
    this.rotationInit = this.mesh.rotation.clone();
};

Particle.prototype.init = function(aOptions) {

};


Particle.prototype.update = function(aDelta) {
    this.time += aDelta;
    //if(this.mesh.position.y > -10) {
        this.mesh.rotation.set(this.rotationInit.x, this.rotationInit.y, this.rotationInit.z);
        var lAngle = (0.5 + Math.cos(-this.time + this.mesh.position.y * 0.5));
        this.mesh.rotateX(this.mesh.position.y * 0.07 * lAngle);
        var lRadiusChange = Math.cos(this.time + this.mesh.position.y * 0.1);
        this.mesh.position.set(this.positionInit.x * lRadiusChange, this.positionInit.y, this.positionInit.z * lRadiusChange);
    //}
};