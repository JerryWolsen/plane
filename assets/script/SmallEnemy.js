// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        hp: 1,
        speed: 0,
        score: 1,
        plane1: cc.SpriteFrame,
        plane2: cc.SpriteFrame,
        planeNode: cc.Sprite
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.rand = cc.random0To1() <= 0.5 ? 0 : 1;
        this.planeNode.spriteFrame = this.rand==0 ? this.plane1 : this.plane2;
    },

    update (dt) {
        this.node.y -= this.speed * dt;

        if(this.node.y <= -this.node.parent.height / 2 - this.node.width/2 || this.hp <= 0){
            if(this.hp <= 0){
                this.game.gainScore(this.score);
                this.game.fireSmallBoom(this.rand, this.node.x, this.node.y);
            }
            this.node.destroy();
        }
    },

    onCollisionEnter: function(other, self){
        if(other.node.name == 'Plane'){
            let plane = other.getComponent('Plane');
            plane.hp--;
        }
        this.hp--;
    },
});
