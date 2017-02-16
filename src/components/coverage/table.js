'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');

var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;

var ModalActions = require('../../actions/ModalActions');
var servicesData = require('./data');

var coverageTable = React.createClass({

    mixins : [ReactRouter.Navigation],

    render: function() {
        var servicesEl = this.renderServices(servicesData)
        return (
            <section>
                <div className="container">
                    <h1>Coberturas y Beneficios</h1>
                    <div id="benefitsTable">
                        <Row>
                            <Col xs={12} sm={6}>
                            </Col>
                            <Col xs={12} sm={6}>
                                <Row>
                                    <Col xs={6} sm={3}>
                                        <h5 onClick={this.handleClick.bind(this, 'amplia')}>Confort Amplia</h5>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h5 onClick={this.handleClick.bind(this, 'limitada')}>Confort Limitada</h5>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h5 onClick={this.handleClick.bind(this, 'basica')}>Confort Básica</h5>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        {servicesEl}
                    </div>
                </div>
                <div className="smallContainer">
                    <Row>
                        <Col xs={12} sm={6} id="coverageNotes">
                            <p>*Límite Único y Combinado.</p>
                            <ol>
                                <li>Esta cobertura se incluye sólo en Automóviles y Pick Up´s de hasta 3.5 Toneladas. Puede ser contratada de forma opcional para Camiones.</li>
                                <li>Esta cobertura sólo está disponible para Automóviles y Pick Up´s de hasta 3.5 Toneladas.</li>
                            </ol>
                        </Col>
                        <Col xs={12} sm={6}>
                        </Col>
                    </Row>
                </div>
            </section>
        );
    },

  handleClick: function(coverage){
        ModalActions.openModal(coverage);
    },

  renderServices: function(data) {
    return data.map(function(item) {
      return (<Row>
          <Col xs={12} sm={6}>
              <p>{item.title}</p>
          </Col>
          <Col xs={12} sm={6}>
              <Row>
                  <Col xs={6} sm={3}>
                      {item.amplia}
                  </Col>
                  <Col xs={6} sm={3}>
                      {item.limitada}
                  </Col>
                  <Col xs={6} sm={3}>
                      {item.basica}
                  </Col>
              </Row>
          </Col>
      </Row>);
    });
  }
});

module.exports = coverageTable;
