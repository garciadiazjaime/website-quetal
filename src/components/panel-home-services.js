'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');

var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;

var HomeServicesPanel = React.createClass({

    mixins : [ReactRouter.Navigation],
    
    handleClick: function(){
        console.log('handleClick');
        // this.transitionTo('home');
    },

    render: function() {

        return (
            <section id="homeServices">
                <div className="smallContainer">
                    <h1>Contrata el paquete que necesitas</h1>
                    <Row>
                        <Col xs={12} sm={7}>
                            <p className="medium">En todas nuestras Coberturas cuentas con Seguro de Gastos Médicos para ocupantes del vehículo en caso de accidente.
Además, dispones de los servicios de Asistencia Legal y Asistencia en el Camino.</p>
                        </Col>
                        <Col xs={12} sm={5}>
                        </Col>
                    </Row>
                </div>
                <div className="container">
                    <Row id="servicesList">
                        <Col xs={12} sm={3}>
                            <div className="servicesList-wrap">
                                <h3>¿Qué tal si tienes un auto del año*? <span id="prestigeIcon"></span></h3>
                                <div className="servicesList-details">
                                    <h2>Cobertura Prestigio</h2>
                                    <ul className="checklist">
                                        <li>Protección extendida</li>
                                        <li>Daños a tu vehículo</li>
                                        <li>Robo</li>
                                        <li>Daños a terceros</li>
                                    </ul>
                                </div>
                                <a href="#" target="_blank" title="Cotiza" className="blueButton">Cotiza</a>
                            </div>
                            <Button bsStyle='primary' onClick={this.open} className="arrowLink">
                              Ver detalles
                            </Button>
                        </Col>
                        <Col xs={12} sm={3} className="featured">
                            <div className="servicesList-wrap">
                                <h3>¿Qué tal si te cuidamos bien? <span id="comfortIcon"></span></h3>
                                <div className="servicesList-details">
                                    <h2>Cobertura Confort Amplia</h2>
                                    <ul className="checklist">
                                        <li>Daños a tu vehículo</li>
                                        <li>Robo</li>
                                        <li>Daños a terceros</li>
                                    </ul>
                                </div>
                                <a href="#" target="_blank" title="Cotiza" className="blueButton">Cotiza</a>
                            </div>
                            <Button bsStyle='primary' onClick={this.open} className="arrowLink">
                              Ver detalles
                            </Button>
                        </Col>
                        <Col xs={12} sm={3}>
                            <div className="servicesList-wrap">
                                <h3>¿Qué tal si tú pones los límites? <span id="limitedComfortIcon"></span></h3>
                                <div className="servicesList-details">
                                    <h2>Cobertura Confort Limitada</h2>
                                    <ul className="checklist">
                                        <li>Robo</li>
                                        <li>Daños a terceros</li>
                                    </ul>
                                </div>
                                <a href="#" target="_blank" title="Cotiza" className="blueButton">Cotiza</a>
                            </div>
                            <Button bsStyle='primary' onClick={this.open} className="arrowLink">
                              Ver detalles
                            </Button>
                        </Col>
                        <Col xs={12} sm={3}>
                            <div className="servicesList-wrap">
                                <h3>¿Qué tal si quieres un Seguro como tú lo necesitas?<span id="basicComfortIcon"></span></h3>
                                <div className="servicesList-details">
                                    <h2>Cobertura Confort Básica</h2>
                                    <ul className="checklist">
                                        <li>Daños a terceros</li>
                                    </ul>
                                </div>
                                <a href="#" target="_blank" title="Cotiza" className="blueButton">Cotiza</a>
                            </div>
                            <Button bsStyle='primary' onClick={this.open} className="arrowLink">
                              Ver detalles
                            </Button>
                        </Col>
                    </Row>
                </div>
            </section>
        );
    }
});

module.exports = HomeServicesPanel;
