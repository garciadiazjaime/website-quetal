'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');

var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;
var Carousel = rb.Carousel;
var CarouselItem = rb.CarouselItem;

var HomeCarouselPanel = React.createClass({

    mixins : [ReactRouter.Navigation],
    
    handleClick: function(){
        console.log('handleClick');
        // this.transitionTo('home');
    },

    render: function() {

        return (
            <section id="homeIntro">
                <Carousel id="homeCarousel" interval="3000">
                    <CarouselItem>
                        <div className="container">
                            <Row>
                                <Col xs={12} sm={6}>
                                    <p className="bigPhrase">
                                        <span>Hola, Quetal</span> un Seguro de auto a tu alcance
                                    </p> 
                                    <a href="#" title="Ver Coberturas" className="yellowButton">Ver Coberturas</a>
                                    <span className="general-logo">General de seguros</span>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <blockquote><span>Justo lo que necesito,</span> <span>y al precio</span> <span>más barato</span></blockquote>
                                </Col>
                            </Row>
                            <span className="manImage"></span>  
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="container">
                            <Row>
                                <Col xs={12} sm={7}>
                                    <p className="bigPhrase narrow">
                                        <span>Ahorra</span> desde un 20% en tu Seguro de Auto
                                    </p>
                                    <p className="restrictions">*En comparación con otros portales de venta
de seguros por internet.</p>
                                    <a href="#" title="Ver Coberturas" className="yellowButton">Ver Coberturas</a>
                                    <span className="general-logo">General de seguros</span>
                                </Col>
                                <Col xs={12} sm={5}>
                                </Col>
                            </Row>
                            <span className="womanImage"></span>  
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="container">
                            <Row>
                                <Col xs={12} sm={6}>
                                    <p className="bigPhrase">
                                        <span className="inline">¿Quetal</span> si choco?
                                    </p> 
                                    <p>Conoce nuestras Coberturas contra Daños a Terceros y Daños a tu Automóvil.</p>
                                    <a href="#" title="Ver Coberturas" className="yellowButton">Ver Coberturas</a>
                                    <span className="general-logo">General de seguros</span>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <blockquote><span>Mejor lo aseguro</span> <span>rápido y fácil con</span> <span>una compañía</span> <span>de confianza</span></blockquote>
                                </Col>
                            </Row>
                            <span className="manImage"></span>  
                        </div>
                    </CarouselItem>
                </Carousel>
            </section>
        );
    }
});

module.exports = HomeCarouselPanel;
