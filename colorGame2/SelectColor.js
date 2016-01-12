/**
 * Created by vinson on 2015/8/24.
 */
var MainSelectColorLayer = cc.LayerColor.extend({
    showTxt:null,
    size:null,
    status:0,
    data1:null,
    data2:null,
    init:function()
    {
        //初始化界面
        //0:点击开始界面 1:表示等待界面，2:表示在点击界面 3:结果界面 4:Too soon界面
        this.flag = 0;
        this._super();
        this.size = cc.director.getWinSize();
        this.setColor(CColor.blue);

        this.showTxt=new cc.LabelTTF.create("点击开始","",30);
        //this.showTxt.setTextColor(CColor.black);
        this.addChild(this.showTxt);
        this.showTxt.x=(this.size.width)>>1;
        this.showTxt.y=(this.size.height)>>1;

        this.addTouchEventListener();
        this.status=1;
        //this.showToStart();

        //可触摸
       // this.setTouchEnabled(true);

    },
    addTouchEventListener:function(){
        var self=this;
        var touchListener=cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                //trace("status="+self.status);
                switch(self.status) {
                    case 0:
                        self.initGame();
                        break;
                    case 1:
                        self.startGame();
                        break;
                    case 2:
                        self.overGame();
                        break;
                    case 3:
                        self.passGame();
                        break;
                }
            }
        });
        cc.eventManager.addListener(touchListener,this);
    },
    initGame:function(){
        this.status=1;
        this.setColor(CColor.blue);
        this.showTxt.setString("点击开始");
    },
    startGame:function(){
        this.status=2;
        this.setColor(CColor.pink);
        this.showTxt.setString("等待变绿色后再点");
        var randomTime = Math.floor(Math.random()*4)+3;
        this.scheduleOnce(this.startClick,randomTime);
    },
    startClick:function(){
        this.status=3;
        this.setColor(CColor.green);
        this.showTxt.setString("快点击");
        this.data1=new Date();
    },
    overGame:function(){
        this.status=1;
        this.setColor(CColor.red);
        this.showTxt.setString("点太快了");
        this.unschedule(this.startClick)
    },
    passGame:function(){
        this.status=1;
        this.data2=new Date();
        var time=this.data2.getTime()-this.data1.getTime();
        this.showTxt.setString("你的反应速度是"+time+"毫秒");

    }
});

///////////////////////////////////////////////////  
var MainSelectColorScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new MainSelectColorLayer();
        layer.init()
        this.addChild(layer);
    }
});

var CColor={};
CColor.white=cc.color(255,255,255,255);//白色
CColor.black=cc.color(0,0,0,255);//黑色
CColor.red=cc.color(255,0,0,255);//红色
CColor.green=cc.color(0,255,0,255);//绿色
CColor.blue=cc.color(0,0,255,255);//蓝色
CColor.yellow=cc.color(255,255,0,255);//黄色
CColor.pink=cc.color(255,170,255,255);//粉色