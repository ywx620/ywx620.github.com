/**
 * Created by vinson on 2016/1/12.
 */
var CLICK="click";
var ANSWER="answer";
var REPLAY="replay";
var MainLayer = cc.Layer.extend({
    answer:null,
    title:null,
    state:null,
    endPanel:null,
    isDo:true,
    ctor:function () {
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.assetPlist,res.assetPng);

        this.createBg();
        this.createState();
        this.createTitle();
        this.createAnswer();
        //this.createEndPanel();
        this.updateData();

        this.scheduleUpdate();
        EventManager.addEventListener(ANSWER,this.onClick.bind(this));
        EventManager.addEventListener(REPLAY,this.onReplay.bind(this));

        this.initData();
    },
    initData:function(){
        DataManager.speed=1;
        DataManager.level=1;
        DataManager.score=0;
        DataManager.blood= DataManager.maxBlood;
        this.state.initData();
    },
    onReplay:function(){
      this.initData();
      this.removeChild(this.endPanel);
    },
    onClick:function(target){
        if(this.isDo&&DataManager.blood>0) {
            this.isDo=false;
            if (target.answer == this.title.answer) {
                this.doRight();
            } else {
                this.doWrong();
            }
        }
    },
    doRight:function(){
        this.state.doRight();
        this.scheduleOnce(this.updateData, 1);
    },
    doWrong:function(){
        this.state.doWrong();
        this.scheduleOnce(this.updateData, 1);
    },
    createBg:function(){
        var node=new cc.Sprite("#bg.jpg");
        node.setAnchorPoint(cc.p(0,0));
        this.addChild(node);
    },
    createEndPanel:function(){
        if(this.endPanel){
            this.removeChild(this.endPanel);
            this.endPanel=null;
        }
        var node=new EndPanel();
        node.setAnchorPoint(cc.p(0,0));
        this.addChild(node);
        this.endPanel=node;
    },
    createAnswer:function(){
        var node=new AnswerManager();
        this.addChild(node);
        this.answer=node;
        //node.updateAnswer([15,132,68,5]);
    },
    createTitle:function(){
        var node=new TitleManager();
        node.setAnchorPoint(cc.p(0,0));
        this.title=node;
        this.addChild(node);
        //this.title.updateTitle("6x7=");
    },
    createState:function(){
        var node=new StateManager();
        node.setAnchorPoint(cc.p(0,0));
        this.addChild(node);
        this.state=node;
    },
    updateData:function(){
        this.isDo=true;
        var size = cc.director.getWinSize();
        DataManager.updateTitle();
        this.answer.updateAnswer(DataManager.answers);
        this.title.updateTitle(DataManager.title,DataManager.answer);
        this.title.x=Math.random()*(size.width-180);
        this.title.y=size.height-46;
    },
    update:function(){
        if(this.isDo&&DataManager.blood>0) {
            this.title.y -= DataManager.speed;
            if (this.title.y < 0) {
                this.title.y=2000;
                this.doWrong();
            }
        }
        if(DataManager.blood==0){
            DataManager.blood=-1;
            this.createEndPanel();
        }
    }
});
var trace=function(){
    cc.log(Array.prototype.join.call(arguments,","));
}