var Global = require('Global');

var levelPrizeStatus = [
    [0,0,0],
    [0,0,0],
    [0,0,0],
]

var prizes = [
    [{description: '炸弹', image: ''},{description: '武器', image: ''},{description: '武器', image: ''} ],
    [{description: '激光炮', image: ''},{description: '武器', image: ''},{description: '武器', image: ''} ],
    [{description: '血包', image: ''},{description: '武器', image: ''},{description: '武器', image: ''} ],
]

cc.Class({
    extends: cc.Component,

    properties: {
        woodFrame: [cc.SpriteFrame],
        silverFrame: [cc.SpriteFrame],
        goldFrame: [cc.SpriteFrame],
        prizeDialog: cc.Prefab
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
        const status = levelPrizeStatus[level]

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
        let status = levelPrizeStatus[level]

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
        this.scheduleOnce(this.showPrizeDialog, 0.5)
    },

    showPrizeDialog() {
        let dialog = cc.instantiate(this.prizeDialog);
        dialog.x = 0;
        dialog.y = 0;
        this.node.parent.addChild(dialog);
    }

    // update (dt) {},
});
