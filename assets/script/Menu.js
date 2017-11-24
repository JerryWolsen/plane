cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad: function () {
        cc.director.preloadScene('game');
    },

    playGame: function(){
        cc.director.loadScene('game');
    },

    // update: function (dt) {

    // },
});
