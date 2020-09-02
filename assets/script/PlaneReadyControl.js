import name from '../util/index'
var Global = require('Global');

cc.Class({
    extends: cc.Component,

    properties: {
        //player01
        plane1: {
            default: null,
            type: cc.Button
        },
        //player02
        plane2: {
            default: null,
            type: cc.Button
        },
        //选择框
        selectWrapper: {
            default: null,
            type: cc.Sprite
        },
        innerCycles: [cc.Node],
        outerCycles: [cc.Node],
        locks: [cc.Node],
    },

    onLoad() {
        cc.director.preloadScene('game');
        this.selectedLevel = 0;
        //plane1监听
        this.plane1.node.on('click', (event) => {
            const index = window.PLAYER_1
            this.selectPlane(index)
            this.setSelectWrapper(index)
        })
        //plane2监听
        this.plane2.node.on('click', (event) => {
            const index = window.PLAYER_2
            this.selectPlane(index)
            this.setSelectWrapper(index)
        })
    },

    start() {
        for(let i=0; i<this.locks.length; i++){
            this.locks[i].active = (i>Global.currentLevel);
            this.innerCycles[i].active = (i==Global.currentLevel);
            this.outerCycles[i].active = (i==Global.currentLevel);
        }
        this.runCycleAction();
    },

    //设置选择框的位置
    setSelectWrapper(index) {
        switch (index) {
            case window.PLAYER_1:
                this.selectWrapper.node.x = -100
                break;
            case window.PLAYER_2:
                this.selectWrapper.node.x = 100
                break;

            default:
                this.selectWrapper.node.x = -100
                break;
        }
    },
    selectPlane(index) {
        switch (index) {
            case window.PLAYER_1:
                window.Player = window.PLAYER_1
                break;
            case window.PLAYER_2:
                window.Player = window.PLAYER_2
                break;
            default:
                window.Player = window.PLAYER_1
                break;
        }
    },

    backButtonClicked(){
        cc.director.loadScene('menu')
    },

    nextButtonClicked(){
        if(!Global.levels[this.selectedLevel]){
            return;
        }
        Global.enterLevel = this.selectedLevel;
        cc.director.loadScene('game');
    },

    start1ButtonClicked(){
        this.updateSelectedLevel(1);
    },

    start2ButtonClicked(){
        this.updateSelectedLevel(0);
    },

    start3ButtonClicked(){
        this.updateSelectedLevel(2);
    },

    updateSelectedLevel(index){
        this.selectedLevel = index;
        for(let i=0; i<this.innerCycles.length; i++){
            let active = (i==index);
            this.innerCycles[i].active = active;
            this.outerCycles[i].active = active;
            if(!active){
                this.innerCycles[i].stopAction();
                this.outerCycles[i].stopAction();
            }else{
                this.runCycleAction();
            }
        }
    },

    runCycleAction(){
        let action1 = cc.rotateBy(4, 360);
        let action2 = cc.rotateBy(4, -360);
        this.innerCycles[this.selectedLevel].runAction(action1.repeatForever());
        this.outerCycles[this.selectedLevel].runAction(action2.repeatForever());
    },

    // update (dt) {},
});
