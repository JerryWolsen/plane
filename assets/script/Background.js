var Global = require('Global');
cc.Class({
    extends: cc.Component,

    properties: {
        speed: 0,
        bg1: cc.Sprite,
        bg2: cc.Sprite,
        bg3: cc.Sprite,
        huoShanBg: cc.SpriteFrame,
        lvZhouBg: cc.SpriteFrame,
        shaMoBg: cc.SpriteFrame,
        shanChuanBg: cc.SpriteFrame,
        xingKongBg: cc.SpriteFrame,
        yunDuanBg: cc.SpriteFrame,
        scene: ''
    },

    onLoad: function () {
        console.log('onLoad: '+this.scene);
        let height = this.node.height;
        this.bg1.node.setPosition(cc.p(0, 0));
        this.bg2.node.setPosition(cc.p(0, height));
        this.bg3.node.setPosition(cc.p(0, height * 2));
    },

    start: function(){
        console.log('start: '+this.scene);
        let bg = this.huoShanBg;
        if(this.scene == 'start'){
            bg = this.xingKongBg;
        }else{
            switch (Global.currentLevel) {
                case 0:
                    bg = this.huoShanBg;
                    break;
                case 1:
                    bg = this.lvZhouBg;
                    break;
                case 2:
                    bg = this.shaMoBg;
                    break;
            }
        }
        this.bg1.spriteFrame = bg;
        this.bg2.spriteFrame = bg;
        this.bg3.spriteFrame = bg;
    },

    update: function (dt) {

        let moveStep = Math.floor(dt * this.speed);
        let parentHeight = -this.node.parent.height - 20;

        this.bg1.node.y -= moveStep;
        if(this.bg1.node.y <= parentHeight){
            this.bg1.node.y = this.bg3.node.y + this.bg3.node.height - 5;
        }


        this.bg2.node.y -= moveStep;
        if(this.bg2.node.y <= parentHeight){
            this.bg2.node.y = this.bg1.node.y + this.bg1.node.height - 5;
        }

        this.bg3.node.y -= moveStep;
        if(this.bg3.node.y <= parentHeight){
            this.bg3.node.y = this.bg2.node.y + this.bg2.node.height - 5;
        }

     },
});
