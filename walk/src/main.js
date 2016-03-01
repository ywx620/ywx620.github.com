/**
 * Created by vinson on 2016/2/18.
 */
var trace=function(){
    cc.log(Array.prototype.join.call(arguments,","));
};
var MainLayer = cc.Layer.extend({
    txt:null,
    content:null,
    count:0,
    isPress:false,
    isUpdate:false,
    isRotation:false,
    isMove:false,
    isNext:false,
    isMoveBox:false,
    isLose:false,
    control:null,
    ui:null,
    qiao:null,
    boxs:[],
    man:null,
    length:0,
    min:0,
    max:0,
    score:0,
    onEnter:function () {
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.assetPlist,res.assetPng);
        this.createControl();
        this.createUI();
        this.scheduleUpdate();
    },
    createControl:function(){
        var node=new ControlLayer(this);
        this.addChild(node);
        this.control=node;
    },
    createUI:function(){
        var ui=new GameUI();
        this.ui=ui;
        this.addChild(ui);
        this.initGame();
    },
    initGame:function(){
        var ui=this.ui;
        for(var i=0;i<this.boxs.length;i++) {
            ui.removeChild(this.boxs[i]);
        }
        this.boxs.length=0;
        ui.removeChild(this.man);
        ui.removeChild(this.qiao);
        for(var i=0;i<2;i++) {
            var node = ui.createBox();
            node.scaleX=1;
            node.scaleY=2;
            this.boxs.push(node);
            if(i==1){
                node.x=i*120+Math.random()*300;
                node.scaleX=0.2+Math.random()*2;
                this.min=node.x;
                this.max=this.min+node.width*node.scaleX;
            }
        }

        node=ui.createBox();
        this.qiao=node;

        this.score=0;
        this.ui.updateScore(this.score);

        this.createMan();
        this.initData();
    },
    initData:function(){
        var node=this.qiao;
        node.scaleY=0.1;
        node.setRotation(0);
        var startNode=this.boxs[0];
        node.x=startNode.width*startNode.scaleX-10;
        node.y=200;

        var endNode=this.boxs[1];
        this.min=endNode.x-40;
        this.max=this.min+endNode.width*endNode.scaleX;
        this.isPress=true;
    },
    createMan:function(){
        var node=this.ui.createMan();
        node.y=200;
        node.x=60;
        this.man=node;
    },
    createNextBox:function(){
        var size=cc.director.getWinSize();
        var node = this.ui.createBox();
        node.x=size.width;
        node.scaleX=0.3+Math.random()*2;
        node.scaleY=2;
        var middleNode=this.boxs[1];
        this.min=middleNode.width*middleNode.scaleX+120+Math.random()*300;
        this.max=this.min+node.width*node.scaleX;
        this.boxs.push(node);
    },
    update:function(){
        var qiao=this.qiao;
        var man=this.man;
        var min=this.min;
        var max=this.max;
        var boxs=this.boxs;
        var speed=5;
        var size=cc.director.getWinSize();
        if(this.isUpdate) {
            this.isPress=false;
            qiao.scaleY += 0.1;
            this.length=(qiao.scaleY*qiao.height);
        }else if(this.isRotation) {
            var rotation = qiao.getRotation() + 10;
            qiao.setRotation(rotation);
            if(rotation>=90){
                qiao.setRotation(90);
                this.isRotation=false;
                this.isMove=true;
            }
        }else if(this.isMove){
            man.x+=speed;
            var startNode=this.boxs[0];
            var len=this.length+startNode.width*startNode.scaleX-30;
            this.score++;
            this.ui.updateScore(this.score);
            if(man.x>=len){
                this.isMove=false;
                trace(len,man.x,min,max);
                if(man.x>=min&&man.x<=max){
                    this.isNext=true;
                }else{
                    this.isLose=true;
                }
            }
            if(man.x>=size.width){
                this.isMove=false;
                this.isLose=true;
            }
        }else if(this.isNext){
            man.x+=speed;
            len=this.max-40;
            this.score++;
            this.ui.updateScore(this.score);
            if(man.x>=len){
                max.x=len;
                this.createNextBox();
                this.isNext=false;
                this.isMoveBox=true;
            }

        }else if(this.isMoveBox){
            man.x-=speed;
            qiao.x-=speed;
            var middleNode=boxs[1];
            var endNode=boxs[2];
            for(var i=0;i<boxs.length;i++){
                if(i==2){
                    if(endNode.x>min) {
                        endNode.x -= speed * 2;
                    }else{
                        endNode.x=min;
                    }
                }else {
                    boxs[i].x -= speed;
                }
            }
            if(middleNode.x<=0){
                middleNode.x=0;
                this.isMoveBox=false;
                boxs.splice(0,1);
                this.initData();
            }
        }else if(this.isLose){
            man.y-=speed*2;
            if(man.y<0){
                document.title="我在英雄向前冲中走了"+this.score+"步，等你来挑起。";
                this.isLose=false;
                this.initGame();
            }
        }
    }
});
