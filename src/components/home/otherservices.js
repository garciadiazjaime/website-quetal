'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');

var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;
var ModalActions = require('../../actions/ModalActions');


var HomeOtherServicesPanel = React.createClass({

    mixins : [ReactRouter.Navigation],

    render: function() {

        return (
            <section id="otherServices">
                <div className="container">
                    <Row>
                        <Col xs={12} sm={12}>
                          <div className="otherServices-block">
                              <div style={{minHeight: '200px'}}>
                                <div className="col-sm-8 col-xs-12">
                                  <h3>RC Obligatoria <br />Federal</h3>
                                  <p>
                                    <span id="civilResponsibilityIcon"></span>
                                  </p>
                                  <p>
                                    <a onClick={this.handleClick.bind(this, 'federal')} className="arrowLink pull-left" style={{marginTop: '10px'}}>Ver detalles</a>
                                  </p>
                                </div>
                                <div className="col-sm-3 col-xs-12">
                                  <a href={this.props.data.rcObligatorioLink} target="_blank" title="Cotiza" className="blueButton">Cotiza Aquí</a>
                                </div>
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
    },

    handleClick: function(coverage){
        ModalActions.openModal(coverage);
    }
});

module.exports = HomeOtherServicesPanel;
