
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {},

    start () {

    },

    onPurchaseClicked() {
        window.JSInterface && window.JSInterface.pay();
        this.node.destroy();
    },

    onLoanClicked() {
        window.JSInterface && window.JSInterface.goPage();
        this.node.destroy();
    },

    onNextTimeOneHip() {
        this.node.destroy();
    }

    // update (dt) {},
});
