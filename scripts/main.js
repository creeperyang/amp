!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){"use strict";var d,e,f,g=a("./id3/parser.js"),h=window.AudioContext||window.webkitAudioContext,i=new h,j=document.getElementById("spectrum"),k=j.getContext("2d"),l=j.width,m=j.height,n=document.getElementById("timeline"),o=document.getElementById("play"),p=document.getElementById("next"),q=document.getElementById("previous"),r=document.getElementById("cover"),s=0,t=function(){d=i.createBufferSource(),e=i.createScriptProcessor(4096,1,1),f=i.createAnalyser(),f.smoothingTimeConstant=.5,f.fftSize=1024,f.maxDecibels=80,d.connect(f),f.connect(e),e.connect(i.destination)},u=function(){d&&(d.disconnect(f),d.onended=null,d=null),f&&(f.disconnect(e),f=null),e&&(e.disconnect(i.destination),e.onaudioprocess=null,e=null)},v=function(a){for(var b=a.inputBuffer,c=a.outputBuffer,d=0;d<c.numberOfChannels;d++)for(var e=b.getChannelData(d),f=c.getChannelData(d),g=0;g<b.length;g++)f[g]=e[g];z(b.duration),A()},w=function(){r.classList.remove("active"),F.length>1?E(++s):(u(),o.setAttribute("data-state","ended"))},x=function(a){a&&(document.querySelector(".music-artist-title").textContent=a.artist+" - "+a.title,a.image?r.setAttribute("src","data:"+a.image.mime+";base64,"+B(a.image.data)):r.setAttribute("src",r.getAttribute("data-default-cover")))},y=function(a,b){n.max=a,n.value=b||0},z=function(a){n.value+=a},A=function(){var a=new Uint8Array(f.frequencyBinCount);f.getByteFrequencyData(a);var b=6,c=1,d=100,e=Math.round(l/b);k.clearRect(0,0,l,m),k.fillStyle="rgba(0, 0, 0, 0.4)",k.lineCap="round";for(var g=0;e>g;++g){var h=a[g+d];k.fillRect(g*b,0,c,h)}},B=function(a){for(var b,c=32768,d=0,e=a.length,f="";e>d;)b=a.slice(d,Math.min(d+c,e)),f+=String.fromCharCode.apply(null,b),d+=c;return btoa(f)},C=function(a){var b=g.parseFromBuffer(a);b&&x(b)},D=function(a){var b=new XMLHttpRequest;b.open("GET",a,!0),b.responseType="arraybuffer",b.onload=function(){var a=b.response;C(new Uint8Array(a)),i.decodeAudioData(a,function(a){d.buffer=a,d.start(0),y(a.duration),o.setAttribute("data-state","playing"),r.classList.add("active")},function(a){console.log("Error with decoding audio data"+a.err),u(!0)})},t(),e.onaudioprocess=v,d.onended=w,b.send()},E=function(a){a=0>a?F.length+a:a>=F.length?0:a,s=a,u(!0),D(F[a].url)};o.addEventListener("click",function(){var a=this.getAttribute("data-state");"ended"===a?(this.setAttribute("data-state","playing"),E(0)):"playing"===a?(this.setAttribute("data-state","paused"),e.disconnect(i.destination),this.innerHTML='<use xlink:href="/images/svgdefs.svg#icon-pause"></use>',r.classList.remove("active")):(this.setAttribute("data-state","playing"),e.connect(i.destination),this.innerHTML='<use xlink:href="/images/svgdefs.svg#icon-play"></use>',r.classList.add("active"))},!1),p.addEventListener("click",function(){E(++s)},!1),q.addEventListener("click",function(){E(--s)},!1);var F=[{url:"http://7sbnba.com1.z0.glb.clouddn.com/music-Walk Away.mp3"},{url:"http://7sbnba.com1.z0.glb.clouddn.com/music-红玫瑰.mp3"},{url:"http://7sbnba.com1.z0.glb.clouddn.com/music-原谅.mp3"},{url:"http://7sbnba.com1.z0.glb.clouddn.com/music-我们怎么了.mp3"},{url:"http://7sbnba.com1.z0.glb.clouddn.com/music-遥远的她.mp3"},{url:"http://7sbnba.com1.z0.glb.clouddn.com/music-魔鬼中的天使.mp3"},{url:"http://7sbnba.com1.z0.glb.clouddn.com/music-Apologize.mp3"},{url:"http://7sbnba.com1.z0.glb.clouddn.com/music-改造人.mp3"}];D(F[s].url)},{"./id3/parser.js":5}],2:[function(a,b,c){"use strict";b.exports={TALB:"album",TBPM:"bpm",TCOM:"composer",TCON:"genre",TCOP:"copyright",TDEN:"encoding-time",TDLY:"playlist-delay",TDOR:"original-release-time",TDRC:"recording-time",TDRL:"release-time",TDTG:"tagging-time",TENC:"encoder",TEXT:"writer",TFLT:"file-type",TIPL:"involved-people",TIT1:"content-group",TIT2:"title",TIT3:"subtitle",TKEY:"initial-key",TLAN:"language",TLEN:"length",TMCL:"credits",TMED:"media-type",TMOO:"mood",TOAL:"original-album",TOFN:"original-filename",TOLY:"original-writer",TOPE:"original-artist",TOWN:"owner",TPE1:"artist",TPE2:"band",TPE3:"conductor",TPE4:"remixer",TPOS:"set-part",TPRO:"produced-notice",TPUB:"publisher",TRCK:"track",TRSN:"radio-name",TRSO:"radio-owner",TSOA:"album-sort",TSOP:"performer-sort",TSOT:"title-sort",TSRC:"isrc",TSSE:"encoder-settings",TSST:"set-subtitle",TXXX:"user-defined-text-information",TYER:"year",WCOM:"url-commercial",WCOP:"url-legal",WOAF:"url-file",WOAR:"url-artist",WOAS:"url-source",WORS:"url-radio",WPAY:"url-payment",WPUB:"url-publisher",WAF:"url-file",WAR:"url-artist",WAS:"url-source",WCM:"url-commercial",WCP:"url-copyright",WPB:"url-publisher",COMM:"comments",USLT:"lyrics",APIC:"image",PIC:"image"}},{}],3:[function(a,b,c){"use strict";var d=["Blues","Classic Rock","Country","Dance","Disco","Funk","Grunge","Hip-Hop","Jazz","Metal","New Age","Oldies","Other","Pop","R&B","Rap","Reggae","Rock","Techno","Industrial","Alternative","Ska","Death Metal","Pranks","Soundtrack","Euro-Techno","Ambient","Trip-Hop","Vocal","Jazz+Funk","Fusion","Trance","Classical","Instrumental","Acid","House","Game","Sound Clip","Gospel","Noise","AlternRock","Bass","Soul","Punk","Space","Meditative","Instrumental Pop","Instrumental Rock","Ethnic","Gothic","Darkwave","Techno-Industrial","Electronic","Pop-Folk","Eurodance","Dream","Southern Rock","Comedy","Cult","Gangsta Rap","Top 40","Christian Rap","Pop / Funk","Jungle","Native American","Cabaret","New Wave","Psychedelic","Rave","Showtunes","Trailer","Lo-Fi","Tribal","Acid Punk","Acid Jazz","Polka","Retro","Musical","Rock & Roll","Hard Rock","Folk","Folk-Rock","National Folk","Swing","Fast  Fusion","Bebob","Latin","Revival","Celtic","Bluegrass","Avantgarde","Gothic Rock","Progressive Rock","Psychedelic Rock","Symphonic Rock","Slow Rock","Big Band","Chorus","Easy Listening","Acoustic","Humour","Speech","Chanson","Opera","Chamber Music","Sonata","Symphony","Booty Bass","Primus","Porn Groove","Satire","Slow Jam","Club","Tango","Samba","Folklore","Ballad","Power Ballad","Rhythmic Soul","Freestyle","Duet","Punk Rock","Drum Solo","A Cappella","Euro-House","Dance Hall","Goa","Drum & Bass","Club-House","Hardcore","Terror","Indie","BritPop","Negerpunk","Polsk Punk","Beat","Christian Gangsta Rap","Heavy Metal","Black Metal","Crossover","Contemporary Christian","Christian Rock","Merengue","Salsa","Thrash Metal","Anime","JPop","Synthpop","Rock/Pop"];b.exports=d},{}],4:[function(a,b,c){"use strict";b.exports=["other","file-icon","icon","cover-front","cover-back","leaflet","media","artist-lead","artist","conductor","band","composer","writer","location","during-recording","during-performance","screen","fish","illustration","logo-band","logo-publisher"]},{}],5:[function(a,b,c){(function(c){"use strict";function d(a){return p.all([f(a),h(a)]).then(function(a){var b,c=a[0],d=a[1];if(!d)return c;for(b in c)b in d&&""!==d[b]||(d[b]=c[b]);return d})}function e(a){if(!a||a.length<138)return!1;var b,c=g(a),d=i(a);if(!d)return c;for(b in c)b in d&&""!==d[b]||(d[b]=c[b]);return d}function f(a){return a instanceof q?a.read(128,-128).then(function(a){return g(a)}):null}function g(a){if(!a||a.length<128)return!1;a=a.slice(a.length-128);var b={version:"1.0"},c=w(a,3),d=/(^[\s\u0000]+|[\s\u0000]+$)/;return"TAG"!==c?!1:(b.title=w(a.slice(3),30).replace(d,""),b.artist=w(a.slice(33),30).replace(d,""),b.album=w(a.slice(63),30).replace(d,""),b.year=w(a.slice(93),4).replace(d,""),0===a[125]?(b.comment=w(a.slice(97),28).replace(d,""),b.version=1.1,b.track=a[126]):b.comment=w(a.slice(97),30).replace(d,""),b.genre=r[a[127]]||"",b)}function h(a){return a.getBuffer().then(function(a){return i(a)})}function i(a){if(!a||a.length<14)return!1;var b,c,d,e=k(a.slice(0,14));if(!e)return!1;if(b=e.flags,c=10,b.unsync)throw new Error("notSupportUnsynchronisation");return b.xheader&&(c+=m(a.slice(10,14))),d=m(a.slice(6,10)),l(a.slice(c,d+c),e),e}function j(a,b){var c,d,e,f,g={tag:null,value:null},h={id:o(a,4,0),type:o(a,1,0),size:n(a.slice(4)),flags:[a[8],a[9]]};if(0!==h.flags[1])return!1;if(!(h.id in s))return!1;if(g.tag=s[h.id],"T"===h.type){if(d=a[10],0===d||3===d)g.value=w(a.slice(11));else{if(1!==d&&2!==d)return!1;g.value=v(a.slice(11))}"TCON"===h.id&&parseInt(g.value)&&(g.value=r[parseInt(g.value)])}else if("W"===h.type)g.value=w(a.slice(10));else if("COMM"===h.id||"USLT"===h.id){for(d=a[10],e=14,f=0,c=e;;c++)if(1===d||2===d){if(0===a[c]&&0===a[c+1]){e=c+2;break}c++}else if(0===a[c]){e=c+1;break}if(0===d||3===d)g.value=w(a.slice(e));else{if(1!==d&&2!==d)return!1;g.value=v(a.slice(e))}}else if("APIC"===h.id){d=a[10];var i={type:null,mime:null,imageType:null,description:null,data:null};for(e=11,f=0,c=e;;c++)if(0===a[c]){f=c-e;break}for(i.mime=w(a.slice(e),f),i.type=t[a[e+f+1]]||"other",e+=f+2,f=0,c=e;;c++)if(0===a[c]){f=c-e;break}for(i.description=0===f?null:v(a.slice(e),f),e+=f+1,c=e;0===a[c];c++)e++;i.data=a.slice(e),g.value=i}return g.tag?g:!1}function k(a,b){if(!a||a.length<10)return!1;b=b||{};var c,d,e,f=w(a,3);return"ID3"!==f?!1:(c=b.version||(b.version={major:2}),d=b.flags||(b.flags={}),c.minor=a[3],c.revision=a[4],e=a[5],d.unsync=e&!0,d.xheader=e&!0,d.experimental=e&!0,b)}function l(a,b){for(var c=0,d=b.flags;c<a.length;){var e,f,g=n(a.slice(c+4));if(0===g)break;f=a.slice(c,c+10+g),e=j(f,d.minor),e&&(b[e.tag]=e.value),c+=f.length}}function m(a){return 2097152*(127&a[0])+16384*(127&a[1])+128*(127&a[2])+(127&a[3])}function n(a){return 16777216*a[0]+65536*a[1]+256*a[2]+a[3]}function o(a,b,d,e){d=d||0,0>b&&(b+=a.length);var f="";if("undefined"!=typeof c)return a=a.slice(d,d+b),a instanceof c?a.toString():new c(a).toString();for(var g=d;d+b>g;g++)f+=String.fromCharCode(a[g]);return e?f:decodeURIComponent(escape(f))}var p=a("promise-a-plus"),q=a("./reader.js"),r=a("./genres.js"),s=a("./frameTypes.js"),t=a("./imageTypes.js"),u=a("./stringUtils.js"),v=u.readUTF16String,w=u.readUTF8String;b.exports={parseV1:f,parseV2:h,parseV1FromBuffer:g,parseV2FromBuffer:i,parseV2Header:k,parse:d,parseFromBuffer:e}}).call(this,a("buffer").Buffer)},{"./frameTypes.js":2,"./genres.js":3,"./imageTypes.js":4,"./reader.js":6,"./stringUtils.js":7,buffer:9,"promise-a-plus":13}],6:[function(a,b,c){"use strict";function d(a,b){var c=this;if(this.url=a,this.type=b||"fileurl",this.size=0,this.bufferDeferred=f.deferred(),"fileurl"===c.type)e.stat(c.url,function(a,b){return a?c.bufferDeferred.reject(a):(c.size=b.size,void e.readFile(c.url,function(a,b){return a?c.bufferDeferred.reject(a):void c.bufferDeferred.resolve(b)}))});else if("buffer"===b)this.size=a.length,this.bufferDeferred.resolve(a);else if("file"===b){this.size=a.fileSize;var d=new FileReader;d.onload=function(a){this.bufferDeferred.resolve(new Uint8Array(a.target.result))},d.readAsArrayBuffer(a)}}var e=a("fs"),f=a("promise-a-plus");"slice"in Uint8Array.prototype||(Uint8Array.prototype.slice=Uint8Array.prototype.subarray),d.prototype.read=function(a,b){var c=this;return b=b||0,this.bufferDeferred.promise.then(function(d){return a=a||c.size,0>b&&(b+=c.size),d.slice(b,b+a)})},d.prototype.getBuffer=function(){return this.bufferDeferred.promise},b.exports=d},{fs:8,"promise-a-plus":13}],7:[function(a,b,c){"use strict";var d={readUTF16String:function(a,b,c){var d=0,e=1,f=0;c=Math.min(c||a.length,a.length),254===a[0]&&255===a[1]?(b=!0,d=2):255===a[0]&&254===a[1]&&(b=!1,d=2),b&&(e=0,f=1);var g,h,i,j,k,l,m,n=[];for(m=0;c>d&&(g=a[d+e],h=a[d+f],k=(g<<8)+h,d+=2,0!==k);m++)216>g||g>=224?n[m]=String.fromCharCode(k):(i=a[d+e],j=a[d+f],l=(i<<8)+j,d+=2,n[m]=String.fromCharCode(k,l));return n.join("")},readUTF8String:function(a,b){var c=0;b=Math.min(b||a.length,a.length),239===a[0]&&187===a[1]&&191===a[2]&&(c=3);for(var d=[],e=0;b>c;e++){var f,g,h,i,j=a[c++];if(0===j)break;128>j?d[e]=String.fromCharCode(j):j>=194&&224>j?(f=a[c++],d[e]=String.fromCharCode(((31&j)<<6)+(63&f))):j>=224&&240>j?(f=a[c++],g=a[c++],d[e]=String.fromCharCode(((255&j)<<12)+((63&f)<<6)+(63&g))):j>=240&&245>j&&(f=a[c++],g=a[c++],h=a[c++],i=((7&j)<<18)+((63&f)<<12)+((63&g)<<6)+(63&h)-65536,d[e]=String.fromCharCode((i>>10)+55296,(1023&i)+56320))}return d.join("")},readNullTerminatedString:function(a,b){var c,d,e=[];for(b=b||a.length,c=0;b>c&&(d=a[c++],0!==d);)e[c-1]=String.fromCharCode(d);return e.join("")}};b.exports=d},{}],8:[function(a,b,c){},{}],9:[function(a,b,c){function d(a){return this instanceof d?(this.length=0,this.parent=void 0,"number"==typeof a?e(this,a):"string"==typeof a?f(this,a,arguments.length>1?arguments[1]:"utf8"):g(this,a)):arguments.length>1?new d(a,arguments[1]):new d(a)}function e(a,b){if(a=m(a,0>b?0:0|n(b)),!d.TYPED_ARRAY_SUPPORT)for(var c=0;b>c;c++)a[c]=0;return a}function f(a,b,c){("string"!=typeof c||""===c)&&(c="utf8");var d=0|p(b,c);return a=m(a,d),a.write(b,c),a}function g(a,b){if(d.isBuffer(b))return h(a,b);if(U(b))return i(a,b);if(null==b)throw new TypeError("must start with number, buffer, array or string");return"undefined"!=typeof ArrayBuffer&&b.buffer instanceof ArrayBuffer?j(a,b):b.length?k(a,b):l(a,b)}function h(a,b){var c=0|n(b.length);return a=m(a,c),b.copy(a,0,0,c),a}function i(a,b){var c=0|n(b.length);a=m(a,c);for(var d=0;c>d;d+=1)a[d]=255&b[d];return a}function j(a,b){var c=0|n(b.length);a=m(a,c);for(var d=0;c>d;d+=1)a[d]=255&b[d];return a}function k(a,b){var c=0|n(b.length);a=m(a,c);for(var d=0;c>d;d+=1)a[d]=255&b[d];return a}function l(a,b){var c,d=0;"Buffer"===b.type&&U(b.data)&&(c=b.data,d=0|n(c.length)),a=m(a,d);for(var e=0;d>e;e+=1)a[e]=255&c[e];return a}function m(a,b){d.TYPED_ARRAY_SUPPORT?a=d._augment(new Uint8Array(b)):(a.length=b,a._isBuffer=!0);var c=0!==b&&b<=d.poolSize>>>1;return c&&(a.parent=W),a}function n(a){if(a>=V)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+V.toString(16)+" bytes");return 0|a}function o(a,b){if(!(this instanceof o))return new o(a,b);var c=new d(a,b);return delete c.parent,c}function p(a,b){if("string"!=typeof a&&(a=String(a)),0===a.length)return 0;switch(b||"utf8"){case"ascii":case"binary":case"raw":return a.length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*a.length;case"hex":return a.length>>>1;case"utf8":case"utf-8":return M(a).length;case"base64":return P(a).length;default:return a.length}}function q(a,b,c,d){c=Number(c)||0;var e=a.length-c;d?(d=Number(d),d>e&&(d=e)):d=e;var f=b.length;if(f%2!==0)throw new Error("Invalid hex string");d>f/2&&(d=f/2);for(var g=0;d>g;g++){var h=parseInt(b.substr(2*g,2),16);if(isNaN(h))throw new Error("Invalid hex string");a[c+g]=h}return g}function r(a,b,c,d){return Q(M(b,a.length-c),a,c,d)}function s(a,b,c,d){return Q(N(b),a,c,d)}function t(a,b,c,d){return s(a,b,c,d)}function u(a,b,c,d){return Q(P(b),a,c,d)}function v(a,b,c,d){return Q(O(b,a.length-c),a,c,d)}function w(a,b,c){return 0===b&&c===a.length?S.fromByteArray(a):S.fromByteArray(a.slice(b,c))}function x(a,b,c){var d="",e="";c=Math.min(a.length,c);for(var f=b;c>f;f++)a[f]<=127?(d+=R(e)+String.fromCharCode(a[f]),e=""):e+="%"+a[f].toString(16);return d+R(e)}function y(a,b,c){var d="";c=Math.min(a.length,c);for(var e=b;c>e;e++)d+=String.fromCharCode(127&a[e]);return d}function z(a,b,c){var d="";c=Math.min(a.length,c);for(var e=b;c>e;e++)d+=String.fromCharCode(a[e]);return d}function A(a,b,c){var d=a.length;(!b||0>b)&&(b=0),(!c||0>c||c>d)&&(c=d);for(var e="",f=b;c>f;f++)e+=L(a[f]);return e}function B(a,b,c){for(var d=a.slice(b,c),e="",f=0;f<d.length;f+=2)e+=String.fromCharCode(d[f]+256*d[f+1]);return e}function C(a,b,c){if(a%1!==0||0>a)throw new RangeError("offset is not uint");if(a+b>c)throw new RangeError("Trying to access beyond buffer length")}function D(a,b,c,e,f,g){if(!d.isBuffer(a))throw new TypeError("buffer must be a Buffer instance");if(b>f||g>b)throw new RangeError("value is out of bounds");if(c+e>a.length)throw new RangeError("index out of range")}function E(a,b,c,d){0>b&&(b=65535+b+1);for(var e=0,f=Math.min(a.length-c,2);f>e;e++)a[c+e]=(b&255<<8*(d?e:1-e))>>>8*(d?e:1-e)}function F(a,b,c,d){0>b&&(b=4294967295+b+1);for(var e=0,f=Math.min(a.length-c,4);f>e;e++)a[c+e]=b>>>8*(d?e:3-e)&255}function G(a,b,c,d,e,f){if(b>e||f>b)throw new RangeError("value is out of bounds");if(c+d>a.length)throw new RangeError("index out of range");if(0>c)throw new RangeError("index out of range")}function H(a,b,c,d,e){return e||G(a,b,c,4,3.4028234663852886e38,-3.4028234663852886e38),T.write(a,b,c,d,23,4),c+4}function I(a,b,c,d,e){return e||G(a,b,c,8,1.7976931348623157e308,-1.7976931348623157e308),T.write(a,b,c,d,52,8),c+8}function J(a){if(a=K(a).replace(Y,""),a.length<2)return"";for(;a.length%4!==0;)a+="=";return a}function K(a){return a.trim?a.trim():a.replace(/^\s+|\s+$/g,"")}function L(a){return 16>a?"0"+a.toString(16):a.toString(16)}function M(a,b){b=b||1/0;for(var c,d=a.length,e=null,f=[],g=0;d>g;g++){if(c=a.charCodeAt(g),c>55295&&57344>c){if(!e){if(c>56319){(b-=3)>-1&&f.push(239,191,189);continue}if(g+1===d){(b-=3)>-1&&f.push(239,191,189);continue}e=c;continue}if(56320>c){(b-=3)>-1&&f.push(239,191,189),e=c;continue}c=e-55296<<10|c-56320|65536,e=null}else e&&((b-=3)>-1&&f.push(239,191,189),e=null);if(128>c){if((b-=1)<0)break;f.push(c)}else if(2048>c){if((b-=2)<0)break;f.push(c>>6|192,63&c|128)}else if(65536>c){if((b-=3)<0)break;f.push(c>>12|224,c>>6&63|128,63&c|128)}else{if(!(2097152>c))throw new Error("Invalid code point");if((b-=4)<0)break;f.push(c>>18|240,c>>12&63|128,c>>6&63|128,63&c|128)}}return f}function N(a){for(var b=[],c=0;c<a.length;c++)b.push(255&a.charCodeAt(c));return b}function O(a,b){for(var c,d,e,f=[],g=0;g<a.length&&!((b-=2)<0);g++)c=a.charCodeAt(g),d=c>>8,e=c%256,f.push(e),f.push(d);return f}function P(a){return S.toByteArray(J(a))}function Q(a,b,c,d){for(var e=0;d>e&&!(e+c>=b.length||e>=a.length);e++)b[e+c]=a[e];return e}function R(a){try{return decodeURIComponent(a)}catch(b){return String.fromCharCode(65533)}}var S=a("base64-js"),T=a("ieee754"),U=a("is-array");c.Buffer=d,c.SlowBuffer=o,c.INSPECT_MAX_BYTES=50,d.poolSize=8192;var V=1073741823,W={};d.TYPED_ARRAY_SUPPORT=function(){try{var a=new ArrayBuffer(0),b=new Uint8Array(a);return b.foo=function(){return 42},42===b.foo()&&"function"==typeof b.subarray&&0===new Uint8Array(1).subarray(1,1).byteLength}catch(c){return!1}}(),d.isBuffer=function(a){return!(null==a||!a._isBuffer)},d.compare=function(a,b){if(!d.isBuffer(a)||!d.isBuffer(b))throw new TypeError("Arguments must be Buffers");if(a===b)return 0;for(var c=a.length,e=b.length,f=0,g=Math.min(c,e);g>f&&a[f]===b[f];)++f;return f!==g&&(c=a[f],e=b[f]),e>c?-1:c>e?1:0},d.isEncoding=function(a){switch(String(a).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"raw":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},d.concat=function(a,b){if(!U(a))throw new TypeError("list argument must be an Array of Buffers.");if(0===a.length)return new d(0);if(1===a.length)return a[0];var c;if(void 0===b)for(b=0,c=0;c<a.length;c++)b+=a[c].length;var e=new d(b),f=0;for(c=0;c<a.length;c++){var g=a[c];g.copy(e,f),f+=g.length}return e},d.byteLength=p,d.prototype.length=void 0,d.prototype.parent=void 0,d.prototype.toString=function(a,b,c){var d=!1;if(b=0|b,c=void 0===c||c===1/0?this.length:0|c,a||(a="utf8"),0>b&&(b=0),c>this.length&&(c=this.length),b>=c)return"";for(;;)switch(a){case"hex":return A(this,b,c);case"utf8":case"utf-8":return x(this,b,c);case"ascii":return y(this,b,c);case"binary":return z(this,b,c);case"base64":return w(this,b,c);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return B(this,b,c);default:if(d)throw new TypeError("Unknown encoding: "+a);a=(a+"").toLowerCase(),d=!0}},d.prototype.equals=function(a){if(!d.isBuffer(a))throw new TypeError("Argument must be a Buffer");return this===a?!0:0===d.compare(this,a)},d.prototype.inspect=function(){var a="",b=c.INSPECT_MAX_BYTES;return this.length>0&&(a=this.toString("hex",0,b).match(/.{2}/g).join(" "),this.length>b&&(a+=" ... ")),"<Buffer "+a+">"},d.prototype.compare=function(a){if(!d.isBuffer(a))throw new TypeError("Argument must be a Buffer");return this===a?0:d.compare(this,a)},d.prototype.indexOf=function(a,b){function c(a,b,c){for(var d=-1,e=0;c+e<a.length;e++)if(a[c+e]===b[-1===d?0:e-d]){if(-1===d&&(d=e),e-d+1===b.length)return c+d}else d=-1;return-1}if(b>2147483647?b=2147483647:-2147483648>b&&(b=-2147483648),b>>=0,0===this.length)return-1;if(b>=this.length)return-1;if(0>b&&(b=Math.max(this.length+b,0)),"string"==typeof a)return 0===a.length?-1:String.prototype.indexOf.call(this,a,b);if(d.isBuffer(a))return c(this,a,b);if("number"==typeof a)return d.TYPED_ARRAY_SUPPORT&&"function"===Uint8Array.prototype.indexOf?Uint8Array.prototype.indexOf.call(this,a,b):c(this,[a],b);throw new TypeError("val must be string, number or Buffer")},d.prototype.get=function(a){return console.log(".get() is deprecated. Access using array indexes instead."),this.readUInt8(a)},d.prototype.set=function(a,b){return console.log(".set() is deprecated. Access using array indexes instead."),this.writeUInt8(a,b)},d.prototype.write=function(a,b,c,d){if(void 0===b)d="utf8",c=this.length,b=0;else if(void 0===c&&"string"==typeof b)d=b,c=this.length,b=0;else if(isFinite(b))b=0|b,isFinite(c)?(c=0|c,void 0===d&&(d="utf8")):(d=c,c=void 0);else{var e=d;d=b,b=0|c,c=e}var f=this.length-b;if((void 0===c||c>f)&&(c=f),a.length>0&&(0>c||0>b)||b>this.length)throw new RangeError("attempt to write outside buffer bounds");d||(d="utf8");for(var g=!1;;)switch(d){case"hex":return q(this,a,b,c);case"utf8":case"utf-8":return r(this,a,b,c);case"ascii":return s(this,a,b,c);case"binary":return t(this,a,b,c);case"base64":return u(this,a,b,c);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return v(this,a,b,c);default:if(g)throw new TypeError("Unknown encoding: "+d);d=(""+d).toLowerCase(),g=!0}},d.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},d.prototype.slice=function(a,b){var c=this.length;a=~~a,b=void 0===b?c:~~b,0>a?(a+=c,0>a&&(a=0)):a>c&&(a=c),0>b?(b+=c,0>b&&(b=0)):b>c&&(b=c),a>b&&(b=a);var e;if(d.TYPED_ARRAY_SUPPORT)e=d._augment(this.subarray(a,b));else{var f=b-a;e=new d(f,void 0);for(var g=0;f>g;g++)e[g]=this[g+a]}return e.length&&(e.parent=this.parent||this),e},d.prototype.readUIntLE=function(a,b,c){a=0|a,b=0|b,c||C(a,b,this.length);for(var d=this[a],e=1,f=0;++f<b&&(e*=256);)d+=this[a+f]*e;return d},d.prototype.readUIntBE=function(a,b,c){a=0|a,b=0|b,c||C(a,b,this.length);for(var d=this[a+--b],e=1;b>0&&(e*=256);)d+=this[a+--b]*e;return d},d.prototype.readUInt8=function(a,b){return b||C(a,1,this.length),this[a]},d.prototype.readUInt16LE=function(a,b){return b||C(a,2,this.length),this[a]|this[a+1]<<8},d.prototype.readUInt16BE=function(a,b){return b||C(a,2,this.length),this[a]<<8|this[a+1]},d.prototype.readUInt32LE=function(a,b){return b||C(a,4,this.length),(this[a]|this[a+1]<<8|this[a+2]<<16)+16777216*this[a+3]},d.prototype.readUInt32BE=function(a,b){return b||C(a,4,this.length),16777216*this[a]+(this[a+1]<<16|this[a+2]<<8|this[a+3])},d.prototype.readIntLE=function(a,b,c){a=0|a,b=0|b,c||C(a,b,this.length);for(var d=this[a],e=1,f=0;++f<b&&(e*=256);)d+=this[a+f]*e;return e*=128,d>=e&&(d-=Math.pow(2,8*b)),d},d.prototype.readIntBE=function(a,b,c){a=0|a,b=0|b,c||C(a,b,this.length);for(var d=b,e=1,f=this[a+--d];d>0&&(e*=256);)f+=this[a+--d]*e;return e*=128,f>=e&&(f-=Math.pow(2,8*b)),f},d.prototype.readInt8=function(a,b){return b||C(a,1,this.length),128&this[a]?-1*(255-this[a]+1):this[a]},d.prototype.readInt16LE=function(a,b){b||C(a,2,this.length);var c=this[a]|this[a+1]<<8;return 32768&c?4294901760|c:c},d.prototype.readInt16BE=function(a,b){b||C(a,2,this.length);var c=this[a+1]|this[a]<<8;return 32768&c?4294901760|c:c},d.prototype.readInt32LE=function(a,b){return b||C(a,4,this.length),this[a]|this[a+1]<<8|this[a+2]<<16|this[a+3]<<24},d.prototype.readInt32BE=function(a,b){return b||C(a,4,this.length),this[a]<<24|this[a+1]<<16|this[a+2]<<8|this[a+3]},d.prototype.readFloatLE=function(a,b){return b||C(a,4,this.length),T.read(this,a,!0,23,4)},d.prototype.readFloatBE=function(a,b){return b||C(a,4,this.length),T.read(this,a,!1,23,4)},d.prototype.readDoubleLE=function(a,b){return b||C(a,8,this.length),T.read(this,a,!0,52,8)},d.prototype.readDoubleBE=function(a,b){return b||C(a,8,this.length),T.read(this,a,!1,52,8)},d.prototype.writeUIntLE=function(a,b,c,d){a=+a,b=0|b,c=0|c,d||D(this,a,b,c,Math.pow(2,8*c),0);var e=1,f=0;for(this[b]=255&a;++f<c&&(e*=256);)this[b+f]=a/e&255;return b+c},d.prototype.writeUIntBE=function(a,b,c,d){a=+a,b=0|b,c=0|c,d||D(this,a,b,c,Math.pow(2,8*c),0);var e=c-1,f=1;for(this[b+e]=255&a;--e>=0&&(f*=256);)this[b+e]=a/f&255;return b+c},d.prototype.writeUInt8=function(a,b,c){return a=+a,b=0|b,c||D(this,a,b,1,255,0),d.TYPED_ARRAY_SUPPORT||(a=Math.floor(a)),this[b]=a,b+1},d.prototype.writeUInt16LE=function(a,b,c){return a=+a,b=0|b,c||D(this,a,b,2,65535,0),d.TYPED_ARRAY_SUPPORT?(this[b]=a,this[b+1]=a>>>8):E(this,a,b,!0),b+2},d.prototype.writeUInt16BE=function(a,b,c){return a=+a,b=0|b,c||D(this,a,b,2,65535,0),d.TYPED_ARRAY_SUPPORT?(this[b]=a>>>8,this[b+1]=a):E(this,a,b,!1),b+2},d.prototype.writeUInt32LE=function(a,b,c){return a=+a,b=0|b,c||D(this,a,b,4,4294967295,0),d.TYPED_ARRAY_SUPPORT?(this[b+3]=a>>>24,this[b+2]=a>>>16,this[b+1]=a>>>8,this[b]=a):F(this,a,b,!0),b+4},d.prototype.writeUInt32BE=function(a,b,c){return a=+a,b=0|b,c||D(this,a,b,4,4294967295,0),d.TYPED_ARRAY_SUPPORT?(this[b]=a>>>24,this[b+1]=a>>>16,this[b+2]=a>>>8,this[b+3]=a):F(this,a,b,!1),b+4},d.prototype.writeIntLE=function(a,b,c,d){if(a=+a,b=0|b,!d){var e=Math.pow(2,8*c-1);D(this,a,b,c,e-1,-e)}var f=0,g=1,h=0>a?1:0;for(this[b]=255&a;++f<c&&(g*=256);)this[b+f]=(a/g>>0)-h&255;return b+c},d.prototype.writeIntBE=function(a,b,c,d){if(a=+a,b=0|b,!d){var e=Math.pow(2,8*c-1);D(this,a,b,c,e-1,-e)}var f=c-1,g=1,h=0>a?1:0;for(this[b+f]=255&a;--f>=0&&(g*=256);)this[b+f]=(a/g>>0)-h&255;return b+c},d.prototype.writeInt8=function(a,b,c){return a=+a,b=0|b,c||D(this,a,b,1,127,-128),d.TYPED_ARRAY_SUPPORT||(a=Math.floor(a)),0>a&&(a=255+a+1),this[b]=a,b+1},d.prototype.writeInt16LE=function(a,b,c){return a=+a,b=0|b,c||D(this,a,b,2,32767,-32768),d.TYPED_ARRAY_SUPPORT?(this[b]=a,this[b+1]=a>>>8):E(this,a,b,!0),b+2},d.prototype.writeInt16BE=function(a,b,c){return a=+a,b=0|b,c||D(this,a,b,2,32767,-32768),d.TYPED_ARRAY_SUPPORT?(this[b]=a>>>8,this[b+1]=a):E(this,a,b,!1),b+2},d.prototype.writeInt32LE=function(a,b,c){return a=+a,b=0|b,c||D(this,a,b,4,2147483647,-2147483648),d.TYPED_ARRAY_SUPPORT?(this[b]=a,this[b+1]=a>>>8,this[b+2]=a>>>16,this[b+3]=a>>>24):F(this,a,b,!0),b+4},d.prototype.writeInt32BE=function(a,b,c){return a=+a,b=0|b,c||D(this,a,b,4,2147483647,-2147483648),0>a&&(a=4294967295+a+1),d.TYPED_ARRAY_SUPPORT?(this[b]=a>>>24,this[b+1]=a>>>16,this[b+2]=a>>>8,this[b+3]=a):F(this,a,b,!1),b+4},d.prototype.writeFloatLE=function(a,b,c){return H(this,a,b,!0,c)},d.prototype.writeFloatBE=function(a,b,c){return H(this,a,b,!1,c)},d.prototype.writeDoubleLE=function(a,b,c){return I(this,a,b,!0,c)},d.prototype.writeDoubleBE=function(a,b,c){return I(this,a,b,!1,c)},d.prototype.copy=function(a,b,c,e){if(c||(c=0),e||0===e||(e=this.length),b>=a.length&&(b=a.length),b||(b=0),e>0&&c>e&&(e=c),e===c)return 0;if(0===a.length||0===this.length)return 0;if(0>b)throw new RangeError("targetStart out of bounds");if(0>c||c>=this.length)throw new RangeError("sourceStart out of bounds");if(0>e)throw new RangeError("sourceEnd out of bounds");e>this.length&&(e=this.length),a.length-b<e-c&&(e=a.length-b+c);var f=e-c;if(1e3>f||!d.TYPED_ARRAY_SUPPORT)for(var g=0;f>g;g++)a[g+b]=this[g+c];else a._set(this.subarray(c,c+f),b);return f},d.prototype.fill=function(a,b,c){if(a||(a=0),b||(b=0),c||(c=this.length),b>c)throw new RangeError("end < start");if(c!==b&&0!==this.length){if(0>b||b>=this.length)throw new RangeError("start out of bounds");if(0>c||c>this.length)throw new RangeError("end out of bounds");var d;if("number"==typeof a)for(d=b;c>d;d++)this[d]=a;else{var e=M(a.toString()),f=e.length;for(d=b;c>d;d++)this[d]=e[d%f]}return this}},d.prototype.toArrayBuffer=function(){if("undefined"!=typeof Uint8Array){if(d.TYPED_ARRAY_SUPPORT)return new d(this).buffer;for(var a=new Uint8Array(this.length),b=0,c=a.length;c>b;b+=1)a[b]=this[b];return a.buffer}throw new TypeError("Buffer.toArrayBuffer not supported in this browser")};var X=d.prototype;d._augment=function(a){return a.constructor=d,a._isBuffer=!0,a._set=a.set,a.get=X.get,a.set=X.set,a.write=X.write,a.toString=X.toString,a.toLocaleString=X.toString,a.toJSON=X.toJSON,a.equals=X.equals,a.compare=X.compare,a.indexOf=X.indexOf,a.copy=X.copy,a.slice=X.slice,a.readUIntLE=X.readUIntLE,a.readUIntBE=X.readUIntBE,a.readUInt8=X.readUInt8,a.readUInt16LE=X.readUInt16LE,a.readUInt16BE=X.readUInt16BE,a.readUInt32LE=X.readUInt32LE,a.readUInt32BE=X.readUInt32BE,a.readIntLE=X.readIntLE,a.readIntBE=X.readIntBE,a.readInt8=X.readInt8,a.readInt16LE=X.readInt16LE,a.readInt16BE=X.readInt16BE,a.readInt32LE=X.readInt32LE,a.readInt32BE=X.readInt32BE,a.readFloatLE=X.readFloatLE,a.readFloatBE=X.readFloatBE,a.readDoubleLE=X.readDoubleLE,a.readDoubleBE=X.readDoubleBE,a.writeUInt8=X.writeUInt8,a.writeUIntLE=X.writeUIntLE,a.writeUIntBE=X.writeUIntBE,a.writeUInt16LE=X.writeUInt16LE,a.writeUInt16BE=X.writeUInt16BE,a.writeUInt32LE=X.writeUInt32LE,a.writeUInt32BE=X.writeUInt32BE,a.writeIntLE=X.writeIntLE,a.writeIntBE=X.writeIntBE,a.writeInt8=X.writeInt8,a.writeInt16LE=X.writeInt16LE,a.writeInt16BE=X.writeInt16BE,a.writeInt32LE=X.writeInt32LE,a.writeInt32BE=X.writeInt32BE,a.writeFloatLE=X.writeFloatLE,a.writeFloatBE=X.writeFloatBE,a.writeDoubleLE=X.writeDoubleLE,a.writeDoubleBE=X.writeDoubleBE,a.fill=X.fill,a.inspect=X.inspect,a.toArrayBuffer=X.toArrayBuffer,a};var Y=/[^+\/0-9A-z\-]/g},{"base64-js":10,ieee754:11,"is-array":12}],10:[function(a,b,c){var d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";!function(a){"use strict";function b(a){var b=a.charCodeAt(0);return b===g||b===l?62:b===h||b===m?63:i>b?-1:i+10>b?b-i+26+26:k+26>b?b-k:j+26>b?b-j+26:void 0}function c(a){function c(a){j[l++]=a}var d,e,g,h,i,j;if(a.length%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var k=a.length;i="="===a.charAt(k-2)?2:"="===a.charAt(k-1)?1:0,j=new f(3*a.length/4-i),g=i>0?a.length-4:a.length;var l=0;for(d=0,e=0;g>d;d+=4,e+=3)h=b(a.charAt(d))<<18|b(a.charAt(d+1))<<12|b(a.charAt(d+2))<<6|b(a.charAt(d+3)),c((16711680&h)>>16),c((65280&h)>>8),c(255&h);return 2===i?(h=b(a.charAt(d))<<2|b(a.charAt(d+1))>>4,c(255&h)):1===i&&(h=b(a.charAt(d))<<10|b(a.charAt(d+1))<<4|b(a.charAt(d+2))>>2,c(h>>8&255),c(255&h)),j}function e(a){function b(a){return d.charAt(a)}function c(a){return b(a>>18&63)+b(a>>12&63)+b(a>>6&63)+b(63&a)}var e,f,g,h=a.length%3,i="";for(e=0,g=a.length-h;g>e;e+=3)f=(a[e]<<16)+(a[e+1]<<8)+a[e+2],i+=c(f);switch(h){case 1:f=a[a.length-1],i+=b(f>>2),i+=b(f<<4&63),i+="==";break;case 2:f=(a[a.length-2]<<8)+a[a.length-1],i+=b(f>>10),i+=b(f>>4&63),i+=b(f<<2&63),i+="="}return i}var f="undefined"!=typeof Uint8Array?Uint8Array:Array,g="+".charCodeAt(0),h="/".charCodeAt(0),i="0".charCodeAt(0),j="a".charCodeAt(0),k="A".charCodeAt(0),l="-".charCodeAt(0),m="_".charCodeAt(0);a.toByteArray=c,a.fromByteArray=e}("undefined"==typeof c?this.base64js={}:c)},{}],11:[function(a,b,c){c.read=function(a,b,c,d,e){var f,g,h=8*e-d-1,i=(1<<h)-1,j=i>>1,k=-7,l=c?e-1:0,m=c?-1:1,n=a[b+l];for(l+=m,f=n&(1<<-k)-1,n>>=-k,k+=h;k>0;f=256*f+a[b+l],l+=m,k-=8);for(g=f&(1<<-k)-1,f>>=-k,k+=d;k>0;g=256*g+a[b+l],l+=m,k-=8);if(0===f)f=1-j;else{if(f===i)return g?NaN:(n?-1:1)*(1/0);g+=Math.pow(2,d),f-=j}return(n?-1:1)*g*Math.pow(2,f-d)},c.write=function(a,b,c,d,e,f){var g,h,i,j=8*f-e-1,k=(1<<j)-1,l=k>>1,m=23===e?Math.pow(2,-24)-Math.pow(2,-77):0,n=d?0:f-1,o=d?1:-1,p=0>b||0===b&&0>1/b?1:0;for(b=Math.abs(b),isNaN(b)||b===1/0?(h=isNaN(b)?1:0,g=k):(g=Math.floor(Math.log(b)/Math.LN2),
b*(i=Math.pow(2,-g))<1&&(g--,i*=2),b+=g+l>=1?m/i:m*Math.pow(2,1-l),b*i>=2&&(g++,i/=2),g+l>=k?(h=0,g=k):g+l>=1?(h=(b*i-1)*Math.pow(2,e),g+=l):(h=b*Math.pow(2,l-1)*Math.pow(2,e),g=0));e>=8;a[c+n]=255&h,n+=o,h/=256,e-=8);for(g=g<<e|h,j+=e;j>0;a[c+n]=255&g,n+=o,g/=256,j-=8);a[c+n-o]|=128*p}},{}],12:[function(a,b,c){var d=Array.isArray,e=Object.prototype.toString;b.exports=d||function(a){return!!a&&"[object Array]"==e.call(a)}},{}],13:[function(a,b,c){"use strict";function d(a){function b(a){l=h,m=a,n.forEach(k),n=null}function c(a){l=i,m=a,n.forEach(k),n=null}function j(a){try{var d=e(a);if(d)return void f(function(){d.apply(a,arguments)},j,c);b(a)}catch(g){c(g)}}function k(a){l===g?n.push(a):(l===h&&"function"==typeof a.onFulfilled&&a.onFulfilled(m),l===i&&"function"==typeof a.onRejected&&a.onRejected(m))}var l=g,m=null,n=[];this.done=function(a,b){setTimeout(function(){k({onFulfilled:a,onRejected:b})},0)};var o=function(a,b){var c,e=this,f=new d(function(d,g){return e.done(function(b){if("function"!=typeof a)return d(b);try{return c=a(b),c===f?g(new TypeError("The `promise` and `x` refer to the same object.")):d(c)}catch(e){return g(e)}},function(a){if("function"!=typeof b)return g(a);try{return c=b(a),c===f?g(new TypeError("The `promise` and `x` refer to the same object.")):d(c)}catch(e){return g(e)}})});return f};this.then=o,this["catch"]=function(a){return o.call(this,void 0,a)},f(a,j,c)}function e(a){var b,c=typeof a;return!a||"object"!==c&&"function"!==c||(b=a.then,"function"!=typeof b)?null:b}function f(a,b,c){var d=!1;try{a(function(a){d||(d=!0,setTimeout(function(){b(a)},0))},function(a){d||(d=!0,setTimeout(function(){c(a)},0))})}catch(e){if(d)return;d=!0,setTimeout(function(){c(e)},0)}}var g=0,h=1,i=2;d.resolve=function(a){return new d(function(b,c){b(a)})},d.reject=function(a){return new d(function(b,c){c(a)})},d.all=function(a){var b,c,e,f=[],g=0;if(!a||!(b=a.length))throw new Error("ArgumentsError: currently only array is allowed");return new d(function(h,i){for(e=0;b>e;e++)!function(e){c=a[e],c instanceof d||(c=d.resolve(c)),c["catch"](function(a){i(a)}),c.then(function(a){f[e]=a,++g===b&&h(f)})}(e)})},b.exports=d},{}]},{},[1]);