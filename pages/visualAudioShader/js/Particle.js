/**
 * Created by baptistebohelay on 17/01/17.
 */
"use strict";
function Particle()
{
    var vertexShader = document.getElementById( 'vertexShader' ).textContent;
    var vertexShader2 = document.getElementById( 'vertexShader2' ).textContent;
    var fragmentShader = THREE.ShaderChunk[ 'meshphong_frag' ];//document.getElementById( 'fragmentShader' ).textContent;

    var zeroArray = [];
    for(var i = 0; i < 350; i++)
    {
        zeroArray.push(i / 350);
    }

    var uniforms = THREE.UniformsUtils.merge( [

        THREE.ShaderLib[ 'phong' ].uniforms,
        {
            time: { type: "f", value: 1.0 },
            random: {type: "f", value: 1.0},
            amplitudes: {type: "fv", value: zeroArray}
        }

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

    this.randomShader = Math.random();
    this.material.uniforms.random.value = this.randomShader;
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
    this.mesh.receiveShadow = true;
    var scale = 0.1;
    this.mesh.scale.set(scale,scale,scale)

    this.time = 0;
    this.mesh.position.z = 0 + this.randomShader * -230;

}

Particle.prototype.getMesh = function(){
    return this.mesh;
};

Particle.prototype.lookAt = function(aPosition, rotateX){
    this.mesh.lookAt(aPosition);
    this.mesh.rotateY(Math.PI);
    this.mesh.rotateX(rotateX);
    this.rotationInit = this.mesh.rotation.clone();
};

Particle.prototype.init = function(aOptions) {

};

Particle.prototype.update = function(aDelta, aAmplitudes) {

    var zeroArray = [];
    for(var i = 0; i < 256; i++)
    {
        zeroArray.push(aAmplitudes[i]);
    }

    this.time += aDelta;
    this.mesh.customDepthMaterial.uniforms.time.value = this.time;
    this.mesh.opacity = 0;
    //this.material.uniforms.time.value = this.time;
    this.material.uniforms.amplitudes.value = zeroArray;
    this.mesh.customDepthMaterial.needsUpdate = true;
};