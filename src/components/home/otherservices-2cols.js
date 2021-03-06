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
                        <Col xs={12} sm={6}>
                            <div className="otherServices-block">
                                <div>
                                    <h3>Autos Fronterizos o Legalizados</h3>
                                    <p>
                                        <a href={this.props.data.cotizaLink} target="_blank" title="Cotiza" className="blueButton">Cotiza</a>
                                        <span id="borderCarIcon"></span>
                                    </p>
                                    <a onClick={this.handleClick.bind(this, 'fronterizo')} className="arrowLink">Ver detalles</a>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} sm={6}>
                            <div className="otherServices-block">
                                <div>
                                    <h3>RC Obligatoria Federal / Estatal</h3>
                                    <p>
                                        <a href={this.props.data.rcObligatorioLink} target="_blank" title="Cotiza" className="blueButton">Cotiza</a>
                                        <span id="civilResponsibilityIcon"></span>
                                    </p>
                                    <a onClick={this.handleClick.bind(this, 'federal')} className="arrowLink">Ver detalles</a>
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
