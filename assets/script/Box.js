var Global = require('Global');

cc.Class({
    extends: cc.Component,

    properties: {
        woodFrame: [cc.SpriteFrame],
        silverFrame: [cc.SpriteFrame],
        goldFrame: [cc.SpriteFrame],
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this.material = Global.Material.wood
    },

    start () {

    },

    setMaterial (material) {
        this.material = material
        let frame;
        const level = Global.currentLevel
        const status = Global.levelPrizeStatus[level]
        console.log(this.material)
        switch (material) {
            case Global.Material.wood:
                frame = this.woodFrame[status[0]];
                break;
            case Global.Material.silver:
                frame = this.silverFrame[status[1]];
                break;
            case Global.Material.gold:
                frame = this.goldFrame[status[2]];
                break;
        }
        this.node.getComponent('cc.Sprite').spriteFrame = frame
    },

    onBoxClicked () {
        this.node.getComponent('cc.Animation').stop('shake');
        let frame;
        const level = Global.currentLevel
        let status = Global.levelPrizeStatus[level]
        console.log(this.material)
        switch (this.material) {
            case Global.Material.wood:
                frame = this.woodFrame[1];
                status[0] = 1;
                break;
            case Global.Material.silver:
                frame = this.silverFrame[1];
                status[1] = 1;
                break;
            case Global.Material.gold:
                frame = this.goldFrame[1];
                status[2] = 1;
                break;
        }
        this.node.getComponent('cc.Sprite').spriteFrame = frame
    }

    // update (dt) {},
});
