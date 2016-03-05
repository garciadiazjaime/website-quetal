'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');

var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;

var HelloPanel = React.createClass({displayName: "HelloPanel",

    mixins : [ReactRouter.Navigation],
    
    handleClick: function(){
        console.log('handleClick');
        // this.transitionTo('home');
    },

    render: function() {

        return (
            React.createElement("section", {id: "helloIntro"}, 
                React.createElement("div", {className: "container"}, 
                    React.createElement("p", null, React.createElement("em", null, React.createElement("span", null, "Hola,"), " ", React.createElement("span", null, "Quetal")), " Estamos para ayudarte")
                )
            )
        );
    }
});

module.exports = HelloPanel;
