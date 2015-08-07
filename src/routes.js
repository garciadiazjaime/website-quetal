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
	<Route path="/" handler={Layout}>
		<DefaultRoute name="home" handler={HomeSection}/>
		<Route name="homepage" path="/inicio"  handler={HomeSection} />

		<Route name="coverage" path="/coberturas" handler={CoverageSection} />
		
		<Route name="aboutus" path="/nosotros" handler={AboutusSection} />
		<Route name="whyUs" path="/nosotros/por-que-nosotros" handler={AboutusSection} />
		<Route name="whoAreWe" path="/nosotros/quienes-somos" handler={AboutusSection} />

		<Route name="contact" path="/contacto" handler={ContactUsSection} />
		<Route name="disaster" path="/contacto/siniestro" handler={ContactUsSection} />
		<Route name="contactForm" path="/contacto/forma" handler={ContactUsSection} />


	</Route>
);

module.exports = routes;