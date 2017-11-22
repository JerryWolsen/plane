cc.Class({
    extends: cc.Component,

    properties: {
        hp: 0,
        bullet: cc.Prefab,
        hpBar: cc.Prefab,
    },

    addTouchListener: function(){
        let self = this;
        this.touch_flag = false;

        this.node.on(cc.Node.EventType.TOUCH_START, function(event){
            this.touch_flag = true;
        });

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function(event){
            if(this.touch_flag){
                let delta = event.getDelta();
                
                self.node.x += delta.x;
                self.node.y += delta.y;
            }
        
        });

        this.node.on(cc.Node.EventType.TOUCH_END, function(event){
            this.touch_flag = false;
        });

        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function(event){
            this.touch_flag = false;
        });
    },

    onLoad: function () {

        this.addTouchListener();

        this.fire_gap = 0.1;

        this.schedule(function(){
            this.fireBullet();
        }, this.fire_gap);
        
        let hp_bar = cc.instantiate(this.hpBar);

        this.node.addChild(hp_bar);
        hp_bar.setPosition(0, 50);
        let hpComp = hp_bar.getComponent('HP');
        hpComp.hp = this.hp;
        hpComp.hp_remain = this.hp;

        this.hp_bar = hp_bar;
    },

    fireBullet: function(){
        for(let i = 0; i < 5; i++){
            let newBullet = cc.instantiate(this.bullet);
            newBullet.setPosition(this.setBulletPos(i));
    
            this.node.parent.addChild(newBullet);
        }
    },

    setBulletPos: function(i){

        let posX = this.node.x + 15 * (i - 2);
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
