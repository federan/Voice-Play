/**
 * Created by Maximiliano on 16/3/2015.
 */
function Preload(){}

Preload.prototype = {
    preload: function(){

    },
    create: function(){
        //this.game.state.start("menu");
        console.log("Precargado. Inicializando motor de voz");
        annyang.start();
        this.game.state.start("menu");
    }
};