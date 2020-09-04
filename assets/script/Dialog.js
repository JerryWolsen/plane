
cc.Class({
    extends: cc.Component,

    properties: {
        desp: cc.Label,
        img: cc.Node,
        coupon: cc.SpriteFrame,
        weapon: cc.SpriteFrame,
        bomb: cc.SpriteFrame,
        jiebi: cc.SpriteFrame,
        cash: cc.SpriteFrame
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {},

    start () {

    },

    setDetail(despStr, item) {
        this.desp.string = despStr
        let frame;
        switch (item) {
            case 0:
                frame = this.bomb;
                break;
            case 1:
                frame = this.weapon;
                break;
            case 2:
                frame = this.coupon;
                break;
        }
        this.img.getComponent('cc.Sprite').spriteFrame = frame
    },

    setJiebi() {
        let frame = this.jiebi
        this.desp.string = '捷币100个'
        this.img.getComponent('cc.Sprite').spriteFrame = frame
    },

    setCash() {
        let frame = this.cash
        this.desp.string = '万元大奖抽奖资格'
        this.img.getComponent('cc.Sprite').spriteFrame = frame
    },

    onGainPrizeClicked() {
        this.node.destroy();
    }

    // update (dt) {},
});
