cc.Class({
    extends: cc.Component,

    properties: {
        speed: 0, 
        bg: cc.SpriteFrame,
        bg1: cc.Sprite,
        bg2: cc.Sprite
    },

    onLoad: function () {

       this.bg1.spriteFrame=this.bg;
       this.bg2.spriteFrame=this.bg;

    },

    update: function (dt) {

        this.bg1.node.y -= dt * this.speed;
        if(this.bg1.node.y <= -960){
            this.bg1.node.y = 960;
        }
        

        this.bg2.node.y -= dt * this.speed;
        if(this.bg2.node.y <= -960){
            this.bg2.node.y = 960;
        }
        
     },
});
