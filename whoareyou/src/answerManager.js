/**
 * Created by ywx on 2016/5/15.
 */
var AnswerManager = cc.Layer.extend({
    nodes:[],
    total:0,
    wodi:0,
    ctor:function (total) {
        this._super();
        this.total=total;
        this.init();
    },
    init:function(){
        this.nodes.length=0;
        for(var i=0;i<this.total;i++) {
            var node = new AnswerNode(parseInt(i+1));
            node.setSeat(winSize.height-(i+1)*(node.height+10));
            node.addChild(this);
            this.nodes.push(node);
        }
       // UtilsManager.setSeat(this.nodes,1,0,10,winSize);
        EventManager.addEventListener(EventManager.CLICK,this.onClick.bind(this));
        this.createBtn();
        this.initTitle();
    },
    createBtn:function(){
        var node=new BasicButton("#c2.png","下一题");
        node.x=(winSize.width-node.width)>>1;
        node.y=20;
        node.type="nextTitle"
        this.addChild(node);
        node.addEventListener("nextTitle",this.nextTitle.bind(this));
    },
    nextTitle:function(target){
        DataManager.level++;
        this.initTitle();
        if(DataManager.level==DataManager.data.length-1){
            target.setVisible(false);
        }
    },
    initTitle:function(){
        DataManager.state=0;
        DataManager.index=0;
        this.wodi=parseInt(Math.random()*this.total)+1;
        var datas=DataManager.data[DataManager.level];
        for(var i=0;i<this.total;i++) {
            var node = this.nodes[i];
            node.replay();
            if(node.button.data==this.wodi)     node.content=datas[0];
            else                                node.content=datas[1];
        }
        this.nodes[ DataManager.index].button.setVisible(true);
    },
    onClick:function(target){
        for(var i=0;i<this.nodes.length;i++){
            var node=this.nodes[i];
            if(node.data==target.data){
                node.show();
                break;
            }
        }
        if(target.clickNum==2){//查看
            this.nodes[DataManager.index++].button.setVisible(false);
            if(DataManager.index<this.total) {
                this.nodes[DataManager.index].button.setVisible(true);
            }else{
                this.startTalk()
            }
        }else if(target.clickNum==3){//判断
            target.setVisible(false);
            node.showID(node.data==this.wodi);
        }
    },
    startTalk:function(){
        DataManager.state=1;
        for(var i=0;i<this.total;i++) {
            var node = this.nodes[i];
            node.button.setVisible(true);
        }
    }
});
function AnswerNode(num){
    var o=new Object;
    o.background=null;
    o.button=null;
    o.text=null;
    o.whoText=null;
    o.content="iamhere";
    o.nodes=[];
    o.data=num;
    o.o="打开查看后关闭";
    o.init=function(){
        o.createBg();
        o.createText(num);
        o.createBtn(num);
        o.createWhoText();
    }
    o.createBg=function(){
        var node=new cc.Sprite("#line.jpg");
        o.nodes.push(node);
        node.setAnchorPoint(cc.p(0,0));
        o.background=node;
        o.width=node.width;
        o.height=node.height;
    };
    o.createText=function(num){
        var node=new BasicText(num,60);
        node.x=35;
        node.y=15;
        o.nodes.push(node);
        o.text=node;
    };
    o.createWhoText=function(){
        var node=new BasicText(o.o,50);
        node.x=130;
        node.y=15;
        o.nodes.push(node);
        o.whoText=node;
    };
    o.createBtn=function(num){
        var node=new BasicButton("#c1.png","查看");
        node.data=num;
        node.clickNum=0;
        node.x=winSize.width-node.width-10;
        node.y=20;
        o.nodes.push(node);
        o.button=node;
        node.addEventListener(EventManager.CLICK,this.onClick.bind(this));
    };
    o.onClick=function(target){
        target.clickNum++;
        EventManager.dispatchEvent(EventManager.CLICK,target);
    };
    o.setSeat=function(y){
        for(var i=0;i< o.nodes.length;i++){
            o.nodes[i].y+=y;
        }
    };
    o.show=function(){
        if(o.whoText.getString()==o.o){
            o.whoText.setString(o.content);
            o.button.setString("关闭");
        }else{
            o.whoText.setString(o.o);
            o.button.setString("查看");
        }
    }
    o.replay=function(){
        o.whoText.setString(o.o);
        o.button.setVisible(false);
        o.button.clickNum=0;
    }
    o.showID=function(isWodi){
        if(isWodi==true){
            o.whoText.setString("卧底找到");
        }else{
            o.whoText.setString("冤枉死掉");
        }
    }
    o.addChild=function(layer){
        for(var i=0;i< o.nodes.length;i++){
            layer.addChild(o.nodes[i]);
        }
    };
    o.init();
    return o;
}