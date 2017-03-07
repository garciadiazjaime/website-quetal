'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');

var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;
var Carousel = rb.Carousel;
var CarouselItem = rb.CarouselItem;
var Link = ReactRouter.Link;

var HomeCarouselPanel = React.createClass({displayName: "HomeCarouselPanel",

    mixins : [ReactRouter.Navigation],

    handleClick: function(){
        console.log('handleClick');
        // this.transitionTo('home');
    },

    render: function() {

        return (
            React.createElement("section", {id: "homeIntro"}, 
                React.createElement(Carousel, {id: "homeCarousel", interval: 7000}, 
                    React.createElement(CarouselItem, null, 
                        React.createElement("div", {className: "container"}, 
                            React.createElement(Row, null, 
                                React.createElement(Col, {xs: 12, sm: 6}, 
                                    React.createElement("p", {className: "bigPhrase"}, 
                                        React.createElement("span", null, "Hola, Quetal"), " un Seguro de auto a tu alcance"
                                    ), 
                                    React.createElement(Link, {to: "coverage", title: "Ver Coberturas", className: "yellowButton"}, "Ver Coberturas"), 
                                    React.createElement("a", {href: "http://www.generaldeseguros.mx/", target: "_blank"}, 
                                      React.createElement("img", {src: "/img/aboutus/logo_general_white.png", alt: "General de seguros", width: "164px"})
                                    )
                                ), 
                                React.createElement(Col, {xs: 12, sm: 6}, 
                                    React.createElement("blockquote", null, React.createElement("span", null, "Justo lo que necesito, "), React.createElement("span", null, " y al precio "), React.createElement("span", null, "más barato "))
                                )
                            ), 
                            React.createElement("span", {id: "manImage"})
                        )
                    ), 
                    React.createElement(CarouselItem, null, 
                        React.createElement("div", {className: "container"}, 
                            React.createElement(Row, null, 
                                React.createElement(Col, {xs: 12, sm: 7}, 
                                    React.createElement("p", {className: "bigPhrase narrow"}, 
                                        React.createElement("span", null, "Ahorra"), " DESDE 20% en tu Seguro de Auto"
                                    ), 
                                    React.createElement("p", {className: "restrictions"}, "*Máximo descuento que otorga GS."), 
                                    React.createElement(Link, {to: "coverage", title: "Ver Coberturas", className: "yellowButton"}, "Ver Coberturas"), 
                                    React.createElement("a", {href: "http://www.generaldeseguros.mx/", target: "_blank"}, 
                                      React.createElement("img", {src: "/img/aboutus/logo_general_white.png", alt: "General de seguros", width: "164px"})
                                    )
                                ), 
                                React.createElement(Col, {xs: 12, sm: 5}
                                )
                            ), 
                            React.createElement("span", {id: "womanImage"})
                        )
                    ), 
                    React.createElement(CarouselItem, null, 
                        React.createElement("div", {className: "container"}, 
                            React.createElement(Row, null, 
                                React.createElement(Col, {xs: 12, sm: 6}, 
                                    React.createElement("p", {className: "bigPhrase"}, 
                                        React.createElement("span", {className: "inline"}, "¿Quetal"), " si choco?"
                                    ), 
                                    React.createElement("p", null, "Conoce nuestras Coberturas contra Daños a Terceros y Daños a tu Automóvil."), 
                                    React.createElement(Link, {to: "coverage", title: "Ver Coberturas", className: "yellowButton"}, "Ver Coberturas"), 
                                    React.createElement("a", {href: "http://www.generaldeseguros.mx/", target: "_blank"}, 
                                      React.createElement("img", {src: "/img/aboutus/logo_general_white.png", alt: "General de seguros", width: "164px"})
                                    )
                                ), 
                                React.createElement(Col, {xs: 12, sm: 6}, 
                                    React.createElement("blockquote", null, React.createElement("span", null, "Mejor lo aseguro "), React.createElement("span", null, "rápido y fácil con "), React.createElement("span", null, "una compañía "), React.createElement("span", null, "de confianza "))
                                )
                            ), 
                            React.createElement("span", {id: "carImage"})
                        )
                    ), 
                    React.createElement(CarouselItem, null, 
                        React.createElement("div", {className: "container"}, 
                            React.createElement(Row, null, 
                                React.createElement(Col, {xs: 12, sm: 7}, 
                                    React.createElement("p", {className: "bigPhrase narrow"}, 
                                        React.createElement("span", null, "35% de descuento"), " + 6 meses sin intereses"
                                    ), 
                                    React.createElement("p", {className: "restrictions"}, "*con Banamex y American Express."), 
                                    React.createElement(Link, {to: "coverage", title: "Ver Coberturas", className: "yellowButton"}, "Ver Coberturas"), 
                                    React.createElement("a", {href: "http://www.generaldeseguros.mx/", target: "_blank"}, 
                                      React.createElement("img", {src: "/img/aboutus/logo_general_white.png", alt: "General de seguros", width: "164px"})
                                    )
                                ), 
                                React.createElement(Col, {xs: 12, sm: 5}
                                )
                            ), 
                            React.createElement("span", {id: "creditImage"})
                        )
                    )
                )
            )
        );
    }
});

module.exports = HomeCarouselPanel;
