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
                        React.createElement(Col, {xs: 12, sm: 12}, 
                          React.createElement("div", {className: "otherServices-block"}, 
                              React.createElement("div", {style: {minHeight: '200px'}}, 
                                React.createElement("div", {className: "col-sm-8 col-xs-12"}, 
                                  React.createElement("h3", null, "RC Obligatoria ", React.createElement("br", null), "Federal"), 
                                  React.createElement("p", null, 
                                    React.createElement("span", {id: "civilResponsibilityIcon"})
                                  ), 
                                  React.createElement("p", null, 
                                    React.createElement("a", {onClick: this.handleClick.bind(this, 'federal'), className: "arrowLink pull-left", style: {marginTop: '10px'}}, "Ver detalles")
                                  )
                                ), 
                                React.createElement("div", {className: "col-sm-3 col-xs-12"}, 
                                  React.createElement("a", {href: this.props.data.rcObligatorioLink, target: "_blank", title: "Cotiza", className: "blueButton"}, "Cotiza Aquí")
                                )
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
