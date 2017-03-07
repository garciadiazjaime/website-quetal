var express = require('express');
var router = express.Router();

var React = require('react');
var ReactRouter = require('react-router');
var routes = require('../build/routes.js');

/* GET home page. */
router.get('*', function(req, res) {

	ReactRouter.run(routes, req.path, function(Root, state){
      var htmlRender = React.renderToString(React.createElement(Root));
      res.send(getHTML(htmlRender));
    });

    // // Our data to be passed in to the React component for rendering
    // var props = {data: ['any','data','you','want','to','send','in']}
    // // Render the component, pass in data as props
    // var myAppHtml = React.renderToString(MyApp(props))
});

function getHTML(data) {
	return '<!doctype html>' +
        '<html>' +
        '<head>' +
        '<title>Quetal | Mi seguro de Auto</title>' +
        '<meta charset="utf-8">' +
        '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">' +
        '<meta name="author" content="http://mintitmedia.com">' +
        '<meta property="og:url" content="http://www.quetalsegurodeauto.com/" />' +
        '<meta property="og:type" content="website" />' +
        '<meta property="og:title" content="Quetal | Mi seguro de Auto" />' +
        '<meta property="og:description" content="En todas nuestras Coberturas cuentas con Seguro de Gastos Médicos para ocupantes del vehículo en caso de accidente." />' +
        '<meta property="og:image" content="http://www.quetalsegurodeauto.com/img/logo.png" />' +
        '<link href="/vendor.css" rel="stylesheet" />' +
        '<link href="/screen.css" rel="stylesheet" />' +
        '<link rel="icon" type="image/png" href="/img/favicon.ico">' +
        '</head>' +
        '<body>' +
        '<div id="app">' + data + '</div>' +
        '<script src=/vendor.js></script>' +
        '<script src=/bundle.js></script>' +
        '<script> var MyApp = React.createFactory(require("myApp")); </script>'+
        '<script>(function(i,s,o,g,r,a,m){i[\'GoogleAnalyticsObject\']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,\'script\',\'https://www.google-analytics.com/analytics.js\',\'ga\');ga(\'create\', \'UA-93202829-1\', \'auto\');ga(\'send\', \'pageview\');</script>'
        '</body>' +
        '</html>';
}

module.exports = router;
