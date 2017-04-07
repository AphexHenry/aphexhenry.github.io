/**
 * Created by baptistebohelay on 17/01/17.
 */
"use strict";
function ParticleManager(aScene)
{
    this.group = new THREE.Group();
    this.particles = [];
    this.particlesSq = [];
    for(var i = 0; i < 1; i++)
    {
        var lParticle = new Particle(1);
        var mesh = lParticle.getMesh();
        this.particles.push(lParticle);
        this.group.add(mesh);
    }

    var eqCount = 6;
    for(var i = 0; i < eqCount; i++)
    {
        var lPosX = -125 + i * 50;
        var lParticle = new ParticleCube(lPosX);
        var mesh = lParticle.getMesh();
        this.particlesSq.push(lParticle);
        //this.group.add(mesh);
    }

    this.time = 0;
    this.volume = 0.2;
    this.counter = 0;
    this.peak = 0;
    this.initSound();

    //var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    //this.analyser = audioCtx.createAnalyser();
    //this.analyser.fftSize = 2048;
    this.sampleArrayFiltered = [];
    this.dataArray = [];
    this.eqArray = [];

    this.isPlaying = false;

    this.amplitudeEq = 0.;

    var bufferLength = 128;
    for(var i = 0; i < bufferLength; i++) {
        this.dataArray.push(0);
    }

    aScene.add(this.group );
}

ParticleManager.prototype.initSound = function() {
    var that  = this;

    this.eventsSound = {

        whileplaying: function() {
            that.peak = (this.peakData.left||this.peakData.right);
            //// GIANT HACK: use EQ spectrum data for bass frequencies
            //var eqSamples = 3;
            //for (var i=0; i<eqSamples; i++)
            //{
            //    nPeak = (nPeak||this.eqData[i]);
            //}
            //that.dataArray = [];
            that.eqArray = this.eqData.left;


            if((Math.abs(parseFloat(this.waveformData.left[0])) + Math.abs(parseFloat(this.waveformData.left[10])) + Math.abs(parseFloat(this.waveformData.left[3]))) != 0)
            {
                that.counter++;
                var lSamplesToMove = that.dataArray.length - 128;
                that.dataArray = that.dataArray.slice(lSamplesToMove, that.dataArray.length);
                if(that.counter % 1 == 0)
                {
                    //that.dataArray.push(nPeak * nPeak * nPeak * 165);
                    that.dataArray.push(this.waveformData.right[0] * 15);
                    //that.dataArray.push(this.eqData[1] * 5);
                }
                else {
                    var lastElValue = that.dataArray[that.dataArray.length - 1];
                    var theOneBeforeValue = that.dataArray[that.dataArray.length - 2];
                    that.dataArray[that.dataArray.length - 1] = (lastElValue * 0.3 + theOneBeforeValue * 0.7);
                    that.dataArray.push(lastElValue);
                }

                //var samplesToSkip = 64;
                //for(var i = 0; i < this.waveformData.left.length; i += samplesToSkip) {
                //    that.dataArray.push(Math.abs(parseFloat(this.waveformData.left[i])));
                //}
            }
            //sSoundAmplitude = (0.9+(nPeak*0.1));
            //sLengthLegsSound.left = (sLengthLegsSound.left * 0.9 +(this.peakData.left*0.1));
            //sLengthLegsSound.right = (sLengthLegsSound.right * 0.9 +(this.peakData.right*0.1));
        },

        stop: function()
        {
            sFoodArraySoundWait.push(sPlayingSound.particle);
            sFoodArraySound.splice(0,1);
            sMonsterSound.mParent.RemoveSound();
        }
    };

    soundManager.onready(function() {
        soundManager.defaultOptions.usePeakData = true;
        soundManager.useFlashBlock = true;
        // create sound
        that.sound = soundManager.createSound({
            id:'sound' + that.name,
            url:"audio/aphex3.mp3",
            useWaveformData:true,
            useEQData:true,
            usePeakData:true,
            volume:that.volume * 120,
            whileplaying:that.eventsSound.whileplaying,
            onstop:that.eventsSound.stop,
            onfinish:that.eventsSound.stop
        });
    });
};

ParticleManager.prototype.update = function(aDelta) {
    //

    //if(this.isPlaying)
    //{
    //    this.amplitudeEq += (1. - this.amplitudeEq) * aDelta * 0.1;
    //}
    //else {
    //    this.amplitudeEq += (-10. - this.amplitudeEq) * aDelta * 0.1;
    //}

    if(this.sound) {
        this.amplitudeEq = Math.max(Math.min(((this.sound.position / 1000) - 13), 1), 0);
    }

    this.sampleArrayFiltered = [];


    var samplesToPut = 512;
    if(!this.isPlaying) {
        this.dataArray = this.dataArray.slice(1, this.dataArray.length);
        this.dataArray.push(0);
    }

    for(var i = 0; i < samplesToPut; i++) {
        //this.sampleArrayFiltered.push((this.dataArray[i] - 128) / 128);

        var lIndexInOriginArray = i;
        this.sampleArrayFiltered.push(this.dataArray[i]);
    }

    //this.group.rotation.y += aDelta * 0.2;
    this.group.rotation.y = Math.PI * 0.5;
    this.group.rotation.z = -Math.PI * 0.01;
    this.group.position.x = -50 ;//100  * Math.cos(this.time * 0.5);
    this.time += aDelta;

    for(var i = 0; i < this.particles.length; i++)
    {
        this.particles[i].update(aDelta, this.sampleArrayFiltered, this.peak);
    }

    for(var i = 0; i < this.particlesSq.length; i++)
    {
        var lIndex = Math.abs(i - this.particlesSq.length * 0.5);//this.eqArray.length * i / this.particlesSq.length;
        var lValue = (this.isPlaying && this.eqArray.length) ? parseFloat(this.eqArray[lIndex]) : 0;
        this.particlesSq[i].update(aDelta, lValue * this.amplitudeEq * this.amplitudeEq * this.amplitudeEq);
    }
};

ParticleManager.prototype.togglePlay = function(aDelta) {
    if(this.sound.playState == 0 || this.sound.paused) {
        this.play();
    }
    else {
        this.pause();
    }
};

ParticleManager.prototype.play = function(aDelta) {
    this.sound.play();
    this.isPlaying = true;
    $('#playButton').addClass('disabled');
    $('#pauseButton').removeClass('disabled');
};

ParticleManager.prototype.pause = function(aDelta) {
    this.sound.pause();
    this.isPlaying = false;

    $('#playButton').removeClass('disabled');
    $('#pauseButton').addClass('disabled');
};