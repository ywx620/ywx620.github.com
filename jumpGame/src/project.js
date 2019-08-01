__require=function t(e,c,n){function o(s,a){if(!c[s]){if(!e[s]){var r=s.split("/");if(r=r[r.length-1],!e[r]){var h="function"==typeof __require&&__require;if(!a&&h)return h(r,!0);if(i)return i(r,!0);throw new Error("Cannot find module '"+s+"'")}}var d=c[s]={exports:{}};e[s][0].call(d.exports,function(t){return o(e[s][1][t]||t)},d,d.exports,t,e,c,n)}return c[s].exports}for(var i="function"==typeof __require&&__require,s=0;s<n.length;s++)o(n[s]);return o}({ItemList:[function(t,e,c){"use strict";cc._RF.push(e,"f6638OXrNNEtby0KiJRWj4/","ItemList");var n=cc.Class({name:"Item",properties:{id:0,itemName:"",itemPrice:0,iconSF:cc.SpriteFrame}});cc.Class({extends:cc.Component,properties:{items:{default:[],type:n}}}),cc._RF.pop()},{}],Menu:[function(t,e,c){"use strict";cc._RF.push(e,"1046faBO/1NyoJvlTk7MXM2","Menu"),cc.Class({extends:cc.Component,properties:{menu:cc.Node,BtnMenu:cc.Prefab},start:function(){cc.log(Global.backNode);for(var t=["\u627e\u6570\u5b57","\u72ec\u6728\u6865","\u627e\u8272\u5757"],e=0;e<t.length;e++){var c=t[e],n=cc.instantiate(this.BtnMenu);n.name=""+e,this.menu.addChild(n),n.x=n.y=0,cc.log(n.x,n.y),n.getChildByName("Label").getComponent(cc.Label).string=c,n.on(cc.Node.EventType.TOUCH_START,this.onClick,this)}},onClick:function(t){var e=t.target;switch(cc.log(e.name),e.name){case"0":cc.director.loadScene("scoreTime");break;case"1":case"2":cc.director.loadScene("main")}}}),cc._RF.pop()},{}],animation:[function(t,e,c){"use strict";cc._RF.push(e,"f863bBVe6tGnoRaz0JOHY4/","animation");var n=t("basic");cc.Class({extends:n,properties:{score:{default:0,displayName:"\u5206\u6570",tooltip:"\u7528\u4e8e\u663e\u793a\u73a9\u5bb6\u7684\u5206\u6570"},enemies:{default:[],type:[cc.Node]},aniNode:cc.Node,btnItem:cc.Prefab,anim:cc.Animation},start:function(){this.score=123456,cc.log(this.score),this.enemies.push("1123"),cc.log(this.enemies[0]);for(var t=["ani1","ani2","pause","resume","stop"],e=0;e<t.length;e++){var c=cc.instantiate(this.btnItem);this.setButtonLabel(c,t[e]),this.node.addChild(c),c.x=c.width*e-200,c.name=t[e]}this.anim=this.aniNode.getComponent(cc.Animation),this.anim.setCurrentTime(10),this.anim.play("ani1")},onClick:function(t){var e=t.currentTarget;switch(e.name){case"ani1":case"ani2":name=e.name,this.anim.play(name);break;case"pause":this.anim.pause(name);break;case"resume":this.anim.resume(name);break;case"stop":this.anim.stop(name)}}}),cc._RF.pop()},{basic:"basic"}],basic:[function(t,e,c){"use strict";cc._RF.push(e,"f91b0qsA6ZKzrXhcbVuPTIp","basic"),cc.Class({extends:cc.Component,setButtonLabel:function(t,e){t.getChildByName("Label").getComponent(cc.Label).string=e,t.on(cc.Node.EventType.TOUCH_START,this.onClick.bind(this))},onClick:function(t){}}),cc._RF.pop()},{}],click:[function(t,e,c){"use strict";cc._RF.push(e,"4ed01T+6w5JvpMjfBvFUPm5","click"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){cc.log(this.node),this.node.on(cc.Node.EventType.TOUCH_START,function(t){console.log("\u89e6\u6478\u5f00\u59cb")},this),this.node.on(cc.Node.EventType.TOUCH_MOVE,this.on_touch_move,this),this.node.on(cc.Node.EventType.TOUCH_ENDED,function(t){console.log("\u89e6\u6478\u5185\u7ed3\u675f")},this),this.node.on(cc.Node.EventType.TOUCH_CANCEL,function(t){console.log("\u89e6\u6478\u5916\u5f00\u59cb")},this)},on_touch_move:function(t){var e=t.getLocation();console.log(e,e.x,e.y);var c=t.getDelta();this.node.x+=c.x,this.node.y+=c.y}}),cc._RF.pop()},{}],color:[function(t,e,c){"use strict";cc._RF.push(e,"75c1d7nNbNLu5bvA5E1vBCk","color"),cc.Class({extends:cc.Component,properties:{ColorItem:cc.Prefab,clicks:[]},start:function(){for(var t=Math.sqrt(9),e=0;e<9;e++){var c=cc.instantiate(this.ColorItem);c.x=e*c.width,c.x=Math.floor(e%t)*c.width,c.y=Math.floor(e/t)*c.height,c.name="item_"+e,this.node.addChild(c);var n=c.getChildByName("color"),o=255*Math.random(),i=255*Math.random(),s=255*Math.random();n.color=new cc.Color(o,i,s),c.on(cc.Node.EventType.TOUCH_START,this.onClick.bind(this))}},onClick:function(t){var e=t.target;if(this.clicks.push(e),2==this.clicks.length){var c=this.clicks[0],n={x:c.x,y:c.y};c.setLocalZOrder(8),e.setLocalZOrder(8);var o=cc.moveTo(1,cc.p(e.x,e.y));c.runAction(o),o=cc.moveTo(1,cc.p(n.x,n.y)),e.runAction(o),this.clicks.length=0}}}),cc._RF.pop()},{}],game:[function(t,e,c){"use strict";cc._RF.push(e,"5b4d0vHoadJUIDES5Wey2v0","game"),cc.Class({extends:cc.Component,properties:{player:cc.Node,starPrefab:cc.Prefab,score:cc.Label,ground:cc.Node,pickSound:cc.AudioClip,overSound:cc.AudioClip,hitDis:50,arrowLeft:cc.Node,arrowRight:cc.Node},onLoad:function(){this.scoreNum=0,this.arrowLeft.on(cc.Node.EventType.TOUCH_START,this.onKeyDown,this),this.arrowRight.on(cc.Node.EventType.TOUCH_START,this.onKeyDown,this),this.arrowLeft.on(cc.Node.EventType.TOUCH_END,this.onKeyUp,this),this.arrowRight.on(cc.Node.EventType.TOUCH_END,this.onKeyUp,this)},start:function(){this.addNewStar()},onDestroy:function(){this.node.stopAllActions(),this.arrowLeft.off(cc.Node.EventType.TOUCH_START,this.onKeyDown,this),this.arrowRight.off(cc.Node.EventType.TOUCH_START,this.onKeyDown,this),this.arrowLeft.off(cc.Node.EventType.TOUCH_END,this.onKeyUp,this),this.arrowRight.off(cc.Node.EventType.TOUCH_END,this.onKeyUp,this)},onKeyDown:function(t){switch(t.currentTarget){case this.arrowLeft:this.player.getComponent("player").speedX=-1;break;case this.arrowRight:this.player.getComponent("player").speedX=1}},onKeyUp:function(t){this.player.getComponent("player").speedX=0},addNewStar:function(){this.star=cc.instantiate(this.starPrefab),this.star.getComponent("star").game=this,this.node.addChild(this.star),this.star.setPosition(this.starPosition())},starPosition:function(){var t=(Math.random()-.5)*this.node.width/2,e=this.ground.y+this.ground.height/2+Math.random()*this.player.getComponent("player").jumpHeight+this.star.height;return cc.v2(t,e)},over:function(){cc.audioEngine.playEffect(this.overSound,!1),cc.director.loadScene("JumpGame")},update:function(t){var e=this.player.getPosition(),c=this.star.getPosition().sub(e).mag();this.hitDis>c&&(this.scoreNum++,this.score.string="Score:"+this.scoreNum,cc.audioEngine.playEffect(this.pickSound,!1),this.star.destroy(),this.addNewStar())}}),cc._RF.pop()},{}],global:[function(t,e,c){"use strict";cc._RF.push(e,"970876PJglB/rLzwGoSuzW/","global"),window.Global={backNode:{get:function(){return"ywx"}},backLabel:200},cc._RF.pop()},{}],help:[function(t,e,c){"use strict";cc._RF.push(e,"97573c/nKlF2Y5g4sUAqLdt","help"),cc.Class({extends:cc.Component,properties:{button:cc.Button},onLoad:function(){this.button.node.on("click",this.callback,this)},start:function(){},callback:function(t){cc.director.loadScene("main")}}),cc._RF.pop()},{}],main:[function(t,e,c){"use strict";cc._RF.push(e,"9264723wLdEL7Zds4znaWkE","main"),cc.Class({extends:cc.Component,properties:{label:{default:null,type:cc.Label},button:cc.Button,text:"hello,world0!",count:0},onLoad:function(){this.label.string=this.text,this.button.node.on("click",this.callback,this)},start:function(){},update:function(t){this.count++,this.label.string="\u6b21\u6570"+this.count},callback:function(t){this.count=0,cc.director.loadScene("help")}}),cc._RF.pop()},{}],node:[function(t,e,c){"use strict";cc._RF.push(e,"1414fnpHMNJ96+79ceYBVkD","node"),cc.Class({extends:cc.Component,properties:{},start:function(){},update:function(t){this.node.x++}}),cc._RF.pop()},{}],player:[function(t,e,c){"use strict";cc._RF.push(e,"5bf51/m/kBHK52i6UAHo40Y","player"),cc.Class({extends:cc.Component,properties:{time:.3,jumpHeight:100,isMove:!1,speedX:0,moveNum:0,moveMax:10,jumpSound:cc.AudioClip},onLoad:function(){cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this)},onDestroy:function(){this.node.stopAllActions(),cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this)},start:function(){this.node.runAction(this.playAnimation())},playAnimation:function(){var t=cc.moveBy(this.time,cc.v2(0,this.jumpHeight)),e=cc.moveBy(this.time,cc.v2(0,-this.jumpHeight)),c=cc.callFunc(this.playSoundJump,this);return cc.repeatForever(cc.sequence(t,e,c))},playSoundJump:function(){cc.audioEngine.playEffect(this.jumpSound,!1)},onKeyDown:function(t){switch(t.keyCode){case cc.KEY.a:this.speedX=-1;break;case cc.KEY.d:this.speedX=1}},onKeyUp:function(t){this.speedX=0},update:function(t){this.moveNum+=.1*this.speedX,Math.abs(this.moveNum)>this.moveMax&&(this.moveNum=this.moveMax*(this.moveNum/Math.abs(this.moveNum))),this.node.x+=this.moveNum}}),cc._RF.pop()},{}],rank:[function(t,e,c){"use strict";cc._RF.push(e,"32939lDXsRMZ7Es2BIIT2vr","rank"),cc.Class({extends:cc.Component,properties:{button:cc.Button,item:cc.Sprite,content:cc.Node,canvas:cc.Node},newItem:cc.Node,speed:Number,onLoad:function(){this.button.node.on("click",this.callback,this)},start:function(){for(var t=0;t<100;t++){var e=cc.instantiate(this.item.node);this.content.addChild(e.node)}cc.log("this.content.height="+this.content.height)},callback:function(t){cc.director.loadScene("main")},update:function(t){}}),cc._RF.pop()},{}],scoreTime:[function(t,e,c){"use strict";cc._RF.push(e,"7330dRfQVtKv68LjT3nHwWp","scoreTime"),cc.Class({extends:cc.Component,properties:{txtTime:cc.Label,txtScore:cc.Label,Item:cc.Prefab,container:cc.Node,count:0,time:0,score:0,index:1,nodeIndex:0,nodes:[]},start:function(){this.txtTime.string=0,this.txtScore.string=0,this.createItem()},createItem:function(){var t=cc.instantiate(this.Item);this.container.addChild(t),t.x=Math.random()*this.node.width,t.y=Math.random()*this.node.height;var e=t.getChildByName("count");this.nodeIndex++,e.getComponent(cc.Label).string=this.nodeIndex,t._name=this.nodeIndex,t.on(cc.Node.EventType.TOUCH_START,this.onClick,this),this.nodes.push(t)},onClick:function(t){var e=t.target;cc.log(e.name,this.index),e.name==this.index&&(this.index++,e.destroy(),this.nodeIndex<20&&(this.createItem(),this.nodes.length<10&&this.createItem()),this.nodes.splice(this.nodes.indexOf(e),1),this.txtScore.string=this.index)},update:function(t){this.count++,this.count>=60&&(this.count=0,this.time++,this.txtTime.string=this.time)}}),cc._RF.pop()},{}],star:[function(t,e,c){"use strict";cc._RF.push(e,"4a1af+FZNdJxJcjkK0gJGZW","star"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){},start:function(){},update:function(t){this.node.opacity--,0==this.node.opacity&&(this.game.over(),this.node.destroy())}}),cc._RF.pop()},{}]},{},["game","player","star","ItemList","Menu","animation","basic","click","color","global","help","main","node","rank","scoreTime"]);