'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');
var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;

var CoverageTable = require('./coverage/table');
var SavingsBlock = require('./custom/savings');

var CoveragePanel = React.createClass({displayName: "CoveragePanel",

    mixins : [ReactRouter.Navigation],
    
    handleClick: function(){
        console.log('handleClick');
        // this.transitionTo('schedule');
    },

    handleChange: function(e){
        console.log('handleChange');
        // console.log(e.target.value);
    },

    render: function() {

        return (
            React.createElement("div", {id: "mainContent"}, 
                React.createElement(CoverageTable, null), 
                React.createElement(SavingsBlock, null)
            )
        );
    }
});

module.exports = CoveragePanel;
