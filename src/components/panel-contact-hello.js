'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');

var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;

var HelloPanel = React.createClass({

    mixins : [ReactRouter.Navigation],
    
    handleClick: function(){
        console.log('handleClick');
        // this.transitionTo('home');
    },

    render: function() {

        return (
            <section id="helloIntro">
                <div className="container">
                    <p><em>Hola, Quetal</em> Estamos para ayudarte</p>
                </div>
            </section>
        );
    }
});

module.exports = HelloPanel;
