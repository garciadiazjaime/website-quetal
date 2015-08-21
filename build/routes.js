var React = require('react');
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;

var Layout = require('./components/layout');
var HomeSection = require('./components/section-home');
var CoverageSection = require('./components/section-coverage');
var AboutusSection = require('./components/section-aboutus');
var ContactUsSection = require('./components/section-contactus');

var routes = (
	React.createElement(Route, {path: "/", handler: Layout}, 
		React.createElement(DefaultRoute, {name: "home", handler: HomeSection}), 
		React.createElement(Route, {name: "homepage", path: "/inicio", handler: HomeSection}), 

		React.createElement(Route, {name: "coverage", path: "/coberturas", handler: CoverageSection}), 
		
		React.createElement(Route, {name: "aboutus", path: "/nosotros", handler: AboutusSection}), 
		React.createElement(Route, {name: "whyus", path: "/nosotros/por-que-nosotros", handler: AboutusSection}), 
		React.createElement(Route, {name: "whoarewe", path: "/nosotros/quienes-somos", handler: AboutusSection}), 

		React.createElement(Route, {name: "contact", path: "/contacto", handler: ContactUsSection}), 
		React.createElement(Route, {name: "disaster", path: "/contacto/siniestro", handler: ContactUsSection}), 
		React.createElement(Route, {name: "contactform", path: "/contacto/forma", handler: ContactUsSection})
	)
);

module.exports = routes;