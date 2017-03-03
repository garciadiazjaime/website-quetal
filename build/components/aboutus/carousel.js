'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');

var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;
var Carousel = rb.Carousel;
var CarouselItem = rb.CarouselItem;
var Link = ReactRouter.Link;

var AboutusCarouselPanel = React.createClass({displayName: "AboutusCarouselPanel",

    mixins : [ReactRouter.Navigation],

    handleClick: function(){
        console.log('handleClick');
        // this.transitionTo('home');
    },

    render: function() {

        return (
            React.createElement("section", {id: "aboutusIntro"}, 
                React.createElement(Carousel, {id: "aboutusCarousel", interval: 7000}, 
                    React.createElement(CarouselItem, null, 
                        React.createElement("div", {className: "container"}, 
                            React.createElement("p", null, "Hay muchas razones por las que NO se ", React.createElement("em", null, "comparan"), " con nosotros")
                        )
                    ), 
                    React.createElement(CarouselItem, null, 
                        React.createElement("div", {className: "container"}, 
                            React.createElement("p", null, "6 meses sin intereses con Banamex Y American Express")
                        )
                    ), 
                    React.createElement(CarouselItem, null, 
                        React.createElement("div", {className: "container"}, 
                            React.createElement("p", null, "Aceptamos tarjetas VISA, MasterCard y American Express")
                        )
                    )
                )
            )
        );
    }
});

module.exports = AboutusCarouselPanel;
