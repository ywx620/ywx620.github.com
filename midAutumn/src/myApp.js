var MyLayer = cc.Layer.extend({
    size:null,
    shaiziStop:[],
    shaiziStart:[],
    randomSeats:[],
    ui:null,
    status:-1,
    index:0,
    leftSeat:0,
    init:function () {
        this.size=cc.director.getWinSize();
        cc.spriteFrameCache.addSpriteFrames(res.assetPlist,res.assetPng);
        this.createBg();
        this.createShaiziStop();
        this.createUI();
        this.scheduleUpdate();
    },
    createUI:function(){
        var node=new GameUI(this);
        this.ui=node;
        this.addChild(node);
    },
    createBg:function(){
        var node=new cc.Sprite("#bg.jpg");
        node.x=this.size.width/2;
        node.y=this.size.height/2;
        this.addChild(node);
        this.leftSeat=node.x-node.width/2;
    },
    createShaiziStop:function(){
        var spriteFrame = cc.spriteFrameCache.getSpriteFrame("shaiziStop0001.png");
        this.shaiziStop=[];
        for(var i=0;i<12;i++){
            var node=new cc.Sprite(spriteFrame);
            var xx=this.size.width/2-220;
            var yy=this.size.height/2-160;
            node.x=xx+Math.floor(i%4)*140;
            node.y=yy+Math.floor(i/4)*100;
            if(Math.floor(i/4)==1){
                node.x+=50;
            }
            node.visible=false;
            this.addChild(node);
            this.shaiziStop.push(node);
        }
        this.shaiziStart=[];
        for(i=0;i<6;i++){
            var node=new cc.Sprite(spriteFrame);
            this.shaiziStart.push(node);
        }
    },
    gameInit:function(){
        this.index=0;
        var len=this.shaiziStop.length;
        for(var i=0;i<len;i++){
            this.shaiziStop[i].visible=false;
        }
        for(var j=0;j<6;j++) {
            ///////////////动画开始//////////////////////
            var sprite=this.shaiziStart[j];
            var animation = new cc.Animation();
            for (var i = 1; i <= 26; i++) {
                var frameName;
                if (i < 10) frameName = "shaiziStart000" + i + ".png";
                else    frameName = "shaiziStart00" + i + ".png";
               // cc.log("frameName = " + frameName);
                var spriteFrame = cc.spriteFrameCache.getSpriteFrame(frameName);
                animation.addSpriteFrame(spriteFrame);
            }

            animation.setDelayPerUnit(0.05);           //设置两个帧播放时间
            animation.setRestoreOriginalFrame(true);    //动画执行后还原初始状态

            var action = cc.animate(animation);
            sprite.runAction(cc.repeatForever(action));
            var xx=this.size.width/2;
            var yy=this.size.height/2;
            sprite.x=xx+Math.random()*100;
            sprite.y=yy+Math.random()*100;
            sprite.ox=Math.random()*30-15;
            sprite.oy=Math.random()*30-15;
            this.addChild(sprite);
            //////////////////动画结束///////////////////
        }
        this.status=Const.GAME_START;
        this.ui.showStart();
        cc.audioEngine.playMusic(res.sound);
    },
    gameStart:function(){
        var gailv=0.9;
        var offest=20;

        //横屏
        //var left=this.leftSeat+100;
        //var bottom=150;
        //var bowlWidth=700;
        //var bowlHeight=350;
        //竖屏
        var left=100;
        var bottom=300;
        var bowlWidth=500;
        var bowlHeight=350;
        for(var i=0;i<6;i++){
            var mc=this.shaiziStart[i];
            mc.x+=mc.ox;
            mc.y+=mc.oy;
            if(mc.x>=bowlWidth+left){
                mc.ox*=-gailv;
                mc.x=bowlWidth+left;
            }
            if(mc.x<=left){
                mc.ox*=-gailv;
                mc.x=left;
            }
            if(mc.y>=bowlHeight+bottom){
                mc.oy*=-gailv;
                mc.y=bowlHeight+bottom;
            }
            if(mc.y<=bottom){
                mc.oy*=-gailv;
                mc.y=bottom;
                this.index++;
            }
            if(this.index>=5){
                var arr=[0,1,2,3,4,5,6,7,8,9,10,11];
               // var randomSeat=parseInt(Math.random()*6)+1;
                this.randomSeats=[];
                for(i=0;i<6;i++){
                    var j=parseInt(Math.random()*arr.length);
                    var k=arr[j];
                    this.randomSeats.push(this.shaiziStop[k]);
                    arr.splice(j,1);
                }
                this.status=Const.GAME_PASS;
            }
        }
    },
    gamePass:function(){
        for(var i=0;i<6;i++){
            var sx=this.shaiziStart[i].x;
            var sy=this.shaiziStart[i].y;
            var ex=this.randomSeats[i].x;
            var ey=this.randomSeats[i].y;
            var dx=ex-sx;
            var dy=ey-sy;
            this.shaiziStart[i].x+=dx/10;
            this.shaiziStart[i].y+=dy/10;
            if(Math.abs(dx)<=1&&Math.abs(dy)<=1){
                this.status=Const.GAME_OVER;
            }
        }
    },
    gameOver:function(){
        for(var i=0;i<6;i++){
            var node=this.shaiziStart[i];
            node.stopAllActions();
            this.removeChild(node);
        }
        var points=[];
        for(i=0;i<6;i++){
            points.push(parseInt((Math.random()*6)+1));
        }
        for(i=0;i<6;i++){
            var node=this.randomSeats[i];
            node.visible=true;
            var spriteFrame = cc.spriteFrameCache.getSpriteFrame("shaiziStop000"+points[i]+".png");
            node.initWithSpriteFrame(spriteFrame)
        }
        this.status=Const.GAME_STOP;
        this.ui.showResult(points);
    },
    update:function(){
        if(this.status==Const.GAME_INIT){
            this.gameInit();
        }else if(this.status==Const.GAME_START){
            this.gameStart();
        }else if(this.status==Const.GAME_PASS){
            this.gamePass();
        }else if(this.status==Const.GAME_OVER){
            this.gameOver();
        }
    }
});

var AppScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MyLayer();
        this.addChild(layer);
        layer.init();
    }
});
