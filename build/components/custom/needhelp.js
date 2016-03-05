'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');

var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;
var Link = ReactRouter.Link;

var NeedHelp = React.createClass({displayName: "NeedHelp",

    mixins : [ReactRouter.Navigation],
    
    handleClick: function(){
        console.log('handleClick');
    },

    render: function() {

        return ( 
            React.createElement("section", {id: "needHelp"}, 
                React.createElement("div", {className: "container"}, 
                    React.createElement(Row, null, 
                        React.createElement(Col, {xs: 12, sm: 7}, 
                            React.createElement("p", null, "¿Necesitas ayuda en tu compra? Llámanos al ", React.createElement("a", {href: "tel:6646588993", title: "¡Llámanos para cualquier duda!"}, "664 658 8993"))
                        ), 
                        React.createElement(Col, {xs: 12, sm: 5}, 
                            React.createElement("a", {href: "tel:6646588993", title: "¡Llámanos para cualquier duda!", className: "greenButton"}, "Llámanos")
                        )
                    )
                )
            )
        );
    }
});

module.exports = NeedHelp;
