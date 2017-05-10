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

var HeaderSection = React.createClass({

    mixins : [ReactRouter.Navigation],

    render: function() {
        return (
            <Navbar brand={<Link to="home" className='navbar-brand' title="Quetal | Volver a inicio">Quetal | Volver a inicio</Link>} toggleNavKey={0}  className="navbar-static-top">
                <CollapsibleNav eventKey={0}> {/* This is the eventKey referenced */}
                  <Nav navbar>
                    <li><Link to="homepage">Inicio</Link></li>
                    <li><Link to="coverage">Coberturas</Link></li>
                    <li><Link to="aboutus">Nosotros</Link></li>
                    <li><Link to="contact">Contacto</Link></li>
                    <li><a href={this.props.data.cotizaLink} target="_blank" className="external">Cotiza</a></li>
                  </Nav>
                </CollapsibleNav>
                <SocialWidget />
            </Navbar>
        );
    }
});

module.exports = HeaderSection;
