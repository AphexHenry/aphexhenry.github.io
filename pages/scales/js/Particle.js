/**
 * Created by baptistebohelay on 17/01/17.
 */
"use strict";
function Particle(standardMaterial)
{
    var geometry = new THREE.PlaneGeometry( 10, 10, 5, 5 );
    this.mesh = new THREE.Mesh( geometry, standardMaterial );
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.position.set(Math.random() * 100, Math.random() * 100, Math.random() * 100);
    this.mesh.rotation.set(Math.random() * 100, Math.random() * 100, Math.random() * 100);
}

Particle.prototype.init = function(aOptions) {

};

Particle.updateGlobal = function(){}

Particle.prototype.getColorWithOpacity = function(aOpacity) {

};

Particle.prototype.update = function(aDelta) {

};