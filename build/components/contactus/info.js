'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');

var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;

var ContactForm = require('./form');

var HelloPanel = React.createClass({displayName: "HelloPanel",

    mixins : [ReactRouter.Navigation],
    
    handleClick: function(){
        console.log('handleClick');
        // this.transitionTo('home');
    },

    render: function() {

        return (
            React.createElement("section", {id: "contactInfo"}, 
                React.createElement("div", {className: "smallContainer"}, 
                    React.createElement(Row, null, 
                        React.createElement(Col, {xs: 12, sm: 6, id: "disaster"}, 
                            React.createElement("h2", null, React.createElement("em", null, React.createElement("span", {className: "hidden"}, "Contáctanos "), "En caso de Siniestro"), 
                                "Reporte de Robo, Choque o Asistencia Legal"
                            ), 
                            React.createElement("p", {className: "instructionsParagraph"}, React.createElement("em", null, "Llama a los siguientes teléfonos"), 
                            "de General de Seguros para que envíen a un ajustador para que te auxilie, nunca negocies por tu cuenta, permite que el ajustador te aconseje para que  el siniestro se resuelva de la mejor manera, recuerda que ellos son los expertos y además pagaste por ese servicio."
                            ), 
                            React.createElement("ul", null, 
                                React.createElement("li", null, 
                                    "En el Distrito Federal", 
                                    React.createElement("a", {href: "tel:52708888", className: "tel", tel: "Llámanos desde el D.F."}, "5270.8888")
                                ), 
                                React.createElement("li", null, 
                                    "Del Interior de la República", 
                                    React.createElement("a", {href: "tel:018004727696", className: "tel", tel: "Llámanos desde el interior de la república"}, "01800.GS.APOYO ", React.createElement("span", {className: "telMeaning"}, "47.27696"))
                                ), 
                                React.createElement("li", null, 
                                    "Asistencia en Viajes y Auxilio Vial en el Distrito Federal e Interior del País, marque sin costo", 
                                    React.createElement("a", {href: "tel:018004729832", className: "tel", tel: "Llámanos para asistencia desde el interior del país"}, "01800.GS.AYUDA ", React.createElement("span", {className: "telMeaning"}, "47.29832"))
                                )
                            )
                        ), 
                        React.createElement(Col, {xs: 12, sm: 6, id: "contactform"}, 
                            React.createElement(ContactForm, null)
                        )
                    )
                )
            )
        );
    }
});

module.exports = HelloPanel;
