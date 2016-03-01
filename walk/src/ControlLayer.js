/**
 * Created by vinson on 2015/10/14.
 */
var ControlLayer=cc.Layer.extend({
    gameLayer: null,
    pBegan:{},
    pEnded:{},
    ctor: function (gameLayer) {
        this._super();
        this.gameLayer=gameLayer;
        this.addEvent();
    },
    addEvent:function(){
        cc.eventManager.addListener({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan:this.onTouchBegan.bind(this),
            onTouchEnded:this.onTouchEnded.bind(this)
        },this);
    },
    onTouchBegan:function(touch, event) {
        if(this.gameLayer.isPress==true) {
            this.gameLayer.isUpdate = true;
        }
        return true;
    },
    onTouchEnded:function(touch, event) {
        if(this.gameLayer.isPress==false) {
            this.gameLayer.isUpdate = false;
            this.gameLayer.isRotation = true;
        }
        return true;
    }
});