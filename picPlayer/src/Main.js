/**
 * Created by vinson on 2017/4/5.
 */
var MainLayer = cc.Layer.extend({
    index:0,
    pic:null,
    pic2:null,
    ctor:function () {
        this._super();
        //播放声音
        cc.audioEngine.playMusic(res.sound);
        this.nextPic();
        this.scheduleUpdate();
    },
    nextPic:function(){
        this.index++;
        var size = cc.director.getWinSize();
        var cx=size.width>>1;
        var cy=size.height>>1;
        var label = new cc.Sprite(res["p"+this.index]);
        label.setOpacity(0);
        //label.setScale(0.5);
        //label.setRotation(90);
        //label.x=cx;
        label.x=-1*cx;
        label.y=cy;
        this.addChild(label);
        var tween = new TWEEN.Tween(label);
        tween.to({x:cx,y:cy,opacity:255,scaleX:1,scaleY:1,rotation:0},3500);
        tween.start();
        var my=this;
        tween.onComplete(function (){my.delay()});
        tween.easing(TWEEN.Easing.Back.InOut);
        this.pic=label;
    },
    hidePic:function(){
        var label=this.pic;
        var tween = new TWEEN.Tween(label);
        var size = cc.director.getWinSize();
        var cx=size.width>>1;
        var cy=size.height>>1;
        tween.to({x:cx,y:cy,opacity:0,scaleX:1,scaleY:1,rotation:0},2000);
        tween.start();
        var my=this;
        tween.onComplete(function (){my.removeChild(label);});
        //tween.easing(TWEEN.Easing.Back.Out);
    },
    delay:function(){
      this.scheduleOnce(this.hidePic,2);
      this.scheduleOnce(this.nextPic,2);
    },
    update:function() {
        TWEEN.update();
    }
});