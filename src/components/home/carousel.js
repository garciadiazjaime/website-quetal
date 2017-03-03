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

var HomeCarouselPanel = React.createClass({

    mixins : [ReactRouter.Navigation],

    handleClick: function(){
        console.log('handleClick');
        // this.transitionTo('home');
    },

    render: function() {

        return (
            <section id="homeIntro">
                <Carousel id="homeCarousel" interval={7000}>
                    <CarouselItem>
                        <div className="container">
                            <Row>
                                <Col xs={12} sm={6}>
                                    <p className="bigPhrase">
                                        <span>Hola, Quetal</span> un Seguro de auto a tu alcance
                                    </p>
                                    <Link to="coverage" title="Ver Coberturas" className="yellowButton">Ver Coberturas</Link>
                                    <a href="http://www.generaldeseguros.mx/" target="_blank">
                                      <img src="/img/aboutus/logo_general_white.png" alt="General de seguros" width="164px" />
                                    </a>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <blockquote><span>Justo lo que necesito, </span><span> y al precio </span><span>más barato </span></blockquote>
                                </Col>
                            </Row>
                            <span id="manImage"></span>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="container">
                            <Row>
                                <Col xs={12} sm={7}>
                                    <p className="bigPhrase narrow">
                                        <span>Ahorra</span> 20% en tu Seguro de Auto
                                    </p>
                                    <p className="restrictions">*Máximo descuento que otorga GS.</p>
                                    <Link to="coverage" title="Ver Coberturas" className="yellowButton">Ver Coberturas</Link>
                                    <a href="http://www.generaldeseguros.mx/" target="_blank">
                                      <img src="/img/aboutus/logo_general_white.png" alt="General de seguros" width="164px" />
                                    </a>
                                </Col>
                                <Col xs={12} sm={5}>
                                </Col>
                            </Row>
                            <span id="womanImage"></span>
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
                                    <Link to="coverage" title="Ver Coberturas" className="yellowButton">Ver Coberturas</Link>
                                    <a href="http://www.generaldeseguros.mx/" target="_blank">
                                      <img src="/img/aboutus/logo_general_white.png" alt="General de seguros" width="164px" />
                                    </a>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <blockquote><span>Mejor lo aseguro </span><span>rápido y fácil con </span><span>una compañía </span><span>de confianza </span></blockquote>
                                </Col>
                            </Row>
                            <span id="carImage"></span>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="container">
                            <Row>
                                <Col xs={12} sm={7}>
                                    <p className="bigPhrase narrow">
                                        <span>35% de descuento</span> + 6 meses sin intereses
                                    </p>
                                    <p className="restrictions">*con BBVA Bancomer, Banamex y American Express.</p>
                                    <Link to="coverage" title="Ver Coberturas" className="yellowButton">Ver Coberturas</Link>
                                    <a href="http://www.generaldeseguros.mx/" target="_blank">
                                      <img src="/img/aboutus/logo_general_white.png" alt="General de seguros" width="164px" />
                                    </a>
                                </Col>
                                <Col xs={12} sm={5}>
                                </Col>
                            </Row>
                            <span id="creditImage"></span>
                        </div>
                    </CarouselItem>
                </Carousel>
            </section>
        );
    }
});

module.exports = HomeCarouselPanel;
