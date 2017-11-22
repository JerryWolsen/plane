cc.Class({
    extends: cc.Component,

    properties: {
        hp: 0, 
        bullet: cc.Prefab,
        hpBar: cc.Prefab,
    },

    onLoad: function () {

        this.moveVer = 0;
        this.moveHor = 0;

        this.fire_gap = 2;

        this.schedule(function(){
            this.fireBullet();

            this.setMoveParam();

        }, this.fire_gap);

        let hp_bar = cc.instantiate(this.hpBar);
        
        this.node.addChild(hp_bar);
        hp_bar.setPosition(0, -this.node.height / 2 - 30);
        let hpComp = hp_bar.getComponent('HP');
        hpComp.hp = this.hp;
        hpComp.hp_remain = this.hp;

        this.hp_bar = hp_bar;
    },

    fireBullet: function(){

        for(let i = 0; i < 7; i++){
            let newBullet = cc.instantiate(this.bullet);
            newBullet.getComponent('EnemyBullet').dirX = 60 * (i - 3);

            newBullet.setPosition(this.setBulletPos(i));
    
            this.node.parent.addChild(newBullet);
        }
    },

    setBulletPos: function(i){
        let posX = this.node.x + 15 * (i -3);
        let posY = this.node.y - 60;

        return cc.p(posX, posY);
    },

    setMoveParam: function(){
        this.moveVer = Math.floor(cc.randomMinus1To1() * 2);
        this.moveHor = Math.floor(cc.randomMinus1To1() * 2);
    },

    update: function (dt) {

        this.node.x += this.moveVer;
        if(this.node.x <= -this.node.parent.width / 2 + this.node.width / 2){
            this.node.x = -this.node.parent.width / 2 + this.node.width / 2;
        }

        if(this.node.x >= this.node.parent.width / 2 - this.node.width / 2){
            this.node.x = this.node.parent.width / 2 - this.node.width / 2;
        }

        this.node.y += this.moveHor;
        if(this.node.y <= this.node.height / 2){
            this.node.y = this.node.height / 2;
        }

        if(this.node.y >= this.node.parent.height / 2 - this.node.height / 2){
            this.node.y = this.node.parent.height / 2 - this.node.height / 2;
        }

        this.node.getChildByName('hp').getComponent('HP').hp_remain = this.hp;

        if(this.hp <= 0){
            this.node.destroy();

            this.game.gainScore();
            
            this.game.spawnNewEnemy();

        }
    },
});
