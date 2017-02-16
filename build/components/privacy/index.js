'use strict';

var React = require('react');
var ReactRouter = require('react-router');


var PrivacySection = React.createClass({displayName: "PrivacySection",

    mixins : [ReactRouter.Navigation],

    render: function() {

        return (
            React.createElement("section", {id: "mainContent"}, 
                React.createElement("div", {className: "container"}, 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "col-xs-12"}, 
                            React.createElement("h3", null, "DATOS SENSIBLES"), 
                            React.createElement("p", null, 
                              "En Quetal Seguro de Auto.com, Agente de Seguros S.A. de C.V., nos comprometemos a proteger su privacidad durante el procesamiento de sus datos personales identificables y sensibles; por lo tanto, esta Compañía se obliga a hacer uso correcto de sus datos personales de conformidad con las leyes, la buena fe, el orden público y el presente Aviso."
                            ), 
                            React.createElement("br", null), 
                            React.createElement("h4", null, "I.-IDENTIDAD Y DOMICILIO DEL RESPONSABLE:"), 
                            React.createElement("p", null, 
                              "Quetal Seguro de Auto.com, Agente de Seguros S.A. de C.V., con domicilio en Emiliano Zapata, Número 7232, Zona Centro, Código Postal 22000, Tijuana, Baja California."
                            ), 
                            React.createElement("br", null), 
                            React.createElement("h4", null, "II.-LOS DATOS PERSONALES QUE SERÁN SOMETIDOS A TRATAMIENTO:"), 
                            React.createElement("p", null, 
                              "Los datos que Quetal Seguro de Auto.com, Agente de Seguros S.A. de C.V. recabe de usted a través de la solicitud de seguro y/o a través de los formatos institucionales, y/o medios físicos y/o medios electrónicos, serán utilizados para todos los fines de la relación jurídica derivada del contrato de seguro. Los datos personales que serán ser sometidos a tratamiento son los siguientes:"
                            ), 
                            React.createElement("br", null), 
                            React.createElement("h5", null, "CATEGORÍAS DE DATOS PERSONALES:"), 
                            React.createElement("p", null, 
                              "Datos de identificación: Nombre, Estado Civil, firma autógrafa y en su caso electrónica, Registro Federal de Contribuyentes," + ' ' +
                              "Clave Única de Registro de Población, número de cartilla militar, lugar y fecha de nacimiento, nacionalidad y edad." + ' ' +
                              "Datos de contacto: Domicilio, correo electrónico, teléfono fijo y teléfono celular." + ' ' +
                              "Datos patrimoniales o financieros: Bienes, derechos, cargas u obligaciones susceptibles de valoración económica, como son: bienes muebles e inmuebles, seguros y fianzas."
                            ), 
                            React.createElement("br", null), 
                            React.createElement("h5", null, "CATEGORÍAS DE DATOS PERSONALES SENSIBLES:"), 
                            React.createElement("p", null, 
                              "Datos de salud: Lo relativo a la valoración, preservación, cuidado, mejoramiento y recuperación de su estado de salud físico o mental, presente, pasado o futuro. ", React.createElement("br", null), 

                              "Asimismo, también se considera como datos sensibles los aspectos que refieran al origen racial, étnico, información genética, creencias religiosas, filosóficas y morales, afiliación sindical, opiniones políticas y preferencia sexual. ", React.createElement("br", null), 

                              "Los datos personales sensibles y financieros que usted proporcione, serán tratados y resguardados con un alto estándar de seguridad y estricta confidencialidad y serán utilizados únicamente para los fines de la relación jurídica en total apego a lo dispuesto en este Aviso de Privacidad y en la legislación aplicable."
                            ), 
                            React.createElement("br", null), 
                            React.createElement("h4", null, "III.-LAS FINALIDADES DEL TRATAMIENTO:"), 
                            React.createElement("p", null, 
                              "La finalidad de la obtención, uso y almacenamiento de sus datos personales, se desglosa de la siguiente manera: ", React.createElement("br", null), 
                              "A. Para la valuación de solicitudes de seguro, selección de riesgos, y en su caso, la emisión del contrato de seguro, renovaciones del mismo y trámite de reclamaciones para el pago de siniestros. ", React.createElement("br", null), 
                              "B. Para regular los derechos y obligaciones que surgen entre las partes por la celebración del Contrato de Seguro. ", React.createElement("br", null), 
                              "C. Para la emisión y rehabilitación de sus Pólizas de Seguro. ", React.createElement("br", null), 
                              "D. Para los Visitantes y Asegurados: Todos los datos que le sean solicitados, así como la videograbación que se realice,  se utilizaran para todos los fines vinculados con el acceso, control y seguridad dentro de las instalaciones de la empresa. ", React.createElement("br", null), 
                              "E. Proveedores o prestadores de bienes y/o servicios, incluso agentes de seguros: Para todos los fines vinculados con la relación jurídica y contractual que celebremos con usted. ", React.createElement("br", null), 
                              "F. Para integrar expedientes conforme a las políticas emitidas por la Comisión Nacional de Seguros y Fianzas, para combatir el lavado de dinero y terrorismo. ", React.createElement("br", null), 
                              "G. Para investigar y combatir la comisión de los delitos patrimoniales, como son Fraude, de tipo genérico y específico, y otros de semejante naturaleza. ", React.createElement("br", null), 
                              "H. Para la promoción de nuestros productos y servicios que se hagan a través de Quetal Seguro de Auto.com, Agente de Seguros S.A. de C.V., y de sus empresas filiales. ", React.createElement("br", null), 
                              "I. Para fines de mercadotecnia, publicidad y prospección comercial. ", React.createElement("br", null), " ", React.createElement("br", null), 

                              "Las finalidades consistentes en los incisos A),  B), C), D), E), F) G) son necesarias para la existencia, mantenimiento y cumplimiento de la relación jurídica entre Usted y Quetalsegurosdeauto.com, Agente de Seguros S.A. de C.V. ", React.createElement("br", null), 

                              "Las finalidades consistentes en los incisos H) y I), no son necesarias para la existencia, mantenimiento y cumplimiento de la relación jurídica, ya que las mismas son únicamente para fines publicitarios. ", React.createElement("br", null), 

                              "Marque con una cruz la casilla correspondiente para señalar si está de acuerdo con las finalidades de mercadotecnia, publicidad, prospección judicial de productos y servicios de Quetal seguros de auto.com, Agente de Seguros S.A. de C.V. ", React.createElement("br", null), 

                              "Asimismo, tendrá un plazo de cinco días hábiles para que, de ser el caso, manifieste su negativa para el tratamiento de sus datos personales con respecto de las finalidades que no son necesarias, ni dieron origen a la relación con la Compañía Aseguradora."
                            ), 
                            React.createElement("br", null), 
                            React.createElement("h4", null, "IV.-TRANSFERENCIA DE DATOS PERSONALES:"), 
                            React.createElement("p", null, 
                              "Los datos sujetos a tratamiento podrán ser transferidos a: ", React.createElement("br", null), 
                              "• General de Seguros, SAB empresa con la cual Quetal Seguro de Auto.com, Agente de Seguros, SA de CV tiene contrato mercantil, con la finalidad de ofrecerle otros productos y servicios. ", React.createElement("br", null), 
                              "• Autoridades financieras, mexicanas y extranjeras, con la finalidad de dar cumplimiento a nuestras obligaciones derivadas de leyes o tratados internacionales como institución de seguros, obligaciones tributarias, así como para el cumplimiento de notificaciones o requerimientos oficiales. ", React.createElement("br", null), 
                              "• Autoridades judiciales, mexicanas y extranjeras, con la finalidad de dar cumplimiento a la ley, notificaciones, requerimientos u oficios de carácter judicial. ", React.createElement("br", null), 
                              "• Instituciones, organizaciones o entidades del sector asegurador que pertenezcan a la Asociación Mexicana de Instituciones de Seguros para fines de prevención de fraude y selección de riesgos. ", React.createElement("br", null), " ", React.createElement("br", null), 

                              "Cuando Quetal Seguro de Auto.com, Agente de Seguros S.A. de C.V. pretenda transferir los datos personales a terceros nacionales o extranjeros, comunicará a estos el contenido del presente aviso de privacidad y las finalidades a las que el titular autorizó para estar sujeto a tratamiento. Cuando la transferencia sea precisa para el mantenimiento o cumplimiento de un Contrato de Seguro celebrado entre el responsable y el Titular de los datos personales, no será necesario el consentimiento del Titular."
                            ), 
                            React.createElement("br", null), 
                            React.createElement("h4", null, "V.-PROCEDIMIENTO PARA EJERCER DERECHOS ARCO Y REVOCACIÓN DEL CONSENTIMIENTO:"), 
                            React.createElement("p", null, 
                              "El Titular o su representante legal, podrán solicitar a Quetal Seguro de Auto.com.com, Agente de Seguros S.A. de C.V., en cualquier momento el acceso, la rectificación, la cancelación u oposición respecto a los datos personales que le conciernen, para ello bastará que lo solicite por escrito en formato libre dirigido al área responsable del manejo de los datos personales ubicado en Emiliano Zapata, Número 7232, Zona Centro, Código Postal 22000, Tijuana, Baja California, o bien, en la sección disponible a través de nuestra página WEB www.quetalsegurosdeauto.com" + ' ' +
                              "Para el ejercicio de este derecho, Usted como Titular de los Datos Personales, deberá de identificar en su solicitud de acceso, rectificación, cancelación u oposición, los siguientes datos: ", React.createElement("br", null), 

                              "1.-Nombre y Domicilio del titular, o medio electrónico a donde pueda enviarse la respuesta a su solicitud. ", React.createElement("br", null), 
                              "2.-La descripción clara y precisa de los datos personales de los que busca ejercer alguno de los derechos antes mencionados. ", React.createElement("br", null), 
                              "3.-En el caso de las solicitudes de rectificación de sus datos personales el Titular deberá de indicar el dato que es erróneo y la corrección que debe de realizarse al respecto. ", React.createElement("br", null), 
                              "4.-Los datos, documentos o registros que faciliten la localización de datos personales. ", React.createElement("br", null), 
                              "5.-El plazo para dar respuesta no excederá del término de diez días hábiles. ", React.createElement("br", null)
                            ), 
                            React.createElement("br", null), 
                            React.createElement("h4", null, "VI.-PROCEDIMIENTO PARA REVOCACIÓN DEL CONSENTIMIENTO:"), 
                            React.createElement("p", null, 
                              "El Titular o su representante legal, podrán solicitar a Quetal Seguro de Auto.com, Agente de Seguros S.A. de C.V., en cualquier momento la revocación de sus datos personales, para ello bastará que lo solicite por escrito en formato libre dirigido al área responsable del manejo de los datos personales ubicado en Emiliano Zapata, Número 7232, Zona Centro, Código Postal 22000, Tijuana, Baja California, o bien, en la sección disponible a través de nuestra página WEB" + ' ' +
                              "www.quetalsegurodeauto.com" + ' ' +
                              "Para el ejercicio de este derecho, Usted como Titular de los Datos Personales, deberá de identificar en el escrito de revocación al tratamiento de sus datos personales los siguientes datos: ", React.createElement("br", null), 

                              "1.-Nombre y Domicilio del titular, o medio electrónico a donde pueda enviarse la respuesta a su solicitud. ", React.createElement("br", null), 
                              "2.-La descripción clara y precisa de los datos personales que desea revocar. ", React.createElement("br", null), 
                              "3.-Los datos, documentos o registros que faciliten la localización de datos personales. ", React.createElement("br", null), 
                              "5.-El plazo para dar respuesta no excederá del término de diez días hábiles. ", React.createElement("br", null)
                            ), 
                            React.createElement("br", null), 
                            React.createElement("h4", null, "VII.-OPCIONES Y MEDIOS PARA LIMITAR EL USO O DIVULGACIÓN DE LOS DATOS PERSONALES:"), 
                            React.createElement("p", null, 
                              "Usted tendrá el derecho de manifestar su negativa de seguir recibiendo comunicados o promociones por parte de la responsable, relacionados con las promociones, productos  y servicios que se ofrezca, solicitud que podrá realizar a través de nuestra página web www.quetalsegurosdeauto.com."
                            ), 
                            React.createElement("br", null), 
                            React.createElement("h4", null, "VIII.-USO DE COOKIES"), 
                            React.createElement("p", null, 
                              "Una cookie es una breve información que el portal de Internet envía a su computadora, la cual queda almacenada en el disco duro. La próxima vez que ingrese a nuestro portal, podremos usar la información almacenada en la cookie para facilitarle el uso de nuestro sitio de Internet. Por ejemplo, podemos usar su cookie para almacenar una contraseña para que no tenga que ingresarla de nuevo cada vez que se traslade a una sección diferente de nuestro portal de Internet. Una cookie no nos permite conocer su identidad personal a menos que expresamente elija proporcionárnosla. La mayoría de las cookies expiran después de un periodo determinado de tiempo, o bien usted puede borrarla en el momento en que lo desee de su explorador. Asimismo, puede hacer que su navegador le avise cuando recibe una cookie de manera que pueda aceptarla o rechazarla."
                            ), 
                            React.createElement("br", null), 
                            React.createElement("h4", null, "IX.-MEDIOS POR LOS CUALES EL RESPONSABLE COMUNICARÁ A LOS TITULARES DE CAMBIOS AL AVISO DE PRIVACIDAD:"), 
                            React.createElement("p", null, 
                              "Si se producen cambios en los Avisos de Privacidad, Quetal Seguro de Auto.com, Agente de Seguros S.A. de C.V., comunicará los cambios por los siguientes medios: ", React.createElement("br", null), 
                              "1.-A través del correo electrónico que haya proporcionado el Titular. ", React.createElement("br", null), 
                              "2.-Accediendo a la página web http://quetalsegurodeauto.com/aviso_privacidad ", React.createElement("br", null)
                            ), 
                            React.createElement("br", null), 
                            React.createElement("br", null)
                        )
                    )
                )
            )
        );
    }
});

module.exports = PrivacySection;
