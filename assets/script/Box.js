var Global = require('Global');

var prizes = [
    [{description: '炸弹', image: ''},{description: '护盾', image: ''},{description: '10元代金券', image: ''} ],
    [{description: '激光炮', image: ''},{description: '僚机', image: ''},{description: '20元代金券', image: ''} ],
    [{description: '血包', image: ''},{description: '10捷币', image: ''},{description: '50元代金券', image: ''} ],
]

cc.Class({
    extends: cc.Component,

    properties: {
        woodFrame: [cc.SpriteFrame],
        silverFrame: [cc.SpriteFrame],
        goldFrame: [cc.SpriteFrame],
        prizeDialog: cc.Prefab,
        purchaseDialog: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this.material = Global.Material.wood
        this.level = 0
    },

    start () {

    },

    setLevel( level) {
        this.level = level
    },

    setMaterial (material) {
        this.material = material
        let frame;
        const status = Global.levelPrizeStatus[this.level]
        console.log(Global.levelPrizeStatus)
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
        const level = Global.enterLevel
        if(level !== this.level) {
            console.log('不是当前关卡，不能点击！')
            return
        }

        let status = Global.levelPrizeStatus[level]

        // 银宝箱和金宝箱需要充值解锁
        if(!Global.vip && this.material !== Global.Material.wood) {
            this.showPurchaseDialog()
            return
        }


        let item;
        switch (this.material) {
            case Global.Material.wood:
                frame = this.woodFrame[1];
                item = 0
                break;
            case Global.Material.silver:
                frame = this.silverFrame[1];
                item = 1
                break;
            case Global.Material.gold:
                frame = this.goldFrame[1];
                item = 2
                break;
        }

        if(status[item] === 1) {
            return
        }

        status[item] = 1

        this.node.getComponent('cc.Sprite').spriteFrame = frame
        this.scheduleOnce(this.showPrizeDialog, 0.5)
    },

    showPrizeDialog() {
        let dialog = cc.instantiate(this.prizeDialog);
        dialog.x = 0;
        dialog.y = 0;
        this.node.parent.addChild(dialog);
        dialog.setLocalZOrder(1005)
        const level = Global.enterLevel
        let item;
        switch (this.material) {
            case Global.Material.wood:
                item = 0
                break;
            case Global.Material.silver:
                item = 1
                break;
            case Global.Material.gold:
                item = 2
                break;
        }

        dialog.getComponent('Dialog').setDetail(prizes[level][item].description)
    },

    showPurchaseDialog() {
        let dialog = cc.instantiate(this.purchaseDialog);
        dialog.x = 0;
        dialog.y = 0;
        this.node.parent.addChild(dialog);
        dialog.setLocalZOrder(1005)
    }

    // update (dt) {},
});
