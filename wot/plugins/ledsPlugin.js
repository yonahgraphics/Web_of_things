let resources = require('../resources/model');
var redLED;
var greenLED;
var pluginName = 'ledPlugin';
var localParams = {'simulate':  false, 'frequency': 2000};
var model = resources.pi.actuators.leds;
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
//      Object.observe(what, function (changes) {
        console.info('Change detected by plugin for %s...', pluginName);
        switchOnOff(what.red.value, what.green.value);
};

function switchOnOff(value1, value2) {
if (!localParams.simulate) {
        redLED.write(value1 === true ? 1 : 0, function () {
        console.info('Changed value of %s to %s', pluginName, value1);
});
greenLED.write(value2 === true ? 1 : 0, function () {
        console.info('Changed value of %s to %s', pluginName, value2);
});
}
};

function simulate(){
        console.log("simulate function!");
}

function connectHardware() {
var Gpio = require('onoff').Gpio;
redLED = new Gpio(model.gpio, 'out');
console.info('Hardware %s actuator started!', pluginName);
greenLED = new Gpio(model.gpio, 'out');
};
