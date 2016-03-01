/**
 * Created by vinson on 2016/2/18.
 */
var WarnBar=cc.Sprite.extend({
    label:null,
    callBackFun:null,
    ctor:function () {
        var size=cc.director.getWinSize();
        this._super();
        var bg=this.createBg();
        bg.x=(size.width)>>1;
        bg.y=(size.height)>>1;
        var btnyes=this.createButton("是",100,50,this.yesCallback);
        var btnno=this.createButton("否",300,50,this.noCallback);
        var mu = new cc.Menu(btnyes,btnno);
        mu.x=mu.y=0;
        bg.addChild(mu);
    },
    createBg:function(){
        //var node=this.createColorRect(moduleColor.warnBg,400,250);
        var node=new cc.Sprite("#warnBg.jpg");
        this.addChild(node);
        var txt=new cc.LabelTTF("","arial",24);
        txt.y=node.height-30;
        txt.x=node.width>>1;
        txt.setAnchorPoint(cc.p(0.5,1));//顶点设置在x轴中间y轴上面
        node.addChild(txt);
        this.label=txt;
        return node;
    },
    setLabel:function(s){
        this.label.setString(s);
    },
    createButton:function(s,x,y,backfun){
        var spriteNormal = new cc.Sprite("#warnBtnNormal.jpg");
        var spriteSelected = new cc.Sprite("#warnBtnSelected.jpg");
        var txt=new cc.LabelTTF(s,"arial",24);
        txt.x=spriteNormal.width>>1;
        txt.y=spriteNormal.height>>1;
        spriteNormal.addChild(txt);
        txt=new cc.LabelTTF(s,"arial",24);
        txt.x=spriteNormal.width>>1;
        txt.y=spriteNormal.height>>1;
        spriteSelected.addChild(txt);
        var menuItem = new cc.MenuItemSprite(
            spriteNormal,
            spriteSelected,
            backfun,this);
        menuItem.x=x;
        menuItem.y=y;
        return menuItem;
    },
    createColorRect:function(c,w,h){
        var node=new cc.LayerColor();
        node.setColor(c);
        node.changeWidthAndHeight(w,h);
        return node;
    },
    yesCallback:function(sender){
        cc.log("yes");
        if(this.callBackFun!=null){
            this.callBackFun(true);
            this.removeFromParent();
        }
    },
    noCallback:function(sender){
        cc.log("no");
        if(this.callBackFun!=null){
            this.callBackFun(false);
            this.removeFromParent();
        }
    }
});