'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');
var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;
var Carousel = rb.Carousel;
var CarouselItem = rb.CarouselItem;
var CarouselPanel = require('./panel-aboutus-carousel');
var WhyUsPanel = require('./panel-aboutus-whyus');
var WhoAreWePanel = require('./panel-aboutus-whoarewe');
var SavingsBlock = require('./block-savings');

var AboutusPanel = React.createClass({

    mixins : [ReactRouter.Navigation],
    
    handleClick: function(){
        console.log('handleClick');
        // this.transitionTo('home');
    },

    render: function() {

        return (
            <section id="nosotros">
                <CarouselPanel />
                <WhyUsPanel />
                <WhoAreWePanel />
                <SavingsBlock />
            </section>
        );
    }
});

module.exports = AboutusPanel;
