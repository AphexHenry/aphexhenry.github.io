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
    //this.freqByteData;
    //this.timeByteData;



    this.isPlaying = false;

    this.amplitudeEq = 0.;

    var bufferLength = 128;
    for(var i = 0; i < bufferLength; i++) {
        this.dataArray.push(0);
    }

    aScene.add(this.group );
}

ParticleManager.prototype.handleLoad = function() {
// get the context. NOTE to connect to existing nodes we need to work in the same context.
    var context = createjs.Sound.activePlugin.context;

    // create an analyser node
    this.analyserNode = context.createAnalyser();
    this.analyserNode.fftSize = 32;  //The size of the FFT used for frequency-domain analysis. This must be a power of two
    this.analyserNode.smoothingTimeConstant = 0.85;  //A value from 0 -> 1 where 0 represents no time averaging with the last analysis frame
    this.analyserNode.connect(context.destination);  // connect to the context.destination, which outputs the audio

    // attach visualizer node to our existing dynamicsCompressorNode, which was connected to context.destination
    var dynamicsNode = createjs.Sound.activePlugin.dynamicsCompressorNode;
    dynamicsNode.disconnect();  // disconnect from destination
    dynamicsNode.connect(this.analyserNode);

    // set up the arrays that we use to retrieve the this.analyserNode data
    this.freqFloatData = new Float32Array(this.analyserNode.frequencyBinCount);
    this.timeFloatData = new Float32Array(this.analyserNode.frequencyBinCount);
    this.freqByteData = new Uint8Array(this.analyserNode.frequencyBinCount);


};

ParticleManager.prototype.initSound = function() {
    var that  = this;
    this.src = "audio/aphex3.mp3";

    if (!createjs.Sound.registerPlugins([createjs.WebAudioPlugin])) {
        document.getElementById("error").style.display = "block";
    }

    createjs.Sound.on("fileload", this.handleLoad, this); // add an event listener for when load is completed
    createjs.Sound.registerSound(this.src);

    //soundManager.onready(function() {
    //    soundManager.defaultOptions.usePeakData = true;
    //    soundManager.useFlashBlock = true;
    //    // create sound
    //    that.sound = soundManager.createSound({
    //        id:'sound' + that.name,
    //        url:"audio/aphex3.mp3",
    //        useWaveformData:true,
    //        useEQData:true,
    //        usePeakData:true,
    //        volume:that.volume * 120,
    //        whileplaying:that.eventsSound.whileplaying,
    //        onstop:that.eventsSound.stop,
    //        onfinish:that.eventsSound.stop
    //    });
    //});
};

ParticleManager.prototype.update = function(aDelta) {
    if(this.musicPosition) {
        this.amplitudeEq = Math.max(Math.min(((this.musicPosition / 1000) - 7), 1), 0);
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
        var lIndex = Math.abs(1 * (i - this.particlesSq.length * 0.5)) + 3;//this.eqArray.length * i / this.particlesSq.length;
        var lValue = (this.isPlaying && this.eqArray.length) ? this.eqArray[lIndex] : -120;
        lValue = (lValue + 90 - i * 0) / 30;
        lValue = Math.min(lValue, 1.3);
        this.particlesSq[i].update(aDelta, lValue * this.amplitudeEq * this.amplitudeEq * this.amplitudeEq);
    }
};

ParticleManager.prototype.togglePlay = function(aDelta) {
    if(!this.soundInstance || this.soundInstance.paused) {
        this.play();
    }
    else {
        this.pause();
    }
};



ParticleManager.prototype.play = function(aDelta) {
    if(this.soundInstance) {
        this.soundInstance.paused = false;
    }
    else
    {
        var that = this;
        var tick = function(evt) {
            if(that.soundInstance && that.soundInstance.paused) {

                return;
            }
            that.musicPosition = evt.time;
            that.analyserNode.getFloatFrequencyData(that.freqFloatData);  // this gives us the dBs
            that.analyserNode.getFloatTimeDomainData(that.timeFloatData);  // this gives us the waveform
            that.analyserNode.getByteFrequencyData(that.freqByteData);  // this gives us the frequency


            var sum = 0;
            for(var i = 0; i < that.timeFloatData.length * 0.3; i++) {
                sum += that.timeFloatData[i] * that.timeFloatData[i];
                sum = Math.sqrt(sum) / that.timeFloatData.length * 0.3;
            }

            that.peak = sum;

            that.eqArray = that.freqFloatData;

            if((Math.abs(parseFloat(that.timeFloatData[0])) + Math.abs(parseFloat(that.timeFloatData[10])) + Math.abs(parseFloat(that.timeFloatData[3]))) != 0)
            {
                that.counter++;
                var lSamplesToMove = that.dataArray.length - 128;
                that.dataArray = that.dataArray.slice(lSamplesToMove, that.dataArray.length);
                if(that.counter % 1 == 0)
                {
                    //that.dataArray.push(nPeak * nPeak * nPeak * 165);
                    that.dataArray.push(that.timeFloatData[0] * 15);
                    //that.dataArray.push(this.eqData[1] * 5);
                }
                else {
                    var lastElValue = that.dataArray[that.dataArray.length - 1];
                    var theOneBeforeValue = that.dataArray[that.dataArray.length - 2];
                    that.dataArray[that.dataArray.length - 1] = (lastElValue * 0.3 + theOneBeforeValue * 0.7);
                    that.dataArray.push(lastElValue);
                }
            }
        };

        // start playing the sound we just loaded, looping indefinitely
        this.soundInstance = createjs.Sound.play(this.src, {loop: -1, volume:0.2});
        // start the tick and point it at the window so we can do some work before updating the stage:
        createjs.Ticker.addEventListener("tick", tick);
        createjs.Ticker.setInterval(20);


    }
    this.isPlaying = true;

    $('#playButton').addClass('disabled');
    $('#pauseButton').removeClass('disabled');

};

ParticleManager.prototype.pause = function(aDelta) {
    this.soundInstance.paused = true;
    this.isPlaying = false;

    $('#playButton').removeClass('disabled');
    $('#pauseButton').addClass('disabled');
};