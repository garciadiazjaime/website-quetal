'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');

var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;

var savingsBlock = React.createClass({

    mixins : [ReactRouter.Navigation],

    handleClick: function(){
        console.log('handleClick');
        // this.transitionTo('home');
    },

    render: function() {

        return (
            <div id="savingsCallToAction" className="smallContainer">
                <Row>
                    <Col xs={12} sm={6}>
                        <p>Ahorra desde 20% en tu Seguro de Auto comprando a través de <span className="logo">Quetal</span></p>
                        <p className="notes">*Máximo descuento que otorga GS.</p>
                    </Col>
                    <Col xs={12} sm={6}>
                        <a href={this.props.data.cotizaLink} title="Cotiza tu Seguro" className="blueButton" target="_blank">Cotiza tu Seguro</a>
                    </Col>
                </Row>
            </div>
        );
    }
});

module.exports = savingsBlock;
