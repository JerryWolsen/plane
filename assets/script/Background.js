var Global = require('Global');
cc.Class({
    extends: cc.Component,

    properties: {
        speed: 0,
        bg1: cc.Sprite,
        bg2: cc.Sprite,
        bg3: cc.Sprite,
        background1: cc.SpriteFrame,
        background2: cc.SpriteFrame,
        background3: cc.SpriteFrame,
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
        let bg = this.background1;
        switch (Global.enterLevel) {
            case 0:
                bg = this.background1;
                break;
            case 1:
                bg = this.background2;
                break;
            case 2:
                bg = this.background3;
                break;
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
