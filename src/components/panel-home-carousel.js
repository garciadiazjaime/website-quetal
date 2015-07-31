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
            <section id="nosotros">
                <div className="container">
                    <Row>
                        <Col xs={12} sm={6}>
                            <h2>Nosotros</h2>
                            <p>En <em>giO</em> salón proponemos un servicio vanguardista, exclusivo, de calidad y creativo para que cada corte, tinte, peinado y maquillaje sea único, sobresaliente y llene de seguridad a quien lo porte.</p>
                            <p>Contamos con más de 15 años de experiencia, ofreciendo a nuestros clientes un servicio personalizado,  estando siempre a la vanguardia en estilos y tendencias, dándole acceso a nuestros clientes a servicios y productos de primer nivel. </p>

                            <Carousel id="aboutusCarousel" interval="3000">
                                <CarouselItem id="aboutus-cutSlide" >
                                    <p>Seleccionamos el mejor corte para tí</p>
                                </CarouselItem>
                                <CarouselItem id="aboutus-cutSlide">
                                    <p>Seleccionamos el mejor corte para tí</p>
                                </CarouselItem>
                            </Carousel>
                        </Col>
                        <Col xs={12} sm={6}>
                            <span id="professionaToolsImage">Imagen de herramientas de estilizado profesionales</span>

                            <span id="hairWashImage">Imagen de herramientas de estilizado profesionales</span>
                        </Col>
                    </Row>   
                </div>
            </section>
        );
    }
});

module.exports = HomeCarouselPanel;
