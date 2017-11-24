cc.Class({
    extends: cc.Component,

    properties: {
        speed: 0, 
        bgFrame: cc.SpriteFrame,
    },

    onLoad: function () {
        let bgNode1 = new cc.Node('bgNode1');
        let sprite1 = bgNode1.addComponent(cc.Sprite);
        sprite1.spriteFrame = this.bgFrame;
        bgNode1.setPosition(cc.p(0, 0));
        this.node.addChild(bgNode1);
        this.bg1 = bgNode1;

        let bgNode2 = new cc.Node('bgNode2');
        let sprite2 = bgNode2.addComponent(cc.Sprite);
        sprite2.spriteFrame = this.bgFrame;
        bgNode2.setPosition(cc.p(0, bgNode1.height));
        this.node.addChild(bgNode2);
        this.bg2 = bgNode2;

        let bgNode3 = new cc.Node('bgNode3');
        let sprite3 = bgNode3.addComponent(cc.Sprite);
        sprite3.spriteFrame = this.bgFrame;
        bgNode3.setPosition(cc.p(0, bgNode1.height + bgNode2.height));
        this.node.addChild(bgNode3);
        this.bg3 = bgNode3;

    },

    update: function (dt) {

        let moveStep = Math.floor(dt * this.speed);
        let parentHeight = -this.node.parent.height - 20;

        this.bg1.y -= moveStep;
        if(this.bg1.y <= parentHeight){
            this.bg1.y = this.bg3.y + this.bg3.height - 5;
        }
        

        this.bg2.y -= moveStep;
        if(this.bg2.y <= parentHeight){
            this.bg2.y = this.bg1.y + this.bg1.height - 5;
        }

        this.bg3.y -= moveStep;
        if(this.bg3.y <= parentHeight){
            this.bg3.y = this.bg2.y + this.bg2.height - 5;
        }
        
     },
});
