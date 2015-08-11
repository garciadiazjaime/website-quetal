'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');
var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;

var CoverageTable = require('./panel-coverage-table');
var SavingsBlock = require('./block-savings');

var CoveragePanel = React.createClass({

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
            <div id="mainContent">
                <CoverageTable />
                <SavingsBlock />
            </div>
        );
    }
});

module.exports = CoveragePanel;
