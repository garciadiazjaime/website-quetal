'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');

var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;

var HomeCallToActionPanel = React.createClass({

    mixins : [ReactRouter.Navigation],
    
    handleClick: function(){
        console.log('handleClick');
        // this.transitionTo('home');
    },

    render: function() {

        return ( 
            <section id="callToAction">
                <div className="smallContainer">
                    <Row>
                        <Col xs={12} sm={6}>
                            <p>¿Qué hacer en caso de Siniestro?</p>
                        </Col>
                        <Col xs={12} sm={6}>
                            <a href="contacto/siniestro" title="Contáctanos" className="greenButton">Contáctanos</a>
                        </Col>
                    </Row>
                </div> 
            </section>
        );
    }
});

module.exports = HomeCallToActionPanel;
