'use strict';

/*
 * @name: id3 tag parser#Reader
 * @author: creeperyang
 * @date: Tue Jun 16 2015 16:28:35 GMT+0800
*/
var fs = require('fs');
var Promise = require('promise-a-plus');

// in chrome enviroment, Uint8Array may not have slice
if(!('slice' in Uint8Array.prototype)) {
    Uint8Array.prototype.slice = Uint8Array.prototype.subarray;
}

/*
 * Reader Constructor
 *
 * @param {String|File|Buffer|Uint8Array} url - the file url, file or buffer
 * @param {String} type - optional, specify url's type. 1. fileurl(node) 2. remoteurl(ajax) 3. file(browser input file) 4. buffer(Buffer or Uint8Array)
*/
function Reader(url, type) {
    var self = this;
    this.url = url;
    this.type = type || 'fileurl';
    this.size = 0;

    this.bufferDeferred = Promise.deferred();

    if(self.type === 'fileurl') {
        fs.stat(self.url, function(err, stats) {
            if(err) {
                return self.bufferDeferred.reject(err);
            }
            self.size = stats.size;
            fs.readFile(self.url, function(err, buffer) {
                if(err) {
                    return self.bufferDeferred.reject(err);
                }
                self.bufferDeferred.resolve(buffer);
            });
        });
    } else if(type === 'buffer') {
        this.size = url.length;
        this.bufferDeferred.resolve(url);
    } else if(type === 'file') {
        this.size = url.fileSize;
        var reader = new FileReader();
        reader.onload = function(e) {
            this.bufferDeferred.resolve(new Uint8Array(e.target.result)); 
        };
        reader.readAsArrayBuffer(url);
    } else {
        // ajax and others not supported yet.
    }
}

Reader.prototype.read = function(length, offset) {
    var self = this;
    offset = offset || 0;
    return this.bufferDeferred.promise.then(function(buffer) {
        length = length || self.size;
        if(offset < 0) {
            offset += self.size;
        }
        return buffer.slice(offset, offset + length);
    });
};

Reader.prototype.getBuffer = function() {
    return this.bufferDeferred.promise;
};

module.exports = Reader;
