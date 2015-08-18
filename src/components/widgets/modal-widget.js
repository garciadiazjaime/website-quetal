'use strict';

var React = require('react');
var rb = require('react-bootstrap');
var Modal = rb.Modal;
var ModalStore = require('../../stores/ModalStore');
var CoverageTemplate = require('../templates/coverage-template');


var ModalWidget = React.createClass({

  getInitialState: function(){
    return { showModal: false, coverage: '' };
  },

  componentDidMount: function() {
    ModalStore.addChangeListener(this._onChangeHandler);
  },

  componentWillUnmount: function() {
    ModalStore.removeChangeListener(this._onChangeHandler);
  },

  render: function() {

    return (
      <Modal show={this.state.showModal} onHide={this.close} id={this.state.coverage}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <CoverageTemplate coverage={this.state.coverage} />
        </Modal.Body>
      </Modal>
    );
  },

  _onChangeHandler: function(){
    var data = ModalStore.getData();
    
    console.log('data', data);

    this.setState({ 
      showModal: data.status,
      coverage: data.coverage
    });
  },

  close: function(){
    this.setState({ showModal: false });
  }

});

module.exports = ModalWidget;