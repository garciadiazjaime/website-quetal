'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');

var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;
var Link = ReactRouter.Link;

var NeedHelp = React.createClass({

    mixins : [ReactRouter.Navigation],

    handleClick: function(){
        console.log('handleClick');
    },

    render: function() {

        return (
            <section id="needHelp">
                <div className="container">
                    <Row>
                        <Col xs={12} sm={7}>
                            <p>¿Necesitas ayuda en tu compra? Llámanos al <a href="tel:6646140404" title="¡Llámanos para cualquier duda!">664.614.0404</a></p>
                        </Col>
                        <Col xs={12} sm={5}>
                            <a href="tel:6646140404" title="¡Llámanos para cualquier duda!" className="greenButton">Llámanos</a>
                        </Col>
                    </Row>
                </div>
            </section>
        );
    }
});

module.exports = NeedHelp;
