var express = require('express');
var router = express.Router();
var conf = require('../config.js');
var sendgrid = require("sendgrid")(conf.get('sendgrid'));


router.post('/send_email', function(req, res) {

    var fromname = req.body.fromname;
    var replyto = req.body.replyto;
    var subject = req.body.subject;
    var html = req.body.html;

    var email = new sendgrid.Email({
        to: conf.get('email'),
        from: conf.get('email'),
        fromname: fromname,
        replyto: replyto,
        subject: subject,
        bcc: ['info@mintitmedia.com'],
        html: html
    });

    sendgrid.send(email, function(err, json) {
        var response = true;
        if (err) {
            console.error(err);
            response = false;
        } else {
          console.log('email sent', err, json);
        }
        res.send({
            status: response
        });
    });
});

module.exports = router;
