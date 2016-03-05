'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');

var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;
var Link = ReactRouter.Link;

var WhatToDo = React.createClass({displayName: "WhatToDo",

    mixins : [ReactRouter.Navigation],
    
    handleClick: function(){
        console.log('handleClick');
        // this.transitionTo('home');
    },

    render: function() {

        return ( 
            React.createElement("section", {id: "callToAction"}, 
                React.createElement("div", {className: "smallContainer"}, 
                    React.createElement(Row, null, 
                        React.createElement(Col, {xs: 12, sm: 6}, 
                            React.createElement("p", null, React.createElement("span", null, "¿Qué hacer en"), " caso de Siniestro?")
                        ), 
                        React.createElement(Col, {xs: 12, sm: 6}, 
                            React.createElement(Link, {to: "disaster", title: "Contáctanos", className: "greenButton"}, "Contáctanos")
                        )
                    )
                )
            )
        );
    }
});

module.exports = WhatToDo;
