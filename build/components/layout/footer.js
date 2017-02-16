'use strict';

var React = require('react');
var ReactRouter = require('react-router');

var rb = require('react-bootstrap');
var Row = rb.Row;
var Col = rb.Col;
var Link = ReactRouter.Link;

var ModalActions = require('../../actions/ModalActions');
var SocialWidget = require('../widgets/social-link-widget');


var FooterSection = React.createClass({displayName: "FooterSection",

  render: function() {
    var date = new Date();
    return (
        React.createElement("div", null, 
            React.createElement("div", {className: "container"}, 
                React.createElement(Row, null, 
                    React.createElement(Col, {xs: 12, sm: 7}, 
                        React.createElement("nav", {id: "footerNavigation"}, 
                            React.createElement("ul", null, 
                                React.createElement("li", null, 
                                    React.createElement("h5", null, React.createElement(Link, {to: "coverage", title: "Coberturas"}, "Coberturas")), 
                                    React.createElement("ul", null, 
                                        React.createElement("li", null, 
                                            React.createElement("a", {onClick: this.handleClick.bind(this, 'basica')}, "Básica")
                                        ), 
                                        React.createElement("li", null, 
                                            React.createElement("a", {onClick: this.handleClick.bind(this, 'limitada')}, "Limitada")
                                        ), 
                                        React.createElement("li", null, 
                                            React.createElement("a", {onClick: this.handleClick.bind(this, 'amplia')}, "Amplia")
                                        ), 
                                        React.createElement("li", null, 
                                            React.createElement("a", {onClick: this.handleClick.bind(this, 'fronterizo')}, "Autos Fronterizos")
                                        ), 
                                        React.createElement("li", null, 
                                            React.createElement("a", {onClick: this.handleClick.bind(this, 'federal')}, "RC Obligatoria")
                                        )
                                    )
                                ), React.createElement("li", null, 
                                    React.createElement("h5", null, React.createElement(Link, {to: "aboutus", title: "Nosotros"}, "Nosotros")), 
                                    React.createElement("ul", null, 
                                        React.createElement("li", null, React.createElement(Link, {to: "whyus", title: "Por qué Nosotros"}, "Por qué Nosotros")), 
                                        React.createElement("li", null, React.createElement(Link, {to: "whoarewe", title: "Quiénes somos"}, "Quiénes somos"))
                                    )
                                ), React.createElement("li", null, 
                                    React.createElement("h5", null, React.createElement(Link, {to: "contact", title: "Contacto"}, "Contacto")), 
                                    React.createElement("ul", null, 
                                        React.createElement("li", null, React.createElement(Link, {to: "disaster", title: "En caso de Siniestro"}, "En caso de Siniestro")), 
                                        React.createElement("li", null, React.createElement(Link, {to: "contactform", title: "Contáctanos"}, "Contáctanos"))
                                    )
                                ), React.createElement("li", null, 
                                    React.createElement("h5", null, React.createElement("a", {href: this.props.data.cotizaLink, title: "Cotiza", target: "_blank"}, "Cotiza"))
                                )
                            )
                        )
                    ), 
                    React.createElement(Col, {xs: 12, sm: 5}, 
                        React.createElement("span", {id: "brand-footer"}, "Quetal - Mi seguro de auto"), 
                        React.createElement("p", null, "Con el respaldo de:"), 
                        React.createElement("a", {href: "http://www.generaldeseguros.mx/", target: "_blank"}, React.createElement("span", {className: "general-logo"}, "General de seguros")), 
                        React.createElement(SocialWidget, null)
                    )
                )
            ), 
            React.createElement("div", {id: "footerExtras"}, 
                React.createElement("div", {className: "container"}, 
                    React.createElement(Row, null, 
                        React.createElement(Col, {xs: 12, sm: 5}, 
                            React.createElement("p", null, "Todos los derechos reservados Quetal Seguro de auto  ", date.getFullYear()), 
                            React.createElement("p", null, React.createElement(Link, {to: "privacy", title: "Quiénes somos"}, "AVISO DE PRIVACIDAD"))
                        ), 
                        React.createElement(Col, {xs: 12, sm: 4}, 
                            React.createElement("p", {id: "credit"}, React.createElement("span", null, "Un proyecto de: ", React.createElement("a", {href: "http://somospool.com/", title: "Visita Branding POOL", target: "_blank"}, "POOL")), "Código por: ", React.createElement("a", {href: "http://mintitmedia.com/", title: "Mint IT Media - Diseño y desarrollo web", target: "_blank"}, "MINT"))
                        ), 
                        React.createElement(Col, {xs: 12, sm: 3}, 
                            React.createElement("a", {href: "", title: "Ver términos y condiciones"}, "Términos y Condiciones.")
                        )
                    )
                )
            )
        )
    );
  },

  handleClick: function(coverage){
        ModalActions.openModal(coverage);
    }
});

module.exports = FooterSection;
