/**
 * Created by ywx on 2016/5/15.
 */
var AnswerManager = cc.Layer.extend({
    answers:[],
    ctor:function () {
        this._super();
        this.init();
    },
    init:function(){
        this.answers.length=0;
        for(var i=0;i<4;i++) {
            var node = new Answer(i);
            node.setAnchorPoint(cc.p(0,0));
            node.x = i*160;
            this.addChild(node);
            this.answers.push(node);
        }
        EventManager.addEventListener(CLICK,this.onClick.bind(this));
    },
    onClick:function(target){
        //trace(target.answer);
        EventManager.dispatchEvent(ANSWER,target);
    },
    updateAnswer:function(as){
        for(var i=0;i<4;i++) {
            var node = this.answers[i];
            node.createText(as[i]+"");
        }
    }
});
var Answer = cc.Sprite.extend({
    num:0,
    arrs:["#answer1.png","#answer2.png","#answer3.png","#answer4.png"],
    txt:null,
    answer:0,
    ctor:function (n) {
        this._super();
        this.num=n;
        this.createAnswer();
        this.addEvent();
    },
    createAnswer:function(){
        var node=new cc.Sprite(this.arrs[this.num]);
        node.setAnchorPoint(cc.p(0,0));
        this.width=node.width;
        this.height=node.height;
        this.addChild(node);
        this.createText("55");
    },
    createText:function(content){
        if(this.txt!=null){
            this.removeChild(this.txt);
            this.txt=null;
        }
        this.answer=content;
        var node=new cc.LabelTTF(content,"arial",30);
        node.x=80; node.y=32;
        node.color="#000000";
        this.txt=node;
        this.addChild(node);
        return node;
    },
    addEvent:function(){
        cc.eventManager.addListener({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan:this.onTouchBegan.bind(this)
        }, this);
    },
    onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();
        var location = touch.getLocation();
        var rect = new cc.Rect(target.x, target.y,target.width, target.height);
        if(cc.rectContainsPoint(rect,location)){
            EventManager.dispatchEvent(CLICK,target);
            return true;
        }
        return false;
    }
});