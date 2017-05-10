'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');

var Nav = rb.Nav;
var Navbar = rb.Navbar;
var NavItem = rb.NavItem;
var Button = rb.Button;
var DropdownButton = rb.DropdownButton;
var CollapsibleNav = rb.CollapsibleNav;

var SocialWidget = require('./../widgets/social-link-widget');

var Button = rb.Button;
var Link = ReactRouter.Link;

var HeaderSection = React.createClass({displayName: "HeaderSection",

    mixins : [ReactRouter.Navigation],

    render: function() {
        return (
            React.createElement(Navbar, {brand: React.createElement(Link, {to: "home", className: "navbar-brand", title: "Quetal | Volver a inicio"}, "Quetal | Volver a inicio"), toggleNavKey: 0, className: "navbar-static-top"}, 
                React.createElement(CollapsibleNav, {eventKey: 0}, " ", /* This is the eventKey referenced */
                  React.createElement(Nav, {navbar: true}, 
                    React.createElement("li", null, React.createElement(Link, {to: "homepage"}, "Inicio")), 
                    React.createElement("li", null, React.createElement(Link, {to: "coverage"}, "Coberturas")), 
                    React.createElement("li", null, React.createElement(Link, {to: "aboutus"}, "Nosotros")), 
                    React.createElement("li", null, React.createElement(Link, {to: "contact"}, "Contacto")), 
                    React.createElement("li", null, React.createElement("a", {href: this.props.data.cotizaLink, target: "_blank", className: "external"}, "Cotiza"))
                  )
                ), 
                React.createElement(SocialWidget, null)
            )
        );
    }
});

module.exports = HeaderSection;
