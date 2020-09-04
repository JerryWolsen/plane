var Global = require('Global');

cc.Class({
    extends: cc.Component,

    properties: {
        speed: 0,
        bullet: cc.Sprite,
        bullet1: cc.SpriteFrame,
        bullet2: cc.SpriteFrame,
        bullet3: cc.SpriteFrame,
    },

    onLoad: function () {

    },

    start(){
        switch (Global.currentLevel) {
            case 0:
                this.bullet.spriteFrame = this.bullet1;
                break;
            case 1:
                this.bullet.spriteFrame = this.bullet2;
                break;
            case 2:
                this.bullet.spriteFrame = this.bullet3;
                break;
        }
    },

    update: function (dt) {
        this.node.y += this.speed * dt;

        if(this.node.y >= this.node.parent.height / 2 ){
            this.node.destroy();
        }
    },

    onCollisionEnter: function(other, self){
        if(other.node.name == 'Enemy'){
            let enemy = other.getComponent('Enemy');
            enemy.hp-=2;
        }else if(other.node.name == 'enemy_plane'){
            let enemy = other.getComponent('SmallEnemy');
            enemy.hp--;
        }
        this.node.destroy();
    }

});
