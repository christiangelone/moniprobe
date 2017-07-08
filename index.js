var CPUInfoWebSocket = require('./ws/cpuinfo_ws');
var NetworkInfoWebSocket = require('./ws/networkinfo_ws');
var Monitor = require('./monitor/monitor');

var restify = require('restify');
servers = {
            monitor: restify.createServer({name: 'Moniprobe Monitor'}),
            cpu: restify.createServer({name: 'Moniprobe CPU'}),
            interface: restify.createServer({name: 'Moniprobe Network Interface'}),
          }

new CPUInfoWebSocket(servers).init();
new NetworkInfoWebSocket(servers).init();
new Monitor(servers).init();

var i = 1;
for (var prop in servers) {
  var server = servers[prop];
  server.listen(9000 + i);
  console.log('%s listening at %s....', server.name, server.url);
  i++;
}
