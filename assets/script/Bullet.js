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
        if(other.node.name == 'Enemy'){
            let enemy = other.getComponent('Enemy');
            enemy.hp--;
        }else if(other.node.name == 'enemy_plane'){
            let enemy = other.getComponent('SmallEnemy');
            enemy.hp--;
        }
        this.node.destroy();
    }

});
