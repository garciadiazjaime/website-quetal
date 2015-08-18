'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');

var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;

var ModalActions = require('../../actions/ModalActions');

var coverageTable = React.createClass({

    mixins : [ReactRouter.Navigation],

    render: function() {

        return (
            <section>
                <div className="container">
                    <h1>Coberturas y Beneficios</h1>
                    <div id="benefitsTable">
                        <Row>
                            <Col xs={12} sm={5}>
                            </Col>
                            <Col xs={12} sm={7}>
                                <Row>
                                    <Col xs={6} sm={3}>
                                        <h5 onClick={this.handleClick.bind(this, 'prestigio')}>Prestigio</h5>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h5 onClick={this.handleClick.bind(this, 'amplia')}>Confort Amplia</h5>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h5 onClick={this.handleClick.bind(this, 'limitada')}>Confort Limitada</h5>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h5 onClick={this.handleClick.bind(this, 'basica')}>Confort Básica</h5>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={5}>
                                <p>Asistencia Vial y en Viajes GS²</p>
                            </Col>
                            <Col xs={12} sm={7}>
                                <Row>
                                    <Col xs={6} sm={3}>
                                        <h6>Prestigio</h6>
                                        <p className="checked">Checked</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Amplia</h6>
                                        <p className="checked">Checked</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Limitada</h6>
                                        <p className="checked">Checked</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Básica</h6>
                                        <p className="checked">Checked</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={5}>
                                <p>Asistentcia Jurídica GS</p>
                            </Col>
                            <Col xs={12} sm={7}>
                                <Row>
                                    <Col xs={6} sm={3}>
                                        <h6>Prestigio</h6>
                                        <p className="checked">Checked</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Amplia</h6>
                                        <p className="checked">Checked</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Limitada</h6>
                                        <p className="checked">Checked</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Básica</h6>
                                        <p className="checked">Checked</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={5}>
                                <p>Gastos Médicos</p>
                            </Col>
                            <Col xs={12} sm={7}>
                                <Row>
                                    <Col xs={6} sm={3}>
                                        <h6>Prestigio</h6>
                                        <p className="checked">Checked</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Amplia</h6>
                                        <p className="checked">Checked</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Limitada</h6>
                                        <p className="checked">Checked</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Básica</h6>
                                        <p className="checked">Checked</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row  className="longRow">
                            <Col xs={12} sm={5}>
                                <p>Responsabilidad Civil por Fallecimiento¹</p>
                            </Col>
                            <Col xs={12} sm={7}>
                                <Row>
                                    <Col xs={6} sm={3}>
                                        <h6>Prestigio</h6>
                                        <p className="checked">Checked</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Amplia</h6>
                                        <p className="checked">Checked</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Limitada</h6>
                                        <p className="checked">Checked</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Básica</h6>
                                        <p className="checked">Checked</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="longRow">
                            <Col xs={12} sm={5}>
                                <p>Responsabilidad Civil por Daños a Terceros (L.U.C.)*</p>
                            </Col>
                            <Col xs={12} sm={7}>
                                <Row>
                                    <Col xs={6} sm={3}>
                                        <h6>Prestigio</h6>
                                        <p className="checked">Checked</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Amplia</h6>
                                        <p className="checked">Checked</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Limitada</h6>
                                        <p className="checked">Checked</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Básica</h6>
                                        <p className="checked">Checked</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={5}>
                                <p>Robo Total</p>
                            </Col>
                            <Col xs={12} sm={7}>
                                <Row>
                                    <Col xs={6} sm={3}>
                                        <h6>Prestigio</h6>
                                        <p className="checked">Checked</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Amplia</h6>
                                        <p className="checked">Checked</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Limitada</h6>
                                        <p className="checked">Checked</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Básica</h6>
                                        <p>*N/A</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="longRow">
                            <Col xs={12} sm={5}>
                                <p>Daños Materiales Pérdida Total</p>
                            </Col>
                            <Col xs={12} sm={7}>
                                <Row>
                                    <Col xs={6} sm={3}>
                                        <h6>Prestigio</h6>
                                        <p className="checked">Checked</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Amplia</h6>
                                        <p className="checked">Checked</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Limitada</h6>
                                        <p>*N/A</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Básica</h6>
                                        <p>*N/A</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="longRow">
                            <Col xs={12} sm={5}>
                                <p>Daños Materiales Pérdida Parcial</p>
                            </Col>
                            <Col xs={12} sm={7}>
                                <Row>
                                    <Col xs={6} sm={3}>
                                        <h6>Prestigio</h6>
                                        <p className="checked">Checked</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Amplia</h6>
                                        <p className="checked">Checked</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Limitada</h6>
                                        <p>*N/A</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Básica</h6>
                                        <p>*N/A</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="longRow">
                            <Col xs={12} sm={5}>
                                <p>Protección GS Extensión de Responsabilidad Civil</p>
                            </Col>
                            <Col xs={12} sm={7}>
                                <Row>
                                    <Col xs={6} sm={3}>
                                        <h6>Prestigio</h6>
                                        <p className="checked">Checked</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Amplia</h6>
                                        <p>Opcional</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Limitada</h6>
                                        <p>Opcional</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Básica</h6>
                                        <p>Opcional</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="longRow">
                            <Col xs={12} sm={5}>
                                <p>Responsabilidad Civil Daños Ocupantes</p>
                            </Col>
                            <Col xs={12} sm={7}>
                                <Row>
                                    <Col xs={6} sm={3}>
                                        <h6>Prestigio</h6>
                                        <p className="checked">Checked</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Amplia</h6>
                                        <p>Opcional</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Limitada</h6>
                                        <p>*N/A</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Básica</h6>
                                        <p>*N/A</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={5}>
                                <p>Cero Deducible Robo Total</p>
                            </Col>
                            <Col xs={12} sm={7}>
                                <Row>
                                    <Col xs={6} sm={3}>
                                        <h6>Prestigio</h6>
                                        <p>Opcional</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Amplia</h6>
                                        <p>Opcional</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Limitada</h6>
                                        <p>*N/A</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Básica</h6>
                                        <p>*N/A</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={5}>
                                <p>Protección GS Asalto</p>
                            </Col>
                            <Col xs={12} sm={7}>
                                <Row>
                                    <Col xs={6} sm={3}>
                                        <h6>Prestigio</h6>
                                        <p className="checked">Checked</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Amplia</h6>
                                        <p>Opcional</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Limitada</h6>
                                        <p>*N/A</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Básica</h6>
                                        <p>*N/A</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="longRow">
                            <Col xs={12} sm={5}>
                                <p>Protección GS Objetos Personales</p>
                            </Col>
                            <Col xs={12} sm={7}>
                                <Row>
                                    <Col xs={6} sm={3}>
                                        <h6>Prestigio</h6>
                                        <p className="checked">Checked</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Amplia</h6>
                                        <p>Opcional</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Limitada</h6>
                                        <p>*N/A</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Básica</h6>
                                        <p>*N/A</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={5}>
                                <p>Robo Parcial</p>
                            </Col>
                            <Col xs={12} sm={7}>
                                <Row>
                                    <Col xs={6} sm={3}>
                                        <h6>Prestigio</h6>
                                        <p className="checked">Checked</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Amplia</h6>
                                        <p>Opcional</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Limitada</h6>
                                        <p>*N/A</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Básica</h6>
                                        <p>*N/A</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="longRow">
                            <Col xs={12} sm={5}>
                                <p>Cero Deducible Daños Materiales Pérdida Total</p>
                            </Col>
                            <Col xs={12} sm={7}>
                                <Row>
                                    <Col xs={6} sm={3}>
                                        <h6>Prestigio</h6>
                                        <p>Opcional</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Amplia</h6>
                                        <p>Opcional</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Limitada</h6>
                                        <p>*N/A</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Básica</h6>
                                        <p>*N/A</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="longRow">
                            <Col xs={12} sm={5}>
                                <p>Daños al Vehículo por Tercero sin Seguro</p>
                            </Col>
                            <Col xs={12} sm={7}>
                                <Row>
                                    <Col xs={6} sm={3}>
                                        <h6>Prestigio</h6>
                                        <p className="checked">Checked</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Amplia</h6>
                                        <p>Opcional</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Limitada</h6>
                                        <p>*N/A</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Básica</h6>
                                        <p>*N/A</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={5}>
                                <p>Muerte Accidental al Conductor</p>
                            </Col>
                            <Col xs={12} sm={7}>
                                <Row>
                                    <Col xs={6} sm={3}>
                                        <h6>Prestigio</h6>
                                        <p className="checked">Checked</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Amplia</h6>
                                        <p>*N/A</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Limitada</h6>
                                        <p>*N/A</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Básica</h6>
                                        <p>*N/A</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="longRow">
                            <Col xs={12} sm={5}>
                                <p>Extensión de Gastos Médicos para el Titular</p>
                            </Col>
                            <Col xs={12} sm={7}>
                                <Row>
                                    <Col xs={6} sm={3}>
                                        <h6>Prestigio</h6>
                                        <p>Opcional</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Amplia</h6>
                                        <p>Opcional</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Limitada</h6>
                                        <p>Opcional</p>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <h6>Confort Básica</h6>
                                        <p>Opcional</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <p className="notes">*No Amparado</p>
                    </div>
                </div>
                <div className="smallContainer">
                    <Row>
                        <Col xs={12} sm={6} id="coverageNotes">
                            <p>*Límite Único y Combinado.</p>
                            <ol>
                                <li>Esta cobertura se incluye sólo en Automóviles y Pick Up´s de hasta 3.5 Toneladas. Puede ser contratada de forma opcional para Camiones.</li>
                                <li>Esta cobertura sólo está disponible para Automóviles y Pick Up´s de hasta 3.5 Toneladas.</li>
                            </ol>
                        </Col>
                        <Col xs={12} sm={6}>
                        </Col>
                    </Row>
                </div>
            </section>
        );
    },

  handleClick: function(coverage){
        ModalActions.openModal(coverage);
    }
});

module.exports = coverageTable;
