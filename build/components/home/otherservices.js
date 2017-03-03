'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
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
                              React.createElement("div", {style: {minHeight: '200px'}}, 
                                React.createElement("div", {className: "col-sm-12 col-xs-12"}, 
                                  React.createElement("h3", null, "RC Obligatoria ", React.createElement("br", null), "Federal"), 
                                  React.createElement("p", null, 
                                    React.createElement("span", {id: "civilResponsibilityIcon"})
                                  )
                                ), 
                                React.createElement("div", {className: "col-sm-12 col-xs-12"}, 
                                  React.createElement("a", {href: this.props.data.rcObligatorioLink, target: "_blank", title: "Cotiza", className: "blueButton"}, "Cotiza Aquí"), 
                                  React.createElement("a", {onClick: this.handleClick.bind(this, 'federal'), className: "arrowLink pull-right", style: {marginTop: '25px'}}, "Ver detalles")
                                )
                              )
                          )
                        ), 
                        React.createElement(Col, {xs: 12, sm: 6}, 
                          React.createElement("div", {className: "otherServices-block"}, 
                              React.createElement("div", {style: {minHeight: '200px'}}, 
                                React.createElement("div", {className: "col-sm-12 col-xs-12"}, 
                                  React.createElement("h3", null, "Autos Fronterizos y Legalizados"), 
                                  React.createElement("p", null, 
                                    React.createElement("span", {id: "civilResponsibilityIcon"})
                                  )
                                ), 
                                React.createElement("div", {className: "col-sm-12 col-xs-12"}, 
                                  React.createElement(Link, {to: "contact", title: "Cotiza", className: "blueButton"}, 
                                    "664.976.6363"
                                  ), 
                                  React.createElement("a", {onClick: this.handleClick.bind(this, 'fronterizo'), className: "arrowLink pull-right", style: {marginTop: '25px'}}, "Ver detalles")
                                )
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
