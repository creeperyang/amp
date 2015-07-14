'use strict';

var parser = require('id3-parser');

var AudioContext = window.AudioContext || window.webkitAudioContext;
// Create AudioContext and buffer sourceNode
var audioCtx = new AudioContext();
var sourceNode;
// Create a ScriptProcessorNode with a bufferSize of 4096 and a single input and output channel
var scriptNode;
// Create analyser
var analyser;
var canvas = document.getElementById('spectrum');
var ctx = canvas.getContext('2d');
var CANVAS_WIDTH = canvas.width;
var CANVAS_HEIGHT = canvas.height;
var progressbar = document.getElementById('timeline');
var btnPlayOrPause = document.getElementById('play');
var btnNext = document.getElementById('next');
var btnPre = document.getElementById('previous');
var imgCover = document.getElementById('cover');
var curMusicIndex = 0;

var setupAudioNodes = function() {
    sourceNode = audioCtx.createBufferSource();
    scriptNode = audioCtx.createScriptProcessor(4096, 1, 1);
    analyser = audioCtx.createAnalyser();
    analyser.smoothingTimeConstant = 0.5;
    analyser.fftSize = 1024;
    analyser.maxDecibels = 80;

    sourceNode.connect(analyser);
    analyser.connect(scriptNode);
    scriptNode.connect(audioCtx.destination);
};
var destroyAudioNodes = function() {
    if(sourceNode) {
        sourceNode.disconnect(analyser);
        sourceNode.onended = null;
        sourceNode = null;
    }
    if(analyser) {
        analyser.disconnect(scriptNode);
        analyser = null;
    }
    if(scriptNode){
        scriptNode.disconnect(audioCtx.destination);
        scriptNode.onaudioprocess = null;
        scriptNode = null;
    }
};

// Give the node a function to process audio events
var onaudioprocess = function(audioProcessingEvent) {
    // The input buffer is the song we loaded earlier
    var inputBuffer = audioProcessingEvent.inputBuffer;

    // The output buffer contains the samples that will be modified and played
    var outputBuffer = audioProcessingEvent.outputBuffer;

    // Loop through the output channels (in this case there is only one)
    for (var channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
        var inputData = inputBuffer.getChannelData(channel);
        var outputData = outputBuffer.getChannelData(channel);

        // Loop through the 4096 samples
        for (var sample = 0; sample < inputBuffer.length; sample++) {
            // make output equal to the same as the input
            outputData[sample] = inputData[sample];
        }
    }
    updateProgressbar(inputBuffer.duration);
    drawSpectrum();
};
// When the buffer sourceNode stops playing, disconnect everything
var onended = function() {
    imgCover.classList.remove('active');
    if(musicList.length > 1) {
        playMusic(++curMusicIndex);
    } else {
        destroyAudioNodes();
        btnPlayOrPause.setAttribute('data-state', 'ended');
    }
};

var setMusicInfo = function(tags) {
    if(tags) {
        document.querySelector('.music-artist-title').textContent = tags.artist + 
            ' - ' + tags.title;
        if(tags.image) {
            imgCover.setAttribute('src', 'data:' + 
                tags.image.mime + ';base64,' +
                uint8ArrayToBase64(tags.image.data));
        } else {
            imgCover.setAttribute('src', imgCover.getAttribute('data-default-cover'));
        }
    }
};
var initProgressbar = function(max, initValue) {
    progressbar.max = max;
    progressbar.value = initValue || 0;
};
var updateProgressbar = function(inputDuration) {
    progressbar.value += inputDuration;
};
// draw spectrum
var drawSpectrum = function() {
    var freqByteData = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(freqByteData); 

    var SPACER_WIDTH = 6;
    var BAR_WIDTH = 1;
    var OFFSET = 100;
    var numBars = Math.round(CANVAS_WIDTH / SPACER_WIDTH);

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.lineCap = 'round';

    for (var i = 0; i < numBars; ++i) {
        var magnitude = freqByteData[i + OFFSET];
        ctx.fillRect(i * SPACER_WIDTH, 0, BAR_WIDTH, magnitude);
    }
};

var uint8ArrayToBase64 = function(u8) {
    // prevent Maximum call stack size exceeded
    var chunkSize = 0x8000;
    var index = 0;
    var length = u8.length;
    var result = '';
    var slice;
    while(index < length) {
        slice = u8.slice(index, Math.min(index + chunkSize, length));
        result += String.fromCharCode.apply(null, slice);
        index += chunkSize;
    }
    return btoa(result);
};

// parse id3v2
var parse = function(buffer) {
    var tags = parser.parseFromBuffer(buffer);
    if(tags) {
        setMusicInfo(tags);
    }
};

// load in an audio track via XHR and decodeAudioData
var fetchAudio = function(url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = function() {
        var audioData = request.response;
        parse(new Uint8Array(audioData));
        audioCtx.decodeAudioData(audioData, function(buffer) {
                sourceNode.buffer = buffer;
                sourceNode.start(0);
                // init progressbar
                initProgressbar(buffer.duration);
                // init controls
                btnPlayOrPause.setAttribute('data-state', 'playing');
                // make cover rotate
                imgCover.classList.add('active');
            },
            function(e) {
                console.log('Error with decoding audio data' + e.err);
                destroyAudioNodes(true);
            });
    };
    // setup audionodes and handlers
    setupAudioNodes();
    scriptNode.onaudioprocess = onaudioprocess;
    sourceNode.onended = onended;

    request.send();
};

var playMusic = function(index) {
    index = index < 0 ? musicList.length + index : index >= musicList.length ? 0 : index;
    curMusicIndex = index;
    destroyAudioNodes(true);
    fetchAudio(musicList[index].url);
};

// wire up play button
btnPlayOrPause.addEventListener('click', function() {
    var state = this.getAttribute('data-state');
    if(state === 'ended') {
        this.setAttribute('data-state', 'playing');
        playMusic(0);
    } else if(state === 'playing') {
        this.setAttribute('data-state', 'paused');
        scriptNode.disconnect(audioCtx.destination);
        this.innerHTML = '<use xlink:href="/images/svgdefs.svg#icon-pause"></use>';
        imgCover.classList.remove('active');
    } else {
        this.setAttribute('data-state', 'playing');
        scriptNode.connect(audioCtx.destination);
        this.innerHTML = '<use xlink:href="/images/svgdefs.svg#icon-play"></use>';
        imgCover.classList.add('active');
    }
}, false);
btnNext.addEventListener('click', function() {
    playMusic(++curMusicIndex);
}, false);
btnPre.addEventListener('click', function() {
    playMusic(--curMusicIndex);
}, false);


var musicList = [{
    url: 'http://7sbnba.com1.z0.glb.clouddn.com/music-Walk Away.mp3'
}, {
    url: 'http://7sbnba.com1.z0.glb.clouddn.com/music-红玫瑰.mp3'
}, {
    url: 'http://7sbnba.com1.z0.glb.clouddn.com/music-原谅.mp3'
}, {
    url: 'http://7sbnba.com1.z0.glb.clouddn.com/music-我们怎么了.mp3'
}, {
    url: 'http://7sbnba.com1.z0.glb.clouddn.com/music-遥远的她.mp3'
}, {
    url: 'http://7sbnba.com1.z0.glb.clouddn.com/music-魔鬼中的天使.mp3'
}, {
    url: 'http://7sbnba.com1.z0.glb.clouddn.com/music-Apologize.mp3'
}, {
    url: 'http://7sbnba.com1.z0.glb.clouddn.com/music-改造人.mp3'
}];

fetchAudio(musicList[curMusicIndex].url);
