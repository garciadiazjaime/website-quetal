'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');
var ModalActions = require('../../actions/ModalActions');

var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;


var HomeServicesPanel = React.createClass({displayName: "HomeServicesPanel",

    mixins : [ReactRouter.Navigation],

    render: function() {

        return (
            React.createElement("section", {id: "homeServices"}, 
                React.createElement("div", {className: "smallContainer"}, 
                    React.createElement("h1", null, "Contrata el paquete que necesitas"), 
                    React.createElement(Row, null, 
                        React.createElement(Col, {xs: 12, sm: 7}, 
                            React.createElement("p", {className: "medium"}, "En todas nuestras Coberturas cuentas con Seguro de Gastos Médicos para ocupantes del vehículo en caso de accidente." + ' ' +
"Además, dispones de los servicios de Asistencia Legal y Asistencia en el Camino.")
                        ), 
                        React.createElement(Col, {xs: 12, sm: 5}
                        )
                    )
                ), 
                React.createElement("div", {className: "container"}, 
                    React.createElement(Row, {id: "servicesList"}, 
                        React.createElement(Col, {xs: 12, sm: 4, className: "featured"}, 
                            React.createElement("div", {className: "servicesList-wrap"}, 
                                React.createElement("h3", null, React.createElement("span", {className: "wrap"}, "¿Qué tal si te cuidamos bien? "), React.createElement("span", {id: "comfortIcon"})), 
                                React.createElement("div", {className: "servicesList-details"}, 
                                    React.createElement("h2", null, "Cobertura Confort Amplia"), 
                                    React.createElement("ul", {className: "checklist"}, 
                                        React.createElement("li", null, "Daños a tu vehículo"), 
                                        React.createElement("li", null, "Robo"), 
                                        React.createElement("li", null, "Daños a terceros")
                                    )
                                ), 
                                React.createElement("a", {href: this.props.data.cotizaLink, target: "_blank", title: "Cotiza", className: "blueButton"}, "Cotiza")
                            ), 
                            React.createElement("a", {onClick: this.handleClick.bind(this, 'amplia'), className: "arrowLink"}, "Ver detalles")
                        ), 
                        React.createElement(Col, {xs: 12, sm: 4}, 
                            React.createElement("div", {className: "servicesList-wrap"}, 
                                React.createElement("h3", null, React.createElement("span", {className: "wrap"}, "¿Qué tal si tú pones los límites? "), React.createElement("span", {id: "limitedComfortIcon"})), 
                                React.createElement("div", {className: "servicesList-details"}, 
                                    React.createElement("h2", null, "Cobertura Confort Limitada"), 
                                    React.createElement("ul", {className: "checklist"}, 
                                        React.createElement("li", null, "Robo"), 
                                        React.createElement("li", null, "Daños a terceros")
                                    )
                                ), 
                                React.createElement("a", {href: this.props.data.cotizaLink, target: "_blank", title: "Cotiza", className: "blueButton"}, "Cotiza")
                            ), 
                            React.createElement("a", {onClick: this.handleClick.bind(this, 'limitada'), className: "arrowLink"}, "Ver detalles")
                        ), 
                        React.createElement(Col, {xs: 12, sm: 4}, 
                            React.createElement("div", {className: "servicesList-wrap"}, 
                                React.createElement("h3", null, React.createElement("span", {className: "wrap"}, "¿Qué tal si quieres un Seguro como tú lo necesitas?"), React.createElement("span", {id: "basicComfortIcon"})), 
                                React.createElement("div", {className: "servicesList-details last-service"}, 
                                    React.createElement("h2", null, "Cobertura Confort Básica"), 
                                    React.createElement("ul", {className: "checklist"}, 
                                        React.createElement("li", null, "Daños a terceros")
                                    )
                                ), 
                                React.createElement("a", {href: this.props.data.cotizaLink, target: "_blank", title: "Cotiza", className: "blueButton"}, "Cotiza")
                            ), 
                            React.createElement("a", {onClick: this.handleClick.bind(this, 'basica'), className: "arrowLink"}, "Ver detalles")
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

module.exports = HomeServicesPanel;
