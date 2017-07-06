var express = require('express');
var router = express.Router();
var authy = require('authy')('Your Authy API Key Here');

router.get('/', function(req, res, next) {
    res.render('sms', { title: 'SMS' });
});

//route: send authy SMS message with verification code
router.post('/', function (req, res, next) {
    var uid = req.body.uid;
    console.log("uid=" + uid);

    authy.request_sms(uid, function (err, response) {
        if (err) {
            res.send(err);
        } else {
            //expected response:
            //{ success: true,
            //  message: 'SMS token was sent',
            //  cellphone: '+1-XX12362760' }
            var cellphone = response.cellphone;
            var message = response.message;
            var success = response.success;
            //res.send(response);               // Returns the JSON response from authy
            //res.render('sms', {title: 'SMS', sms: {cellphone: cellphone, message: message, success: success}});
            res.render('verify', {title: 'Verify', verify: {cellphone: cellphone, message: message, success: success}});
        }
    });
});

module.exports = router;
