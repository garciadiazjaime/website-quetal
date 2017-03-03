'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');

var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;

var WhoAreWePanel = React.createClass({

    mixins : [ReactRouter.Navigation],

    handleClick: function(){
        console.log('handleClick');
        // this.transitionTo('home');
    },

    render: function() {

        return (
            <section id="whoarewe">
                <div className="container">
                    <Row>
                        <Col xs={12} sm={6}>
                            <span id="quetalBigLogo">Quetal - Mi seguro de auto</span>
                        </Col>
                        <Col xs={12} sm={6}>
                            <p>A través de Quetal™ puedes encontrar el paquete de seguro de Auto más barato del mercado, ya que somos intermediarios exclusivos de General de Seguros S.A.B.</p>
                            <p>Con Quetal™ cuentas con el respaldo de General de Seguros  S.A.B. una compañía con más de 40 años de experiencia en el sector asegurador, 100% mexicana y con cobertura a nivel Nacional. </p>
                            <p>Si buscas el mejor paquete de seguro y sin complicaciones somos tu solución, sólo elige la cobertura por paquete que necesitas, cotiza, compra e imprime tu póliza.</p>
                        </Col>
                    </Row>
                </div>
            </section>
        );
    }
});

module.exports = WhoAreWePanel;
