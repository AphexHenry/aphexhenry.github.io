/**
 * Created by baptistebohelay on 17/01/17.
 */
"use strict";
function ParticleManager(aScene)
{
    var vertexShader = document.getElementById( 'vertexShader' ).textContent;
    var vertexShader2 = document.getElementById( 'vertexShader2' ).textContent;
    var fragmentShader = THREE.ShaderChunk[ 'meshphong_frag' ];//document.getElementById( 'fragmentShader' ).textContent;

    var uniforms = THREE.UniformsUtils.merge( [

        THREE.ShaderLib[ 'phong' ].uniforms,
        {time: { type: "f", value: 1.0 }}

    ] );

    this.material = new THREE.ShaderMaterial( {
        uniforms:uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    } );

    var materialColor = 0x030303;

    // Material attributes from MeshPhongMaterial
    this.material.color = new THREE.Color( materialColor );
    this.material.specular = new THREE.Color( 0x222222 );
    this.material.shininess = 50;

    // Sets the uniforms with the material values
    this.material.uniforms.diffuse.value = new THREE.Color( 0x020202 );
    this.material.uniforms.specular.value = this.material.specular;
    this.material.uniforms.shininess.value = 10;//Math.max( this.material.shininess, 1e-4 );
    this.material.uniforms.opacity.value =this. material.opacity;
    this.material.lights = true;

    //this.material = new THREE.ShaderMaterial( {
    //    //uniforms:uniforms,
    //    vertexShader: vertexShader2,
    //    fragmentShader: fragmentShader
    //} );

    // create a sphere and assign the material
    this.mesh = new THREE.Mesh(
        new THREE.IcosahedronGeometry( 5, 4 ),
        this.material
    );

    // magic here
    this.mesh.customDepthMaterial = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: uniforms
    });

    this.mesh.castShadow = true;
    //this.mesh.receiveShadow = true;

    this.group = new THREE.Group();
    this.group.add(this.mesh);

    this.time = 0;

    aScene.add(this.group );

}

ParticleManager.prototype.update = function(aDelta) {
    //this.group.rotation.y += aDelta * 0.2;
    this.group.rotation.y = Math.PI * 0.5;
    this.group.position.x = 10 * Math.cos(this.time * 0.1);
    this.time += aDelta;
    this.mesh.customDepthMaterial.uniforms.time.value = this.time;
    //this.material.uniforms.time.value = this.time;
    this.mesh.customDepthMaterial.needsUpdate = true;
    //for(var i = 0; i < this.particles.length; i++)
    //{
    //    this.particles[i].update(aDelta);
    //}
};