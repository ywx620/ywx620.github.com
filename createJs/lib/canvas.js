var canvasManager={};
canvasManager.setCenter=function(canvas){
	//这个方法是用来设置画布居中的
	var w=document.body.clientWidth;//获取浏览器可视区域的宽
	var h=document.body.clientHeight;//获取浏览器可视区域的高
	var scale=Math.min(w/canvas.width,h/canvas.height);//等比缩放并居中显示
	canvas.style.position="absolute";//canvas用绝对定位
	canvas.style.width=canvas.width*scale+"px";
	canvas.style.height=canvas.height*scale+"px";
	canvas.style.left=(w-parseInt(canvas.style.width))*0.5+"px";
	canvas.style.top=(h-parseInt(canvas.style.height))*0.5+"px";
}
canvasManager.setColor=function(canvas,color){
	//这个方法是用来设置画布背景颜色
	canvas.style="background:"+color;
}
canvasManager.setWindowColor=function(color){
	//这个方法是用来设置浏览器背景颜色
	document.body.style="background:"+color;
}