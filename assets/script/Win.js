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
        score: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this.woodBoxArr = [];
        this.silverArr = [];
        this.goldenArr = [];
        let startY = 309
        this.initBoxArr(this.woodBoxArr, -243, startY, Global.Material.wood)
        this.initBoxArr(this.silverArr, -8, startY, Global.Material.silver)
        this.initBoxArr(this.goldenArr, 227, startY, Global.Material.gold)
    },

    start(){
        let levels = [
          '第一关',
          '第二关',
          '第三关',
        ];
        this.levelLabel.string = levels[Global.currentLevel];
        if(Global.enterLevel == 2){
            this.allPassLabel.active = true;
            // this.homeButton.node.x = 0;
            // this.nextButton.node.active = false;
        }

        this.score.string = Global.score
        this.woodBoxArr[Global.currentLevel].getComponent(cc.Animation).play('shake');
    },

    initBoxArr(arr, startX, startY, material) {
        for (let i = 0; i < 3; i++) {
            let box = cc.instantiate(this.boxPrefab);
            box.x = startX;
            box.y = startY - i * 231;
            this.bg.addChild(box);
            box.getComponent('Box').setMaterial(material)
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

    homeButtonClicked(){
        cc.director.loadScene('menu');
    },

    // update (dt) {},
});
