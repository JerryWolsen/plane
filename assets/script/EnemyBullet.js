cc.Class({
    extends: cc.Component,

    properties: {
        speed: 0,
        dirX: 0,
    },

    onLoad: function () {

    },

    update: function (dt) {
        this.node.y -= this.speed * dt;
        this.node.x += this.dirX * dt;

        if(this.node.y <= -this.node.parent.height / 2 
            || this.node.x >= this.node.parent.width / 2
            || this.node.x <= -this.node.parent.width / 2){
            this.node.destroy();
        }

    },

    onCollisionEnter: function(other, self){
        let plane = other.getComponent('Plane');
        plane.hp--;
        this.node.destroy();
    },
});
