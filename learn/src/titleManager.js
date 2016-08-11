var TitleManager = cc.Layer.extend({
    answer:null,
    bg:null,
    txt:null,
    arrs:["#title1.png","#title2.png","#title3.png","#title4.png"],
    ctor: function () {
        this._super();
    },
    createBg:function(){
        if(this.bg!=null){
            this.removeChild(this.bg);
            this.bg=null;
        }
        var n=Math.floor(Math.random()*4);
        var node=new cc.Sprite(this.arrs[n]);
        node.setAnchorPoint(cc.p(0,0));
        this.bg=node;
        this.addChild(node);
    },
    createText:function(content){
        if(this.txt!=null){
            this.removeChild(this.txt);
            this.txt=null;
        }
        var node=new cc.LabelTTF(content,"arial",30);
        node.x=90; node.y=23;
        node.color="#000000";
        this.txt=node;
        this.addChild(node);
    },
    updateTitle:function(content,a){
        this.answer=a;
        this.createBg();
        this.createText(content);
    }
});