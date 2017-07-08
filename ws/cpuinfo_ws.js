var WebSocket = require('./ws');
var Maths = require('../utils/maths')
var Time = require('../utils/time')
var Size = require('../utils/size')
var os = require('os');

module.exports = function(server){
  this.wss = [];
  this.server = server;

  this.init = function() {
    this.wss.push(new WebSocket(this.server['cpu']).init('/cpu',this.infoPush));
    return this;
  }

  this.infoPush = function(stream){
    var cpu_usage = Maths.round(os.loadavg()[0]);
    var freemem = Maths.round(Size.fromBytesToGB(os.freemem()));
    var totalmem = Maths.round(Size.fromBytesToGB(os.totalmem()));
    var ram_usage = Maths.round(totalmem - freemem);
    var ram_usage_p = Maths.round((ram_usage / totalmem) * 100);
    //var cpuspeed = Size.fromMhzToGhz(os.cpus()[0]['speed']);
    stream.push({
        os_type: os.type(),
        os_release: os.release(),
        arch: os.arch(),
        endianness: os.endianness(),
        cpu_model: os.cpus()[0]['model'],
        cpu_usage_p: cpu_usage,
        ram_usage_p: ram_usage_p,
        ram_usage_gb: ram_usage,
        ram_free_gb: freemem,
        uptime: Time.prettyTime(os.uptime()),
        hostname: os.hostname()
    });
  }
}
