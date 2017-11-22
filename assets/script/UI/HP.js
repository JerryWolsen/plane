cc.Class({
    extends: cc.Component,

    properties: {
        hp: 0,
        hp_remain: 0,
    },

    onLoad: function () {
        this.getComponent(cc.ProgressBar).progress = 1;
    },

    update: function (dt) {

        this.getComponent(cc.ProgressBar).progress = this.hp_remain / this.hp;
    },
});
