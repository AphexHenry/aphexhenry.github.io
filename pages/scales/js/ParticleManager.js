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
        roughness: 0.2,
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
    var radius = 20;
    for(var azimut = 0; azimut < Math.PI * 2; azimut += 0.3)
    {
        for(var height = 0; height < 1; height+= 0.05)
        {
            var particle = new Particle(standardMaterial);

            this.particles.push(particle);
            this.group.add( particle.mesh );

            var x = Math.cos(azimut) * radius * height;
            var z = Math.sin(azimut) * radius * height;
            var y = -radius * 0.5 + height * radius * 2;
            var rotationX = 0;
            var rotationY = azimut;
            var rotationZ = 0;
            particle.setPosition(new THREE.Vector3(x, y, z));
            //particle.setRotation(new THREE.Vector3(rotationX,rotationY, rotationZ));
            particle.lookAt(new THREE.Vector3(0,0, 0), height);
            particle.setScale(0.2);
        }
    }

    aScene.add(this.group );
}

ParticleManager.prototype.update = function(aDelta) {
    this.group.rotation.y += 0.01;
    for(var i = 0; i < this.particles.length; i++)
    {
        this.particles[i].update(aDelta);
    }
};