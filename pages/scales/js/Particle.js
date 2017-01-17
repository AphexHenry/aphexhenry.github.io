/**
 * Created by baptistebohelay on 17/01/17.
 */
"use strict";
function Particle(standardMaterial)
{
    var geometry = new THREE.PlaneGeometry( 10, 10, 15, 15 );
    this.mesh = new THREE.Mesh( geometry, standardMaterial );
    //this.mesh.scale.set(0.1, 0.1, 0.1);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    //this.mesh.position.set(Math.random() * 100, Math.random() * 100, Math.random() * 100);
    this.mesh.rotation.set(Math.random() * 100, Math.random() * 100, Math.random() * 100);
}

Particle.prototype.setPosition = function(aPosition){
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
};


Particle.prototype.init = function(aOptions) {

};

Particle.updateGlobal = function(){}

Particle.prototype.update = function(aDelta) {

};