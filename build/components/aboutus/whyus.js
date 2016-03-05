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
                        React.createElement("li", {className: "col-xs-12 col-sm-4"}, 
                            React.createElement("div", {className: "wrap"}, 
                                "Te ofrecemos el seguro de auto más barato", 
                                React.createElement("span", {className: "notes"}, "*En comparación con otros portales de venta de seguros por internet.")
                            )
                        ), 
                        React.createElement("li", {className: "col-xs-12 col-sm-4"}, 
                            React.createElement("div", {className: "wrap"}, 
                                "Contamos con el respaldo de ", React.createElement("span", {id: "insuranceLogoColor"}, "General de seguros")
                            )
                        ), 
                        React.createElement("li", {className: "col-xs-12 col-sm-4"}, 
                            React.createElement("div", {className: "wrap"}, 
                                "Por nuestro compromiso y profesionalismo." 
                            )
                        )
                    )
                )
            )
        );
    }
});

module.exports = WhyUsPanel;
