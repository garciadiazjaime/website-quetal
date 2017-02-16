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

var AboutusCarouselPanel = React.createClass({

    mixins : [ReactRouter.Navigation],

    handleClick: function(){
        console.log('handleClick');
        // this.transitionTo('home');
    },

    render: function() {

        return (
            <section id="aboutusIntro">
                <Carousel id="aboutusCarousel" interval={7000}>
                    <CarouselItem>
                        <div className="container">
                            <p>Hay muchas razones por las que NO se <em>comparan</em> con nosotros</p>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="container">
                            <p>6 meses sin intereses con BBVA Bancomer, Banamex Y American Express</p>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="container">
                            <p>Aceptamos tarjetas visa, Master Card y American Express</p>
                        </div>
                    </CarouselItem>
                </Carousel>
            </section>
        );
    }
});

module.exports = AboutusCarouselPanel;
