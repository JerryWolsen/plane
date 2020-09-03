
cc.Class({
    extends: cc.Component,

    properties: {
        desp: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {},

    start () {

    },

    setDetail(despStr, image) {
        this.desp.string = despStr
    },

    onGainPrizeClicked() {
        this.node.destroy();
    }

    // update (dt) {},
});
