/**
 * Created by vinson on 2016/1/25.
 */
var BasicEvent = cc.Sprite.extend({
    eventList:Object,
    addEventListener:function(name,callback,weakReference){
        if(this.eventList==null)  this.eventList = [];
        if(name == null || name == "" || callback == null )  return;
        this.eventList[name] = callback;
        this.eventList[name].weak = weakReference;
    },
    dispatchEvent:function(name,data){
        var func = this.eventList[name];
        if(name == null ||  func == null) return;
        if(data == null) func();
        else func(data);
        if( func.weak == true ) {
            func.weak = false;
            removethis.eventListener(name);
        }
    },
    removeEventListener:function(name){
        if(name == null || name == "" || this.eventList == null) return;
        var func = this.eventList[name];
        if(func != null ) {
            delete this.eventList[name];
        }
    },
    removeAllEventListener:function(){
        if(null == this.eventList) return;
        for(var i in this.eventList){
            delete i;
        }
       this.eventList = null;
    }
});