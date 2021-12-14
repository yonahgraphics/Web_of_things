

var resources = require('../resources/model');
var interval, sensor;
var model = resources.pi.sensors.pir;
var pluginName = 'pluginName';
var localParams = {'simulate': false, 'frequency': 2000};
var leds = resources.pi.actuators.leds;
var leds_Plugin  = require('./ledsPlugin');

//var value = (leds.red.readSync() + 1) % 2;
//var value1 = (value + 1) % 2;

var greenGpio;
var redGpio;

exports.start = function (params) {
localParams = params;
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
sensor.unexport();
}
console.info('%s plugin stopped!', pluginName);
};


function connectHardware() {
    var Gpio = require('onoff').Gpio;
    sensor = new Gpio(model.gpio, 'in', 'both');
    redGpio = new Gpio(leds.red.gpio, 'out');
    greenGpio   = new Gpio(leds.green, 'out');

    sensor.watch(function (err, value) {
    if (err) exit(err);
    model.value = !!value;
    showValue();
    });
    console.info('Hardware %s sensor started!', pluginName);
    };


function simulate() {
    interval = setInterval(function () {
    model.value = !model.value;
    showValue();
    }, localParams.frequency);
    console.info('Simulated %s sensor started!', pluginName);
    };

function showValue() {


  console.info(model.value ? 'there is someone!' : 'not anymore!');
        //leds_Plugin.observe(leds);

interval = setInterval(function () {


//var value = (redGpio.readSync() + 1) % 2;
var value = 1;
var value1 = (value + 1) % 2;

if(model.value){
        redGpio.write(value, function() {
        console.log("Changed RED state to: " + value);
});
        green.write(value1, function() {
        console.log("Changed GREEN state to: " + value1);
});
}
else
{
        console.log("not anymore!");
}
}, 300);
};




