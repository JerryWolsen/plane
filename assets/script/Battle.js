
module.exports = cc.Class({
    extends: cc.Component,

    // lambda表达式 解决循环引用
    properties: () => ({
        planePrefab: cc.Prefab,
        enemyPrefab: cc.Prefab,
        boomPrefab: cc.Prefab,
        backgroundPrefab: cc.Prefab,
        battleBgm: cc.AudioClip,
        ui: require('UI'),
    }),

    onLoad: function () {

        let self = this;
        cc.director.getCollisionManager().enabled = true;

        this.score = 0;
        this.level = 0;

        this.addBackground();

        this.currentBgm = cc.audioEngine.playEffect(this.battleBgm, false, 0.5);

        this.spawnNewPlane();
        this.addTouchListener();

        this.spawnNewEnemy();
    },

    addBackground: function(){

        let background = cc.instantiate(this.backgroundPrefab);

        this.node.addChild(background);
        this.background = background;

    },

    spawnNewPlane: function(){
        let self = this;
        let plane = cc.instantiate(this.planePrefab);

        this.node.addChild(plane);
        this.plane = plane;

        plane.setPosition(cc.p(0, -self.node.height / 2 - 100));
        plane.getComponent('Plane').game = this;

        let enterAction = cc.moveTo(1, cc.p(0, -self.node.height / 4 - 100)).easing(cc.easeCubicActionOut());
        plane.runAction(enterAction);
    },

    spawnNewEnemy: function(){
        let self = this;
        let enemy = cc.instantiate(this.enemyPrefab);

        this.node.addChild(enemy);

        let posX = Math.floor(cc.randomMinus1To1() * (self.node.width / 2 - enemy.width / 2));
        let posY = Math.floor(self.node.height / 2 + enemy.height / 2 + cc.random0To1() * 100);

        enemy.setPosition(cc.p(posX, posY));
        enemy.getComponent('Enemy').game = this;

        let posY1 = Math.floor(cc.random0To1() * self.node.height / 2);

        let enterAction = cc.moveTo(10, cc.p(posX, posY1)).easing(cc.easeCubicActionOut());
        enemy.runAction(enterAction);
    },

    _touchStartFunc: function(event){
        this.touch_flag = true;
    },

    _touchMoveFunc:  function(event){
        let self = this;
        if(self.touch_flag && self.plane){
            let delta = event.getDelta();
            
            self.plane.x += delta.x;
            self.plane.y += delta.y;

            let canvasWidth = self.node.width;
            let canvasHeight = self.node.height;

            let planeWidth = self.plane.width;
            let planeHeight = self.plane.height;

            if(self.plane.x >= canvasWidth / 2 - planeWidth){
                self.plane.x = canvasWidth / 2 - planeWidth;
            }

            if(self.plane.x <= -canvasWidth / 2 + planeWidth){
                self.plane.x = -canvasWidth / 2 + planeWidth;
            }

            // 血条多了30
            if(self.plane.y  >= canvasHeight / 2 - planeHeight / 2 - 30){
                self.plane.y = canvasHeight / 2 - planeHeight / 2 - 30;
            }

            if(self.plane.y <= -canvasHeight / 2 + planeHeight / 2){
                self.plane.y = -canvasHeight / 2 + planeHeight / 2;
            }
        }
    },

    _touchEndFunc: function(event){
        this.touch_flag = false;
    },

    _touchCancelFunc: function(event){
        this.touch_flag = false;
    },

    // 添加touch事件
    addTouchListener: function(){
        this.touchFlag = false;

        this.node.on(cc.Node.EventType.TOUCH_START, this._touchStartFunc, this);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveFunc, this);

        this.node.on(cc.Node.EventType.TOUCH_END, this._touchEndFunc, this);

        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchCancelFunc, this);
    },

    removeTouchListener: function(){
        
        this.node.off(cc.Node.EventType.TOUCH_START, this._touchStartFunc, this);
        
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this._touchMoveFunc, this);

        this.node.off(cc.Node.EventType.TOUCH_END, this._touchEndFunc, this);

        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._touchCancelFunc, this);
    },

    gainScore: function(){
        this.score += 1;
        this.ui.scoreDisplay.string  = 'Score: ' + this.score.toString();
    },

    gameOver: function(){
        this.removeTouchListener();
        this.ui.mask.node.active = true;
        this.ui.mask.status.string = 'You Lose';
        this.ui.mask.resumeBtn.node.active = false;
        cc.audioEngine.stop(this.currentBgm);
        cc.director.pause();

    },

    fireBoom: function(posX, posY){
        let boom = cc.instantiate(this.boomPrefab);

        boom.x = posX;
        boom.y = posY;

        this.node.addChild(boom);
        boom.getComponent(cc.Animation).play('boom');
    },

    // update: function (dt) {

    // },
});
