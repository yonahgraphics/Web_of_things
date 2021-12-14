let httpServer = require('./servers/http'),
resources      = require('./resources/model');
const PORT     = resources.pi.port;
var ledsPlugin  = require('./plugins/ledsPlugin');
ledsPlugin.start({'simulate': true, frequency: 2000});
var pirPlugin  = require('./plugins/pirPlugin');
pirPlugin.start({'simulate': true, frequency: 2000});

let server = httpServer.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});