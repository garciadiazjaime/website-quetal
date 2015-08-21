var express = require('express'),
    app = express(),
    path = require("path"),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    routes = require('./routes'),
    apiRoutes = require('./routes/api'),
    conf = require('./config.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/api/', apiRoutes);

app.set('ipaddress', conf.get('ipaddress'));
app.set('port', conf.get('port'));

app.listen(app.get('port'), app.get('ipaddress'), function(err) {
    if (err) throw err;
    console.log('Listening on ' + app.get('ipaddress') + ':' + app.get('port') + '...');
});
