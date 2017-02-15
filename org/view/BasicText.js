/**
 * Created by vinson on 2017/1/16.
 */
var BasicText = cc.Sprite.extend({
    text:null,
    size:30,
    textColor:null,
    ctor:function (content,size,color) {
        this._super();

        if(size==null)  this.size=30;
        else            this.size=size;

        if(color==null) this.textColor=cc.color(255,255,255);
        else            this.textColor=color;

        this.createText(content);
        this.setPoint(0,0);
    },
    /**锚点必须设置(0,0)，否则鼠标事件不准确*/
    setPoint:function(x,y){
        //设置锚点/左下(0,0)/左上(0,1)/居中(0.5,0.5)
        this.setAnchorPoint(cc.p(x,y));
        this.text.setAnchorPoint(cc.p(x,y));
    },
    createText:function(content){
        var node=new cc.LabelTTF(content,"arial",this.size);
        node.setColor(this.textColor);
        this.text=node;
        this.addChild(node);
        return node;
    },
    setString:function(content){
        this.text.setString(content);
    },
    getString:function(){
        return this.text.getString();
    }
});