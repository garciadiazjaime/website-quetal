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
      var gsLogo = (<a href="http://www.generaldeseguros.mx/" target="_blank" title="generaldeseguros">
        <img src="/img/aboutus/logo_general.png" alt="General de seguros" width="200px" />
      </a>);
        return (
            <section id="whyus">
                <div className="container">
                    <h1>¿Por qué comprar a través de <span className="logo">Quetal™</span>?</h1>
                    <ol className="row">
                        <li className="col-xs-12 col-sm-3">
                            <div className="wrap">
                              QUETAL es agente persona moral autorizado por la CNSF <br />
                              <a href="https://www.gob.mx/cnsf" title="COMISION NACIONAL DE SEGUROS Y FIANZAS" target="_blank">
                                <img src="/img/aboutus/logo_cnsf.png" alt="COMISION NACIONAL DE SEGUROS Y FIANZAS" width="200px" />
                              </a>
                            </div>
                        </li>
                        <li className="col-xs-12 col-sm-3">
                            <div className="wrap">
                              Contamos con el respaldo de <br /><br />
                              {gsLogo}
                            </div>
                        </li>
                        <li className="col-xs-12 col-sm-3">
                            <div className="wrap">
                                Somos el único Agente autorizado para venta en línea de <br /><br />
                                {gsLogo}
                            </div>
                        </li>
                        <li className="col-xs-12 col-sm-3">
                            <div className="wrap">
                                Porque te otorgamos el máximo descuento autorizado por <br /><br />
                                {gsLogo}
                            </div>
                        </li>
                    </ol>
                </div>
            </section>
        );
    }
});

module.exports = WhyUsPanel;
