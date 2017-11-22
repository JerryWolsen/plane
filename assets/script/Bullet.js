cc.Class({
    extends: cc.Component,

    properties: {

        speed: 0,
    },

    onLoad: function () {

    },

    update: function (dt) {
        this.node.y += this.speed * dt;

        if(this.node.y >= this.node.parent.height / 2 ){
            this.node.destroy();
        }
    },

    onCollisionEnter: function(other, self){
        let enemy = other.getComponent('Enemy');
        enemy.hp--;
        this.node.destroy();
    }

});
