/**
 * Created by vinson on 2017/1/16.
 */
var trace=function(){
    cc.log(Array.prototype.join.call(arguments,","));
};
var winSize;
var UtilsManager={};
UtilsManager.init=function(){
    winSize=cc.director.getWinSize();
};
/**nodes中的可视对象锚点必须都是(0,0)*/
UtilsManager.setSeat=function(nodes,xNum,xDis,yDis,winSize){
    for(var i=0;i<nodes.length;i++) {
       var node=nodes[i];
        node.x=parseInt(i%xNum)*(xDis+node.width)+xDis;
        node.y=winSize.height-parseInt(i/xNum)*(yDis+node.height)-(node.height+yDis);
    }
};
