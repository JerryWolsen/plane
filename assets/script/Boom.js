cc.Class({
    extends: cc.Component,

    properties: {
        boomAudio: cc.AudioClip,
    },

    onLoad: function () {
        cc.audioEngine.playEffect(this.boomAudio, false, 0.5);
    },

    // update: function (dt) {

    // },

    onAnimationEnd: function(){

        this.node.destroy();
    },
});
