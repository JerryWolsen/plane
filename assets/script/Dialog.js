
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {},

    start () {

    },

    onGainPrizeClicked() {
        this.node.destroy();
    }

    // update (dt) {},
});
