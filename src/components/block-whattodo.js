'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');

var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;
var Link = ReactRouter.Link;

var WhatToDo = React.createClass({

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
                            <p><span>¿Qué hacer en</span> caso de Siniestro?</p>
                        </Col>
                        <Col xs={12} sm={6}>
                            <Link to="disaster" title="Contáctanos" className="greenButton">Contáctanos</Link>
                        </Col>
                    </Row>
                </div> 
            </section>
        );
    }
});

module.exports = WhatToDo;
