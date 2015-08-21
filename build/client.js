'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var routes = require('./routes')

ReactRouter.run(routes, ReactRouter.HistoryLocation, function (Root) {
	React.render(React.createElement(Root, null), document.getElementById('app'));
});
