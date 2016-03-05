'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');

var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;

var WhoAreWePanel = React.createClass({displayName: "WhoAreWePanel",

    mixins : [ReactRouter.Navigation],
    
    handleClick: function(){
        console.log('handleClick');
        // this.transitionTo('home');
    },

    render: function() {

        return ( 
            React.createElement("section", {id: "whoarewe"}, 
                React.createElement("div", {className: "container"}, 
                    React.createElement(Row, null, 
                        React.createElement(Col, {xs: 12, sm: 6}, 
                            React.createElement("span", {id: "quetalBigLogo"}, "Quetal - Mi seguro de auto")
                        ), 
                        React.createElement(Col, {xs: 12, sm: 6}, 
                            React.createElement("p", null, "A través de Quetal™ puedes encontrar el paquete de seguro de Auto más barato del mercado, ya que somos intermediarios exclusivos de General de Seguros S.A.B."), 
                            React.createElement("p", null, "Con Quetal™ cuentas con el respaldo de General de Seguros  S.A.B. una compañía con más de 40 años de experiencia en el sector asegurador, 100% mexicana y con cobertura a nivel Nacional. "), 
                            React.createElement("p", null, "Si buscas el mejor paquete de seguro y sin complicaciones somos tu solución, sólo elige la cobertura que necesitas, cotiza, compra e imprime tu póliza. ")
                        )
                    )
                )
            )
        );
    }
});

module.exports = WhoAreWePanel;
