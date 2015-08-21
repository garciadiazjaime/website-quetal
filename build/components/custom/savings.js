'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');

var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;

var savingsBlock = React.createClass({displayName: "savingsBlock",

    mixins : [ReactRouter.Navigation],
    
    handleClick: function(){
        console.log('handleClick');
        // this.transitionTo('home');
    },

    render: function() {

        return (
            React.createElement("div", {id: "savingsCallToAction", className: "smallContainer"}, 
                React.createElement(Row, null, 
                    React.createElement(Col, {xs: 12, sm: 6}, 
                        React.createElement("p", null, "Ahorra desde un 20% en tu Seguro de Auto comprando a través de ", React.createElement("span", {className: "logo"}, "Quetal")), 
                        React.createElement("p", {className: "notes"}, "*En comparación con otros portales de venta de Seguros por internet.")
                    ), 
                    React.createElement(Col, {xs: 12, sm: 6}, 
                        React.createElement("a", {href: "cotizacion", title: "Cotiza tu Seguro", className: "blueButton", target: "_blank"}, "Cotiza tu Seguro")
                    )
                )
            )
        );
    }
});

module.exports = savingsBlock;
