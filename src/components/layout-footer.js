'use strict';

var React = require('react');
var rb = require('react-bootstrap');
var Row = rb.Row;
var Col = rb.Col;

var FooterSection = React.createClass({

  render: function() {
    return (
        <div className="container">
            <Row>
                <Col xs={12} sm={7}>
                    <nav id="footerNavigation">
                        <ul>
                            <li>
                                <h5><a href="coberturas" title="Coberturas">Coberturas</a></h5>
                                <ul>
                                    <li><a href="coberturas/basica" title="Básica">Básica</a></li>
                                    <li><a href="coberturas/limitada" title="Limitada">Limitada</a></li>
                                    <li><a href="coberturas/amplia" title="Amplia">Amplia</a></li>
                                    <li><a href="coberturas/prestigio" title="Prestigio">Prestigio</a></li>
                                    <li><a href="coberturas/autos-fronterizos" title="Autos Fronterizos">Autos Fronterizos</a></li>
                                    <li><a href="coberturas/rc-obligatoria" title="RC Obligatoria">RC Obligatoria</a></li>
                                </ul>
                            </li><li>
                                <h5><a href="nosotros" title="Nosotros">Nosotros</a></h5>
                                <ul>
                                    <li><a href="nosotros/por-que-nosotros" title="Por qué Nosotros">Por qué Nosotros</a></li>
                                    <li><a href="nosotros/quienes-somos" title="Quiénes somos">Quiénes somos</a></li>
                                </ul>    
                            </li><li>
                                <h5><a href="contacto" title="Contacto">Contacto</a></h5>
                                <ul> 

                                    <li><a href="contacto/siniestro" title="En caso de Siniestro">En caso de Siniestro</a></li>
                                    <li><a href="contacto" title="Contáctanos">Contáctanos</a></li>
                                </ul>
                            </li><li>
                                <h5><a href="cotiza" title="Cotiza">Cotiza</a></h5>
                            </li>
                        </ul>
                    </nav>
                </Col>
                <Col xs={12} sm={5}>
                    <span id="brand-footer">Quetal - Mi seguro de auto</span>
                    <p>Con el respaldo de:</p>
                    <span className="general-logo">General de seguros</span>
                </Col>
            </Row>
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
    );
  }
});

module.exports = FooterSection;