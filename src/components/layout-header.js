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
        this.transitionTo('nosotros');
        this.transitionTo('cortes');
        this.transitionTo('color');
        this.transitionTo('peinados');
        this.transitionTo('maquillaje');
        this.transitionTo('novias');
        this.transitionTo('boutique');
        this.transitionTo('contacto');
    },

    render: function() {
        return (
            <Navbar brand='Volver a inicio de Quetal' toggleNavKey={0}  className="navbar-static-top">
                <CollapsibleNav eventKey={0}> {/* This is the eventKey referenced */}
                  <Nav navbar>
                    <NavItem eventKey={1} href='inicio'>Inicio</NavItem>
                    <NavItem eventKey={2} href='coberturas'>Coberturas</NavItem>
                    <NavItem eventKey={2} href='nosotros'>Nosotros</NavItem>
                    <NavItem eventKey={4} href='contacto'>Contacto</NavItem>
                  </Nav>
                </CollapsibleNav>
                <Button bsStyle='primary' bsSize='large' onClick={this.open}>
                  Cotiza
                </Button>
                <SocialElement />
            </Navbar>
        );
    }
});

module.exports = HeaderSection;
