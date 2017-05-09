/**
 * Created by baptistebohelay on 17/01/17.
 */
"use strict";
function ParticleManager(aScene)
{
    this.group = new THREE.Group();
    this.particles = [];
    for(var i = 0; i < 5; i++)
    {
        var lParticle = new Particle();
        var mesh = lParticle.getMesh();
        this.particles.push(lParticle);
        this.group.add(mesh);
    }

    this.time = 0;
    aScene.add(this.group );
}

ParticleManager.prototype.update = function(aDelta) {
    //this.group.rotation.y += aDelta * 0.2;
    this.group.rotation.y = Math.PI * 0.5;
    this.group.position.x = -50 ;//100  * Math.cos(this.time * 0.5);
    this.time += aDelta;

    for(var i = 0; i < this.particles.length; i++)
    {
        this.particles[i].update(aDelta);
    }
};