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
                        <li className="col-xs-12 col-xs-4">
                            <div className="wrap">
                                Te ofrecemos el seguro de auto más barato
                                <span className="notes">*En comparación con otros portales de venta de seguros por internet.</span>
                            </div>
                        </li>
                        <li className="col-xs-12 col-xs-4">
                            <div className="wrap">
                                Contamos con el respaldo de <span id="insuranceLogoColor">General de seguros</span>
                            </div>
                        </li>
                        <li className="col-xs-12 col-xs-4">
                            <div className="wrap">
                                Por nuestro compromiso y profesionalismo. 
                            </div>
                        </li>
                    </ol>
                </div>
            </section>
        );
    }
});

module.exports = WhyUsPanel;
