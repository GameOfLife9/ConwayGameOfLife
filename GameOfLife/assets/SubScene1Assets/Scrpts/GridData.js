//存储关卡数据
//这里的关卡以左下角为起点
const RAWS = 15;
const COLUMNS = 15;
//存放初始细胞分布数组的数组，注意区分levelsStart数组和level1DataStart的区别，前者是数组的数组，后者是数组
var levelsStart = [];

//存放目标细胞分布数组的数组，注意区分levelsEnd数组和level1DataEnd的区别，前者是数组的数组，后者是数组
var levelsEnd = [];

//存放每关可用的细胞数目，注意点同上
var availableCell = [];
//存放每关 目标细胞分布是初始细胞分布需繁衍几代，注意点同上
var stepUse = [];
var increa = [];


/////////////////////////////////////////////////////////////////////////////////关卡1新
var level1DataStart = [];
//注意v2.xy从0开始
level1DataStart[0] = cc.v2(6, 4);
level1DataStart[1] = cc.v2(6, 5);
level1DataStart[2] = cc.v2(6, 6);


levelsStart[0] = level1DataStart;
//存放通关需要的分布
var level1DataEnd = [];
level1DataEnd[0] = cc.v2(5, 4);
level1DataEnd[1] = cc.v2(5, 5);
level1DataEnd[2] = cc.v2(5, 6);
level1DataEnd[3] = cc.v2(6, 4);
level1DataEnd[4] = cc.v2(6, 5);
level1DataEnd[5] = cc.v2(6, 6);
level1DataEnd[6] = cc.v2(7, 5);


levelsEnd[0] = level1DataEnd;
availableCell[0] = 1;
stepUse[0] = 1;
increa[0] = true;

/////////////////////////////////////////////////////////////////////////////////关卡2

var level2DataStart = [];
//注意v2.xy从0开始
level2DataStart[0] = cc.v2(5, 7);
level2DataStart[1] = cc.v2(6, 8);
level2DataStart[2] = cc.v2(6, 6);
level2DataStart[3] = cc.v2(7, 9);
level2DataStart[4] = cc.v2(7, 7);
level2DataStart[5] = cc.v2(7, 5);
level2DataStart[6] = cc.v2(8, 8);
level2DataStart[7] = cc.v2(8, 6);
level2DataStart[8] = cc.v2(9, 7);

levelsStart[1] = level2DataStart;
//存放通关需要的分布
var level2DataEnd = [];
level2DataEnd[0] = cc.v2(5, 7);
level2DataEnd[1] = cc.v2(6, 8);
level2DataEnd[2] = cc.v2(6, 6);
level2DataEnd[3] = cc.v2(7, 9);
level2DataEnd[4] = cc.v2(7, 5);
level2DataEnd[5] = cc.v2(8, 8);
level2DataEnd[6] = cc.v2(8, 6);
level2DataEnd[7] = cc.v2(9, 7);

level2DataEnd[8] = cc.v2(6, 7);
level2DataEnd[9] = cc.v2(7, 8);
level2DataEnd[10] = cc.v2(7, 6);
level2DataEnd[11] = cc.v2(8, 7);



levelsEnd[1] = level2DataEnd;
availableCell[1] = 1;
stepUse[1] = 1;
increa[1] = false;

/////////////////////////////////////////////////////////////////////////////////关卡3
//存放关卡3（注意关卡2的索引为1）初始分布
var level3DataStart = [];
//注意v2.xy从0开始
level3DataStart[0] = cc.v2(6, 3);
level3DataStart[1] = cc.v2(6, 4);
level3DataStart[2] = cc.v2(6, 5);
level3DataStart[3] = cc.v2(7, 3);
level3DataStart[4] = cc.v2(7, 5);
level3DataStart[5] = cc.v2(8, 3);
level3DataStart[6] = cc.v2(8, 4);
level3DataStart[7] = cc.v2(8, 5);

//关卡3的索引为2
levelsStart[2] = level3DataStart;
//存放通关需要的分布
var level3DataEnd = [];
level3DataEnd[0] = cc.v2(5, 3);
level3DataEnd[1] = cc.v2(6, 2);
level3DataEnd[2] = cc.v2(6, 3);
level3DataEnd[3] = cc.v2(6, 5);
level3DataEnd[4] = cc.v2(6, 6);
level3DataEnd[5] = cc.v2(7, 2);
level3DataEnd[6] = cc.v2(7, 6);
level3DataEnd[7] = cc.v2(8, 3);
level3DataEnd[8] = cc.v2(8, 5);
level3DataEnd[9] = cc.v2(8, 6);
level3DataEnd[10] = cc.v2(9, 4);

//levelsEnd[2]
levelsEnd[2] = level3DataEnd;

//本关可放置一个细胞，目标分布是初始细胞繁衍1代后的分布
availableCell[2] = 2;
stepUse[2] = 1;
increa[2] = true;



/////////////////////////////////////////////////////////////////////////////////关卡4
var level4DataStart = [];
//注意v2.xy从0开始
level4DataStart[0] = cc.v2(4, 3);
level4DataStart[1] = cc.v2(5, 4);
level4DataStart[2] = cc.v2(6, 5);
level4DataStart[3] = cc.v2(7, 6);
level4DataStart[4] = cc.v2(8, 5);
level4DataStart[5] = cc.v2(9, 4);
level4DataStart[6] = cc.v2(10, 3);


levelsStart[3] = level4DataStart;
//存放通关需要的分布
var level4DataEnd = [];
level4DataEnd[0] = cc.v2(5, 3);
level4DataEnd[1] = cc.v2(5, 4);
level4DataEnd[2] = cc.v2(6, 3);
level4DataEnd[3] = cc.v2(6, 5);
level4DataEnd[4] = cc.v2(7, 3);
level4DataEnd[5] = cc.v2(7, 6);
level4DataEnd[6] = cc.v2(8, 3);
level4DataEnd[7] = cc.v2(8, 5);
level4DataEnd[8] = cc.v2(9, 3);
level4DataEnd[9] = cc.v2(9, 4);

levelsEnd[3] = level4DataEnd;
availableCell[3] = 3;
stepUse[3] = 1;
increa[3] = true;


/////////////////////////////////////////////////////////////////////////////////关卡5新    
var level5DataStart = [];
//注意v2.xy从0开始
level5DataStart[0] = cc.v2(4, 4);
level5DataStart[1] = cc.v2(4, 7);
level5DataStart[2] = cc.v2(4, 10);
level5DataStart[3] = cc.v2(5, 5);
level5DataStart[4] = cc.v2(5, 7);
level5DataStart[5] = cc.v2(5, 9);
level5DataStart[6] = cc.v2(6, 7);

level5DataStart[7] = cc.v2(7, 4);
level5DataStart[8] = cc.v2(7, 5);
level5DataStart[9] = cc.v2(7, 6);
level5DataStart[10] = cc.v2(7, 7);
level5DataStart[11] = cc.v2(7, 8);
level5DataStart[12] = cc.v2(7, 9);
level5DataStart[13] = cc.v2(7, 10);

level5DataStart[14] = cc.v2(10, 4);
level5DataStart[15] = cc.v2(10, 7);
level5DataStart[16] = cc.v2(10, 10);
level5DataStart[17] = cc.v2(9, 5);
level5DataStart[18] = cc.v2(9, 7);
level5DataStart[19] = cc.v2(9, 9);
level5DataStart[20] = cc.v2(8, 7);

//关卡5的索引为4
levelsStart[4] = level5DataStart;

//存放通关需要的分布
var level5DataEnd = [];
level5DataEnd[0] = cc.v2(5, 6);
level5DataEnd[1] = cc.v2(5, 8);
level5DataEnd[2] = cc.v2(6, 4);
level5DataEnd[3] = cc.v2(6, 7);
level5DataEnd[4] = cc.v2(6, 10);
level5DataEnd[5] = cc.v2(7, 5);
level5DataEnd[6] = cc.v2(7, 9);
level5DataEnd[7] = cc.v2(8, 4);
level5DataEnd[8] = cc.v2(8, 9);
level5DataEnd[9] = cc.v2(9, 7);
level5DataEnd[10] = cc.v2(9, 8);
level5DataEnd[11] = cc.v2(10, 6);

levelsEnd[4] = level5DataEnd;

//本关可删除一个细胞，目标分布是初始细胞繁衍1代后的分布
availableCell[4] = 2;
stepUse[4] = 1;
increa[4] = false;



/////////////////////////////////////////////////////////////////////////////////关卡6
var level6DataStart = [];
//注意v2.xy从0开始
level6DataStart[0] = cc.v2(6, 2);
level6DataStart[1] = cc.v2(6, 6);
level6DataStart[2] = cc.v2(7, 2);
level6DataStart[3] = cc.v2(7, 3);
level6DataStart[4] = cc.v2(7, 4);
level6DataStart[5] = cc.v2(7, 5);
level6DataStart[6] = cc.v2(7, 6);
level6DataStart[7] = cc.v2(8, 2);
level6DataStart[8] = cc.v2(8, 6);


levelsStart[5] = level6DataStart;
//存放通关需要的分布
var level6DataEnd = [];
level6DataEnd[0] = cc.v2(6, 1);
level6DataEnd[1] = cc.v2(6, 2);
level6DataEnd[2] = cc.v2(6, 6);
level6DataEnd[3] = cc.v2(6, 7);
level6DataEnd[4] = cc.v2(7, 1);
level6DataEnd[5] = cc.v2(7, 2);
level6DataEnd[6] = cc.v2(7, 6);
level6DataEnd[7] = cc.v2(7, 7);
level6DataEnd[8] = cc.v2(8, 1);
level6DataEnd[9] = cc.v2(8, 2);
level6DataEnd[10] = cc.v2(8, 3);
level6DataEnd[11] = cc.v2(8, 5);
level6DataEnd[12] = cc.v2(8, 6);
level6DataEnd[13] = cc.v2(8, 7);

levelsEnd[5] = level6DataEnd;
availableCell[5] = 1;
stepUse[5] = 2;
increa[5] = true;


/////////////////////////////////////////////////////////////////////////////////关卡7
var level7DataStart = [];
//注意v2.xy从0开始
level7DataStart[0] = cc.v2(4, 5);
level7DataStart[1] = cc.v2(4, 6);
level7DataStart[2] = cc.v2(5, 4);
level7DataStart[3] = cc.v2(5, 7);
level7DataStart[4] = cc.v2(6, 3);
level7DataStart[5] = cc.v2(6, 5);
level7DataStart[6] = cc.v2(6, 6);
level7DataStart[7] = cc.v2(6, 8);
level7DataStart[8] = cc.v2(7, 4);
level7DataStart[9] = cc.v2(7, 7);
level7DataStart[10] = cc.v2(8, 5);
level7DataStart[11] = cc.v2(8, 6);


levelsStart[6] = level7DataStart;
//存放通关需要的分布
var level7DataEnd = [];
level7DataEnd[0] = cc.v2(4, 5);
level7DataEnd[1] = cc.v2(4, 6);
level7DataEnd[2] = cc.v2(5, 4);
level7DataEnd[3] = cc.v2(5, 7);
level7DataEnd[4] = cc.v2(6, 3);
level7DataEnd[5] = cc.v2(6, 5);
level7DataEnd[6] = cc.v2(6, 6);
level7DataEnd[7] = cc.v2(6, 8);
level7DataEnd[8] = cc.v2(7, 3);
level7DataEnd[9] = cc.v2(7, 7);
level7DataEnd[10] = cc.v2(8, 4);
level7DataEnd[11] = cc.v2(8, 5);
level7DataEnd[12] = cc.v2(8, 6);
level7DataEnd[13] = cc.v2(9, 5);

levelsEnd[6] = level7DataEnd;
availableCell[6] = 1;
stepUse[6] = 2;
increa[6] = true;


/////////////////////////////////////////////////////////////////////////////////关卡8
var level8DataStart = [];
//注意v2.xy从0开始
level8DataStart[0] = cc.v2(5, 2);
level8DataStart[1] = cc.v2(5, 5);
level8DataStart[2] = cc.v2(5, 6);
level8DataStart[3] = cc.v2(6, 1);
level8DataStart[4] = cc.v2(6, 4);
level8DataStart[5] = cc.v2(6, 7);
level8DataStart[6] = cc.v2(7, 1);
level8DataStart[7] = cc.v2(7, 4);
level8DataStart[8] = cc.v2(7, 7);
level8DataStart[9] = cc.v2(8, 1);
level8DataStart[10] = cc.v2(8, 4);
level8DataStart[11] = cc.v2(8, 7);
level8DataStart[12] = cc.v2(9, 1);
level8DataStart[13] = cc.v2(9, 4);
level8DataStart[14] = cc.v2(9, 7);
level8DataStart[15] = cc.v2(10, 2);
level8DataStart[16] = cc.v2(10, 3);
level8DataStart[17] = cc.v2(10, 6);


levelsStart[7] = level8DataStart;
//存放通关需要的分布
var level8DataEnd = [];
level8DataEnd[0] = cc.v2(5, 1);
level8DataEnd[1] = cc.v2(5, 4);
level8DataEnd[2] = cc.v2(5, 5);
level8DataEnd[3] = cc.v2(5, 6);
level8DataEnd[4] = cc.v2(6, 8);
level8DataEnd[5] = cc.v2(9, 0);
level8DataEnd[6] = cc.v2(9, 8);
level8DataEnd[7] = cc.v2(10, 2);
level8DataEnd[8] = cc.v2(11, 2);
level8DataEnd[9] = cc.v2(11, 3);

levelsEnd[7] = level8DataEnd;
availableCell[7] = 2;
stepUse[7] = 2;
increa[7] = true;

/////////////////////////////////////////////////////////////////////////////////关卡9
var level9DataStart = [];
//注意v2.xy从0开始
level9DataStart[0] = cc.v2(2, 4);
level9DataStart[1] = cc.v2(2, 5);
level9DataStart[2] = cc.v2(3, 3);
level9DataStart[3] = cc.v2(3, 6);
level9DataStart[4] = cc.v2(4, 2);
level9DataStart[5] = cc.v2(4, 7);
level9DataStart[6] = cc.v2(5, 1);
level9DataStart[7] = cc.v2(5, 7);
level9DataStart[8] = cc.v2(6, 0);
level9DataStart[9] = cc.v2(6, 6);
level9DataStart[10] = cc.v2(7, 0);
level9DataStart[11] = cc.v2(7, 6);
level9DataStart[12] = cc.v2(8, 1);
level9DataStart[13] = cc.v2(8, 7);
level9DataStart[14] = cc.v2(9, 2);
level9DataStart[15] = cc.v2(9, 7);
level9DataStart[16] = cc.v2(10, 3);
level9DataStart[17] = cc.v2(10, 6);
level9DataStart[18] = cc.v2(11, 4);
level9DataStart[19] = cc.v2(11, 5);


levelsStart[8] = level9DataStart;
//存放通关需要的分布
var level9DataEnd = [];
level9DataEnd[0] = cc.v2(2, 3);
level9DataEnd[1] = cc.v2(2, 6);
level9DataEnd[2] = cc.v2(3, 3);
level9DataEnd[3] = cc.v2(3, 7);
level9DataEnd[4] = cc.v2(4, 2);
level9DataEnd[5] = cc.v2(4, 3);
level9DataEnd[6] = cc.v2(4, 4);
level9DataEnd[7] = cc.v2(5, 0);
level9DataEnd[8] = cc.v2(5, 1);
level9DataEnd[9] = cc.v2(5, 2);
level9DataEnd[10] = cc.v2(5, 5);
level9DataEnd[11] = cc.v2(5, 8);
level9DataEnd[12] = cc.v2(6, 2);
level9DataEnd[13] = cc.v2(6, 5);
level9DataEnd[14] = cc.v2(6, 8);
level9DataEnd[15] = cc.v2(7, 2);
level9DataEnd[16] = cc.v2(7, 5);
level9DataEnd[17] = cc.v2(7, 8);
level9DataEnd[18] = cc.v2(8, 0);
level9DataEnd[19] = cc.v2(8, 1);
level9DataEnd[20] = cc.v2(8, 2);
level9DataEnd[21] = cc.v2(8, 5);
level9DataEnd[22] = cc.v2(8, 8);
level9DataEnd[23] = cc.v2(9, 2);
level9DataEnd[24] = cc.v2(9, 3);
level9DataEnd[25] = cc.v2(9, 4);
level9DataEnd[26] = cc.v2(10, 3);
level9DataEnd[27] = cc.v2(10, 7);
level9DataEnd[28] = cc.v2(11, 3);
level9DataEnd[29] = cc.v2(11, 6);

levelsEnd[8] = level9DataEnd;
availableCell[8] = 2;
stepUse[8] = 2;
increa[8] = true;

/////////////////////////////////////////////////////////////////////////////////关卡10
var level10DataStart = [];
//注意v2.xy从0开始
level10DataStart[0] = cc.v2(4, 1);
level10DataStart[1] = cc.v2(4, 6);
level10DataStart[2] = cc.v2(5, 1);
level10DataStart[3] = cc.v2(5, 7);
level10DataStart[4] = cc.v2(6, 1);
level10DataStart[5] = cc.v2(6, 2);
level10DataStart[6] = cc.v2(6, 3);
level10DataStart[7] = cc.v2(6, 4);
level10DataStart[8] = cc.v2(6, 5);
level10DataStart[9] = cc.v2(6, 6);
level10DataStart[10] = cc.v2(6, 8);
level10DataStart[11] = cc.v2(7, 1);
level10DataStart[12] = cc.v2(7, 7);
level10DataStart[13] = cc.v2(8, 1);
level10DataStart[14] = cc.v2(8, 6);


levelsStart[9] = level10DataStart;
//存放通关需要的分布
var level10DataEnd = [];
level10DataEnd[0] = cc.v2(5, 0);
level10DataEnd[1] = cc.v2(5, 1);
level10DataEnd[2] = cc.v2(5, 2);
level10DataEnd[3] = cc.v2(5, 4);
level10DataEnd[4] = cc.v2(5, 5);
level10DataEnd[5] = cc.v2(5, 6);
level10DataEnd[6] = cc.v2(5, 7);
level10DataEnd[7] = cc.v2(6, 4);
level10DataEnd[8] = cc.v2(6, 5);
level10DataEnd[9] = cc.v2(6, 6);
level10DataEnd[10] = cc.v2(6, 8);
level10DataEnd[11] = cc.v2(7, 3);
level10DataEnd[12] = cc.v2(7, 4);
level10DataEnd[13] = cc.v2(7, 5);
level10DataEnd[14] = cc.v2(7, 6);
level10DataEnd[15] = cc.v2(7, 7);
level10DataEnd[16] = cc.v2(8, 0);
level10DataEnd[17] = cc.v2(8, 1);
level10DataEnd[18] = cc.v2(8, 2);

levelsEnd[9] = level10DataEnd;
availableCell[9] = 3;
stepUse[9] = 2;
increa[9] = true;

/////////////////////////////////////////////////////////////////////////////////关卡11
var level11DataStart = [];
//注意v2.xy从0开始
level11DataStart[0] = cc.v2(1, 3);
level11DataStart[1] = cc.v2(2, 4);
level11DataStart[2] = cc.v2(3, 1);
level11DataStart[3] = cc.v2(3, 5);
level11DataStart[4] = cc.v2(4, 2);
level11DataStart[5] = cc.v2(4, 3);
level11DataStart[6] = cc.v2(4, 4);
level11DataStart[7] = cc.v2(4, 6);
level11DataStart[8] = cc.v2(5, 1);
level11DataStart[9] = cc.v2(5, 5);
level11DataStart[10] = cc.v2(5, 7);
level11DataStart[11] = cc.v2(6, 0);
level11DataStart[12] = cc.v2(6, 2);
level11DataStart[13] = cc.v2(6, 3);
level11DataStart[14] = cc.v2(6, 4);
level11DataStart[15] = cc.v2(6, 8);
level11DataStart[16] = cc.v2(11, 3);
level11DataStart[17] = cc.v2(10, 4);
level11DataStart[18] = cc.v2(9, 1);
level11DataStart[19] = cc.v2(9, 5);
level11DataStart[20] = cc.v2(8, 2);
level11DataStart[21] = cc.v2(8, 3);
level11DataStart[22] = cc.v2(8, 4);
level11DataStart[23] = cc.v2(8, 6);
level11DataStart[24] = cc.v2(7, 1);
level11DataStart[25] = cc.v2(7, 5);
level11DataStart[26] = cc.v2(7, 7);


levelsStart[10] = level11DataStart;
//存放通关需要的分布
var level11DataEnd = [];
level11DataEnd[0] = cc.v2(2, 5);
level11DataEnd[1] = cc.v2(3, 1);
level11DataEnd[2] = cc.v2(3, 2);
level11DataEnd[3] = cc.v2(3, 6);
level11DataEnd[4] = cc.v2(4, 1);
level11DataEnd[5] = cc.v2(4, 3);
level11DataEnd[6] = cc.v2(4, 6);
level11DataEnd[7] = cc.v2(4, 7);
level11DataEnd[8] = cc.v2(5, 0);
level11DataEnd[9] = cc.v2(5, 5);
level11DataEnd[10] = cc.v2(5, 7);
level11DataEnd[11] = cc.v2(6, 0);
level11DataEnd[12] = cc.v2(6, 2);
level11DataEnd[13] = cc.v2(6, 3);
level11DataEnd[14] = cc.v2(6, 7);
level11DataEnd[15] = cc.v2(6, 8);
level11DataEnd[16] = cc.v2(7, 0);
level11DataEnd[17] = cc.v2(7, 5);
level11DataEnd[18] = cc.v2(7, 7);
level11DataEnd[19] = cc.v2(8, 1);
level11DataEnd[20] = cc.v2(8, 3);
level11DataEnd[21] = cc.v2(8, 4);
level11DataEnd[22] = cc.v2(8, 5);
level11DataEnd[23] = cc.v2(8, 6);
level11DataEnd[24] = cc.v2(9, 5);
level11DataEnd[25] = cc.v2(10, 3);
level11DataEnd[26] = cc.v2(4, 4);


levelsEnd[10] = level11DataEnd;
availableCell[10] = 3;
stepUse[10] = 2;
increa[10] = true;


/////////////////////////////////////////////////////////////////////////////////关卡12新
var level12DataStart = [];
//注意v2.xy从0开始
level12DataStart[0] = cc.v2(3, 7);
level12DataStart[1] = cc.v2(4, 8);
level12DataStart[2] = cc.v2(4, 6);
level12DataStart[3] = cc.v2(5, 9);
level12DataStart[4] = cc.v2(5, 5);
level12DataStart[5] = cc.v2(6, 10);
level12DataStart[6] = cc.v2(6, 8);
level12DataStart[7] = cc.v2(6, 6);
level12DataStart[8] = cc.v2(6, 4);

level12DataStart[9] = cc.v2(7, 10);
level12DataStart[10] = cc.v2(7, 4);
level12DataStart[11] = cc.v2(7, 7);

level12DataStart[12] = cc.v2(11, 7);
level12DataStart[13] = cc.v2(10, 8);
level12DataStart[14] = cc.v2(10, 6);
level12DataStart[15] = cc.v2(9, 9);
level12DataStart[16] = cc.v2(9, 5);
level12DataStart[17] = cc.v2(8, 10);
level12DataStart[18] = cc.v2(8, 8);
level12DataStart[19] = cc.v2(8, 6);
level12DataStart[20] = cc.v2(8, 4);



levelsStart[11] = level12DataStart;
//存放通关需要的分布
var level12DataEnd = [];
level12DataEnd[0] = cc.v2(3, 7);
level12DataEnd[1] = cc.v2(4, 7);
level12DataEnd[2] = cc.v2(4, 8);
level12DataEnd[3] = cc.v2(5, 5);
level12DataEnd[4] = cc.v2(5, 8);
level12DataEnd[5] = cc.v2(5, 9);
level12DataEnd[6] = cc.v2(6, 5);
level12DataEnd[7] = cc.v2(6, 9);
level12DataEnd[8] = cc.v2(7, 3);
level12DataEnd[9] = cc.v2(7, 4);
level12DataEnd[10] = cc.v2(8, 9);
level12DataEnd[11] = cc.v2(8, 4);
level12DataEnd[12] = cc.v2(9, 5);
level12DataEnd[13] = cc.v2(9, 6);
level12DataEnd[14] = cc.v2(9, 8);
level12DataEnd[15] = cc.v2(9, 9);
level12DataEnd[16] = cc.v2(10, 6);
level12DataEnd[17] = cc.v2(10, 7);
level12DataEnd[18] = cc.v2(10, 8);
level12DataEnd[19] = cc.v2(11, 7);

levelsEnd[11] = level12DataEnd;
availableCell[11] = 3;
stepUse[11] = 1;
increa[11] = false;


/////////////////////////////////////////////////////////////////////////////////关卡13
var level13DataStart = [];
//注意v2.xy从0开始
level13DataStart[0] = cc.v2(0, 2);
level13DataStart[1] = cc.v2(1, 3);
level13DataStart[2] = cc.v2(2, 4);
level13DataStart[3] = cc.v2(3, 5);
level13DataStart[4] = cc.v2(4, 6);
level13DataStart[5] = cc.v2(5, 5);
level13DataStart[6] = cc.v2(6, 4);
level13DataStart[7] = cc.v2(6, 2);
level13DataStart[8] = cc.v2(7, 1);
level13DataStart[9] = cc.v2(7, 3);
level13DataStart[10] = cc.v2(8, 2);
level13DataStart[11] = cc.v2(8, 4);
level13DataStart[12] = cc.v2(9, 5);
level13DataStart[13] = cc.v2(10, 6);
level13DataStart[14] = cc.v2(11, 5);
level13DataStart[15] = cc.v2(12, 4);
level13DataStart[16] = cc.v2(13, 3);
level13DataStart[17] = cc.v2(14, 2);



levelsStart[12] = level13DataStart;
//存放通关需要的分布
var level13DataEnd = [];
level13DataEnd[0] = cc.v2(2, 4);
level13DataEnd[1] = cc.v2(3, 3);
level13DataEnd[2] = cc.v2(3, 6);
level13DataEnd[3] = cc.v2(4, 3);
level13DataEnd[4] = cc.v2(4, 6);
level13DataEnd[5] = cc.v2(5, 2);
level13DataEnd[6] = cc.v2(5, 3);
level13DataEnd[7] = cc.v2(5, 6);
level13DataEnd[8] = cc.v2(6, 2);
level13DataEnd[9] = cc.v2(6, 3);
level13DataEnd[10] = cc.v2(7, 1);
level13DataEnd[11] = cc.v2(7, 5);
level13DataEnd[12] = cc.v2(7, 6);
level13DataEnd[13] = cc.v2(7, 7);
level13DataEnd[14] = cc.v2(8, 2);
level13DataEnd[15] = cc.v2(8, 3);
level13DataEnd[16] = cc.v2(9, 2);
level13DataEnd[17] = cc.v2(9, 3);
level13DataEnd[18] = cc.v2(9, 6);
level13DataEnd[19] = cc.v2(10, 3);
level13DataEnd[20] = cc.v2(10, 6);
level13DataEnd[21] = cc.v2(11, 3);
level13DataEnd[22] = cc.v2(11, 6);
level13DataEnd[23] = cc.v2(12, 4);


levelsEnd[12] = level13DataEnd;
availableCell[12] = 1;
stepUse[12] = 3;
increa[12] = true;


/////////////////////////////////////////////////////////////////////////////////关卡14
var level14DataStart = [];
//注意v2.xy从0开始
level14DataStart[0] = cc.v2(3, 5);
level14DataStart[1] = cc.v2(3, 7);
level14DataStart[2] = cc.v2(4, 6);
level14DataStart[3] = cc.v2(5, 4);
level14DataStart[4] = cc.v2(5, 5);
level14DataStart[5] = cc.v2(5, 6);
level14DataStart[6] = cc.v2(6, 3);
level14DataStart[7] = cc.v2(6, 8);
level14DataStart[8] = cc.v2(7, 1);
level14DataStart[9] = cc.v2(7, 2);
level14DataStart[10] = cc.v2(7, 4);
level14DataStart[11] = cc.v2(7, 5);
level14DataStart[12] = cc.v2(7, 6);
level14DataStart[13] = cc.v2(7, 7);
level14DataStart[14] = cc.v2(8, 3);
level14DataStart[15] = cc.v2(8, 8);
level14DataStart[16] = cc.v2(9, 4);
level14DataStart[17] = cc.v2(9, 5);
level14DataStart[18] = cc.v2(9, 6);
level14DataStart[19] = cc.v2(10, 6);
level14DataStart[20] = cc.v2(11, 5);
level14DataStart[21] = cc.v2(11, 7);



levelsStart[13] = level14DataStart;
//存放通关需要的分布
var level14DataEnd = [];
level14DataEnd[0] = cc.v2(4, 3);
level14DataEnd[1] = cc.v2(4, 7);
level14DataEnd[2] = cc.v2(5, 2);
level14DataEnd[3] = cc.v2(5, 5);
level14DataEnd[4] = cc.v2(5, 6);
level14DataEnd[5] = cc.v2(5, 7);
level14DataEnd[6] = cc.v2(5, 8);
level14DataEnd[7] = cc.v2(6, 1);
level14DataEnd[8] = cc.v2(6, 2);
level14DataEnd[9] = cc.v2(6, 8);
level14DataEnd[10] = cc.v2(7, 1);
level14DataEnd[11] = cc.v2(7, 2);
level14DataEnd[12] = cc.v2(7, 5);
level14DataEnd[13] = cc.v2(7, 6);
level14DataEnd[14] = cc.v2(7, 7);
level14DataEnd[15] = cc.v2(7, 8);
level14DataEnd[16] = cc.v2(8, 1);
level14DataEnd[17] = cc.v2(8, 2);
level14DataEnd[18] = cc.v2(8, 8);
level14DataEnd[19] = cc.v2(9, 3);
level14DataEnd[20] = cc.v2(9, 4);
level14DataEnd[21] = cc.v2(9, 5);
level14DataEnd[22] = cc.v2(9, 6);
level14DataEnd[23] = cc.v2(10, 4);
level14DataEnd[24] = cc.v2(10, 8);
level14DataEnd[25] = cc.v2(11, 5);
level14DataEnd[26] = cc.v2(11, 7);
level14DataEnd[27] = cc.v2(11, 8);
level14DataEnd[28] = cc.v2(12, 6);


levelsEnd[13] = level14DataEnd;
availableCell[13] = 2;
stepUse[13] = 3;
increa[13] = true;

/////////////////////////////////////////////////////////////////////////////////关卡15
var level15DataStart = [];
//注意v2.xy从0开始
level15DataStart[0] = cc.v2(4, 5);
level15DataStart[1] = cc.v2(4, 6);
level15DataStart[2] = cc.v2(4, 7);
level15DataStart[3] = cc.v2(5, 2);
level15DataStart[4] = cc.v2(5, 5);
level15DataStart[5] = cc.v2(6, 2);
level15DataStart[6] = cc.v2(6, 5);
level15DataStart[7] = cc.v2(7, 2);
level15DataStart[8] = cc.v2(7, 3);
level15DataStart[9] = cc.v2(7, 4);
level15DataStart[10] = cc.v2(7, 5);
level15DataStart[11] = cc.v2(7, 6);
level15DataStart[12] = cc.v2(7, 7);
level15DataStart[13] = cc.v2(7, 8);
level15DataStart[14] = cc.v2(8, 5);
level15DataStart[15] = cc.v2(8, 8);
level15DataStart[16] = cc.v2(9, 5);
level15DataStart[17] = cc.v2(9, 8);
level15DataStart[18] = cc.v2(10, 3);
level15DataStart[19] = cc.v2(10, 4);
level15DataStart[20] = cc.v2(10, 5);


levelsStart[14] = level15DataStart;
//存放通关需要的分布
var level15DataEnd = [];
level15DataEnd[0] = cc.v2(4, 3);
level15DataEnd[1] = cc.v2(4, 4);
level15DataEnd[2] = cc.v2(4, 5);
level15DataEnd[3] = cc.v2(5, 2);
level15DataEnd[4] = cc.v2(5, 3);
level15DataEnd[5] = cc.v2(5, 4);
level15DataEnd[6] = cc.v2(5, 5);
level15DataEnd[7] = cc.v2(5, 7);
level15DataEnd[8] = cc.v2(6, 2);
level15DataEnd[9] = cc.v2(6, 4);
level15DataEnd[10] = cc.v2(6, 5);
level15DataEnd[11] = cc.v2(6, 6);
level15DataEnd[12] = cc.v2(6, 7);
level15DataEnd[13] = cc.v2(6, 8);
level15DataEnd[14] = cc.v2(7, 1);
level15DataEnd[15] = cc.v2(7, 4);
level15DataEnd[16] = cc.v2(7, 9);
level15DataEnd[17] = cc.v2(8, 2);
level15DataEnd[18] = cc.v2(8, 3);
level15DataEnd[19] = cc.v2(8, 4);
level15DataEnd[20] = cc.v2(8, 5);
level15DataEnd[21] = cc.v2(8, 6);
level15DataEnd[22] = cc.v2(8, 9);
level15DataEnd[23] = cc.v2(9, 2);
level15DataEnd[24] = cc.v2(9, 6);
level15DataEnd[25] = cc.v2(9, 8);
level15DataEnd[26] = cc.v2(10, 3);
level15DataEnd[27] = cc.v2(10, 4);
level15DataEnd[28] = cc.v2(10, 6);
level15DataEnd[29] = cc.v2(10, 7);
level15DataEnd[30] = cc.v2(11, 5);

levelsEnd[14] = level15DataEnd;
availableCell[14] = 3;
stepUse[14] = 3;
increa[14] = true;


/////////////////////////////////////////////////////////////////////////////////关卡16新
var level16DataStart = [];
//注意v2.xy从0开始
level16DataStart[0] = cc.v2(3, 4);
level16DataStart[1] = cc.v2(3, 10);
level16DataStart[2] = cc.v2(4, 5);
level16DataStart[3] = cc.v2(4, 9);
level16DataStart[4] = cc.v2(5, 6);
level16DataStart[5] = cc.v2(5, 8);
level16DataStart[6] = cc.v2(6, 5);
level16DataStart[7] = cc.v2(6, 9);
level16DataStart[8] = cc.v2(7, 10);
level16DataStart[9] = cc.v2(7, 8);
level16DataStart[10] = cc.v2(7, 6);
level16DataStart[11] = cc.v2(7, 4);
level16DataStart[12] = cc.v2(11, 4);
level16DataStart[13] = cc.v2(11, 10);
level16DataStart[14] = cc.v2(10, 5);
level16DataStart[15] = cc.v2(10, 9);
level16DataStart[16] = cc.v2(9, 6);
level16DataStart[17] = cc.v2(9, 8);
level16DataStart[18] = cc.v2(8, 5);
level16DataStart[19] = cc.v2(8, 9);

levelsStart[15] = level16DataStart;

//存放通关需要的分布
var level16DataEnd = [];
level16DataEnd[0] = cc.v2(6, 5);
level16DataEnd[1] = cc.v2(6, 7);
level16DataEnd[2] = cc.v2(6, 8);
level16DataEnd[3] = cc.v2(6, 9);
level16DataEnd[4] = cc.v2(7, 5);
level16DataEnd[5] = cc.v2(7, 8);
level16DataEnd[6] = cc.v2(7, 9);
level16DataEnd[7] = cc.v2(8, 5);
level16DataEnd[8] = cc.v2(8, 8);
level16DataEnd[9] = cc.v2(8, 9);
level16DataEnd[10] = cc.v2(9, 8);
level16DataEnd[11] = cc.v2(9, 9);
level16DataEnd[12] = cc.v2(10, 5);
level16DataEnd[13] = cc.v2(10, 9);

levelsEnd[15] = level16DataEnd;
availableCell[15] = 4;
stepUse[15] = 1;
increa[15] = false;



exports.levelsEnd = levelsEnd;
exports.levelsStart = levelsStart;
exports.availableCell = availableCell;
exports.stepUse = stepUse;
exports.increa = increa;