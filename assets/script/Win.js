var Global = require('Global');

cc.Class({
    extends: cc.Component,

    properties: {
        levelLabel: cc.Label,
        allPassLabel: cc.Node,
        homeButton: cc.Button,
        nextButton: cc.Button,
        boxPrefab: cc.Prefab,
        bg: cc.Node,
        score: cc.Label,
        mask: cc.Node,
        purchaseDialog: cc.Prefab,
        ranklistDialog: cc.Prefab,
        diamondStr: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this.woodBoxArr = [];
        this.silverArr = [];
        this.goldenArr = [];
        let startY = 309
        this.initBoxArr(this.woodBoxArr, -253, startY, Global.Material.wood)
        this.initBoxArr(this.silverArr, 2, startY, Global.Material.silver)
        this.initBoxArr(this.goldenArr, 237, startY, Global.Material.gold)
    },

    start(){
        let levels = [
          '第一关',
          '第二关',
          '第三关',
        ];
        this.levelLabel.string = '恭喜您,通过' +  levels[Global.enterLevel];
        if(Global.enterLevel == 2){
            //  this.allPassLabel.active = true;
            // this.homeButton.node.x = 0;
            // this.nextButton.node.active = false;
        }

        this.score.string = '分数：' + Global.score
        if(!Global.levelPrizeStatus[Global.enterLevel][0]) {
            this.woodBoxArr[Global.enterLevel].getComponent(cc.Animation).play('shake');
        }

        if(Global.vip) {
            this.mask.active = false
        } else {
            this.mask.active = true
            this.mask.setLocalZOrder(1000);
        }
        this.diamondStr.string = 'X ' + Global.diamond
    },

    initBoxArr(arr, startX, startY, material) {
        for (let i = 0; i < 3; i++) {
            let box = cc.instantiate(this.boxPrefab);
            box.x = startX;
            box.y = startY - i * 231;
            this.bg.addChild(box);
            box.getComponent('Box').setLevel(i)
            box.getComponent('Box').setMaterial(material)
            box.setLocalZOrder(100);
            arr.push(box);
        }
    },

    nextButtonClicked() {
        if(Global.enterLevel == Global.currentLevel){
            Global.currentLevel++;
            if (Global.currentLevel > 2) Global.currentLevel = 2;
        }
        cc.director.loadScene('PlaneReady');
    },

    maskClicked() {
        let dialog = cc.instantiate(this.purchaseDialog);
        dialog.x = 0;
        dialog.y = 0;
        this.node.addChild(dialog);
    },

    homeButtonClicked(){
        cc.director.loadScene('menu');
    },

    onRankClicked() {
        let dialog = cc.instantiate(this.ranklistDialog);
        dialog.x = 0;
        dialog.y = 0;
        this.node.addChild(dialog);
        dialog.getComponent('RankList').setMyScore('120', 'Hackathon', Global.score)
    },

    onShareResultClicked() {
        window.JSInterface && window.JSInterface.share();
    },

    onRedeemClicked() {
        window.JSInterface && window.JSInterface.goPage();
    },

    onAttendClicked() {

    },

    update (dt) {
        if(Global.vip) {
            this.mask.active = false
        }
    },
});
