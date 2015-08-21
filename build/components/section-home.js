'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var CarouselPanel = require('./home/carousel');
var ServicesPanel = require('./home/services');
var OtherServicesPanel = require('./home/otherservices');
var WhatToDo = require('./custom/whattodo');

var rb = require('react-bootstrap');
var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;

var HomeSection = React.createClass({displayName: "HomeSection",

    mixins : [ReactRouter.Navigation],
    
    handleClick: function(){
        console.log('handleClick');
        // this.transitionTo('schedule');
    },

    handleChange: function(e){
        console.log('handleChange');
        // console.log(e.target.value);
    },

    render: function() {

        return (
            React.createElement("div", {id: "mainContent"}, 
                React.createElement(CarouselPanel, null), 
                React.createElement(ServicesPanel, null), 
                React.createElement(OtherServicesPanel, null), 
                React.createElement(WhatToDo, null)
            )
        );
    }
});

module.exports = HomeSection;
