'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var CarouselPanel = require('./panel-home-carousel');
var ServicesPanel = require('./panel-home-services');
var OtherServicesPanel = require('./panel-home-otherservices');
var CallToActionPanel = require('./panel-home-calltoaction');

var rb = require('react-bootstrap');
var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;

var HomeSection = React.createClass({

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
            <div id="mainContent">
                <CarouselPanel />
                <ServicesPanel />
                <OtherServicesPanel />
                <CallToActionPanel />
            </div>
        );
    }
});

module.exports = HomeSection;
