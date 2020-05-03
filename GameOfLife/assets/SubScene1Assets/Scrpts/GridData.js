//存储关卡数据
//这里的关卡以左下角为起点
const RAWS=15;
const COLUMNS=15;
var levelsStart=[];
var levelsEnd=[];

//存放每关可用的细胞数目，此功能后续完善，先写上
var availableCell=[];
//存放每关需要进行繁殖的代数，未完善
var stepUse=[];
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
availableCell[0]=1;
stepUse[0]=1;

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
availableCell[1]=1;
stepUse[1]=1;

exports.levelsEnd=levelsEnd;
exports.levelsStart=levelsStart;
exports.availableCell=availableCell;
exports.stepUse=stepUse;