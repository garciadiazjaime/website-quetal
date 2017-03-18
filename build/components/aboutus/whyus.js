'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');

var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;

var WhyUsPanel = React.createClass({displayName: "WhyUsPanel",

    mixins : [ReactRouter.Navigation],

    handleClick: function(){
        console.log('handleClick');
        // this.transitionTo('home');
    },

    render: function() {

        return (
            React.createElement("section", {id: "whyus"}, 
                React.createElement("div", {className: "container"}, 
                    React.createElement("h1", null, "¿Por qué comprar a través de ", React.createElement("span", {className: "logo"}, "Quetal™"), "?"), 
                    React.createElement("ol", {className: "row"}, 
                        React.createElement("li", {className: "col-xs-12 col-sm-3"}, 
                            React.createElement("div", {className: "wrap"}, 
                              "QUETAL es agente persona moral autorizado por la CNSF ", React.createElement("br", null), 
                              React.createElement("a", {href: "https://www.gob.mx/cnsf", title: "COMISION NACIONAL DE SEGUROS Y FIANZAS", target: "_blank"}, 
                                React.createElement("img", {src: "/img/aboutus/logo_cnsf.png", alt: "COMISION NACIONAL DE SEGUROS Y FIANZAS", width: "200px"})
                              )
                            )
                        ), 
                        React.createElement("li", {className: "col-xs-12 col-sm-3"}, 
                            React.createElement("div", {className: "wrap"}, 
                              "Contamos con el respaldo de ", React.createElement("br", null), React.createElement("br", null), 
                              React.createElement("a", {href: "http://www.generaldeseguros.mx/", target: "_blank"}, React.createElement("img", {src: "/img/aboutus/logo_general.png", alt: "General de seguros", width: "200px"}))
                            )
                        ), 
                        React.createElement("li", {className: "col-xs-12 col-sm-3"}, 
                            React.createElement("div", {className: "wrap"}, 
                                "Somos el único Agente autorizado para venta en línea de GS"
                            )
                        ), 
                        React.createElement("li", {className: "col-xs-12 col-sm-3"}, 
                            React.createElement("div", {className: "wrap"}, 
                                "Porque te otorgamos el máximo descuento autorizado por GS"
                            )
                        )
                    )
                )
            )
        );
    }
});

module.exports = WhyUsPanel;
