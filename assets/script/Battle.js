var Global = require('Global');

module.exports = cc.Class({
    extends: cc.Component,

    // lambda表达式 解决循环引用
    properties: () => ({
        planePrefab: cc.Prefab,
        enemyPrefab: cc.Prefab,
        boomPrefab: cc.Prefab,
        smallBoom1Prefab: cc.Prefab,
        smallBoom2Prefab: cc.Prefab,
        backgroundPrefab: cc.Prefab,
        smallEnemyPrefab: cc.Prefab,
        ufoBulletPrefab: cc.Prefab,
        ufoBombPrefab: cc.Prefab,
        battleBgm: cc.AudioClip,
        ui: require('UI'),
        useBombButton: cc.Button,
        levels: [cc.Integer],
        bosses:[cc.Integer],
    }),

    onLoad: function () {
        this.hasWin = false;
        this.startToMeetBoss = false;
        this.numberOfDestroyBoss = 0;

        let self = this;
        cc.director.getCollisionManager().enabled = true;

        this.score = 0;
        this.level = 0;

        this.addBackground();

        this.currentBgm = cc.audioEngine.playEffect(this.battleBgm, false, 0.5);

        this.spawnNewPlane();
        this.addTouchListener();

        // this.spawnNewEnemy();

        this.spawnSmallEnemy();

        this.schedule(this.spawnSmallEnemy, 1.5);

        this.schedule(this.spawnUfo, 10);
    },

    start(){
        this.currentLevel = Global.enterLevel;
        this.updateBoomNum();
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
        if(this.hasWin) return;

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

    spawnSmallEnemy: function(){
        let count = Math.floor(cc.random0To1() * 10) + 1;
        for(let i=0; i<count; i++){
            let self = this;
            let enemy = cc.instantiate(this.smallEnemyPrefab);
            let posX = Math.floor(cc.randomMinus1To1() * (self.node.width / 2 - enemy.width / 2));
            let posY = Math.floor(cc.randomMinus1To1() * enemy.height / 2 + self.node.height / 2 + enemy.height / 2);
            this.node.addChild(enemy);
            enemy.setPosition(cc.p(posX, posY));
            enemy.getComponent('SmallEnemy').game = this;
        }
    },

    spawnUfo: function(){
        let self = this;
        let rand = cc.random0To1();
        let ufo = rand <= 0.7 ? cc.instantiate(this.ufoBulletPrefab) : cc.instantiate(this.ufoBombPrefab);
        let posX = Math.floor(cc.randomMinus1To1() * (self.node.width / 2 - ufo.width / 2));
        let posY = Math.floor(self.node.height / 2 + ufo.height / 2);
        this.node.addChild(ufo);
        ufo.setPosition(cc.p(posX, posY));
        ufo.getComponent('Ufo').game = this;
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

            if(self.plane.x >= canvasWidth / 2 - planeWidth/2){
                self.plane.x = canvasWidth / 2 - planeWidth/2;
            }

            if(self.plane.x <= -canvasWidth / 2 + planeWidth/2){
                self.plane.x = -canvasWidth / 2 + planeWidth/2;
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

    gainScore: function(score){
        this.score += score;
        this.ui.scoreDisplay.string  = 'Score: ' + this.score.toString();
        if(score > 1){
            this.numberOfDestroyBoss++;
        }
    },

    updateBoomNum: function(){
        this.ui.boomLabel.string = 'x ' + Global.boomNum.toString();
    },

    useUfoBomb: function(){
        if(Global.boomNum <= 0){
            return;
        }
        this.useBombButton.interactable = false;
        this.scheduleOnce(()=>{
            this.useBombButton.interactable = true;
        }, 1);
        Global.boomNum--;
        if(Global.boomNum <= 0){
            Global.boomNum = 0;
        }
        this.updateBoomNum();
        //TODO: 添加大爆炸
        let children = this.node.children;
        let score = 0;
        for(let i=0; i<children.length; i++){
            if (children[i].name == 'smallEnemy'){
                children[i].getComponent('SmallEnemy').hp--;
            }else if(children[i].name == 'Enemy'){
                let enemy = children[i].getComponent('Enemy');
                enemy.hp = enemy.hp - 10;
            }
        }
    },

    gameOver: function(){
        this.removeTouchListener();
        this.unschedule(this.spawnSmallEnemy);
        this.unschedule(this.spawnUfo);
        // this.startToMeetBoss = false;

        this.ui.mask.node.active = true;
        this.ui.mask.status.string = '本次得分：'+ this.score.toString();
        cc.audioEngine.stop(this.currentBgm);
        cc.director.pause();
    },

    fuhuo(){
        this.spawnNewPlane();
        this.addTouchListener();
        this.hasWin = false;
        if(!this.startToMeetBoss){
            this.schedule(this.spawnSmallEnemy, 1.5);
            this.schedule(this.spawnUfo, 10);
        }
    },

    gotoWinResult: function(){
        this.removeTouchListener();
        this.unschedule(this.spawnSmallEnemy);
        this.unschedule(this.spawnUfo);
        this.startToMeetBoss = false;
        cc.audioEngine.stop(this.currentBgm);
        Global.score = this.score
        cc.director.loadScene('win');
    },

    fireBoom: function(posX, posY){
        let boom = cc.instantiate(this.boomPrefab);

        boom.x = posX;
        boom.y = posY;

        this.node.addChild(boom);
        boom.getComponent(cc.Animation).play('boom');
    },

    fireSmallBoom: function(index, posX, posY){
        let prefab = index==0 ? this.smallBoom1Prefab : this.smallBoom2Prefab;
        let boom = cc.instantiate(prefab);

        boom.x = posX;
        boom.y = posY;

        this.node.addChild(boom);
        boom.getComponent(cc.Animation).play('smallBoom'+(index+1));
    },

    update: function (dt) {
        if(!this.hasWin && !this.startToMeetBoss && this.score >= this.levels[this.currentLevel]){
            this.startToMeetBoss = true;
            this.unschedule(this.spawnSmallEnemy);
            this.unschedule(this.spawnUfo);
            this.spawnNewEnemy();
        }
        if(!this.hasWin && this.startToMeetBoss && this.numberOfDestroyBoss == this.bosses[this.currentLevel]){
            this.hasWin = true;
            this.gotoWinResult();
        }
    },
});
