/**
 * Created by Maximiliano on 16/3/2015.
 */
function Boot(){}

Boot.prototype = {
    preload: function(){
        //en precarga
    },
    create: function(){
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.setScreenSize(true);
        console.log("Booteado");
        annyang.setLanguage("es-AR");
        game.state.start("preload");
    }
};