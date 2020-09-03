var Global = require('Global');

cc.Class({
    extends: cc.Component,

    properties: {
        hp: 0,
        fireGap: 0.1,
        bullet: cc.Prefab,
        hpBar: cc.Prefab,
        bulletNum: 1,
        player1: cc.SpriteFrame,
        player2: cc.SpriteFrame,
    },

    onLoad: function () {

        let plane;
        switch (window.Player) {
            case window.PLAYER_1:
                plane = this.player1
                break
            case window.PLAYER_2:
                plane = this.player2
                break
            default:
                plane = this.player1
        }

        this.node.getComponent('cc.Sprite').spriteFrame = plane

        this.schedule(function(){
            this.fireBullet();
        }, this.fireGap);

        let hp_bar = cc.instantiate(this.hpBar);

        this.node.addChild(hp_bar);
        hp_bar.setPosition(0, this.node.height/2+10);
        let hpComp = hp_bar.getComponent('HP');
        hpComp.hp = this.hp;
        hpComp.hp_remain = this.hp;

        this.hp_bar = hp_bar;
    },

    fireBullet: function(){
        for(let i = 0; i < this.bulletNum; i++){
            let newBullet = cc.instantiate(this.bullet);
            newBullet.setPosition(this.setBulletPos(i));

            this.node.parent.addChild(newBullet);
        }
    },

    setBulletPos: function(i){
        let posX = this.node.x;
        if(this.bulletNum == 2){
            let index = i==0 ? -1 : 1;
            let offset = i==0 ? 15 : -15;
            posX = this.node.x + this.node.width/2*index + offset;
        }
        let posY = this.node.y + 40;
        return cc.p(posX, posY);
    },

    update: function (dt) {
        this.node.getChildByName('hp').getComponent('HP').hp_remain = this.hp;

        if(this.hp <= 0){
            this.node.destroy();

            this.game.gameOver();
        }
    },

    onCollisionEnter: function(other, self){

    }

});
