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
                              QUETAL es agente persona moral autorizado por la CNSF <br />
                              <img src="/img/aboutus/logo_cnsf.png" alt="General de seguros" width="200px" />
                            </div>
                        </li>
                        <li className="col-xs-12 col-sm-3">
                            <div className="wrap">
                              Contamos con el respaldo de <br /><br />
                              <a href="http://www.generaldeseguros.mx/" target="_blank"><img src="/img/aboutus/logo_general.png" alt="General de seguros" width="200px" /></a>
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
