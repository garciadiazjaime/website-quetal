'use strict';

var React = require('react');
var ReactRouter = require('react-router');

var ModalElement = React.createClass({

    mixins : [ReactRouter.Navigation],
    
    handleClick: function(){
        console.log('handleClick');
        // this.transitionTo('home');
    },
    getInitialState(){
    return { showModal: false };
  },

    close(){
    this.setState({ showModal: false });
    },

    open(){
    this.setState({ showModal: true });
    },

    render: function() {

        return (
            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    Cotizacion
                </Modal.Body>
           </Modal>    
        );
    }
});

module.exports = ModalElement;
