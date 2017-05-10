'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');

var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;

var ModalActions = require('../../actions/ModalActions');
var servicesData = require('./data');

var coverageTable = React.createClass({displayName: "coverageTable",

    mixins : [ReactRouter.Navigation],

    render: function() {
        var servicesEl = this.renderServices(servicesData)
        return (
            React.createElement("section", null, 
                React.createElement("div", {className: "container"}, 
                    React.createElement("h1", null, "Coberturas y Beneficios"), 
                    React.createElement("div", {id: "benefitsTable"}, 
                        React.createElement(Row, null, 
                            React.createElement(Col, {xs: 12, sm: 6}
                            ), 
                            React.createElement(Col, {xs: 12, sm: 6}, 
                                React.createElement(Row, null, 
                                    React.createElement(Col, {xs: 4, sm: 3}, 
                                        React.createElement("h5", {onClick: this.handleClick.bind(this, 'amplia')}, "Confort Amplia")
                                    ), 
                                    React.createElement(Col, {xs: 4, sm: 3}, 
                                        React.createElement("h5", {onClick: this.handleClick.bind(this, 'limitada')}, "Confort Limitada")
                                    ), 
                                    React.createElement(Col, {xs: 4, sm: 3}, 
                                        React.createElement("h5", {onClick: this.handleClick.bind(this, 'basica')}, "Confort Básica")
                                    )
                                )
                            )
                        ), 
                        servicesEl
                    )
                ), 
                React.createElement("div", {className: "smallContainer"}, 
                    React.createElement(Row, null, 
                        React.createElement(Col, {xs: 12, sm: 6, id: "coverageNotes"}, 
                            React.createElement("p", null, "*Límite Único y Combinado."), 
                            React.createElement("ol", null, 
                                React.createElement("li", null, "Esta cobertura se incluye sólo en Automóviles y Pick Up´s de hasta 3.5 Toneladas. Puede ser contratada de forma opcional para Camiones."), 
                                React.createElement("li", null, "Esta cobertura sólo está disponible para Automóviles y Pick Up´s de hasta 3.5 Toneladas.")
                            )
                        ), 
                        React.createElement(Col, {xs: 12, sm: 6}
                        )
                    )
                )
            )
        );
    },

  handleClick: function(coverage){
        ModalActions.openModal(coverage);
    },

  renderServices: function(data) {
    return data.map(function(item) {
      return (React.createElement(Row, null, 
          React.createElement(Col, {xs: 12, sm: 6}, 
              React.createElement("p", null, item.title)
          ), 
          React.createElement(Col, {xs: 12, sm: 6}, 
              React.createElement(Row, null, 
                  React.createElement(Col, {xs: 4, sm: 3}, 
                      item.amplia
                  ), 
                  React.createElement(Col, {xs: 4, sm: 3}, 
                      item.limitada
                  ), 
                  React.createElement(Col, {xs: 4, sm: 3}, 
                      item.basica
                  )
              )
          )
      ));
    });
  }
});

module.exports = coverageTable;
