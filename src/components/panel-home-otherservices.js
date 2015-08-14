'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');

var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;
var ModalWidget = require('./widgets/modal-widget');
var LegalizedCars = require('./partials/legalized-cars');
var CivilResponsibility = require('./partials/civil-responsibility');

var HomeOtherServicesPanel = React.createClass({

    mixins : [ReactRouter.Navigation],
    
    handleClick: function(){
        console.log('handleClick');
        // this.transitionTo('home');
    },

    render: function() {

        return ( 
            <section id="otherServices">
                <div className="container">
                    <Row>
                        <Col xs={12} sm={6}>
                            <div className="otherServices-block">
                                <div>
                                    <h3>Autos Fronterizos o Legalizados</h3>
                                    <p>
                                        <a href="cotiza" target="_blank" title="Cotiza" className="blueButton">Cotiza</a>
                                        <span id="borderCarIcon"></span>
                                    </p>
                                    <ModalWidget title="Ver detalles" className="arrowLink">
                                        <LegalizedCars />
                                    </ModalWidget>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} sm={6}>
                            <div className="otherServices-block">
                                <div>
                                    <h3>RC Obligatoria Federal / Estatal</h3>
                                    <p>
                                        <a href="cotiza" target="_blank" title="Cotiza" className="blueButton">Cotiza</a>
                                        <span id="civilResponsibilityIcon"></span>
                                    </p>
                                    <ModalWidget title="Ver detalles" className="arrowLink">
                                        <CivilResponsibility />
                                    </ModalWidget>
                                    
                                </div>
                            </div>
                        </Col>
                    </Row>    
                </div>
                <div className="smallContainer">
                    <Row>
                        <Col xs={12} sm={5}>
                            <p id="substituteCar"><span>Automóvil Sustituto</span></p>
                        </Col>
                        <Col xs={12} sm={7}>
                            <p>General de Seguros te ofrece un auto sustituto mientras reparamos tu auto por colisión o te pagamos tu automóvil por perdida total o robo total. </p>
                            <p>Al contratar tu Seguro:</p>
                            <Row id="substituteCar-ParticipantInsurance">
                                <Col xs={12} sm={4}>
                                    <p><span>GS Autos </span> Amplia</p>
                                </Col>
                                <Col xs={12} sm={2}>
                                    <p>o</p>
                                </Col>
                                <Col xs={12} sm={4}>
                                    <p><span>GS Autos </span> Prestigio</p>
                                </Col>
                            </Row>    
                        </Col>
                    </Row>    
                </div>
            </section>
        );
    }
});

module.exports = HomeOtherServicesPanel;
