/**
 * Created by vinson on 2015/10/2.
 */
var GameUI=cc.Layer.extend({
    gameLayer: null,
    scoleTxt:null,
    ctor: function (gameLayer) {
        this._super();
        //cc.spriteFrameCache.addSpriteFrames(res.assetPlist,res.assetPng);//资源新加载到游戏里面
        //var spriteFrame = cc.spriteFrameCache.getSpriteFrame("aa0001.png");//用来加载动画的
        //var bg=new cc.Sprite("#bg.jpg")//用来加载单个图片
        var size=cc.director.getWinSize();
        this.gameLayer=gameLayer;
        this.createBg();
        this.createText("长按屏幕使棍子变长",size.width>>1,(size.height>>1)+300);
        this.scoleTxt=this.createText("向前走了0步",size.width>>1,(size.height>>1)+200);
    },
    createText:function(content,x,y){
        var node=new cc.LabelTTF(content,"arial",20);
        node.setColor(cc.color(0,0,0));
        node.x=x;
        node.y=y;
        this.addChild(node);
        return node;
    },
    createBox:function(){
        var node=new cc.Sprite("#box.jpg");
        node.setAnchorPoint(cc.p(0,0));
        node.scaleY=0.1;
        node.scaleX=0.1;
        this.addChild(node);
        return node;
    },
    createMan:function(){
        var node=new cc.Sprite("#man.png");
        node.setAnchorPoint(cc.p(0,0));
        this.addChild(node);
        return node;
    },
    createBg:function(){
        var size=cc.director.getWinSize();
        var node=new cc.Sprite("#walkBg.jpg");
        node.setAnchorPoint(cc.p(0,0));
        node.scaleY=10;
        node.scaleX=7;
        node.x=-10;
        node.y=-10;
        this.addChild(node);
        node=new cc.Sprite("#moon.png");
        node.scaleY=2;
        node.scaleX=2;
        this.addChild(node);
        node.x=size.width>>1;
        node.y=(size.height>>1)+250;

        node=new cc.Sprite("#cloud.png");
        this.addChild(node);
        node.x=(size.width>>1)-160;
        node.y=45;

        node=new cc.Sprite("#cloud.png");
        this.addChild(node);
        node.scaleY=node.scaleX=1.5;
        node.x=(size.width>>1)+150;
        node.y=75;
    },
    updateScore:function(score){
        this.scoleTxt.setString("向前走了"+score+"步");
    }
});