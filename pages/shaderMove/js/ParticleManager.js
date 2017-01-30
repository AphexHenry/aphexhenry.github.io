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

    var uniforms = THREE.UniformsUtils.merge( [

        THREE.ShaderLib[ 'phong' ].uniforms,
        {time: { type: "f", value: 1.0 }}

    ] );

    this.material = new THREE.ShaderMaterial( {
        uniforms:uniforms,
        vertexShader: vertexShader,
        fragmentShader: THREE.ShaderChunk[ 'meshphong_frag' ]
    } );

    this.material.lights = true;

    var materialColor = 0x0040C0;

    // Material attributes from MeshPhongMaterial
    this.material.color = new THREE.Color( materialColor );
    this.material.specular = new THREE.Color( 0x111111 );
    this.material.shininess = 50;

    // Sets the uniforms with the material values
    this.material.uniforms.diffuse.value = this.material.color;
    this.material.uniforms.specular.value = this.material.specular;
    this.material.uniforms.shininess.value = Math.max( this.material.shininess, 1e-4 );
    this.material.uniforms.opacity.value =this. material.opacity;

    var hash = document.location.hash.substr( 1 );
    if ( hash ) hash = parseInt( hash, 0 );
    // Texture width for simulation
    var WIDTH = hash || 128;

    // Water size in system units
    var BOUNDS = 512;

    // Defines
    this.material.defines.WIDTH = window.innerWidth.toFixed( 1 );
    this.material.defines.BOUNDS = BOUNDS.toFixed( 1 );

    // create a sphere and assign the material
    this.mesh = new THREE.Mesh(
        new THREE.IcosahedronGeometry( 5, 4 ),
        this.material
    );

    // magic here
    this.mesh.customDepthMaterial = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: this.material.uniforms
    });

    this.mesh.castShadow = true;
    var scale = 0.5;
    //this.mesh.scale.set(new THREE.Vector3(scale,scale,scale))
    //this.mesh.receiveShadow = true;

    this.group = new THREE.Group();
    this.group.add(this.mesh);

    this.time = 0;

    aScene.add(this.group );

}

ParticleManager.prototype.update = function(aDelta) {
    this.group.rotation.y += 0.001;
    this.group.position.x = -30 + 10 * Math.cos(this.time * 0.1);
    this.group.position.y = -10;
    this.time += aDelta;
    //for(var i = 0; i < this.particles.length; i++)
    //{
    //    this.particles[i].update(aDelta);
    //}
};