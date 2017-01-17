/**
 * Created by baptistebohelay on 17/01/17.
 */
"use strict";
function ParticleManager(aScene)
{
    this.particles = [];

    standardMaterial = new THREE.MeshStandardMaterial( {
        bumpScale: - 0.05,
        color: 0xffffff,
        metalness: 0.9,
        roughness: 0.8,
        shading: THREE.SmoothShading,
        premultipliedAlpha: true,
        transparent: true
    } );

    var textureLoader = new THREE.TextureLoader();
    textureLoader.load( "textures/brick_diffuse.jpg", function( map ) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set( 9, 0.5 );
        standardMaterial.map = map;
        standardMaterial.needsUpdate = true;
    } );
    textureLoader.load( "textures/brick_bump.jpg", function( map ) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set( 9, 0.5 );
        standardMaterial.bumpMap = map;
        standardMaterial.needsUpdate = true;
    } );
    textureLoader.load( "textures/brick_roughness.jpg", function( map ) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set( 9, 0.5 );
        standardMaterial.roughnessMap = map;
        standardMaterial.needsUpdate = true;
    } );

    this.group = new THREE.Group();

    for(var i = 0; i < 300; i++)
    {
        var particle = new Particle(standardMaterial);
        this.particles.push(particle);
        this.group.add( particle.mesh );
    }

    aScene.add(this.group );
}

ParticleManager.prototype.update = function(aDelta) {
    for(var i = 0; i < this.particles.length; i++)
    {
        this.particles[i].update(aDelta);
    }
};