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
        this.levelLabel.text = levels[Global.currentLevel];
        if(Global.currentLevel == 0){
            this.allPassLabel.active = true;
            this.homeButton.node.x = 0;
            this.nextButton.node.active = false;
        }
    },

    nextButtonClicked() {
        if(Global.currentLevel == 2) return;

        Global.currentLevel++;
        cc.director.loadScene('game');
    },

    homeButtonClicked(){
        cc.director.loadScene('menu');
    },

    // update (dt) {},
});
