'use strict';

var React = require('react');
var ReactRouter = require('react-router');

var rb = require('react-bootstrap');
var Row = rb.Row;
var Col = rb.Col;
var Link = ReactRouter.Link;

var ModalWidget = require('./../widgets/modal-widget');
var CoverageTemplate = require('./../templates/coverage-template');

var SocialWidget = require('./../widgets/social-link-widget');

var FooterSection = React.createClass({

  render: function() {
    return (
        <div>
            <div className="container">
                <Row>
                    <Col xs={12} sm={7}>
                        <nav id="footerNavigation">
                            <ul>
                                <li>
                                    <h5><Link to="coverage" title="Coberturas">Coberturas</Link></h5>
                                    <ul>
                                        <li>
                                            <ModalWidget title="Básica">
                                                <CoverageTemplate />
                                            </ModalWidget>
                                        </li>
                                        <li>
                                            <ModalWidget title="Limitada">
                                                <CoverageTemplate />
                                            </ModalWidget>
                                        </li>
                                        <li>
                                            <ModalWidget title="Amplia">
                                                <CoverageTemplate />
                                            </ModalWidget>
                                        </li>
                                        <li>
                                            <ModalWidget title="Prestigio">
                                                <CoverageTemplate />
                                            </ModalWidget>
                                        </li>
                                        <li>
                                            <ModalWidget title="Autos Fronterizos">
                                                <CoverageTemplate />
                                            </ModalWidget>
                                        </li>
                                        <li>
                                            <ModalWidget title="RC Obligatoria">
                                                <CoverageTemplate />
                                            </ModalWidget>
                                        </li>
                                    </ul>
                                </li><li>
                                    <h5><Link to="aboutus" title="Nosotros">Nosotros</Link></h5>
                                    <ul>
                                        <li><Link to="whyus" title="Por qué Nosotros">Por qué Nosotros</Link></li>
                                        <li><Link to="whoarewe" title="Quiénes somos">Quiénes somos</Link></li>
                                    </ul>    
                                </li><li>
                                    <h5><Link to="contact" title="Contacto">Contacto</Link></h5>
                                    <ul> 
                                        <li><Link to="disaster" title="En caso de Siniestro">En caso de Siniestro</Link></li>
                                        <li><Link to="contactform" title="Contáctanos">Contáctanos</Link></li>
                                    </ul>
                                </li><li>
                                    <h5><a href="cotiza" title="Cotiza" target="_blank">Cotiza</a></h5>
                                </li>
                            </ul>
                        </nav>
                    </Col>
                    <Col xs={12} sm={5}>
                        <span id="brand-footer">Quetal - Mi seguro de auto</span>
                        <p>Con el respaldo de:</p>
                        <span className="general-logo">General de seguros</span>
                        <SocialWidget />
                    </Col>
                </Row>   
            </div>
            <div id="footerExtras">
                <div className="container">
                    <Row>
                        <Col xs={12} sm={5}>
                            <p>Todos los derechos reservados Quetal Seguro de auto   2015 </p>
                        </Col>
                        <Col xs={12} sm={4}>
                            <p id="credit"><span>Un proyecto de: <a href="http://somospool.com/" title="Visita Branding POOL" target="_blank">POOL</a></span>Código por: <a href="http://mintitmedia.com/" title="Mint IT Media - Diseño y desarrollo web" target="_blank">MINT</a></p>
                        </Col>
                        <Col xs={12} sm={3}>
                            <a href="" title="Ver términos y condiciones">Términos y Condiciones.</a>
                        </Col>
                    </Row> 
                </div>
            </div>
        </div>
    );
  }
});

module.exports = FooterSection;