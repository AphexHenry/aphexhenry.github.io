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
    var vertexShader2 = document.getElementById( 'vertexShader2' ).textContent;
    var fragmentShader = document.getElementById( 'fragmentShader' ).textContent;

    var uniforms = THREE.UniformsUtils.merge( [

        THREE.ShaderLib[ 'phong' ].uniforms,
        {time: { type: "f", value: 1.0 }}

    ] );

    //this.material = new THREE.ShaderMaterial( {
    //    uniforms:uniforms,
    //    vertexShader: vertexShader,
    //    fragmentShader: THREE.ShaderChunk[ 'meshphong_frag' ]
    //} );

    var materialColor = 0x030303;

    // Material attributes from MeshPhongMaterial
    //this.material.color = new THREE.Color( materialColor );
    //this.material.specular = new THREE.Color( 0x111111 );
    //this.material.shininess = 50;
    //
    //// Sets the uniforms with the material values
    //this.material.uniforms.diffuse.value = this.material.color;
    //this.material.uniforms.specular.value = this.material.specular;
    //this.material.uniforms.shininess.value = Math.max( this.material.shininess, 1e-4 );
    //this.material.uniforms.opacity.value =this. material.opacity;
    //this.material.lights = true;

    this.material = new THREE.ShaderMaterial( {
        //uniforms:uniforms,
        vertexShader: vertexShader2,
        fragmentShader: fragmentShader
    } );

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