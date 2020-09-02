import name from '../util/index'
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
        bgNode: cc.Node,
        backgroundPrefab: cc.Prefab,
    },


    onLoad() {
        cc.director.preloadScene('game');
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
        this.addBackground()
    },

    start() {

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
        cc.director.loadScene('game')
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

    addBackground: function(){

        let background = cc.instantiate(this.backgroundPrefab);
        background.getComponent('Background').scene = 'start';
        background.height = this.bgNode.height;
        background.width = this.bgNode.width;
        this.bgNode.addChild(background);
    },




    // update (dt) {},
});
