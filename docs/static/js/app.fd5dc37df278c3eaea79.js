webpackJsonp([1],{"+o4K":function(t,s){},"6XTx":function(t,s){},G27z:function(t,s){},NHnr:function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var n=i("/5sW"),e=i("aaQ4"),r={render:function(){this.$createElement;this._self._c;return this._m(0,!1,!1)},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"loader"},[s("div",{staticClass:"loader__figure"})])}]},a={name:"cover",props:["data","mime"],methods:{},computed:{imgUrl:function(){return this.data instanceof Uint8Array?"data:"+this.mime+";base64,"+function(t){for(var s=0,i=t.length,n="",e=void 0;s<i;)e=t.slice(s,Math.min(s+32768,i)),n+=String.fromCharCode.apply(null,e),s+=32768;return btoa(n)}(this.data):this.data}},components:{Loader:i("VU/8")({name:"loader"},r,!1,function(t){i("tB4V")},"data-v-3e25d9e0",null).exports}},c={render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"cover"},[this.imgUrl?s("img",{attrs:{src:this.imgUrl}}):s("loader")],1)},staticRenderFns:[]},o=function(t){var s=t%60;return t<60?0|t:(t-s)/60+":"+(s<10?"0"+(0|s):0|s)},u={name:"timebar",props:["current","count","width"],computed:{transformStyle:function(){return{transform:"translate3d("+((this.current/this.count*100).toFixed(4)+"%")+",0,0)"}},curTime:function(){return o(this.current)},totalTime:function(){return o(this.count)}}},l={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"wrapper"},[i("div",{staticClass:"bar",style:{width:t.width}},[i("div",{staticClass:"bar-inner",style:t.transformStyle})]),t._v(" "),i("div",{staticClass:"time"},[i("span",{staticClass:"mark"},[t._v(t._s(t.curTime))]),t._v(" "),i("span",{staticClass:"mark"},[t._v(t._s(t.totalTime))])])])},staticRenderFns:[]},d={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"ctrl-container"},[i("svg",{staticClass:"ctrl-icon icon-skip-back",on:{click:function(s){t.switchMusic(-1)}}},[i("use",{attrs:{"xlink:href":"../../static/svgdefs.svg#icon-skip-back"}})]),t._v(" "),t.playing?i("svg",{staticClass:"ctrl-icon icon-play",on:{click:t.playOrPauseMusic}},[i("use",{attrs:{"xlink:href":"../../static/svgdefs.svg#icon-play"}})]):i("svg",{staticClass:"ctrl-icon icon-play",on:{click:t.playOrPauseMusic}},[i("use",{attrs:{"xlink:href":"../../static/svgdefs.svg#icon-pause"}})]),t._v(" "),i("svg",{staticClass:"ctrl-icon icon-skip-forward",on:{click:function(s){t.switchMusic(1)}}},[i("use",{attrs:{"xlink:href":"../../static/svgdefs.svg#icon-skip-forward"}})])])},staticRenderFns:[]},h={name:"Player",props:["musicList","initialIndex"],data:function(){return{title:"Creeper's player",currentIndex:this.initialIndex||0,tag:{},duration:100,currentTime:0}},computed:{cover:function(){return this.tag.image||{}}},mounted:function(){if(this.musicList&&this.musicList.length){var t=this.musicList[this.currentIndex].url;this.play(t)}},methods:{play:function(t){var s=this;this.destroy(),this.setup(),function(t,s){var i=new XMLHttpRequest;i.open("GET",t,!0),i.responseType="arraybuffer",i.onload=function(){return s(i)},i.onerror=function(t){return console.log(t)},i.send()}(t,function(t){var i=t.response,n=Object(e.parse)(new Uint8Array(i));s.tag=n,s.audioCtx.decodeAudioData(i,function(t){s.sourceNode.buffer=t,s.sourceNode.start(0),s.duration=t.duration},function(t){console.log("Error with decoding audio data"+t.err)})})},setup:function(){var t=window.AudioContext||window.webkitAudioContext,s=this.audioCtx=new t;this.sourceNode=s.createBufferSource(),this.scriptNode=s.createScriptProcessor(4096,1,1),this.analyser=s.createAnalyser(),this.analyser.smoothingTimeConstant=.5,this.analyser.fftSize=1024,this.analyser.maxDecibels=80,this.sourceNode.connect(this.analyser),this.analyser.connect(this.scriptNode),this.scriptNode.connect(s.destination),this.scriptNode.onaudioprocess=this.onAudioProcess.bind(this),this.sourceNode.onended=this.onEnded.bind(this)},destroy:function(){this.sourceNode&&(this.sourceNode.disconnect(this.analyser),this.sourceNode.onended=null,this.sourceNode=null),this.analyser&&(this.analyser.disconnect(this.scriptNode),this.analyser=null),this.scriptNode&&(this.scriptNode.disconnect(this.audioCtx.destination),this.scriptNode.onaudioprocess=null,this.scriptNode=null)},onAudioProcess:function(t){for(var s=t.inputBuffer,i=t.outputBuffer,n=0;n<i.numberOfChannels;n++)for(var e=s.getChannelData(n),r=i.getChannelData(n),a=0;a<s.length;a++)r[a]=e[a];this.currentTime+=s.duration,this.currentTime>this.duration&&(this.currentTime=this.duration)},onEnded:function(){this.destroy(),this.switchMusic(1)},pauseMusic:function(){this.scriptNode.disconnect(this.audioCtx.destination)},resumeMusic:function(){this.scriptNode.connect(this.audioCtx.destination)},switchMusic:function(t){var s=this.currentIndex+t;s<0?s=this.musicList.length-1:s>this.musicList.length-1&&(s=0),this.currentIndex=s,this.duration=0,this.play(this.musicList[s].url)}},components:{Cover:i("VU/8")(a,c,!1,function(t){i("G27z")},"data-v-687271f0",null).exports,Timebar:i("VU/8")(u,l,!1,function(t){i("kYDu")},"data-v-898bd0e8",null).exports,Controller:i("VU/8")({name:"controller",data:function(){return{playing:!0}},methods:{playOrPauseMusic:function(){this.playing=!this.playing,this.$emit(this.playing?"play":"pause")},switchMusic:function(t){this.$emit(t>0?"next":"prev")}}},d,!1,function(t){i("OKD9")},"data-v-7622cc5c",null).exports}},m={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("main",{staticClass:"container"},[i("header",{staticClass:"header"},[i("svg",{staticClass:"icon-headphones"},[i("use",{attrs:{"xlink:href":"../../static/svgdefs.svg#icon-headphones"}})]),t._v(" "),i("span",{staticClass:"title"},[t._v("Creeper's Player")])]),t._v(" "),i("Cover",{attrs:{mime:t.cover.mime,data:t.cover.data}}),t._v(" "),i("Timebar",{attrs:{count:t.duration,current:t.currentTime,width:300}}),t._v(" "),i("section",{staticClass:"metadata"},[i("p",{staticClass:"music-title"},[t._v(t._s(t.tag.title||" "))]),t._v(" "),i("p",{staticClass:"music-artist"},[t._v(t._s(t.tag.artist||" "))])]),t._v(" "),i("controller",{on:{play:t.resumeMusic,pause:t.pauseMusic,next:function(s){t.switchMusic(1)},prev:function(s){t.switchMusic(-1)}}}),t._v(" "),i("div",{staticClass:"words"},[t._v("\n    最怕有一天，突然就听懂了一首歌\n  ")])],1)},staticRenderFns:[]},p={state:{musicList:[{url:"http://7sbnba.com1.z0.glb.clouddn.com/music-Walk Away.mp3"},{url:"http://7sbnba.com1.z0.glb.clouddn.com/music-红玫瑰.mp3"},{url:"http://7sbnba.com1.z0.glb.clouddn.com/music-原谅.mp3"},{url:"http://7sbnba.com1.z0.glb.clouddn.com/music-我们怎么了.mp3"},{url:"http://7sbnba.com1.z0.glb.clouddn.com/music-遥远的她.mp3"},{url:"http://7sbnba.com1.z0.glb.clouddn.com/music-魔鬼中的天使.mp3"},{url:"http://7sbnba.com1.z0.glb.clouddn.com/music-Apologize.mp3"},{url:"http://7sbnba.com1.z0.glb.clouddn.com/music-改造人.mp3"}]}},f={name:"app",data:function(){return{musicList:p.state.musicList}},components:{Player:i("VU/8")(h,m,!1,function(t){i("6XTx")},"data-v-94ba379e",null).exports}},v={render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",{attrs:{id:"app"}},[s("player",{attrs:{musicList:this.musicList,initialIndex:0}}),this._v(" "),s("router-view")],1)},staticRenderFns:[]},g=i("VU/8")(f,v,!1,function(t){i("+o4K")},null,null).exports,y=i("/ocq");n.a.use(y.a);var b=new y.a({routes:[]});n.a.config.productionTip=!1,new n.a({el:"#app",router:b,render:function(t){return t(g)}})},OKD9:function(t,s){},kYDu:function(t,s){},tB4V:function(t,s){}},["NHnr"]);
//# sourceMappingURL=app.fd5dc37df278c3eaea79.js.map