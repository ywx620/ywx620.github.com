/**
 * Created by ywx on 2015/5/25.
 */
var EventManager = EventManager || {};

EventManager.eventList;

EventManager.addEventListener = function(name,callback,weakReference){

    if(null == EventManager.eventList)  EventManager.eventList = [];
    if(name == null || name == "" || callback == null )  return;

    EventManager.eventList[name] = callback;
    EventManager.eventList[name].weak = weakReference;
};

EventManager.dispatchEvent = function(name,data){
    var func = EventManager.eventList[name];

    if(name == null ||  func == null) return;
    if(data == null) func();
    else func(data);

    if( func.weak == true )
    {
        func.weak = false;
        EventManager.removeEventListener(name);
    }

};

EventManager.removeEventListener = function(name){

    if(name == null || name == "" || EventManager.eventList == null) return;

    var func = EventManager.eventList[name];
    if(func != null )
    {
        delete EventManager.eventList[name];
    }
};

EventManager.removeAllEventListener = function(){

    if(null == EventManager.eventList) return;

    for(var i in EventManager.eventList){
        delete i;
    }
    EventManager.eventList = null;
};