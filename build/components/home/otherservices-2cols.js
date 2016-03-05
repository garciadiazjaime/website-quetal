'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');

var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;
var ModalActions = require('../../actions/ModalActions');


var HomeOtherServicesPanel = React.createClass({displayName: "HomeOtherServicesPanel",

    mixins : [ReactRouter.Navigation],

    render: function() {

        return (
            React.createElement("section", {id: "otherServices"}, 
                React.createElement("div", {className: "container"}, 
                    React.createElement(Row, null, 
                        React.createElement(Col, {xs: 12, sm: 6}, 
                            React.createElement("div", {className: "otherServices-block"}, 
                                React.createElement("div", null, 
                                    React.createElement("h3", null, "Autos Fronterizos o Legalizados"), 
                                    React.createElement("p", null, 
                                        React.createElement("a", {href: this.props.data.cotizaLink, target: "_blank", title: "Cotiza", className: "blueButton"}, "Cotiza"), 
                                        React.createElement("span", {id: "borderCarIcon"})
                                    ), 
                                    React.createElement("a", {onClick: this.handleClick.bind(this, 'fronterizo'), className: "arrowLink"}, "Ver detalles")
                                )
                            )
                        ), 
                        React.createElement(Col, {xs: 12, sm: 6}, 
                            React.createElement("div", {className: "otherServices-block"}, 
                                React.createElement("div", null, 
                                    React.createElement("h3", null, "RC Obligatoria Federal / Estatal"), 
                                    React.createElement("p", null, 
                                        React.createElement("a", {href: this.props.data.rcObligatorioLink, target: "_blank", title: "Cotiza", className: "blueButton"}, "Cotiza"), 
                                        React.createElement("span", {id: "civilResponsibilityIcon"})
                                    ), 
                                    React.createElement("a", {onClick: this.handleClick.bind(this, 'federal'), className: "arrowLink"}, "Ver detalles")
                                )
                            )
                        )
                    )
                ), 
                React.createElement("div", {className: "smallContainer"}, 
                    React.createElement(Row, null, 
                        React.createElement(Col, {xs: 12, sm: 5}, 
                            React.createElement("p", {id: "substituteCar"}, React.createElement("span", null, "Automóvil Sustituto"))
                        ), 
                        React.createElement(Col, {xs: 12, sm: 7}, 
                            React.createElement("p", null, "General de Seguros te ofrece un auto sustituto mientras reparamos tu auto por colisión o te pagamos tu automóvil por perdida total o robo total. "), 
                            React.createElement("p", null, "Al contratar tu Seguro:"), 
                            React.createElement(Row, {id: "substituteCar-ParticipantInsurance"}, 
                                React.createElement(Col, {xs: 12, sm: 4}, 
                                    React.createElement("p", null, React.createElement("span", null, "GS Autos "), " Amplia")
                                ), 
                                React.createElement(Col, {xs: 12, sm: 2}, 
                                    React.createElement("p", null, "o")
                                ), 
                                React.createElement(Col, {xs: 12, sm: 4}, 
                                    React.createElement("p", null, React.createElement("span", null, "GS Autos "), " Prestigio")
                                )
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

module.exports = HomeOtherServicesPanel;
