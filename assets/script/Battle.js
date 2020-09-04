var Global = require('Global');

module.exports = cc.Class({
    extends: cc.Component,

    // lambda表达式 解决循环引用
    properties: () => ({
        secretNode: cc.Node,
        planePrefab: cc.Prefab,
        enemyPrefab: cc.Prefab,
        boomPrefab: cc.Prefab,
        smallBoom1Prefab: cc.Prefab,
        smallBoom2Prefab: cc.Prefab,
        backgroundPrefab: cc.Prefab,
        smallEnemyPrefab: cc.Prefab,
        ufoBulletPrefab: cc.Prefab,
        ufoBombPrefab: cc.Prefab,
        ufoDiamondPrefab: cc.Prefab,
        boomEffectPrefab: cc.Prefab,
        shieldPrefab: cc.Prefab,
        battleBgm: cc.AudioClip,
        ui: require('UI'),
        useBombButton: cc.Button,
        levels: [cc.Integer],
        bosses:[cc.Integer],
    }),

    onLoad: function () {
        this.secretClickNum = 0;
        this.lastDateClickSecret = new Date();

        this.hasWin = false;
        this.startToMeetBoss = false;
        this.numberOfDestroyBoss = 0;

        let self = this;
        cc.director.getCollisionManager().enabled = true;

        this.score = 0;
        this.level = 0;

        this.addBackground();

        this.currentBgm = cc.audioEngine.playEffect(this.battleBgm, true, 0.5);

        this.spawnNewPlane();
        this.addTouchListener();

        this.spawnSmallEnemy();

        this.startSchedule()

        this.addSecretAction();
    },

    addSecretAction(){
        this.secretNode.on('click', (event)=>{
            let now = new Date();
            if(now.getTime() - this.lastDateClickSecret.getTime() >= 1000){
                this.secretClickNum = 1;
            }else{
                this.secretClickNum++;
            }
            console.log('secretClickNum: '+this.secretClickNum)
            if(this.secretClickNum >= 3){
                this.gotoWinResult();
            }
            this.lastDateClickSecret = now;
        });
    },

    start(){
        this.currentLevel = Global.enterLevel;
        this.updateBoomNum();
        this.updateDiamond();
        this.updateShield();
        Global.allPass && this.spawnNewEnemy();
    },

    startSchedule(){
        this.schedule(this.spawnSmallEnemy, 1.5);
        this.schedule(this.spawnUfo, 6);
    },

    cancelSchedule(){
        this.unschedule(this.spawnSmallEnemy);
        this.unschedule(this.spawnUfo);
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
        let self = this;
        let tmp = cc.instantiate(this.smallEnemyPrefab);
        let all = Math.floor(self.node.width / tmp.width);
        for(let i=0; i<2*all; i++){
            let rand = cc.random0To1();
            if(rand <= 0.4){
                let enemy = cc.instantiate(this.smallEnemyPrefab);
                let posX = -self.node.width/2 + tmp.width/2 * i;
                let posY = Math.floor(cc.randomMinus1To1() * enemy.height / 2 + self.node.height / 2 + enemy.height / 2);
                this.node.addChild(enemy);
                enemy.setPosition(cc.p(posX, posY));
                enemy.getComponent('SmallEnemy').game = this;
            }
        }

        // let count = Math.floor(cc.random0To1() * all) + 1;
        // for(let i=0; i<count; i++){
        //     let enemy = cc.instantiate(this.smallEnemyPrefab);
        //     let posX = Math.floor(cc.randomMinus1To1() * (self.node.width / 2 - enemy.width / 2));
        //     let posY = Math.floor(cc.randomMinus1To1() * enemy.height / 2 + self.node.height / 2 + enemy.height / 2);
        //     this.node.addChild(enemy);
        //     enemy.setPosition(cc.p(posX, posY));
        //     enemy.getComponent('SmallEnemy').game = this;
        // }
    },

    spawnUfo: function(){
        let self = this;
        let rand = cc.random0To1();
        let ufo;
        if(rand <= 0.25){
            ufo = cc.instantiate(this.ufoBulletPrefab);
        }else if(rand <= 0.5){
            ufo = cc.instantiate(this.ufoBombPrefab);
        }else if(rand <= 0.75){
            ufo = cc.instantiate(this.ufoDiamondPrefab);
        }else{
            ufo = cc.instantiate(this.shieldPrefab);
        }
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

            if(self.plane.x >= canvasWidth / 2 - planeWidth/4){
                self.plane.x = canvasWidth / 2 - planeWidth/4;
            }

            if(self.plane.x <= -canvasWidth / 2 + planeWidth/4){
                self.plane.x = -canvasWidth / 2 + planeWidth/4;
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

    updateDiamond(){
        this.ui.diamondLabel.string = '' + Global.diamond.toString();
    },

    updateShield(){
        this.ui.shieldLabel.string = '' + Global.shield.toString();
    },

    updateBoomNum: function(){
        this.ui.boomLabel.string = '' + Global.boomNum.toString();
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

        let pos = [this.node.x - this.node.width/4, this.node.x + this.node.width/4];
        for(let i=0; i<2; i++){
          let effect = cc.instantiate(this.boomEffectPrefab);
          this.node.addChild(effect);
          effect.setPosition(pos[i], -this.node.height/2-effect.height/2);
          let action = cc.moveTo(1, cc.p(pos[i], this.node.height/2+effect.height/2));
          effect.runAction(action);
        }

        this.scheduleOnce(()=>{
            let children = this.node.children;
            for(let i=0; i<children.length; i++){
                if (children[i].name == 'smallEnemy'){
                    children[i].getComponent('SmallEnemy').hp--;
                }else if(children[i].name == 'Enemy'){
                    let enemy = children[i].getComponent('Enemy');
                    enemy.hp = enemy.hp - 10;
                }
            }
        }, 0.5);
    },

    useShield: function(){
        if(Global.shield <= 0){
            return;
        }
        Global.shield--;
        if(Global.shield <= 0){
            Global.shield = 0;
        }
        this.updateShield();
        this.plane.getComponent('Plane').showShield();
    },

    gameOver: function(){
        this.removeTouchListener();
        this.cancelSchedule();
        // this.startToMeetBoss = false;

        this.scheduleOnce(()=>{
            this.ui.mask.node.active = true;
            this.ui.mask.status.string = '本次得分：'+ this.score.toString();
            cc.audioEngine.pause(this.currentBgm);
            cc.director.pause();
        }, 1);
    },

    fuhuo(){
        this.spawnNewPlane();
        this.addTouchListener();
        this.hasWin = false;
        cc.audioEngine.resume(this.currentBgm);
        if(!this.startToMeetBoss){
            this.startSchedule();
        }
    },

    gotoWinResult: function(){
        Global.levels[Global.enterLevel+1] = true;
        this.removeTouchListener();
        this.cancelSchedule();
        Global.score = this.score;
        if(Global.enterLevel == 2){
            Global.allPass = true;
        }
        this.scheduleOnce(()=>{
            this.startToMeetBoss = false;
            cc.audioEngine.stop(this.currentBgm);
            cc.director.loadScene('win');
        }, 0.5);
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
        if(!Global.allPass){
            if(!this.hasWin && !this.startToMeetBoss && this.score >= this.levels[this.currentLevel]){
                this.startToMeetBoss = true;
                this.cancelSchedule();
                this.spawnNewEnemy();
            }
            if(!this.hasWin && this.startToMeetBoss && this.numberOfDestroyBoss == this.bosses[this.currentLevel]){
                this.hasWin = true;
                this.gotoWinResult();
            }
        }
    },
});
