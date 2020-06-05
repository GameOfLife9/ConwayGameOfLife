//存储关卡数据
//这里的关卡以左下角为起点
const RAWS=15;
const COLUMNS=15;
//存放初始细胞分布数组的数组，注意区分levelsStart数组和level1DataStart的区别，前者是数组的数组，后者是数组
var levelsStart=[];

//存放目标细胞分布数组的数组，注意区分levelsEnd数组和level1DataEnd的区别，前者是数组的数组，后者是数组
var levelsEnd=[];

//存放每关可用的细胞数目，注意点同上
var availableCell=[];
//存放每关 目标细胞分布是初始细胞分布需繁衍几代，注意点同上
var stepUse=[];

/////////////////////////////////////////////////////////////////////////////////关卡1
//存放关卡1（注意关卡1的索引为0）初始分布
var level1DataStart=[];
//注意v2.xy从0开始
level1DataStart[0]=cc.v2(5,5);
level1DataStart[1]=cc.v2(5,6);
level1DataStart[2]=cc.v2(5,7);

//关卡1的索引为0
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

//levelsEnd[0]
levelsEnd[0]=level1DataEnd;

//本关可放置一个细胞，目标分布是初始细胞繁衍1代后的分布
availableCell[0]=1;
stepUse[0]=1;
/////////////////////////////////////////////////////////////////////////////////关卡2（索引为1）同关卡1
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