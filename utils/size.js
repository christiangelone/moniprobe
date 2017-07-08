var bytesToGB = function(bytes) {
  return (bytes / 1073741824);
}

var bytesToKb = function(bytes) {
  return ((bytes * 8) / 1024);
}

var MbToKb = function(kb) {
  return (kb * 1024);
}

var MhzToGHz = function(mhz) {
  return mhz / 1000;
}

exports.fromMbToKb = MbToKb;
exports.fromBytesToKb = bytesToKb;
exports.fromBytesToGB = bytesToGB;
exports.fromMhzToGhz = MhzToGHz;
