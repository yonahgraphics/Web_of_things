let resources = require('../resources/model');
var redLED;
var greenLED;
var pluginName = 'ledPlugin';
var localParams = {'simulate':  false, 'frequency': 2000};
var model = resources.pi.actuators.led;
var actutator;

exports.start = function (params) {
localParams = params;
observe(model);
if (localParams.simulate) {
	simulate();
} else {
	connectHardware();
}
};

exports.stop = function () {
if (localParams.simulate) {
	clearInterval(interval);
} else {
	actuator.unexport();
}
console.info('%s plugin stopped!', pluginName);
};

function observe(what) {
	Object.observe(what, function (changes) {
	console.info('Change detected by plugin for %s...', pluginName);
	switchOnOff(model.value);
});
};

function switchOnOff(value) {
if (!localParams.simulate) {
	redLED.write(value === true ? 1 : 0, function () {
	console.info('Changed value of %s to %s', pluginName, value);
});
greenLED.write(value === true ? 1 : 0, function () {
	console.info('Changed value of %s to %s', pluginName, value);
});
}
};

function connectHardware() {
var Gpio = require('onoff').Gpio;
redLED = new Gpio(model.gpio, 'out');
console.info('Hardware %s actuator started!', pluginName);
greenLED = new Gpio(model.gpio, 'out');
};