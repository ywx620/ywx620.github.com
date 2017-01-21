/**
 * Created by vinson on 2016/1/25.
 */
var BasicButton = BasicEvent.extend({
    btnSkin:String,
    btnText:String,
    textColor:null,
    text:null,
    data:Object,
    type:null,
    /**按钮皮肤，按钮上面的文字，按钮上文字的颜色*/
    ctor:function (skin,text,color) {
        this._super();
        this.btnSkin=skin;
        this.btnText=text;
        if(color==null){
            this.textColor=cc.color(255,255,255);
        }else{
            this.textColor=color;
        }
        this.createButton();
        this.addEvent();
        this.setPoint(0,0);
    },
    /**如果作为按钮使用，锚点必须设置(0,0)，否则鼠标事件不准确*/
    setPoint:function(x,y){
        //设置锚点/左下(0,0)/左上(0,1)/居中(0.5,0.5)
        this.setAnchorPoint(cc.p(x,y));
    },
    createButton:function(){
        var node=new cc.Sprite(this.btnSkin);
        node.setAnchorPoint(cc.p(0,0));
        this.width=node.width;
        this.height=node.height;
        this.addChild(node);
        this.createText(this.btnText);
    },
    createText:function(content){
        var node=new cc.LabelTTF(content,"arial",30);
        node.x=this.width/2; node.y=this.height/2;
        node.setColor(this.textColor);
        this.text=node;
        this.addChild(node);
        return node;
    },
    setString:function(content){
        this.text.setString(content);
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
            if(this.type==null)    this.dispatchEvent(EventManager.CLICK,target);
            else                   this.dispatchEvent(this.type,target);
            return true;
        }
        return false;
    }
});