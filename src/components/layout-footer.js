'use strict';

var React = require('react');
var rb = require('react-bootstrap');
var Row = rb.Row;
var Col = rb.Col;

var FooterSection = React.createClass({

  render: function() {
    return (
        <div className="container">
            <nav id="footerNavigation">
                <ul>
                    <li className="active"><a href="inicio" title="">Inicio</a></li>
                    <li><a href="nosotros" title="Nosotros">Nosotros</a></li>
                    <li><a href="cortes" title="Cortes">Cortes</a></li>
                    <li><a href="color" title="Color">Color</a></li>
                    <li><a href="peinados" title="Peinados">Peinados</a></li>
                    <li><a href="maquillaje" title="Maquillaje">Maquillaje</a></li>
                    <li><a href="novias" title="Novias">Novias</a></li>
                    <li><a href="boutique" title="Boutique">Boutique</a></li>
                    <li><a href="contacto" title="Contacto">Contacto</a></li>
                </ul>
            </nav>
            <Row>
                <Col xs={12} sm={5}>
                    <p>Todos los derechos reservados Branding Pool 2015 </p>
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