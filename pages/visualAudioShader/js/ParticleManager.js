/**
 * Created by baptistebohelay on 17/01/17.
 */
"use strict";
function ParticleManager(aScene)
{
    this.group = new THREE.Group();
    this.particles = [];
    for(var i = 0; i < 1; i++)
    {
        var lParticle = new Particle();
        var mesh = lParticle.getMesh();
        this.particles.push(lParticle);
        this.group.add(mesh);
    }

    this.time = 0;
    this.volume = 0.2;
    this.counter = 0;
    this.initSound();

    //var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    //this.analyser = audioCtx.createAnalyser();
    //this.analyser.fftSize = 2048;
    this.sampleArrayFiltered = [];
    this.dataArray = [];

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
            var nPeak = (this.peakData.left||this.peakData.right);
            //// GIANT HACK: use EQ spectrum data for bass frequencies
            //var eqSamples = 3;
            //for (var i=0; i<eqSamples; i++)
            //{
            //    nPeak = (nPeak||this.eqData[i]);
            //}
            //that.dataArray = [];


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
            url:"audio/aphex.mp3",
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
    //this.analyser.getByteTimeDomainData(this.dataArray);

    this.sampleArrayFiltered = [];
    var samplesToPut = 512;
    for(var i = 0; i < samplesToPut; i++) {
        //this.sampleArrayFiltered.push((this.dataArray[i] - 128) / 128);
        var lIndexInOriginArray = i;
        this.sampleArrayFiltered.push(this.dataArray[i]);
    }

    //this.group.rotation.y += aDelta * 0.2;
    this.group.rotation.y = Math.PI * 0.5;
    this.group.position.x = -50 ;//100  * Math.cos(this.time * 0.5);
    this.time += aDelta;

    for(var i = 0; i < this.particles.length; i++)
    {
        this.particles[i].update(aDelta, this.sampleArrayFiltered);
    }
};

ParticleManager.prototype.togglePlay = function(aDelta) {
    if(this.sound.playState == 0 || this.sound.paused) {
        this.sound.play();
    }
    else {
        this.sound.pause();
    }
};