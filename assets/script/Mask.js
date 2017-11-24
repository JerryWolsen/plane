cc.Class({
    extends: cc.Component,

    properties: {
        status: cc.Label,
        quitBtn: cc.Button,
        resumeBtn: cc.Button,
    },

    onLoad: function () {
        this.addTouchListener();
    },

    // 添加touch事件
    addTouchListener: function(){
        
        this.node.on(cc.Node.EventType.TOUCH_START, function(event){
            event.stopPropagation();
        });

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function(event){
            event.stopPropagation();
        });

        this.node.on(cc.Node.EventType.TOUCH_END, function(event){
            event.stopPropagation();
        });

        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function(event){
            event.stopPropagation();
        });
    },

});
