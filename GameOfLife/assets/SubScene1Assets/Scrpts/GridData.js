//存储关卡数据

const RAWS=15;
const COLUMNS=15;
var levelsStart=[];
var levelsEnd=[];
//存放初始分布
var level1DataStart=[];
//注意v2.xy从0开始
level1DataStart[0]=cc.v2(5,5);
level1DataStart[1]=cc.v2(5,6);
level1DataStart[2]=cc.v2(5,7);

levelsStart[0]=level1DataStart;
//存放通关需要的分布
var level1DataEnd=[];
level1DataEnd[0]=cc.v2(5,5);
level1DataEnd[1]=cc.v2(5,6);
level1DataEnd[2]=cc.v2(5,7);
level1DataEnd[3]=cc.v2(4,5);
level1DataEnd[4]=cc.v2(4,6);
level1DataEnd[5]=cc.v2(4,7);
level1DataEnd[6]=cc.v2(6,6);

levelsEnd[0]=level1DataEnd;


var level2DataStart=[];
//注意v2.xy从0开始
level2DataStart[0]=cc.v2(5,5);
level2DataStart[1]=cc.v2(6,5);


levelsStart[1]=level2DataStart;
//存放通关需要的分布
var level2DataEnd=[];
level2DataEnd[0]=cc.v2(6,4);
level2DataEnd[1]=cc.v2(6,5);
level2DataEnd[2]=cc.v2(6,6);

levelsEnd[1]=level2DataEnd;

exports.levelsEnd=levelsEnd;
exports.levelsStart=levelsStart;
