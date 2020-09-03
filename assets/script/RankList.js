
cc.Class({
    extends: cc.Component,

    properties: {
        rank: cc.Label,
        nameStr: cc.Label,
        score: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },

    start () {

    },

    setMyScore(rank, name, score) {
        this.rank.string = rank;
        this.nameStr.string = name;
        this.score.string = score
    },

    onCloseClicked() {
        this.node.destroy();
    },

    onShareClicked() {
        window.JSInterface && window.JSInterface.share();
        this.node.destroy();
    }

    // update (dt) {},
});
