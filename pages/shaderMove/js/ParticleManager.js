/**
 * Created by baptistebohelay on 17/01/17.
 */
"use strict";
function ParticleManager(aScene)
{
    //this.material = new THREE.MeshBasicMaterial( {
    //    color: 0xb7ff00,
    //    wireframe: true
    //} );

    var vertexShader = document.getElementById( 'vertexShader' ).textContent;
    var fragmentShader = document.getElementById( 'fragmentShader' ).textContent;

    this.material = new THREE.ShaderMaterial( {
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    } );

    // create a sphere and assign the material
    this.mesh = new THREE.Mesh(
        new THREE.IcosahedronGeometry( 20, 4 ),
        this.material
    );

    // magic here
    this.mesh.customDepthMaterial = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: this.material.uniforms
    });

    this.mesh.castShadow = true;
    //this.mesh.receiveShadow = true;

    this.group = new THREE.Group();
    this.group.add(this.mesh);

    this.time = 0;

    aScene.add(this.group );

}

ParticleManager.prototype.update = function(aDelta) {
    this.group.rotation.y += 0.001;
    this.group.position.x = -50 + 10 * Math.cos(this.time * 0.1);
    this.time += aDelta;
    //for(var i = 0; i < this.particles.length; i++)
    //{
    //    this.particles[i].update(aDelta);
    //}
};