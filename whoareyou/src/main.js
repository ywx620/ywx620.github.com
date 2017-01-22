/**
 * Created by vinson on 2016/1/12.
 */

var MainLayer = cc.Layer.extend({
    title:null,
    answer:null,
    ctor:function () {
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.assetPlist,res.assetPng);
        this.init();
        this.createBg();
        this.createTitle();
        trace("总题数数＝"+DataManager.data.length);
        //this.onStart(7)
    },
    init:function(){
        UtilsManager.init();
    },
    createBg:function() {
        var node = new cc.Sprite("#bg.jpg");
        node.setAnchorPoint(cc.p(0, 0));
        this.addChild(node);
    },
    createTitle:function() {
        var node=new TitleManager();
        this.addChild(node);
        this.title=node;
        EventManager.addEventListener(EventManager.START,this.onStart.bind(this));
    },
    onStart:function(target){
        //trace(target);
        this.removeChild(this.title);
        var node=new AnswerManager(target);
        this.addChild(node);
        this.answer=node;
    }
});