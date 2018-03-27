/**
 * Created by Maximiliano on 16/3/2015.
 */

var Simon = function(){
    simones_colores = [0xff4040,0xffff00,0x00CD00,0x0000EE,0xFF8080,0xFFFF80,0x67CD67,0x7777EE];
    simones_timercolor = 0;
    simones = undefined;
    pausa = 0;

    comandosSimon = {
        "rojo": function() {
            chequear(0);
        },
        "amarillo": function() {
            chequear(1);
        },
        "verde": function() {
            chequear(2);
        },
        "azul": function() {
            chequear(3);
        }
    };

    parpadeo = function(color){
        simones.getChildAt(color).tint = simones_colores[color];
        simones_timercolor = 60;
        sonidos[color].play();
        pausa = 70;
    };

    chequear = function(color){
        parpadeo(color);
        if (color != secuencia_aChequear.shift()) {
            jugando = false;
            perdido = true;
        } else {
            if (secuencia_aChequear.length == 0) {
                pausa = 200;
                secuenciando = secuencia.push(Math.floor(Math.random() * 4));
                annyang.pause();
            }
        }
    }
    jugando = true;
    simones_timercolor = 0;
    secuencia = [];
    secuencia_aChequear = [];
    secuenciando = 0;
};

Simon.prototype = {
    preload: function(){
        game.load.image("boton", "scripts/juegos/Simon/assets/boton.png");
        game.load.audio("gameover", "scripts/juegos/Simon/assets/gameover.wav");
        game.load.audio("rojo_s", "scripts/juegos/Simon/assets/rojo.wav");
        game.load.audio("amarillo_s", "scripts/juegos/Simon/assets/amarillo.wav");
        game.load.audio("verde_s", "scripts/juegos/Simon/assets/verde.wav");
        game.load.audio("azul_s", "scripts/juegos/Simon/assets/azul.wav");
        game.load.audio("correcto", "scripts/juegos/Simon/assets/correcto.wav");
    },
    create: function(){
        pausa = 40;
        simones = game.add.group();
        var rojo = game.add.sprite(game.width/2-128,game.height/2-128,"boton");
        rojo.anchor.x = 0.5;
        rojo.anchor.y = 0.5;
        rojo.tint = simones_colores[4]; //0xFF4040;
        var amarillo = game.add.sprite(game.width/2-128,game.height/2+128,"boton");
        amarillo.anchor.x = 0.5;
        amarillo.anchor.y = 0.5;
        amarillo.angle = 270;
        amarillo.tint = simones_colores[5]; //0xFFFF00;
        var verde = game.add.sprite(game.width/2+128,game.height/2-128,"boton");
        verde.anchor.x = 0.5;
        verde.anchor.y = 0.5;
        verde.angle = 90;
        verde.tint = simones_colores[6] //0x00CD00;
        var azul = game.add.sprite(game.width/2+128,game.height/2+128,"boton");
        azul.anchor.x = 0.5;
        azul.anchor.y = 0.5;
        azul.angle = 180;
        azul.tint = simones_colores[7]; //0x0000EE;
        simones.addChild(rojo);
        simones.addChild(amarillo);
        simones.addChild(verde);
        simones.addChild(azul);
        sonidos = [game.add.audio("rojo_s"),game.add.audio("amarillo_s"),game.add.audio("verde_s"),game.add.audio("azul_s"),game.add.audio("gameover"),game.add.audio("correcto")];
        annyang.addCommands(comandosSimon);
        annyang.pause();

        simones_timercolor = 0;
        secuencia = [Math.floor(Math.random()*4)];
        secuenciando = 1;
        secuencia_aChequear = [];
        jugando = true;
        simones_timercolor = 0;
        perdido = false;
    },
    update: function(){
        if (jugando) {

            if (simones_timercolor >= 0) simones_timercolor--;

            if (simones_timercolor == 0) {
                for (var i = 0; i < simones.length; i++) {
                    simones.getChildAt(i).tint = simones_colores[i + 4];
                }
            }

            if (pausa==140) sonidos[5].play();

            if (pausa == 0) {

                if (simones_timercolor == -1) {
                    if (secuenciando > 0) {
                        parpadeo(secuencia[secuencia.length - secuenciando]);
                        secuenciando--;
                    } else {
                        if (secuenciando == 0 && secuencia_aChequear.length == 0) {
                            secuencia_aChequear = secuencia.slice();
                            annyang.resume();
                        }
                    }
                }
            } else pausa--;

        } else {
            if (pausa==0){
                if (perdido) {
                    annyang.removeCommands(comandosSimon);
                    for (var i = 0; i < simones.length; i++) {
                        simones.getChildAt(i).tint = simones_colores[i];
                    }
                    sonidos[4].play();
                    perdido = false;
                }
            } else pausa--;
        }
    }
};

ayuda.simon = "En simon, debes intentar repetir la secuencia de coloras que se muestra en pantalla. Los comandos disponibles son: rojo, verde, amarillo, azul, reiniciar, menu principal, ayuda";