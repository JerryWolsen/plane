
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

        this.scheduleOnce(()=>{
            let posX = Math.floor(cc.randomMinus1To1() * (this.game.node.width / 2 - this.node.width / 2));
            let posY = -this.game.node.height/2 - this.node.height/2 - 50;
            let duration = this.rand * 4;
            duration<=2.5 && (duration=2.5);
            let action = cc.moveTo(duration, cc.p(posX, posY));
            this.node.runAction(action);
        }, 0.2)
    },

    update (dt) {
        // this.node.y -= this.speed * dt;

        if(this.node.y <= -this.node.parent.height / 2 - this.node.height/2 || this.hp <= 0){
            if(this.hp <= 0){
                this.game.gainScore(this.score);
                this.game.fireSmallBoom(this.rand, this.node.x, this.node.y);
            }
            this.node.stopAllActions();
            this.node.destroy();
        }
    },

    onCollisionEnter: function(other, self){
        if(other.node.name == 'Plane'){
            let plane = other.getComponent('Plane');
            if(plane.shield.active && plane.shieldHP > 0){
                plane.shieldHP--;
            }else{
                plane.hp--;
            }
        }
        this.hp--;
    },
});
