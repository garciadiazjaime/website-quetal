'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');
var db = require('../../lib/db');

var Row = rb.Row;
var Col = rb.Col;
var Link = ReactRouter.Link;


var CoverageTemplate = React.createClass({

  propTypes: {
    coverage: React.PropTypes.string
  },

  render: function() {

    var data = db[this.props.coverage];
    if(data){
      console.log(data);
      return (
        <div>
          <Row>
            <Col xs={12} sm={5}>
              <h1><span>GS Autos</span>
                  {data.title}
              </h1>
            </Col>
            <Col xs={12} sm={7}>
              <p className="bigParagraph">{data.subtitle}</p>
            </Col>
          </Row>
          <h2>¿Qué tipo de Protección ofrece? </h2>
          <Row>
            <Col xs={12} sm={6}>
              <h3><span className="hidden">Tipo de protección </span>{data.leftTitle}</h3>
              <ul>
                {this.getColumnContent(data.leftContent)}
              </ul>
              {
                data.leftNotes ?
                <p className="notes">
                  <span dangerouslySetInnerHTML={{__html: data.leftNotes}} />
                </p>
                : null  
              }
            </Col>
            {
              data.rightContent ? 
              <Col xs={12} sm={6}>

                {
                  data.rightTitle ? 
                  <h3><span className="hidden">Tipo de protección </span>{data.rightTitle}</h3>
                  : null
                }
                <ul>
                  {this.getColumnContent(data.rightContent)}
                </ul>
                {
                  data.rightNotes ?
                  <p className="notes">
                    <span dangerouslySetInnerHTML={{__html: data.rightNotes}} />
                  </p>
                  : null
                }
              </Col>
              : null
            }
          </Row> 
          <Link to="coverage" title="Compara nuestras Coberturas" className="greenButton">Compara nuestras Coberturas</Link>
          <a href="#" title="Cotiza tu Seguro" className="blueButton" target="_blank">Cotiza tu Seguro</a>
        </div>
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
          <li key={'bullet-' + i }>
            <em>{item.title}</em>
            <div dangerouslySetInnerHTML={{__html: item.content}} />
          </li>
        );
      });
    }

    return response;
  }

});

module.exports = CoverageTemplate;