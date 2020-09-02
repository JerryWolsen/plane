cc.Class({
    extends: cc.Component,

    properties: {
        bgNode: cc.Node,
        player1: cc.SpriteFrame,
        player2: cc.SpriteFrame

    },

    onLoad: function () {
        let plane
        // this.addBackground();
        // if(window.Player === window.PLAYER_1) {
        //     plane = this.player1
        // } else {
        //     plane = this.player2
        // }
        // this.plane.getComponent('cc.Sprite').spriteFrame = plane
    },

    addBackground: function(){

        let background = cc.instantiate(this.backgroundPrefab);
        background.getComponent('Background').scene = 'start';
        background.height = this.bgNode.height;
        background.width = this.bgNode.width;
        this.bgNode.addChild(background);
    },

    playGame: function(){
        cc.director.loadScene('PlaneReady');
    },

    update: function (dt) {

    },
});
