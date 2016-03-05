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
        '<title>Quetal | Mi seguro de auto</title>' +
        '<meta charset="utf-8">' +
        '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">' +
        '<meta name="author" content="http://mintitmedia.com">' +
        '<link href="/vendor.css" rel="stylesheet" />' +
        '<link href="/screen.css" rel="stylesheet" />' +
        '<link rel="icon" type="image/png" href="/img/favicon.ico">' +
        '</head>' +
        '<body>' + 
        '<div id="app">' + data + '</div>' + 
        '<script src=/vendor.js></script>' +
        '<script src=/bundle.js></script>' +
        '<script> var MyApp = React.createFactory(require("myApp")); </script>'+
        '</body>' +
        '</html>';
}

module.exports = router;