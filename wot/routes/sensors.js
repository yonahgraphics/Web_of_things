let express = require('express'),
    router = express.Router(),
    resources = require('../resources/model');

router.route('/').get(function(req, res, next) {
    res.send(resources.pi.sensors);
});

router.route('/pir').get(function(req, res, next) {
    res.send(resources.pi.sensors.pir);
});

module.exports = router;