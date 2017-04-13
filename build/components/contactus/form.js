'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');
var RestClient = require('../../lib/rest-client');

var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;

var ContactForm = React.createClass({displayName: "ContactForm",

    getInitialState: function(){
        return {
            formData: this._getInitialFormState(),
            requiredFields: this._getRequiredFields(this._getInitialFormState()),
            showLoading: false,
            errorCSSClass: 'text-error',
            successCSSClass: 'text-success'
        };
    },

    render: function() {

        return (
            React.createElement("form", {id: "form"}, 
                React.createElement("h1", null, React.createElement("em", null, "Contacto"), 
                "Para cualquier duda o comentario"), 
                React.createElement("p", null, "Llena la siguiente forma"), 
                React.createElement("div", {className: "formGroup"}, 
                    React.createElement("label", {id: "lab_name"}, "Nombre*"), 
                    React.createElement("input", {type: "text", id: "name", name: "name", placeholder: "Nombre", onChange: this.onChangeHandler.bind(this, 'name'), value: this.state.formData.name.value})
                ), 
                React.createElement("div", {className: "formGroup"}, 
                    React.createElement("label", {id: "lab_email"}, "Correo*"), 
                    React.createElement("input", {type: "text", id: "email", name: "email", placeholder: "Correo", onChange: this.onChangeHandler.bind(this, 'email'), value: this.state.formData.email.value})
                ), 
                React.createElement("div", {className: "formGroup"}, 
                    React.createElement("label", {id: "lab_tel"}, "Teléfono*"), 
                    React.createElement("input", {type: "tel", id: "tel", name: "tel", placeholder: "Teléfono (10 dígitos)", onChange: this.onChangeHandler.bind(this, 'tel'), value: this.state.formData.tel.value})
                ), 
                React.createElement("textarea", {id: "message", name: "message", placeholder: "Mensaje (255 carácteres)", onChange: this.onChangeHandler.bind(this, 'message'), value: this.state.formData.message.value, maxlength: "255"}), 
                React.createElement("span", {id: "msg"}), 

                 this.state.showLoading ? React.createElement("span", {id: "loader"}, "Cargando") : null, 

                React.createElement("button", {id: "submitButton", onClick: this.submitFormHandler}, React.createElement("span", null, "Enviar"))
            )
        )
    },

    onChangeHandler: function(property, event){
        var formData = this.state.formData;
        formData[property].value = event.target.value;

        this.setState({
            formData: formData
        });
    },

    /*
        Handler function to validate form and send data
    */
    submitFormHandler: function(event){
        event.preventDefault();
        var formData = this.state.formData;
        var isFormValid = this._validateForm(formData, this.state.requiredFields);
        var msgElement = document.getElementById('msg');

        if(isFormValid){
            this.setState({
                showLoading: false
            });

            var _this = this;
            var html = this._getHTMLMessage(formData);
            var data = {
                fromname: formData.name.value,
                replyto: formData.email.value,
                subject: 'Quetal | Forma de Contacto Web',
                html: html
            };

            RestClient({
                path: '/api/send_email',
                method: 'POST',
                entity: data
            }).then(function(response) {
                var state = {
                    showLoading: false
                };
                if(response.entity.status){
                    state['formData'] = _this._getInitialFormState();
                }
                _this.setState(state);
                msgElement.className = response.entity.status ? _this.state.successCSSClass : _this.state.errorCSSClass;
                msgElement.innerHTML = response.entity.status ?
                    'Tu información ha sido enviada de manera exitosa. Gracias.':
                    'Lo sentimos, el mensaje no pudo ser enviado, intenta más tarde.';
            });
        }else{
            msgElement.className = this.state.errorCSSClass;
        }
        msgElement.innerHTML = !isFormValid ? 'Favor de llenar los campos marcados.' : '';
    },

    _getRequiredFields: function(data){
        var response = [];
        for(var property in data){
            if(data[property].require){
                response.push(property);
            }
        }
        return response;
    },

    _validateForm: function(data, requiredFields){
        var response = true;
        for(var i=0; i<requiredFields.length; i++){
            var property = requiredFields[i];
            var labelElement = document.getElementById('lab_' + property);
            if( !data.hasOwnProperty(property) || !data[property].value.length){
                if(response){
                    response = false;
                }
                labelElement.className = this.state.errorCSSClass;
            }
            else{
                labelElement.className = '';
            }
        }
        return response;
    },

    _getHTMLMessage: function(data){
        var response = '';
        for(var property in data){
            response += data[property].title + ': ' + data[property].value + '<br />'
        }
        return response;
    },

    _getInitialFormState: function(){
        return {
            name: {
                title: 'Nombre',
                value: '',
                require: true
            },
            email:{
                title: 'Correo',
                value: '',
                require: true
            },
            tel: {
                title: 'Teléfono',
                value: '',
                require: true
            },
            message: {
                title: 'Mensaje',
                value: ''
            }
        };
    }
});

module.exports = ContactForm;
