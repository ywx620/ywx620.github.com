var res={sound:"res/sound.mp3"};
for(var i=1;i<=29;i++){
    res["p"+i]="res/"+i+".jpg";
}
var g_resources = [];
for(var i in res){
    g_resources.push(res[i]);
}