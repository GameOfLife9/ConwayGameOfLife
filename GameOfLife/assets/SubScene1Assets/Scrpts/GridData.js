const RAWS=15;
const COLUMNS=15;
//存放初始分布
var level1DataStart=[];
//注意v2.xy从0开始
level1DataStart[0]=cc.v2(5,5);
level1DataStart[1]=cc.v2(5,6);
level1DataStart[2]=cc.v2(5,7);

//存放通关需要的分布
var level1DataEnd=[];
level1DataEnd[0]=cc.v2(5,5);
level1DataEnd[1]=cc.v2(5,6);
level1DataEnd[2]=cc.v2(5,7);
level1DataEnd[2]=cc.v2(4,5);
level1DataEnd[2]=cc.v2(4,6);
level1DataEnd[2]=cc.v2(4,7);
level1DataEnd[2]=cc.v2(6,6);

exports.level1DataEnd=level1DataEnd;
exports.level1DataStart=level1DataStart;
