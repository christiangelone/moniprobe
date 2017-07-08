var restify = require('restify');

module.exports = function(servers){
  this.server = servers['monitor'];

  this.init = function() {
    this.server.get(/.*/, restify.plugins.serveStatic({
      'directory': 'monitor/views',
      'default': 'index.html'
    }));
  }
}
