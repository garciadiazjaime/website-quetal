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


    handleClick: function(){
        console.log('handleClick');
        this.transitionTo('inicio');
        this.transitionTo('coberturas');
        this.transitionTo('nosotros');
        this.transitionTo('contacto');
    },

    render: function() {
        return (
            React.createElement(Navbar, {brand: React.createElement(Link, {to: "home", className: "navbar-brand", title: "Quetal | Volver a inicio"}, "Quetal | Volver a inicio"), toggleNavKey: 0, className: "navbar-static-top"}, 
                React.createElement(CollapsibleNav, {eventKey: 0}, " ", /* This is the eventKey referenced */
                  React.createElement(Nav, {navbar: true}, 
                    React.createElement(NavItem, {eventKey: 1, href: "/inicio", onClick: this.handleClick.bind(this, 'home')}, "Inicio"), 
                    React.createElement(NavItem, {eventKey: 2, href: "/coberturas", onClick: this.handleClick.bind(this, 'coverage')}, "Coberturas"), 
                    React.createElement(NavItem, {eventKey: 3, href: "/nosotros", onClick: this.handleClick.bind(this, 'aboutus')}, "Nosotros"), 
                    React.createElement(NavItem, {eventKey: 4, href: "/contacto", onClick: this.handleClick.bind(this, 'contact')}, "Contacto"), 
                    React.createElement(NavItem, {eventKey: 5, href: this.props.data.cotizaLink, target: "_blank", className: "external"}, "Cotiza")
                  )
                ), 
                React.createElement(SocialWidget, null)
            )
        );
    }
});

module.exports = HeaderSection;
