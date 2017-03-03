'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
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
                        <Col xs={12} sm={6}>
                          <div className="otherServices-block">
                              <div style={{minHeight: '200px'}}>
                                <div className="col-sm-12 col-xs-12">
                                  <h3>RC Obligatoria <br />Federal</h3>
                                  <p>
                                    <span id="civilResponsibilityIcon"></span>
                                  </p>
                                </div>
                                <div className="col-sm-12 col-xs-12">
                                  <a href={this.props.data.rcObligatorioLink} target="_blank" title="Cotiza" className="blueButton">Cotiza Aquí</a>
                                  <a onClick={this.handleClick.bind(this, 'federal')} className="arrowLink pull-right" style={{marginTop: '25px'}}>Ver detalles</a>
                                </div>
                              </div>
                          </div>
                        </Col>
                        <Col xs={12} sm={6}>
                          <div className="otherServices-block">
                              <div style={{minHeight: '200px'}}>
                                <div className="col-sm-12 col-xs-12">
                                  <h3>Autos Fronterizos y Legalizados</h3>
                                  <p>
                                    <span id="civilResponsibilityIcon"></span>
                                  </p>
                                </div>
                                <div className="col-sm-12 col-xs-12">
                                  <Link to="contact" title="Cotiza" className="blueButton">
                                    664.976.6363
                                  </Link>
                                  <a onClick={this.handleClick.bind(this, 'fronterizo')} className="arrowLink pull-right" style={{marginTop: '25px'}}>Ver detalles</a>
                                </div>
                              </div>
                          </div>
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
