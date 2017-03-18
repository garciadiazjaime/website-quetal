'use strict';

var React = require('react');
var ReactRouter = require('react-router');

var SocialElement = React.createClass({displayName: "SocialElement",

    mixins : [ReactRouter.Navigation],

    handleClick: function(){
        console.log('handleClick');
        // this.transitionTo('home');
    },

    render: function() {

        return (
            React.createElement("ul", {className: "social"}, 
                React.createElement("li", null, React.createElement("a", {href: "https://www.facebook.com/QuetalSeguroDeAuto", title: "Síguenos en facebooks", target: "_blank"}, React.createElement("span", null, "Facebook")))
            )
        );
    }
});

module.exports = SocialElement;
