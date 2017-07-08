var msToSecs = function(ms) {
  return (ms / 1000);
}

var secsToMins = function(s) {
  return (s / 60);
}

var secsToHours = function(s) {
  return (secsToMins(s) / 60);
}

var secsToDays = function(s) {
  return (secsToHours(s) / 24);
}

var pretty = function(seconds) {
  var days = Math.floor(secsToDays(seconds));
  var hours = Math.floor(secsToHours(seconds % 86400));
  var minutes = Math.floor(secsToMins((seconds % 86400) % 3600));
  var seconds = ((seconds % 86400) % 3600) % 60;
  return {days: days, hours: hours, minutes: minutes, seconds: seconds};
}

exports.fromMsToSecs = msToSecs;
exports.fromSecsToMinutes = secsToMins;
exports.fromSecsToHours = secsToHours;
exports.fromSecsToDays = secsToDays;
exports.prettyTime = pretty;
