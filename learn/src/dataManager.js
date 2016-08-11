var DataManager = ({
    title:null,
    answer:null,
    answers: [],
    speed:1,
    level:0,
    score:0,
    blood:0,
    maxBlood:10,
    ctor: function () {
        this._super();
    },
    updateTitle:function(){
        var n1=Math.ceil(Math.random()*9);
        var n2=Math.ceil(Math.random()*9);
        var a=n1*n2;
        if(Math.random()<0.5){
            this.title=n1+"x"+n2+"=";
            this.answer=a;
            this.answers=[a-1,a,a+1,a+2];
        }else {
            this.title=a+"/"+n1+"=";
            this.answer=n2;
            this.answers=[n2-1,n2,n2+1,n2+2];
        }
        this.answers.sort(this.randomsort);
        //trace(this.title,this.answer,this.answers);
    },
    //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
    randomsort:function(a, b) {
        return Math.random()>.5 ? -1 : 1;
    }
});