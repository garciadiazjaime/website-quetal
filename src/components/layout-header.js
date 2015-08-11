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


var SocialElement = require('./element-social');

var Button = rb.Button;
var Link = ReactRouter.Link;

var HeaderSection = React.createClass({

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
            <Navbar brand='Volver a inicio de Quetal' toggleNavKey={0}  className="navbar-static-top">
                <CollapsibleNav eventKey={0}> {/* This is the eventKey referenced */}
                  <Nav navbar>
                    <NavItem eventKey={1} href='/inicio' onClick={this.handleClick.bind(this, 'homepage')}>Inicio</NavItem>
                    <NavItem eventKey={2} href='/coberturas' onClick={this.handleClick.bind(this, 'coverage')}>Coberturas</NavItem>
                    <NavItem eventKey={3} href='/nosotros' onClick={this.handleClick.bind(this, 'aboutus')}>Nosotros</NavItem>
                    <NavItem eventKey={4} href='/contacto' onClick={this.handleClick.bind(this, 'contact')}>Contacto</NavItem>
                    <NavItem eventKey={5} href='/cotiza' target="_blank" className="external">Cotiza</NavItem>
                  </Nav>
                </CollapsibleNav>
                <SocialElement />
            </Navbar>
        );
    }
});

module.exports = HeaderSection;
