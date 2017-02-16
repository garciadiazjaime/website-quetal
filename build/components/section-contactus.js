'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');
var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;

var HelloPanel = require('./contactus/hello');
var ContactInfo = require('./contactus/info');
var NeedHelp = require('./custom/needhelp');

var ContactPanel = React.createClass({displayName: "ContactPanel",

    mixins : [ReactRouter.Navigation],

    getInitialState: function(){
        return {
        }
    },
    
    handleClick: function(){
        console.log('handleClick');
        // this.transitionTo('home');
    },

    render: function() {
        var mapStyle = {
            border: 0
        };
        return (
            React.createElement("section", {id: "mainContent"}, 
                React.createElement(HelloPanel, null), 
                React.createElement(ContactInfo, null), 
                React.createElement(NeedHelp, null)
            )
        );
    },
});

module.exports = ContactPanel;
