'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');

var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;

var coverageMain = React.createClass({

    mixins : [ReactRouter.Navigation],
    
    handleClick: function(){
        console.log('handleClick');
        // this.transitionTo('home');
    },

    render: function() {

        return (
            <section id="mainCoverage">
                <div className="container">
                    <h1>Coberturas y Beneficios</h1>
                </div>
            </section>
        );
    }
});

module.exports = coverageMain;
