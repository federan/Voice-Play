/**
 * Created by Maximiliano on 17/3/2015.
 */
var juego;

var comandosGenerales = {
    "reiniciar": function(){
        game.state.start(juego);
    },
    "menú principal": function(){
        game.state.start("menu");
    },
    "ayuda": function(){
        if (juego!==undefined){
            decir(ayuda[juego]);
        }
    }
}

var Menu = function(){
    comandos = {
        "simon": function(){
            annyang.removeCommands(comandos);
            juego = "simon";
            game.state.start("simon");
        }
    }
};

Menu.prototype = {
    preload: function(){

    },
    create: function(){
        annyang.addCommands(comandos);
        annyang.addCommands(comandosGenerales);
        decir(texto_bienvenida);
    }
};


var decir = function(texto){
    var voz;
    voz = new SpeechSynthesisUtterance();
    voz.text = texto;
    voz.lang = "es-ES";
    window.speechSynthesis.speak(voz);
}

var texto_bienvenida = "Bienvenido, para jugar, diga el nombre del juego";
var ayuda = [];