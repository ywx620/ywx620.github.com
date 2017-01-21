var TitleManager = cc.Layer.extend({
    nodes:[],
    size:null,
    ctor:function () {
        this._super();
        this.init();
    },
    init:function(){
        this.nodes.length=0;
        for(var i=0;i<6;i++) {
            var j=i+1;
            var k=i+3;
            var node = new BasicButton("#btn.jpg",k+"人游戏");
            node.data=k;
            node.addEventListener(EventManager.CLICK,this.onClick.bind(this));
            this.addChild(node);
            this.nodes.push(node);
        }
        UtilsManager.setSeat(this.nodes,3,10,10,winSize);
        //EventManager.addEventListener(EventManager.CLICK,this.onClick.bind(this));
    },
    onClick:function(target){
        //trace(target.data);
        EventManager.dispatchEvent(EventManager.START,target.data);
    }
});