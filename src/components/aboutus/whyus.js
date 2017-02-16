'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');

var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;

var WhyUsPanel = React.createClass({

    mixins : [ReactRouter.Navigation],

    handleClick: function(){
        console.log('handleClick');
        // this.transitionTo('home');
    },

    render: function() {

        return (
            <section id="whyus">
                <div className="container">
                    <h1>¿Por qué comprar a través de <span className="logo">Quetal™</span>?</h1>
                    <ol className="row">
                        <li className="col-xs-12 col-sm-3">
                            <div className="wrap">
                                QUETAL es agente persona moral autorizado por la CNSF (logo)
                            </div>
                        </li>
                        <li className="col-xs-12 col-sm-3">
                            <div className="wrap">
                                Contamos con el respaldo de <a href="http://www.generaldeseguros.mx/" target="_blank"><span id="insuranceLogoColor">General de seguros</span></a>
                            </div>
                        </li>
                        <li className="col-xs-12 col-sm-3">
                            <div className="wrap">
                                Somos el único Agente autorizado para venta en línea de GS
                            </div>
                        </li>
                        <li className="col-xs-12 col-sm-3">
                            <div className="wrap">
                                Porque te otorgamos el máximo descuento autorizado por GS
                            </div>
                        </li>
                    </ol>
                </div>
            </section>
        );
    }
});

module.exports = WhyUsPanel;
