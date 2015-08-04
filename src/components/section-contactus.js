'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');
var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;
var Carousel = rb.Carousel;
var CarouselItem = rb.CarouselItem;

var ContactPanel = React.createClass({

    mixins : [ReactRouter.Navigation],

    getInitialState: function(){
        return {
            formData: {}
        }
    },
    
    handleClick: function(){
        console.log('handleClick');
        // this.transitionTo('home');
    },

    render: function() {
        var mapStyle = {
            border: 0
        };
        return (
            <section id="contacto">
                
                <div className="twoColumns">
                    <Row>
                        <Col xs={12} sm={6} className="pinkBackground">
                            Contacto
                        </Col>
                        <Col xs={12} sm={6}>
                            <div className="twoColumns-wraper">
                                <h2>Contacto / Citas</h2>
                                <span className="sidenote">*Información requerida</span>
                                <form id="contactForm">
                                    <div className="formGroup">
                                        <label>Nombre*</label><input type="text" id="name" name="name" placeholder="nombre" onChange={this.onChangeHandler.bind(this, 'input', 'name', 'Nombre')}/>
                                    </div>
                                    <div className="formGroup">
                                        <label>Correo*</label>
                                        <input type="email" id="email" name="email" placeholder="correo" onChange={this.onChangeHandler.bind(this, 'input', 'email', 'Correo')}/>
                                    </div>
                                    <div className="formGroup">
                                        <label>Tel&eacute;fono*</label>
                                        <input type="tel" id="tel" name="tel" placeholder="tel&eacute;fono" onChange={this.onChangeHandler.bind(this, 'input', 'tel', 'Teléfono')}/>
                                    </div>
                                    <div className="formGroup">
                                        <label>Servicio*</label>
                                        <div className="selectWraper">
                                            <select onChange={this.onChangeHandler.bind(this, 'input', 'service', 'Servicio')}>
                                                <option>Elegir servicio</option>
                                                <option>Corte</option>
                                                <option>Color</option>
                                                <option>Peinados</option>
                                                <option>Maquillaje</option>
                                                <option>Novias</option>
                                                <option>Spa</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <Col xs={12} sm={6}>
                                            <label>Fecha*</label>
                                            <input type="text" id="date" name="date" placeholder="dd/mm/yyyy" onChange={this.onChangeHandler.bind(this, 'input', 'date', 'Fecha')}/>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <label>Hora*</label>
                                            <input type="text" id="time" name="time" placeholder="hh:mm" onChange={this.onChangeHandler.bind(this, 'input', 'time', 'Hora')}/>
                                        </Col>
                                    </div>

                                    <label className="static">Mensaje</label>
                                    <textarea id="mainMessage" name="mainMessage" onChange={this.onChangeHandler.bind(this, 'input', 'mainMessage', 'Mensaje')}></textarea>
                                    {/* TODO: Agregar mensaje de error, por default es color rojo */}
                                    <span id="msg"></span>

                                    <button id="submitButton" onClick={this.submitFormHandler}><span>Enviar</span></button>
                                </form>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
        );
    },

    submitFormHandler: function(event){
        console.log('submitForm', this.state.formData);
        event.preventDefault();
    },

    onChangeHandler: function(type, property, label, event){
        var formData = this.state.formData;
        formData[property] = {
            title: 'label',
            value: event.target.value
        };
        this.setState({
            formData: formData
        });
    }
});

module.exports = ContactPanel;
