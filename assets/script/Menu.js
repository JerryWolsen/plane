cc.Class({
    extends: cc.Component,

    properties: {
        bgNode: cc.Node,
        backgroundPrefab: cc.Prefab,
    },

    onLoad: function () {
        cc.director.preloadScene('game');
        this.addBackground();
    },

    addBackground: function(){

        let background = cc.instantiate(this.backgroundPrefab);
        background.getComponent('Background').scene = 'start';
        background.height = this.bgNode.height;
        background.width = this.bgNode.width;
        this.bgNode.addChild(background);
    },

    playGame: function(){
        cc.director.loadScene('game');
    },

    update: function (dt) {

    },
});
