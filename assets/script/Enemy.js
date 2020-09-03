import { posix } from "path";

cc.Class({
    extends: cc.Component,

    properties: {
        hp: 0,
        fireGap: 2,
        bullet: cc.Prefab,
        hpBar: cc.Prefab,
        score: 10,
    },

    onLoad: function () {

        this.schedule(function(){
            this.fireBullet();

            this.moveRandom();

        }, this.fireGap);

        let hp_bar = cc.instantiate(this.hpBar);

        this.node.addChild(hp_bar);
        hp_bar.setPosition(0, -this.node.height / 2 - 30);
        let hpComp = hp_bar.getComponent('HP');
        hpComp.hp = this.hp;
        hpComp.hp_remain = this.hp;

        this.hpComp = hpComp;
    },

    fireBullet: function(){

        for(let i = 0; i < 5; i++){
            let newBullet = cc.instantiate(this.bullet);
            newBullet.getComponent('EnemyBullet').dirX = 100 * (i - 3);

            newBullet.setPosition(this.setBulletPos(i));

            this.node.parent.addChild(newBullet);
        }
    },

    setBulletPos: function(i){
        let posX = this.node.x + 15 * (i -3);
        let posY = this.node.y - 60;

        return cc.p(posX, posY);
    },

    moveRandom: function(){
        let self = this;
        let posX = Math.floor(cc.randomMinus1To1() * self.game.node.width / 2 );
        let posY = Math.floor(cc.random0To1() * self.game.node.height / 2);

        let randomAction = cc.moveTo(self.fireGap, cc.p(posX, posY)).easing(cc.easeCubicActionOut());
        this.node.runAction(randomAction);
    },

    update: function (dt) {

        this.hpComp.hp_remain = this.hp;

        if(this.hp <= 0){
            this.game.fireBoom(this.node.x, this.node.y);

            this.node.destroy();

            this.game.gainScore(this.score);

            this.game.spawnNewEnemy();

        }
    },
});
