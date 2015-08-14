'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');

var Row = rb.Row;
var Col = rb.Col;
var Link = ReactRouter.Link;


var ModalWidget = React.createClass({

  render: function() {
    
    return (
      <div>
        <Row>
          <Col xs={12} sm={5}>
            <h1><span>GS Autos</span>Prestigio</h1>
          </Col>
          <Col xs={12} sm={7}>
            <p className="bigParagraph">La Cobertura más completa para el Conductor y su vehículo último modelo o modelos recientes.</p>
          </Col>
        </Row>
        <h2>¿Qué tipo de Protección ofrece? </h2>
        <Row>
          <Col xs={12} sm={6}>
            <h3><span className="hidden">Tipo de protección </span>Para tu auto</h3>
            <ul>
              <li><em>Por los Daños que sufra</em>
                  Te protegemos por los daños que sufra tu vehículo ante cualquier eventualidad.
              </li>
              <li><em>En caso de Robo</em>
                  Tienes el respaldo y la seguridad de estar protegido en caso que seas víctima de Robo de tu Automóvil.<br /><br />
                  No te preocupes, con Prestigio los interiores manufacturados de agencia están amparados en caso de Robo Parcial .
              </li>
              <li><em>Daños a Terceros</em>
                  Te protegemos por los Daños que pudieras ocasionar a terceros en sus bienes o en sus personas.
              </li>
              <li><em>Protección Extendida</em>
                  Ahora al conducir otro vehículo de las mismas características te protegemos por los daños que pudieras ocasionar a terceros.
              </li>
              <li><em>Conduce Seguro</em>
                  Porque al conducir tu Vehículo estás expuesto a Asaltos, te protegemos por el uso indebido que puedan hacer de tus Tarjetas de Crédito o Débito a consecuencia del Asalto.
              </li>
              <li><em>Tus Pertenencias Seguras</em>
                  Tus Objetos Personales y los de tu familia están cubiertos en caso de que seas víctima del robo de tu Vehículo.
              </li>
            </ul>
            <p className="notes"><em>1</em> Esta Cobertura debe de estar incluida en la Carátula de la Póliza.</p>

            <Link to="coverage" title="Compara nuestras Coberturas" className="greenButton">Compara nuestras Coberturas</Link>
          </Col>
          <Col xs={12} sm={6}>
            <h3><span className="hidden">Tipo de protección </span>Para Ti y los Tuyos</h3>
            <ul>
              <li><em>Si necesitas Atención Médica</em>
                  Están cubiertos los Gastos Médicos que los ocupantes del vehículo requieran en caso de accidente.<br /><br />
                  También, en caso de accidente te protegemos al conducir otro vehículo de las mismas características al que tienes asegurado.
              </li>
              <li><em>Más Protección al Conductor</em>
                  Pensando en tu familia, te protegemos en caso de muerte accidental  .
              </li>
              <li><em>Si requieres Asistencia Legal</em>
                  Cuentas con un Abogado para enfrentar los Trámites Jurídicos provocados por el accidente.
              </li>
              <li><em>Durante tu Viaje</em>
                  No estarás sólo en el camino. Te acompañamos para que tengas un Viaje Seguro con nuestros servicios de Asistencia en Viaje.
              </li>
              <li><em>Para que sigas tu camino</em>
                  Te ofrecemos un Automóvil Sustituto para que sigas tu camino mientras te pagamos o reparamos el tuyo.
              </li>
            </ul>
            <p className="notes"><em>1</em> Esta Cobertura debe de estar incluida en la Carátula de la Póliza.</p>
            <a href="#" title="Cotiza tu Seguro" className="blueButton" target="_blank">Cotiza tu Seguro</a>
          </Col>
        </Row> 
      </div>
    );
  }

});

module.exports = ModalWidget;