var Global = require('Global');

cc.Class({
    extends: cc.Component,

    properties: {
        speed: 0,
        ufoType: '',
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {},

    start () {},

    update (dt) {
        this.node.y -= this.speed * dt;
        if(this.node.y <= -this.node.parent.height / 2 - this.node.width/2 ){
            this.node.destroy();
        }
    },

    onCollisionEnter: function(other, self){
        if(other.node.name == 'Plane'){
            let plane = other.getComponent('Plane');
            if(this.ufoType == 'ufoBullet'){
                plane.bulletNum++;
                if(plane.bulletNum > 3) plane.bulletNum = 3;
            }else if(this.ufoType == 'ufoBomb'){
                Global.boomNum++;
                this.game.updateBoomNum();
            }else if(this.ufoType == 'diamond'){
                Global.diamond++;
                this.game.updateDiamond();
            }
            this.node.destroy();
        }
    },
});
