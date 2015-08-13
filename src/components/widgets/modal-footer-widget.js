'use strict';

var React = require('react');
var rb = require('react-bootstrap');
var Modal = rb.Modal;
var Button = rb.Button;
var Popover = rb.Popover;
var Tooltip = rb.Tooltip;
var OverlayTrigger = rb.OverlayTrigger;

var ModalWidget = React.createClass({

  getInitialState: function(){
    return { showModal: false };
  },

  render: function() {
    var popover = <Popover title='popover'>very popover. such engagement</Popover>;
    var tooltip = <Tooltip>wow.</Tooltip>;

    return (
      <li>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            {this.props.children}
          </Modal.Body>
        </Modal>
        <a title="{this.props.title}" onClick={this.open}>{this.props.title}</a>
        
      </li>
    );
  },

  open: function(){

    this.setState({ showModal: true });
  },

  close: function(){
    this.setState({ showModal: false });
  }

});

module.exports = ModalWidget;