(function() {

    /**
     * Callback should be defines as:
     * function(interface, bytesPerSecDown, bytesPerSecUp){}
     * and will be run for every interface, not as batch.
     */

    function check(callback, interfaces) {

        // Default to every interface except loopback.
        if (typeof interfaces != "object") {
            interfaces = ["%lo"];
        }

        var exec = require('child_process').exec;
        exec("bwm-ng -c 1 -u bytes -I " + interfaces.join(',') + " -o csv -T current", function(error, stdout, stderr) {
            if (!error) {
                var lines = stdout.split("\n");
                for (var l in lines) {
                    var ifdata = lines[l].split(";");

                    // Skip total and empty lines.
                    if (ifdata[1] == "total" || lines[l] == "") {
                        continue;
                    }

                    callback(ifdata[1], parseInt(ifdata[3]), parseInt(ifdata[2]));
                }
            }else{
              callback("unknown", 0, 0);
            }
        });

    }

    // Export public API
    var bwm = {};
    bwm.check = check;
    module.exports = bwm;

}());
