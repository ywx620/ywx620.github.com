/**
 * Created by vinson on 2015/10/2.
 */
var GameUI=cc.Layer.extend({
    gameLayer: null,
    showTxt:null,
    menu:null,
    rule:null,
    ctor: function (gameLayer) {
        this._super();
        this.gameLayer=gameLayer;
        this.createBtnStart();
        this.createBtnRule();
        this.createBtnReward();
        this.addEvent();
        this.createLabel();
    },
    createBtnStart:function(){
        var size=cc.director.getWinSize();
        var s_CloseNormal=cc.spriteFrameCache.getSpriteFrame("btnStart0001.png");
        var s_CloseSelected=cc.spriteFrameCache.getSpriteFrame("btnStart0002.png");
        var closeItem = new cc.MenuItemImage(
            s_CloseNormal,
            s_CloseSelected,
            function () {
                cc.log("start");
                this.gameLayer.status=Const.GAME_INIT;
               // this.removeRule();
            },this);
        closeItem.setAnchorPoint(0.5, 0.5);
        var menu = new cc.Menu(closeItem);
        menu.setPosition(0, 0);
        this.addChild(menu, 1);
        closeItem.setPosition(size.width/2, 80);
        this.menu=menu;
    },
    createBtnRule:function(){
        var size=cc.director.getWinSize();
        var s_CloseNormal=cc.spriteFrameCache.getSpriteFrame("btnRule0001.png");
        var s_CloseSelected=cc.spriteFrameCache.getSpriteFrame("btnRule0002.png");
        var mySelf=this;
        var closeItem = new cc.MenuItemImage(
            s_CloseNormal,
            s_CloseSelected,
            function () {
                cc.log("rule");
                this.showRule();
            },this);
        closeItem.setAnchorPoint(0.5, 0.5);
        var menu = new cc.Menu(closeItem);
        menu.setPosition(0, 0);
        this.addChild(menu, 1);
        closeItem.setPosition(size.width-100, 920);
       // this.menu=menu;
    },
    createBtnReward:function(){
        var size=cc.director.getWinSize();
        var s_CloseNormal=cc.spriteFrameCache.getSpriteFrame("btnReward0001.png");
        var s_CloseSelected=cc.spriteFrameCache.getSpriteFrame("btnReward0002.png");
        var mySelf=this;
        var closeItem = new cc.MenuItemImage(
            s_CloseNormal,
            s_CloseSelected,
            function () {
                cc.log("reward");
                this.showReward();
            },this);
        closeItem.setAnchorPoint(0.5, 0.5);
        var menu = new cc.Menu(closeItem);
        menu.setPosition(0, 0);
        this.addChild(menu, 1);
        closeItem.setPosition(120, 920);
       // this.menu=menu;
    },
    createLabel:function(){
        var size=cc.director.getWinSize();
        var node=this.createText("点博一下开始",size.width/2,size.height-100);
        this.addChild(node);
        this.showTxt=node;
    },
    createText:function(content,x,y){
        var label=new cc.LabelTTF(content,"arial",40);
        label.x=x;
        label.y=y;
        label.setColor(CColor.white);
        return label;
    },
    showStart:function(){
        this.menu.visible=false;
        this.showTxt.setString("等待结果...");
    },
    showResult:function(arr){
        this.menu.visible=true;
        var num=1;
        var j=0;
        var str="";
        arr.sort();
        var ss=arr.join("");
        while(num<=6){
            j=ss.split(num+"").length-1;
            if(num==4){//等4的情况
                if(j==1){
                    str="一秀";
                }else if(j==2){
                    str="二举";
                }else if(j==3){
                    str="三红";
                }else if(j>=4){
                    str="状元";
                    if(arr[0]==arr[1]&&arr[0]==1){
                        str="状元插金花";
                    }
                }
            }else{//不等于4的情况
                if(j>=4){
                    if(j==4){
                        str="四进";
                    }else{
                        str="状元";
                    }
                }
            }
            num++;
        }
        if(ss=="123456")	str="对堂";
        if(str=="") 	    str="什么也没有";
        this.showTxt.setString(str);
    },
    showRule:function(){
        if(this.rule==null) {
            var node = new cc.Sprite("#rule.jpg");
            node.setAnchorPoint(cc.p(0, 0));
            this.rule = node;
            this.gameLayer.addChild(node);
        }
    },
    showReward:function(){
        if(this.rule==null) {
            var node = new cc.Sprite("#reward.jpg");
            node.setAnchorPoint(cc.p(0, 0));
            this.rule = node;
            this.gameLayer.addChild(node);
        }
    },
    removeRule:function(){
        if(this.rule) {
            this.gameLayer.removeChild(this.rule);
            this.rule=null;
        }
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
            this.removeRule();
            return true;
        }
        return false;
    }
});
