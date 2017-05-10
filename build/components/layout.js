'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var HeaderSection = require('./layout/header');
var FooterSection = require('./layout/footer');
var ModalWidget = require('./widgets/modal-widget');
var constantUrl = require('../constants/url');

var Layout = React.createClass({displayName: "Layout",

  getInitialState: function(){
    return {
      fixed: {
        elementID: 'header',
        className: 'fixed',
        triggerYPoint: 186
      }
    };
  },

  componentDidMount: function(){
    window.addEventListener('scroll', this.onScroll, false);
  },

  componentWillUnmount: function() {
    window.removeEventListener('scroll', this.onScroll, false);
  },

  render: function() {
    var data = {
      cotizaLink: constantUrl.cotizaLink,
      rcObligatorioLink: constantUrl.rcObligatorioLink,
      tel: constantUrl.tel, 
    };
    return (
        React.createElement("div", null, 
            React.createElement("header", {id: "header"}, 
                React.createElement(HeaderSection, {data: data})
            ), 
            React.createElement(RouteHandler, {data: data}), 
            React.createElement("footer", {id: "footer"}, 
                React.createElement(FooterSection, {data: data})
            ), 
            React.createElement(ModalWidget, null)
        )
    );
  },

  onScroll: function(){
    var offset = window.pageYOffset;
    if(offset > this.state.fixed.triggerYPoint){
      document.getElementById(this.state.fixed.elementID).classList.add(this.state.fixed.className);
    }
    else{
      document.getElementById(this.state.fixed.elementID).classList.remove(this.state.fixed.className);
    }
  }
});

module.exports = Layout;
