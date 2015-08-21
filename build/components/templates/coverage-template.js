'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');
var db = require('../../lib/db');

var Row = rb.Row;
var Col = rb.Col;
var Link = ReactRouter.Link;


var CoverageTemplate = React.createClass({displayName: "CoverageTemplate",

  propTypes: {
    coverage: React.PropTypes.string
  },

  render: function() {

    var data = db[this.props.coverage];
    if(data){
      console.log(data);
      return (
        React.createElement("div", null, 
          React.createElement(Row, null, 
            React.createElement(Col, {xs: 12, sm: 5}, 
              React.createElement("h1", null, React.createElement("span", null, "GS Autos"), 
                  data.title
              )
            ), 
            React.createElement(Col, {xs: 12, sm: 7}, 
              React.createElement("p", {className: "bigParagraph"}, data.subtitle)
            )
          ), 
          React.createElement("h2", null, "¿Qué tipo de Protección ofrece? "), 
          React.createElement(Row, null, 
            React.createElement(Col, {xs: 12, sm: 6}, 
              React.createElement("h3", null, React.createElement("span", {className: "hidden"}, "Tipo de protección "), data.leftTitle), 
              React.createElement("ul", null, 
                this.getColumnContent(data.leftContent)
              ), 
              
                data.leftNotes ?
                React.createElement("p", {className: "notes"}, 
                  React.createElement("span", {dangerouslySetInnerHTML: {__html: data.leftNotes}})
                )
                : null
              
            ), 
            
              data.rightContent ? 
              React.createElement(Col, {xs: 12, sm: 6}, 

                
                  data.rightTitle ? 
                  React.createElement("h3", null, React.createElement("span", {className: "hidden"}, "Tipo de protección "), data.rightTitle)
                  : null, 
                
                React.createElement("ul", null, 
                  this.getColumnContent(data.rightContent)
                ), 
                
                  data.rightNotes ?
                  React.createElement("p", {className: "notes"}, 
                    React.createElement("span", {dangerouslySetInnerHTML: {__html: data.rightNotes}})
                  )
                  : null
                
              )
              : null
            
          ), 
          React.createElement(Link, {to: "coverage", title: "Compara nuestras Coberturas", className: "greenButton"}, "Compara nuestras Coberturas"), 
          React.createElement("a", {href: "#", title: "Cotiza tu Seguro", className: "blueButton", target: "_blank"}, "Cotiza tu Seguro")
        )
      );
    }
    else{
      return null;
    }
  },

  getColumnContent: function(data){
    var response = null;
    
    if(data && data.length){
      response = data.map(function(item, i){
        return (
          React.createElement("li", {key: 'bullet-' + i}, 
            React.createElement("em", null, item.title), 
            React.createElement("div", {dangerouslySetInnerHTML: {__html: item.content}})
          )
        );
      });
    }

    return response;
  }

});

module.exports = CoverageTemplate;