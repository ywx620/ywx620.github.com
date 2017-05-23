/**
 * Created by vinson on 2017/5/8.
 */
var Unify={};
//设置场景全屏居中
Unify.setStage=function(){
		LGlobal.align = LStageAlign.BOTTOM_MIDDLE;
    LGlobal.stageScale=LStageScaleMode.SHOW_ALL;
    LSystem.screen(LStage.FULL_SCREEN);
    LGlobal.setDebug(true);
};
//设置场景背景颜色
Unify.backgroundColor=function(value){
    LGlobal.backgroundColor=value;
};
//把数组随机打乱得到新数组
Unify.getRandomArrayByArray=function(value) {
    var temps=value;
    var array=new Array;
    for (var i = 0, len= temps.length; i < len; i++) {
        var j= Math.floor(Math.random() * temps.length);
        array[i] = temps[j];
        temps.splice(j, 1);
    };
    return array;
};
//创建按钮
Unify.createButton=function (bitmap1,bitmap2,bitmap3){
    var btn= new LButton(bitmap1,bitmap2,bitmap3);
    btn.addLabel=function(value){
        btn.label=value;
        btn.addChild(value);
        value.x=(bitmap1.width-value.width)>>1;
        value.y=(bitmap1.height-value.height)>>1;
    };
    return btn;
};
//创建矢量色块
Unify.createBitmap=function (c,x,y,w,h){
    var bitmapdata = new LBitmapData(c,0,0,w,h);
    var bitmap = new LBitmap(bitmapdata);
    x=x||0;y=y||0;
    bitmap.x=x;bitmap.y=y;
    bitmap.width=w;bitmap.height=h;
    return bitmap;
};
//创建文本框
Unify.createText=function (size,color,value,x,y){
    text = new LTextField();
    size=size||30;color=color||"#ffffff";value=value||"测试";
    x=x||0;y=y||0;
    text.size = size;
    text.color = color;
    text.text = value;
    text.x=x;text.y=y;
    return text;
};
//设置正确错误声音
Unify.setRightWrongSound=function(value){
    Unify.soundRight = new LSound();
    Unify.soundRight.load(value["pass"]);
    Unify.soundWrong = new LSound();
    Unify.soundWrong.load(value["warn"]);
};
Unify.playSoundRight=function(){
    Unify.soundRight.play();
};
Unify.playSoundWrong=function(){
    Unify.soundWrong.play();
};
Unify.closeSoundRight=function(){
    Unify.soundRight.close();
};
Unify.closeSoundWrong=function(){
    Unify.soundWrong.close();
};
//自动设置位置 value数组,x/y起启位置,xNum横向个数,xDis/yDis横向纵向间隔
Unify.autoPosition=function(value,x,y,xNum,xDis,yDis){
    for(var i=0;i<value.length;i++){
        var node=value[i];
        node.x=x+parseInt(i%xNum)*xDis;
        node.y=y+parseInt(i/xNum)*yDis;
    }
};
//显示FPS
Unify.showFPS=function(){
    var fps=new FPS();
    addChild(fps);
};
Unify.createLine=function(y,c){
    y=y||0;c=c||"#000000";
    addChild(Unify.createBitmap(c,0,y,LGlobal.width,2));
};
