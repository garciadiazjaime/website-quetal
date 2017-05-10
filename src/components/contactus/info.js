'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');

var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;

var ContactForm = require('./form');

var HelloPanel = React.createClass({

    mixins : [ReactRouter.Navigation],

    render: function() {

        return (
            <section id="contactInfo">
                <div className="smallContainer">
                    <Row>
                        <Col xs={12} sm={6} id="disaster">
                            <h2><em><span className="hidden">Contáctanos </span>En caso de Siniestro</em>
                                Reporte de Robo, Choque o Asistencia Legal
                            </h2>
                            <p className="instructionsParagraph"><em>Llama a los siguientes teléfonos</em>
                            de General de Seguros para que envíen a un ajustador para que te auxilie, nunca negocies por tu cuenta, permite que el ajustador te aconseje para que  el siniestro se resuelva de la mejor manera, recuerda que ellos son los expertos y además pagaste por ese servicio.
                            </p>
                            <ul>
                                <li>
                                    En el Distrito Federal
                                    <a href="tel:5552708888" className="tel" tel="Llámanos desde el D.F.">555270.8888</a>
                                </li>
                                <li>
                                    Del Interior de la República
                                    <a href="tel:018004727696" className="tel" tel="Llámanos desde el interior de la república">01800.GS.APOYO <span className="telMeaning">47.27696</span></a>
                                </li>
                                <li>
                                    Asistencia en Viajes y Auxilio Vial en el Distrito Federal e Interior del País, marque sin costo
                                    <a href="tel:018004729832" className="tel" tel="Llámanos para asistencia desde el interior del país">01800.GS.AYUDA <span className="telMeaning">47.29832</span></a>
                                </li>
                            </ul>
                            <p className="instructionsParagraph">
                              <em>Horario de atención</em>
                              Lunes a Viernes <br />
                              09:00am a 17:00pm <br />
                              Zona Horaria del Pacífico
                            </p>
                            <br />
                            <p className="instructionsParagraph">
                              <em>Domicilio</em>
                              Defensores de Baja California 150-C <br />
                              Colonia Ruiz Cortinez <br />
                              Tijuana BC CP 22406
                            </p>
                        </Col>
                        <Col xs={12} sm={6} id="contactform">
                            <ContactForm />
                        </Col>
                    </Row>
                </div>
            </section>
        );
    }
});

module.exports = HelloPanel;
