var Layout={};
/**转为正数*/
int=function(num){
	return parseInt(num)
}
/**
 * 可视对象排列
 * xNum在x轴上排列的数量
 * xDis,yDis,在x轴与y轴上的间距
 * x,y初始位置
 * sign:正1从左向右从上向下排当sign为负1时则反过来,,*/
Layout.displayRank=function(array,xNum,xDis,yDis,x,y,sign)
{
	var display;
	sign=sign||1;
	for(var i=0;i<array.length;i++){
		display=array[i];
		display.x=x+int(i%xNum)*(display.width+xDis)*sign;
		display.y=y+int(i/xNum)*(display.height+yDis)*sign;
	}
}
/**
 * 分部的可视对象排列
 * array:视对象数组
 * part1,part2：[len:int,xNum:int,xDis:Number,yDis:Number,x:Number,y:Number],参看方求displayRank的参数
 * sign:正1从左向右从上向下排当sign为负1时则反过来
 * part1[0]+part2[0]==array.length;//如果为false,会有问题
 * */
Layout.displayRankPart=function(array,part1,part2,sign)
{
	var len1,len2,xNum,xDis,yDis,x,y;
	var display;
	sign=sign||1;
	len1=part1[0];xNum=part1[1];xDis=part1[2];yDis=part1[3];x=part1[4];y=part1[5];
	var arr1=array.slice(0,len1);
	Layout.displayRank(arr1,xNum,xDis,yDis,x,y,sign);
	if(part2){
		len2=part2[0];xNum=part2[1];xDis=part2[2];yDis=part2[3];x=part2[4];y=part2[5];
		var arr2=array.slice(len1,len1+len2);
		Layout.displayRank(arr2,xNum,xDis,yDis,x,y,sign);
	}
}
/**
 * 按顺时针环绕圆形/扇形/椭圆形的排列布局
 * center中心位置
 * radius半径距离
 * loop环形排列为2*Math.PI,如果值是Math.PI/2是90度的扇形
 * skewR偏离的弧度（90度=Math.PI/2弧度）
 * skewX偏离的X轴位置
 * skewY偏离的Y轴位置
 * skewXR在X轴上半径增加的值（椭圆布局）
 * skewYR在Y轴上半径增加的值（椭圆布局）
 * */
Layout.displayCircle=function(array,centerX,centerY,radius,loop,skewR,skewX,skewY,skewXR,skewYR)
{
	loop=loop||2*Math.PI;skewR=skewR||0;skewX=skewX||0;skewY=skewY||0;skewXR=skewXR||0;skewYR=skewYR||0;
	var display;
	var count=array.length;
	var radian=loop/count
	if(loop<2*Math.PI){//如果是扇形的必须把个数减少一个再相除
		radian=loop/(count-1)
	}
	for(i=0;i<count;i++){
		display=array[i];
		display.x=centerX+Math.cos(radian*i-skewR)*(radius+skewXR)+skewX;
		display.y=centerY+Math.sin(radian*i-skewR)*(radius+skewYR)+skewY;
	}
}
/**
 * 按顺时针环绕多边形的排列布局
 * center中心位置
 * radius半径距离
 * size边数
 * skewR偏离的弧度（90度=Math.PI/2弧度）
 * */
Layout.displayPolygon=function(array,centerX,centerY,radius,size,skewR)
{
	radius=radius||100;size=size||5;skewR=skewR||0;
	if(size<3||size>array.length){
		trace("多边形的边数不正确");
		return;
	}
	var display;
	var count=array.length;
	var radian=2*Math.PI/size;//每个边的弧度
	var num=int(count/size);//每个边的个数
	for (var i=0;i<size;i++) {
		var x1=centerX + Math.cos(i*radian-skewR)*radius;
		var y1=centerY + Math.sin(i*radian-skewR)*radius;
		var j=i+1;
		j=j==size?0:j;
		var x2=centerX + Math.cos(j*radian-skewR)*radius;
		var y2=centerY + Math.sin(j*radian-skewR)*radius;
		for(var k=0;k<num;k++){
			var m=k+num*i;
			if(m<count){
				display=array[m];
				display.x=x1;
				display.y=y1;
				display.x+=(x2-x1)/num*k;
				display.y+=(y2-y1)/num*k;
			}
		}
	}
}
/**
 * 三角形排列布局
 * xDis,yDis,在x轴与y轴上的间距
 * x,y初始位置
 * sign:正1从左向右从上向下排当sign为负1时则反过来
 * isCenter是等腰三角形，为false时是直角三角形
 * */
Layout.displayTrigon=function(array,xDis,yDis,x,y,sign,isCenter)
{
	xDis=xDis||0,yDis=yDis||0,x=x||0,y=y||0,sign=sign||1;
	if(isCenter==null){
		isCenter=true
	}
	var display;
	var start=0;
	var len=1
	var index=1;
	var temps=array.slice(start,len);
	rank();
	function rank(){
		var cx=0;
		var tempLen=temps.length
		if(tempLen>1&&isCenter){
			cx=(tempLen-1)*(display.width+xDis)/-2*sign;
		}
		for(var i=0;i<tempLen;i++){
			display=temps[i];
			display.x=x+i*(display.width+xDis)*sign+cx;
			display.y=y+(index-1)*(display.height+yDis)*sign;
		}
		index++;
		start=len;
		len=start+index;
		temps=array.slice(start,len);
		if(len<=array.length+start){
			rank();
		}
	}
}
/**
 * 可视对象砖块（墙）排列
 * xNum在x轴上排列的数量
 * xDis,yDis,在x轴与y轴上的间距
 * x,y初始位置
 * offX:偏移的距离,*/
Layout.displayWall=function(array,xNum,xDis,yDis,x,y,offX)
{
	var display;
	for(var i=0;i<array.length;i++){
		var xx=Math.floor(i/xNum)%2==0?offX:0;
		display=array[i];
		display.x=x+int(i%xNum)*(display.width+xDis)+xx;
		display.y=y+int(i/xNum)*(display.height+yDis);
	}
}