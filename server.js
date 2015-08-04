var express = require('express'),
    app = express(),
    path = require("path"),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    routes = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

app.set('ipaddress', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 3000);


app.listen(app.get('port'), app.get('ipaddress'), function(err) {
    if (err) throw err;
    console.log('Listening on ' + app.get('ipaddress') + ':' + app.get('port') + '...');
});
