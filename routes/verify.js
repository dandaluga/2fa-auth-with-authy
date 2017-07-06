var express = require('express');
var router = express.Router();
var authy = require('authy')('Your Authy API Key Here');

router.get('/', function(req, res, next) {
    res.render('verify', { title: 'Verify' });
});

//route: verify a provided verification token against a given user
router.post('/', function (req, res, next) {
    var uid = req.body.uid;
    var token = req.body.token;

    console.log("uid=" + uid);
    console.log("token=" + token);

    authy.verify(uid, token, function (err, response) {
        if (err) {
            res.send(err);
        } else {
            //expected response:
            //{ message: 'Token is valid.',
            //  token: 'is valid',
            //  success: 'true' }
            var token = response.token;
            var message = response.message;
            var success = response.success;
            res.send(response);
            //res.render('verify', {title: 'Verify', token: {token: token, message: message, success: success}});
        }
    });
});

module.exports = router;
