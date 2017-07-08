(function() {

    /**
     * Callback should be defines as:
     * function(interface, bytesPerSecDown, bytesPerSecUp){}
     * and will be run for every interface, not as batch.
     */

    function check(callback, interface) {

        // Default to every interface except loopback.
        if (typeof interfaces != "object") {
            interfaces = ["%lo"];
        }

        var exec = require('child_process').exec;
        exec("ethtool " + interface + " | grep Speed", function(error, stdout, stderr) {
            if (!error) {
              var lines = stdout.split(" ");
              var value = lines[1].split("M");
              callback(parseInt(value[0]));
            }else{
              callback("unknown", 0, 0);
            }
        });
    }

    // Export public API
    var ethtool = {};
    ethtool.check = check;
    module.exports = ethtool;

}());
