/**
 * Created by baptistebohelay on 17/01/17.
 */
"use strict";
function ParticleCube(aPositionX)
{
    var lMaterial = new THREE.MeshStandardMaterial( {
        roughnessMap: null,
        color: 0x000000,
        metalness: 0.0,
        roughness: 1.
//			side: THREE.BackSide
    } );

    this.positionZ = -280;


    var sizeBox = 50;
    var geometry = new THREE.BoxBufferGeometry( sizeBox * 2, sizeBox * 3, sizeBox );
    this.mesh = new THREE.Mesh( geometry, lMaterial);
    this.mesh.position.x = this.positionZ;
    this.mesh.position.y = 0;
    this.mesh.position.z = aPositionX;
    //this.mesh.rotation.x = - Math.PI * 0.25;
//		mesh.rotation.y = - Math.PI * 0.25;
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;
    scene.add( this.mesh );


}

ParticleCube.prototype.getMesh = function(){
    return this.mesh;
};

ParticleCube.prototype.init = function(aOptions) {

};

ParticleCube.prototype.update = function(aDelta, aAmplitudes) {

    var lTarget = -280 + aAmplitudes * 180;
    if(lTarget > this.positionZ) {
        this.positionZ += (lTarget - this.positionZ) * aDelta * 5;
    }
    else {
        this.positionZ += (lTarget - this.positionZ) * aDelta;
    }
    this.mesh.position.x = this.positionZ;
};