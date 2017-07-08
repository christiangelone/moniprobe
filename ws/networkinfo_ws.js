var WebSocket = require('./ws');
var Maths = require('../utils/maths')
var Time = require('../utils/time')
var Size = require('../utils/size')
var Maths = require('../utils/maths')
var network = require('network');
var bmw = require('../utils/bwm-ng');
var ethtool = require('../utils/ethtool');

module.exports = function(server){
  this.wss = [];
  this.server = server;

  this.init = function() {
    this.wss.push(new WebSocket(this.server['interface']).init('/interface',this.infoPush));
    return this;
  }

  this.infoPush = function(stream){
    network.get_active_interface(function(err, int) {
      network.get_public_ip(function(err, public_ip) {
        if(int != null){
          bmw.check(function(interface, bytesPerSecDown, bytesPerSecUp){
            ethtool.check(function(intSpeed){
              var down_kbps = Maths.round(Size.fromBytesToKb(bytesPerSecDown));
              var up_kbps = Maths.round(Size.fromBytesToKb(bytesPerSecUp));
              var down_p = Maths.round((down_kbps / Size.fromMbToKb(intSpeed)) * 100);
              var up_p = Maths.round((up_kbps / Size.fromMbToKb(intSpeed)) * 100)
              stream.push({
                  type: int.type,
                  name: int.name,
                  mac: int.mac_address,
                  public_ip:  public_ip,
                  private_ip: int.ip_address,
                  netmask: int.netmask,
                  gateway: int.gateway_ip,
                  int_speed_mbps: intSpeed,
                  speed_down_p: down_p,
                  speed_up_p: up_p,
                  speed_down_kbps: down_kbps,
                  speed_up_kbps: up_kbps
              });
            },int.name);
          }, [int.name]);
        }else{
          var unknown = "N/A";
          stream.push({
              type: unknown,
              name: unknown,
              mac: unknown,
              public_ip: unknown,
              private_ip: unknown,
              netmask: unknown,
              gateway: unknown,
              int_speed: -1,
              speed_down_p: 0,
              speed_up_p: 0,
              speed_down_kbps: -1,
              speed_up_kbps: -1
          });
        }
      });
    });
  }
}
