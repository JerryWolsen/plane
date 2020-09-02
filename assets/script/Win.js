var Global = require('Global');

cc.Class({
    extends: cc.Component,

    properties: {
        levelLabel: cc.Label,
        allPassLabel: cc.Node,
        homeButton: cc.Button,
        nextButton: cc.Button,
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {},

    start(){
        let levels = [
          '第一关',
          '第二关',
          '第三关',
        ];
        this.levelLabel.string = levels[Global.enterLevel];
        if(Global.enterLevel == 2){
            this.allPassLabel.active = true;
            // this.homeButton.node.x = 0;
            // this.nextButton.node.active = false;
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
