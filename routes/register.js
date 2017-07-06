var express = require('express');
var router = express.Router();
var authy = require('authy')('Your Authy API Key Here');

router.get('/', function(req, res, next) {
    res.render('register', { title: 'Register' });
});

router.post('/', function (req, res, next) {
    var email = req.body.email;
    var number = req.body.number;

    //console.log("body=" + req.body);
    console.log("email=" + email);
    console.log("number=" + number);

    authy.register_user(email, number, function (err, response) {
        if (err) {
            res.send(err);
        } else {
            var userId = response.user.id;
            var message = response.message;
            var success = response.success;
            console.log("userId=" + userId);
            console.log("message=" + message);
            console.log("success=" + success);
            req.session.userid = userId;
            //res.send(response);                   // Returns the JSON response from authy
            //res.redirect('/?userId=' + userId);   // Will redirect passing back the userid from authy
            res.render('index', {title: 'Two Factor Authentication Test', user: {id: userId, message: message, success: success}});
        }
    });
})

module.exports = router;
