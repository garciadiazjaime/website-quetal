'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var HeaderSection = require('./layout/header');
var FooterSection = require('./layout/footer');
var ModalWidget = require('./widgets/modal-widget');

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
      cotizaLink: 'https://gswas.com.mx/AutosVentaDirecta/cotizacion.xhtml?u=5144&ori=0&neg=15&neg2=28',
      rcObligatorioLink: 'https://gswas.com.mx/AutosVentaDirecta/rcobligatorio.xhtml?u=5144',
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
