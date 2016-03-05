'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');

var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;

var ModalActions = require('../../actions/ModalActions');

var coverageTable = React.createClass({displayName: "coverageTable",

    mixins : [ReactRouter.Navigation],

    render: function() {

        return (
            React.createElement("section", null, 
                React.createElement("div", {className: "container"}, 
                    React.createElement("h1", null, "Coberturas y Beneficios"), 
                    React.createElement("div", {id: "benefitsTable"}, 
                        React.createElement(Row, null, 
                            React.createElement(Col, {xs: 12, sm: 5}
                            ), 
                            React.createElement(Col, {xs: 12, sm: 7}, 
                                React.createElement(Row, null, 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h5", {onClick: this.handleClick.bind(this, 'prestigio')}, "Prestigio")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h5", {onClick: this.handleClick.bind(this, 'amplia')}, "Confort Amplia")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h5", {onClick: this.handleClick.bind(this, 'limitada')}, "Confort Limitada")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h5", {onClick: this.handleClick.bind(this, 'basica')}, "Confort Básica")
                                    )
                                )
                            )
                        ), 
                        React.createElement(Row, null, 
                            React.createElement(Col, {xs: 12, sm: 5}, 
                                React.createElement("p", null, "Asistencia Vial y en Viajes GS²")
                            ), 
                            React.createElement(Col, {xs: 12, sm: 7}, 
                                React.createElement(Row, null, 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Prestigio"), 
                                        React.createElement("p", {className: "checked"}, "Checked")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Amplia"), 
                                        React.createElement("p", {className: "checked"}, "Checked")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Limitada"), 
                                        React.createElement("p", {className: "checked"}, "Checked")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Básica"), 
                                        React.createElement("p", {className: "checked"}, "Checked")
                                    )
                                )
                            )
                        ), 
                        React.createElement(Row, null, 
                            React.createElement(Col, {xs: 12, sm: 5}, 
                                React.createElement("p", null, "Asistentcia Jurídica GS")
                            ), 
                            React.createElement(Col, {xs: 12, sm: 7}, 
                                React.createElement(Row, null, 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Prestigio"), 
                                        React.createElement("p", {className: "checked"}, "Checked")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Amplia"), 
                                        React.createElement("p", {className: "checked"}, "Checked")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Limitada"), 
                                        React.createElement("p", {className: "checked"}, "Checked")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Básica"), 
                                        React.createElement("p", {className: "checked"}, "Checked")
                                    )
                                )
                            )
                        ), 
                        React.createElement(Row, null, 
                            React.createElement(Col, {xs: 12, sm: 5}, 
                                React.createElement("p", null, "Gastos Médicos")
                            ), 
                            React.createElement(Col, {xs: 12, sm: 7}, 
                                React.createElement(Row, null, 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Prestigio"), 
                                        React.createElement("p", {className: "checked"}, "Checked")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Amplia"), 
                                        React.createElement("p", {className: "checked"}, "Checked")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Limitada"), 
                                        React.createElement("p", {className: "checked"}, "Checked")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Básica"), 
                                        React.createElement("p", {className: "checked"}, "Checked")
                                    )
                                )
                            )
                        ), 
                        React.createElement(Row, {className: "longRow"}, 
                            React.createElement(Col, {xs: 12, sm: 5}, 
                                React.createElement("p", null, "Responsabilidad Civil por Fallecimiento¹")
                            ), 
                            React.createElement(Col, {xs: 12, sm: 7}, 
                                React.createElement(Row, null, 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Prestigio"), 
                                        React.createElement("p", {className: "checked"}, "Checked")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Amplia"), 
                                        React.createElement("p", {className: "checked"}, "Checked")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Limitada"), 
                                        React.createElement("p", {className: "checked"}, "Checked")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Básica"), 
                                        React.createElement("p", {className: "checked"}, "Checked")
                                    )
                                )
                            )
                        ), 
                        React.createElement(Row, {className: "longRow"}, 
                            React.createElement(Col, {xs: 12, sm: 5}, 
                                React.createElement("p", null, "Responsabilidad Civil por Daños a Terceros (L.U.C.)*")
                            ), 
                            React.createElement(Col, {xs: 12, sm: 7}, 
                                React.createElement(Row, null, 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Prestigio"), 
                                        React.createElement("p", {className: "checked"}, "Checked")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Amplia"), 
                                        React.createElement("p", {className: "checked"}, "Checked")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Limitada"), 
                                        React.createElement("p", {className: "checked"}, "Checked")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Básica"), 
                                        React.createElement("p", {className: "checked"}, "Checked")
                                    )
                                )
                            )
                        ), 
                        React.createElement(Row, null, 
                            React.createElement(Col, {xs: 12, sm: 5}, 
                                React.createElement("p", null, "Robo Total")
                            ), 
                            React.createElement(Col, {xs: 12, sm: 7}, 
                                React.createElement(Row, null, 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Prestigio"), 
                                        React.createElement("p", {className: "checked"}, "Checked")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Amplia"), 
                                        React.createElement("p", {className: "checked"}, "Checked")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Limitada"), 
                                        React.createElement("p", {className: "checked"}, "Checked")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Básica"), 
                                        React.createElement("p", null, "*N/A")
                                    )
                                )
                            )
                        ), 
                        React.createElement(Row, {className: "longRow"}, 
                            React.createElement(Col, {xs: 12, sm: 5}, 
                                React.createElement("p", null, "Daños Materiales Pérdida Total")
                            ), 
                            React.createElement(Col, {xs: 12, sm: 7}, 
                                React.createElement(Row, null, 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Prestigio"), 
                                        React.createElement("p", {className: "checked"}, "Checked")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Amplia"), 
                                        React.createElement("p", {className: "checked"}, "Checked")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Limitada"), 
                                        React.createElement("p", null, "*N/A")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Básica"), 
                                        React.createElement("p", null, "*N/A")
                                    )
                                )
                            )
                        ), 
                        React.createElement(Row, {className: "longRow"}, 
                            React.createElement(Col, {xs: 12, sm: 5}, 
                                React.createElement("p", null, "Daños Materiales Pérdida Parcial")
                            ), 
                            React.createElement(Col, {xs: 12, sm: 7}, 
                                React.createElement(Row, null, 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Prestigio"), 
                                        React.createElement("p", {className: "checked"}, "Checked")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Amplia"), 
                                        React.createElement("p", {className: "checked"}, "Checked")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Limitada"), 
                                        React.createElement("p", null, "*N/A")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Básica"), 
                                        React.createElement("p", null, "*N/A")
                                    )
                                )
                            )
                        ), 
                        React.createElement(Row, {className: "longRow"}, 
                            React.createElement(Col, {xs: 12, sm: 5}, 
                                React.createElement("p", null, "Protección GS Extensión de Responsabilidad Civil")
                            ), 
                            React.createElement(Col, {xs: 12, sm: 7}, 
                                React.createElement(Row, null, 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Prestigio"), 
                                        React.createElement("p", {className: "checked"}, "Checked")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Amplia"), 
                                        React.createElement("p", null, "Opcional")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Limitada"), 
                                        React.createElement("p", null, "Opcional")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Básica"), 
                                        React.createElement("p", null, "Opcional")
                                    )
                                )
                            )
                        ), 
                        React.createElement(Row, {className: "longRow"}, 
                            React.createElement(Col, {xs: 12, sm: 5}, 
                                React.createElement("p", null, "Responsabilidad Civil Daños Ocupantes")
                            ), 
                            React.createElement(Col, {xs: 12, sm: 7}, 
                                React.createElement(Row, null, 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Prestigio"), 
                                        React.createElement("p", {className: "checked"}, "Checked")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Amplia"), 
                                        React.createElement("p", null, "Opcional")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Limitada"), 
                                        React.createElement("p", null, "*N/A")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Básica"), 
                                        React.createElement("p", null, "*N/A")
                                    )
                                )
                            )
                        ), 
                        React.createElement(Row, null, 
                            React.createElement(Col, {xs: 12, sm: 5}, 
                                React.createElement("p", null, "Cero Deducible Robo Total")
                            ), 
                            React.createElement(Col, {xs: 12, sm: 7}, 
                                React.createElement(Row, null, 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Prestigio"), 
                                        React.createElement("p", null, "Opcional")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Amplia"), 
                                        React.createElement("p", null, "Opcional")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Limitada"), 
                                        React.createElement("p", null, "*N/A")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Básica"), 
                                        React.createElement("p", null, "*N/A")
                                    )
                                )
                            )
                        ), 
                        React.createElement(Row, null, 
                            React.createElement(Col, {xs: 12, sm: 5}, 
                                React.createElement("p", null, "Protección GS Asalto")
                            ), 
                            React.createElement(Col, {xs: 12, sm: 7}, 
                                React.createElement(Row, null, 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Prestigio"), 
                                        React.createElement("p", {className: "checked"}, "Checked")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Amplia"), 
                                        React.createElement("p", null, "Opcional")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Limitada"), 
                                        React.createElement("p", null, "*N/A")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Básica"), 
                                        React.createElement("p", null, "*N/A")
                                    )
                                )
                            )
                        ), 
                        React.createElement(Row, {className: "longRow"}, 
                            React.createElement(Col, {xs: 12, sm: 5}, 
                                React.createElement("p", null, "Protección GS Objetos Personales")
                            ), 
                            React.createElement(Col, {xs: 12, sm: 7}, 
                                React.createElement(Row, null, 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Prestigio"), 
                                        React.createElement("p", {className: "checked"}, "Checked")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Amplia"), 
                                        React.createElement("p", null, "Opcional")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Limitada"), 
                                        React.createElement("p", null, "*N/A")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Básica"), 
                                        React.createElement("p", null, "*N/A")
                                    )
                                )
                            )
                        ), 
                        React.createElement(Row, null, 
                            React.createElement(Col, {xs: 12, sm: 5}, 
                                React.createElement("p", null, "Robo Parcial")
                            ), 
                            React.createElement(Col, {xs: 12, sm: 7}, 
                                React.createElement(Row, null, 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Prestigio"), 
                                        React.createElement("p", {className: "checked"}, "Checked")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Amplia"), 
                                        React.createElement("p", null, "Opcional")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Limitada"), 
                                        React.createElement("p", null, "*N/A")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Básica"), 
                                        React.createElement("p", null, "*N/A")
                                    )
                                )
                            )
                        ), 
                        React.createElement(Row, {className: "longRow"}, 
                            React.createElement(Col, {xs: 12, sm: 5}, 
                                React.createElement("p", null, "Cero Deducible Daños Materiales Pérdida Total")
                            ), 
                            React.createElement(Col, {xs: 12, sm: 7}, 
                                React.createElement(Row, null, 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Prestigio"), 
                                        React.createElement("p", null, "Opcional")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Amplia"), 
                                        React.createElement("p", null, "Opcional")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Limitada"), 
                                        React.createElement("p", null, "*N/A")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Básica"), 
                                        React.createElement("p", null, "*N/A")
                                    )
                                )
                            )
                        ), 
                        React.createElement(Row, {className: "longRow"}, 
                            React.createElement(Col, {xs: 12, sm: 5}, 
                                React.createElement("p", null, "Daños al Vehículo por Tercero sin Seguro")
                            ), 
                            React.createElement(Col, {xs: 12, sm: 7}, 
                                React.createElement(Row, null, 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Prestigio"), 
                                        React.createElement("p", {className: "checked"}, "Checked")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Amplia"), 
                                        React.createElement("p", null, "Opcional")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Limitada"), 
                                        React.createElement("p", null, "*N/A")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Básica"), 
                                        React.createElement("p", null, "*N/A")
                                    )
                                )
                            )
                        ), 
                        React.createElement(Row, null, 
                            React.createElement(Col, {xs: 12, sm: 5}, 
                                React.createElement("p", null, "Muerte Accidental al Conductor")
                            ), 
                            React.createElement(Col, {xs: 12, sm: 7}, 
                                React.createElement(Row, null, 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Prestigio"), 
                                        React.createElement("p", {className: "checked"}, "Checked")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Amplia"), 
                                        React.createElement("p", null, "*N/A")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Limitada"), 
                                        React.createElement("p", null, "*N/A")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Básica"), 
                                        React.createElement("p", null, "*N/A")
                                    )
                                )
                            )
                        ), 
                        React.createElement(Row, {className: "longRow"}, 
                            React.createElement(Col, {xs: 12, sm: 5}, 
                                React.createElement("p", null, "Extensión de Gastos Médicos para el Titular")
                            ), 
                            React.createElement(Col, {xs: 12, sm: 7}, 
                                React.createElement(Row, null, 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Prestigio"), 
                                        React.createElement("p", null, "Opcional")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Amplia"), 
                                        React.createElement("p", null, "Opcional")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Limitada"), 
                                        React.createElement("p", null, "Opcional")
                                    ), 
                                    React.createElement(Col, {xs: 6, sm: 3}, 
                                        React.createElement("h6", null, "Confort Básica"), 
                                        React.createElement("p", null, "Opcional")
                                    )
                                )
                            )
                        ), 
                        React.createElement("p", {className: "notes"}, "*No Amparado")
                    )
                ), 
                React.createElement("div", {className: "smallContainer"}, 
                    React.createElement(Row, null, 
                        React.createElement(Col, {xs: 12, sm: 6, id: "coverageNotes"}, 
                            React.createElement("p", null, "*Límite Único y Combinado."), 
                            React.createElement("ol", null, 
                                React.createElement("li", null, "Esta cobertura se incluye sólo en Automóviles y Pick Up´s de hasta 3.5 Toneladas. Puede ser contratada de forma opcional para Camiones."), 
                                React.createElement("li", null, "Esta cobertura sólo está disponible para Automóviles y Pick Up´s de hasta 3.5 Toneladas.")
                            )
                        ), 
                        React.createElement(Col, {xs: 12, sm: 6}
                        )
                    )
                )
            )
        );
    },

  handleClick: function(coverage){
        ModalActions.openModal(coverage);
    }
});

module.exports = coverageTable;
