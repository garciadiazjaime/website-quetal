'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');
var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;
var Carousel = rb.Carousel;
var CarouselItem = rb.CarouselItem;
var CarouselPanel = require('./aboutus/carousel');
var WhyUsPanel = require('./aboutus/whyus');
var WhoAreWePanel = require('./aboutus/whoarewe');
var SavingsBlock = require('./custom/savings');

var AboutusPanel = React.createClass({displayName: "AboutusPanel",

    mixins : [ReactRouter.Navigation],

    handleClick: function(){
        console.log('handleClick');
        // this.transitionTo('home');
    },

    render: function() {

        return (
            React.createElement("section", {id: "mainContent"}, 
                React.createElement(CarouselPanel, null), 
                React.createElement(WhyUsPanel, null), 
                React.createElement(WhoAreWePanel, null), 
                React.createElement(SavingsBlock, {data: this.props.data})
            )
        );
    }
});

module.exports = AboutusPanel;
