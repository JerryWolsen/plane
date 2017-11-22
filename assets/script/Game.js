cc.Class({
    extends: cc.Component,

    properties: {
        scoreDisplay: cc.Label,
        level: 0,
        enemy: cc.Prefab,
        plane: cc.Prefab,
    },

    onLoad: function () {
        this.score = 0;

        let manager = cc.director.getCollisionManager();
        manager.enabled = true;

        this.spawnNewPlane();

        this.spawnNewEnemy();            

    },

    update: function (dt) {

    },

    gainScore: function(){
        this.score += 1;
        this.scoreDisplay.string  = 'Score: ' + this.score.toString();
    },

    spawnNewEnemy: function(){
        let newEnemy = cc.instantiate(this.enemy);

        this.node.addChild(newEnemy);

        let maxX = this.node.width / 2 - newEnemy.width / 2;
        let maxY = this.node.height / 2;
        let randY = Math.floor(cc.random0To1() * maxY);
        let randX = Math.floor(cc.randomMinus1To1() * maxX);

        newEnemy.setPosition(cc.p(randX, randY));

        newEnemy.getComponent('Enemy').game = this;

    },

    spawnNewPlane: function(){
        let newPlane = cc.instantiate(this.plane);
        
        this.node.addChild(newPlane);
        newPlane.setPosition(0, -250);

        newPlane.getComponent('Plane').game = this;
    },

    gameOver: function(){
        cc.director.loadScene('menu');
    },

});
