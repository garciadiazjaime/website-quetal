'use strict';

var React = require('react');
var rb = require('react-bootstrap');

var Row = rb.Row;
var Col = rb.Col;


var ModalWidget = React.createClass({

  render: function() {
    
    return (
      <div>
        <Row>
          <Col xs={12} sm={5}>
          </Col>
          <Col xs={12} sm={7}>
             </Col>
        </Row>
        <h2>¿Qué tipo de Protección ofrece? </h2>
        <Row>
          <Col xs={12} sm={6}>


            <a href="" title="" className="blueButton"></a>
          </Col>
          <Col xs={12} sm={6}>
            <a href="" title="" className="greenButton"></a>
          </Col>
        </Row> 
      </div>
    );
  }

});

module.exports = ModalWidget;