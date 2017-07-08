var WebSocket = require('websocket-stream');
const read = require('readable-stream')
const Readable = read.Readable;
const through2 = require('through2');

module.exports = function(server){
  this.ws = null;
  this.server = server;

  this.init = function(path,pushToFunc) {
    this.ws = WebSocket.createServer({
      server: this.server,
      binary: false,
      perMessageDeflate: false,
      path: path
    }, this.handle(pushToFunc));
    return this;
  }

  this.handle = function(pushToFunc) {
    return function(stream, request) {
      const pStream = Readable({objectMode: true});
      pStream._read = function(){};
      setInterval(function(){
        pushToFunc(pStream);
      }, 500);
      const getPerc = through2.obj(function(data, enc, cb){
        cb(null, JSON.stringify(data));
      });
      pStream.pipe(getPerc).pipe(stream)
    }
  }
}
