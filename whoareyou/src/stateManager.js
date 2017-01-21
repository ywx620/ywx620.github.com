var StateManager = cc.Layer.extend({
    blood:null,
    score:null,
    level:null,
    right:null,
    wrong:null,
    cheer:null,
    ctor: function () {
        this._super();
        this.create();
    },
    create:function(){
        var size = cc.director.getWinSize();
        this.y=size.height-100;

        this.createNode("#man.png",0,0);
        this.createNode("#bloodBg.png",0,-12);
        this.blood=this.createNode("#blood.png",0,-12);
        this.blood.scaleX=1;
        this.right=this.createNode("#right.png",(size.width-100)/2,-300);
        this.wrong=this.createNode("#wrong.png",(size.width-100)/2,-300);
        this.removeChild(this.right);
        this.removeChild(this.wrong);

        this.createText("等级:",size.width-150,50);
        this.createText("分数:",size.width-150,0);
        this.level=this.createText("0",size.width-70,50);
        this.score=this.createText("0",size.width-70,0);
        this.cheer=this.createText("欣怡加油",0,-40);
        this.cheer.fontSize=25;
    },
    createNode:function(name,x,y){
        var node=new cc.Sprite(name);
        node.setAnchorPoint(cc.p(0,0));
        node.x=x;node.y=y;
        this.addChild(node);
        return node;
    },
    createText:function(content,x,y){
        var node=new cc.LabelTTF(content,"arial",30);
        node.x=x;node.y=y;
        node.setAnchorPoint(cc.p(0,0));
       // node.color="#000000";
        this.addChild(node);
        return node;
    },
    doRight:function(){
        this.addChild(this.right);
        this.scheduleOnce(function(){this.removeChild(this.right);}, 1);
        cc.audioEngine.playEffect(res.right);
        this.updateScore();
    },
    doWrong:function(){
        this.addChild(this.wrong);
        this.scheduleOnce(function(){this.removeChild(this.wrong);}, 1);
        cc.audioEngine.playEffect(res.wrong);
        this.updateBlood();
    },
    updateScore:function(){
        DataManager.score++;
        if(DataManager.score%10==0){
            DataManager.level++;
            DataManager.speed+=0.5+Math.random();
        }
        this.score.setString(""+DataManager.score);
        this.level.setString(""+DataManager.level);

    },
    updateBlood:function(){
        DataManager.blood--;
        this.blood.scaleX=DataManager.blood/DataManager.maxBlood;
        if(DataManager.blood<=3){
            this.cheer.x=0;
        }
    },
    initData:function(){
        this.blood.scaleX=DataManager.blood/DataManager.maxBlood;
        this.score.setString(""+DataManager.score);
        this.level.setString(""+DataManager.level);
        this.cheer.x=-900;
    }
});
//结束界面
var EndPanel = cc.Layer.extend({
    level:null,
    score:null,
    ctor: function () {
        this._super();
        var size = cc.director.getWinSize();
        this.createNode("#bg.jpg",0,0);
        this.createNode("#answer1.png",(size.width-160)/2,300);
        this.createText("重新开始",(size.width-126)/2,315);
        this.createText("成绩出炉",(size.width-126)/2,700);
        this.createText("等级:"+DataManager.level,(size.width-126)/2,600);
        this.createText("分数:"+DataManager.score,(size.width-126)/2,500);
        this.addEvent();
    },
    createNode:function(name,x,y){
        var node=new cc.Sprite(name);
        node.setAnchorPoint(cc.p(0,0));
        node.x=x;node.y=y;
        this.addChild(node);
        return node;
    },
    createText:function(content,x,y){
        var node=new cc.LabelTTF(content,"arial",30);
        node.x=x;node.y=y;
        node.setAnchorPoint(cc.p(0,0));
        node.color="#000000";
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
        EventManager.dispatchEvent(REPLAY);
    }
});