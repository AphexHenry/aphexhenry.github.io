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
        metalness: 0.2,
        roughness: 0,
        shading: THREE.SmoothShading,
        premultipliedAlpha: true,
        transparent: true
    } );

    var textureLoader = new THREE.TextureLoader();
    textureLoader.load( "textures/brick_diffuse.jpg", function( map ) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        //map.repeat.set( 9, 0.5 );
        standardMaterial.map = map;
        standardMaterial.needsUpdate = true;
    } );

    textureLoader.load( "textures/brick_alpha.jpg", function( map ) {
        //map.wrapS = THREE.RepeatWrapping;
        //map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        //map.repeat.set( 9, 0.5 );
        standardMaterial.alphaMap = map;
        standardMaterial.needsUpdate = true;
    } );

    textureLoader.load( "textures/brick_displace.jpg", function( map ) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        //map.repeat.set( 9, 0.5 );
        standardMaterial.displacementMap = map;
        standardMaterial.displacementScale = -2;
        standardMaterial.needsUpdate = true;
    } );

    textureLoader.load( "textures/brick_bump.jpg", function( map ) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        //map.repeat.set( 9, 0.5 );
        standardMaterial.bumpMap = map;
        standardMaterial.needsUpdate = true;
    } );
    textureLoader.load( "textures/brick_roughness.jpg", function( map ) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        //map.repeat.set( 9, 0.5 );
        standardMaterial.roughnessMap = map;
        standardMaterial.needsUpdate = true;
    } );

    standardMaterial.side = THREE.DoubleSide;
    var geometry = new THREE.PlaneGeometry( 10, 10, 4, 4 );

    this.group = new THREE.Group();
    var radius = 13;
    for(var height = 0; height < 1; height+= 0.03)
    {
        var radiusCoeff = Math.sin(height * Math.PI);
        var numAzimut = radiusCoeff * 40 * (1 + height * 2.3);
        for(var i = 0; i < numAzimut; i++)
        {
            var azimut = 2 * Math.PI * i / numAzimut;
            var particle = new Particle(standardMaterial, geometry);

            this.particles.push(particle);
            this.group.add( particle.mesh );

            var x = Math.cos(azimut) * radius * radiusCoeff;
            var z = Math.sin(azimut) * radius * radiusCoeff;
            var y = -radius * 1 + height * radius * 2;
            var rotationX = 0.6;
            //var rotationY = azimut;
            var rotationZ = 0;
            particle.setPosition(new THREE.Vector3(x, y, z), height);
            //particle.setRotation(new THREE.Vector3(rotationX,rotationY, rotationZ));
            particle.lookAt(new THREE.Vector3(0,0, 0), height * 0.1);
            particle.setScale(0.3);
        }
    }

    aScene.add(this.group );

    var geometryBigSphere = new THREE.SphereGeometry( radius, radius, 15, 15 );
    var sphereMaterial = new THREE.MeshStandardMaterial( {
        color: 0xffffff,
        emissive: 0xffffff,
        metalness: 0.9,
        roughness: 0.2,
        shading: THREE.SmoothShading,
        premultipliedAlpha: true,
        transparent: true
    } );
    var bigSphereMesh = new THREE.Mesh( geometryBigSphere, sphereMaterial );
    var lScale = 0.5;
    bigSphereMesh.scale.set(lScale, lScale, lScale);
    bigSphereMesh.position.set(0,-15,0);
    //bigSphereMesh.position.set(-20,-30,-20);
    bigSphereMesh.castShadow = true;
    bigSphereMesh.receiveShadow = true;
    aScene.add(bigSphereMesh);
}

ParticleManager.prototype.update = function(aDelta) {
    this.group.rotation.y += 0.001;
    for(var i = 0; i < this.particles.length; i++)
    {
        this.particles[i].update(aDelta);
    }
};