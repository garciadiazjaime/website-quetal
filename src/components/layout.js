'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var HeaderSection = require('./layout/header');
var FooterSection = require('./layout/footer');
var ModalWidget = require('./widgets/modal-widget');
var constantUrl = require('../constants/url');

var Layout = React.createClass({

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
    };
    return (
        <div>
            <header id="header">
                <HeaderSection data={data} />
            </header>
            <RouteHandler data={data} />
            <footer id="footer">
                <FooterSection data={data}/>
            </footer>
            <ModalWidget />
        </div>
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
