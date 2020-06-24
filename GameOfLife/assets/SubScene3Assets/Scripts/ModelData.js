//存储模型数据
//这里的模型存储方式和关卡模式与自由模式的稍有不同，此处以棋盘的中心为原点，前两个模式以左下角为起点

//存放每个模型细胞分布数组的数组，注意区分modelDatas数组和model1Data的区别，前者是数组的数组，后者是数组
var modelDatas=[];
//存放当细胞周围有多少个细胞才能继续存活的数组注意区分surviveNums数组和survie1Num的区别，前者是数组的数组，后者是数组
var surviveNums=[];
//存放当前没有细胞的格子周围有几个细胞才能产生一个新的细胞的数组，注意点同上
var bornNums=[];
//存放模型名字
var modelName = [];



///////////////////////////////////////////////////模型1
//存放模型1分布
var model1Data=[];

model1Data[0] = cc.v2(-4,-6);
model1Data[1] = cc.v2(-3,-6);
model1Data[2] = cc.v2(-2, -6);
model1Data[3] = cc.v2(-1, -6);
model1Data[4] = cc.v2(0, -6);
model1Data[5] = cc.v2(1, -6);
model1Data[6] = cc.v2(2, -6);
model1Data[7] = cc.v2(3, -6);

//模型一：当该细胞周围有2或3个细胞时，该细胞在下一代繁殖后会继续存在
var survive1Num=[];
survive1Num[0]=2;
survive1Num[1]=3;

//当该没有细胞的网格周围有3个细胞时，该格子在下一代繁衍时会产生一个新的细胞
var born1Num=[];
born1Num[0]=3;

surviveNums[0]=survive1Num;
bornNums[0]=born1Num;

modelDatas[0]=model1Data;
modelName[0] = "模型1";



/////////////////////////////////////////////////模型2同上
//存放模型2分布
var model2Data=[];

model2Data[0] = cc.v2(-13,-4);
model2Data[1] = cc.v2(-12,-4);
model2Data[2] = cc.v2(-11, -4);
model2Data[3] = cc.v2(-10, -4);
model2Data[4] = cc.v2(-9, -4);
model2Data[5] = cc.v2(-8, -4);
model2Data[6] = cc.v2(-7, -4);
model2Data[7] = cc.v2(-6, -4);
model2Data[8] = cc.v2(1, -4);
model2Data[9] = cc.v2(2, -4);
model2Data[10] = cc.v2(3, -4);
model2Data[11] = cc.v2(4, -4);
model2Data[12] = cc.v2(5, -4);
model2Data[13] = cc.v2(6, -4);
model2Data[14] = cc.v2(7, -4);
model2Data[15] = cc.v2(8, -4);
model2Data[16] = cc.v2(9, -4);
model2Data[17] = cc.v2(10, -4);
model2Data[18] = cc.v2(11, -4);
model2Data[19] = cc.v2(12, -4);
model2Data[20] = cc.v2(-13, -5);
model2Data[21] = cc.v2(-12, -5);
model2Data[22] = cc.v2(-11, -5);
model2Data[23] = cc.v2(-10, -5);
model2Data[24] = cc.v2(-9, -5);
model2Data[25] = cc.v2(-8, -5);
model2Data[26] = cc.v2(-7, -5);
model2Data[27] = cc.v2(-6, -5);
model2Data[28] = cc.v2(1, -5);
model2Data[29] = cc.v2(2, -5);
model2Data[30] = cc.v2(3, -5);
model2Data[31] = cc.v2(4, -5);
model2Data[32] = cc.v2(5, -5);
model2Data[33] = cc.v2(6, -5);
model2Data[34] = cc.v2(7, -5);
model2Data[35] = cc.v2(8, -5);
model2Data[36] = cc.v2(9, -5);
model2Data[37] = cc.v2(10, -5);
model2Data[38] = cc.v2(11, -5);
model2Data[39] = cc.v2(12, -5);


var survive2Num=[];
survive2Num[0] = 1;
survive2Num[1] = 2;
survive2Num[2] = 5;

var born2Num=[];
born2Num[0] = 3;
born2Num[1] = 6;

surviveNums[1]=survive2Num;
bornNums[1]=born2Num;
modelDatas[1]=model2Data;
modelName[1] = "模型2";


/////////////////////////////////////////////////模型3
//存放模型3分布
var model3Data = [];

model3Data[0] = cc.v2(-12, -10);
model3Data[1] = cc.v2(-11, -10);
model3Data[2] = cc.v2(-10, -10);
model3Data[3] = cc.v2(-10, -12);
model3Data[4] = cc.v2(-11, -13);
model3Data[5] = cc.v2(-8, -12);

var survive3Num = [];
survive3Num[0] = 1;
survive3Num[1] = 2;
survive3Num[2] = 5;

var born3Num = [];
born3Num[0] = 3;
born3Num[1] = 6;

surviveNums[2] = survive3Num;
bornNums[2] = born3Num;
modelDatas[2] = model3Data;
modelName[2] = "模型3";


/////////////////////////////////////////////////模型4
//存放模型4分布
var model4Data = [];

model4Data[0] = cc.v2(7, -2);
model4Data[1] = cc.v2(7, -3);
model4Data[2] = cc.v2(7, -4);
model4Data[3] = cc.v2(9, 0);
model4Data[4] = cc.v2(9, -4);
model4Data[5] = cc.v2(9, -6);
model4Data[6] = cc.v2(10, 1);
model4Data[7] = cc.v2(10, -3);
model4Data[8] = cc.v2(11, 2);

var survive4Num = [];
survive4Num[0] = 1;
survive4Num[1] = 2;
survive4Num[2] = 5;

var born4Num = [];
born4Num[0] = 3;
born4Num[1] = 6;

surviveNums[3] = survive4Num;
bornNums[3] = born4Num;
modelDatas[3] = model4Data;
modelName[3] = "模型4";


/////////////////////////////////////////////////模型5
//存放模型5分布
var model5Data = [];

model5Data[0] = cc.v2(-7, -7);
model5Data[1] = cc.v2(-7, -8);
model5Data[2] = cc.v2(-7, -11);
model5Data[3] = cc.v2(-7, -12);
model5Data[4] = cc.v2(-6, -9);
model5Data[5] = cc.v2(-6, -10);
model5Data[6] = cc.v2(-6, -11);
model5Data[7] = cc.v2(-6, -12);
model5Data[8] = cc.v2(-5, -4);
model5Data[9] = cc.v2(-5, -5);
model5Data[10] = cc.v2(-5, -12);
model5Data[11] = cc.v2(-5, -13);
model5Data[12] = cc.v2(-4, -4);
model5Data[13] = cc.v2(-4, -5);
model5Data[14] = cc.v2(-4, -7);
model5Data[15] = cc.v2(-4, -9);
model5Data[16] = cc.v2(-4, -10);
model5Data[17] = cc.v2(-4, -11);
model5Data[18] = cc.v2(-4, -12);
model5Data[19] = cc.v2(-4, -13);
model5Data[20] = cc.v2(-3, -3);
model5Data[21] = cc.v2(-3, -7);
model5Data[22] = cc.v2(-3, -8);
model5Data[23] = cc.v2(-2, -4);
model5Data[24] = cc.v2(-2, -5);
model5Data[25] = cc.v2(-2, -6);
model5Data[26] = cc.v2(-1, -4);
model5Data[27] = cc.v2(-1, -5);
model5Data[28] = cc.v2(-1, -6);

model5Data[29] = cc.v2(7, -7);
model5Data[30] = cc.v2(7, -8);
model5Data[31] = cc.v2(7, -11);
model5Data[32] = cc.v2(7, -12);
model5Data[33] = cc.v2(6, -9);
model5Data[34] = cc.v2(6, -10);
model5Data[35] = cc.v2(6, -11);
model5Data[36] = cc.v2(6, -12);
model5Data[37] = cc.v2(5, -4);
model5Data[38] = cc.v2(5, -5);
model5Data[39] = cc.v2(5, -12);
model5Data[40] = cc.v2(5, -13);
model5Data[41] = cc.v2(4, -4);
model5Data[42] = cc.v2(4, -5);
model5Data[43] = cc.v2(4, -7);
model5Data[44] = cc.v2(4, -9);
model5Data[45] = cc.v2(4, -10);
model5Data[46] = cc.v2(4, -11);
model5Data[47] = cc.v2(4, -12);
model5Data[48] = cc.v2(4, -13);
model5Data[49] = cc.v2(3, -3);
model5Data[50] = cc.v2(3, -7);
model5Data[51] = cc.v2(3, -8);
model5Data[52] = cc.v2(2, -4);
model5Data[53] = cc.v2(2, -5);
model5Data[54] = cc.v2(2, -6);
model5Data[55] = cc.v2(1, -4);
model5Data[56] = cc.v2(1, -5);
model5Data[57] = cc.v2(1, -6);

var survive5Num = [];
survive5Num[0] = 2;
survive5Num[1] = 3;

var born5Num = [];
born5Num[0] = 3;

surviveNums[4] = survive5Num;
bornNums[4] = born5Num;
modelDatas[4] = model5Data;
modelName[4] = "模型5";


/////////////////////////////////////////////////模型6
//存放模型6分布
var model6Data = [];

model6Data[0] = cc.v2(-6, -2);
model6Data[1] = cc.v2(-6, -3);
model6Data[2] = cc.v2(-6, -8);
model6Data[3] = cc.v2(-6, -9);
model6Data[4] = cc.v2(-5, -2);
model6Data[5] = cc.v2(-5, -4);
model6Data[6] = cc.v2(-5, -7);
model6Data[7] = cc.v2(-5, -9);
model6Data[8] = cc.v2(-4, -4);
model6Data[9] = cc.v2(-4, -7);
model6Data[10] = cc.v2(-3, -3);
model6Data[11] = cc.v2(-3, -8);
model6Data[12] = cc.v2(-2, -3);
model6Data[13] = cc.v2(-2, -4);
model6Data[14] = cc.v2(-2, -5);
model6Data[15] = cc.v2(-2, -6);
model6Data[16] = cc.v2(-2, -7);
model6Data[17] = cc.v2(-2, -8);
model6Data[18] = cc.v2(-1, -4);
model6Data[19] = cc.v2(-1, -5);
model6Data[20] = cc.v2(-1, -6);
model6Data[21] = cc.v2(-1, -7);
model6Data[22] = cc.v2(1, -12);
model6Data[23] = cc.v2(1, -13);
model6Data[24] = cc.v2(2, -8);
model6Data[25] = cc.v2(2, -9);
model6Data[26] = cc.v2(2, -10);
model6Data[27] = cc.v2(2, -13);
model6Data[28] = cc.v2(3, -3);
model6Data[29] = cc.v2(3, -4);
model6Data[30] = cc.v2(3, -5);
model6Data[31] = cc.v2(3, -11);
model6Data[32] = cc.v2(3, -12);
model6Data[33] = cc.v2(4, -7);
model6Data[34] = cc.v2(5, -7);
model6Data[35] = cc.v2(6, -11);
model6Data[36] = cc.v2(6, -12);
model6Data[37] = cc.v2(7, -8);
model6Data[38] = cc.v2(7, -9);
model6Data[39] = cc.v2(7, -10);
model6Data[40] = cc.v2(7, -13);
model6Data[41] = cc.v2(8, -12);
model6Data[42] = cc.v2(8, -13);


var survive6Num = [];
survive6Num[0] = 2;
survive6Num[1] = 3;

var born6Num = [];
born6Num[0] = 3;

surviveNums[5] = survive6Num;
bornNums[5] = born6Num;
modelDatas[5] = model6Data;
modelName[5] = "模型6";


/////////////////////////////////////////////////模型7
//存放模型7分布
var model7Data = [];

model7Data[0] = cc.v2(-10, -7);
model7Data[1] = cc.v2(-10, -8);
model7Data[2] = cc.v2(-9, -8);
model7Data[3] = cc.v2(-8, -8);
model7Data[4] = cc.v2(-7, -7);
model7Data[5] = cc.v2(-7, -8);
model7Data[6] = cc.v2(-6, -7);
model7Data[7] = cc.v2(-6, -8);
model7Data[8] = cc.v2(-5, -8);
model7Data[9] = cc.v2(-4, -7);
model7Data[10] = cc.v2(-3, -7);
model7Data[11] = cc.v2(-3, -8);
model7Data[12] = cc.v2(-2, -7);
model7Data[13] = cc.v2(-2, -8);
model7Data[14] = cc.v2(-1, -7);
model7Data[15] = cc.v2(1, -7);
model7Data[16] = cc.v2(1, -8);

var survive7Num = [];
survive7Num[0] = 2;
survive7Num[1] = 3;

var born7Num = [];
born7Num[0] = 3;

surviveNums[6] = survive7Num;
bornNums[6] = born7Num;
modelDatas[6] = model7Data;
modelName[6] = "模型7";


/////////////////////////////////////////////////模型8
//存放模型8分布
var model8Data = [];

model8Data[0] = cc.v2(-4, -3);
model8Data[1] = cc.v2(-4, -5);
model8Data[2] = cc.v2(-4, -6);
model8Data[3] = cc.v2(-4, -7);
model8Data[4] = cc.v2(-4, -8);
model8Data[5] = cc.v2(-2, -7);
model8Data[6] = cc.v2(-2, -8);
model8Data[7] = cc.v2(-1, -3);
model8Data[8] = cc.v2(-1, -7);
model8Data[9] = cc.v2(0, -5);
model8Data[10] = cc.v2(0, -6);
model8Data[11] = cc.v2(1, -4);
model8Data[12] = cc.v2(2, -5);
model8Data[13] = cc.v2(3, -5);

var survive8Num = [];
survive8Num[0] = 2;
survive8Num[1] = 3;

var born8Num = [];
born8Num[0] = 3;
born8Num[1] = 8;

surviveNums[7] = survive8Num;
bornNums[7] = born8Num;
modelDatas[7] = model8Data;
modelName[7] = "模型8";



/////////////////////////////////////////////////模型9
//存放模型9分布
var model9Data = [];

model9Data[0] = cc.v2(-11, -3);
model9Data[1] = cc.v2(-11, -5);
model9Data[2] = cc.v2(-11, -7);
model9Data[3] = cc.v2(-11, -9);
model9Data[4] = cc.v2(-10, -2);
model9Data[5] = cc.v2(-10, -4);
model9Data[6] = cc.v2(-10, -5);
model9Data[7] = cc.v2(-10, -7);
model9Data[8] = cc.v2(-10, -8);
model9Data[9] = cc.v2(-10, -10);
model9Data[10] = cc.v2(-9, 0);
model9Data[11] = cc.v2(-9, -1);
model9Data[12] = cc.v2(-9, -2);
model9Data[13] = cc.v2(-9, -10);
model9Data[14] = cc.v2(-9, -11);
model9Data[15] = cc.v2(-9, -12);
model9Data[16] = cc.v2(-8, 1);
model9Data[17] = cc.v2(-8, -4);
model9Data[18] = cc.v2(-8, -5);
model9Data[19] = cc.v2(-8, -7);
model9Data[20] = cc.v2(-8, -8);
model9Data[21] = cc.v2(-8, -13);
model9Data[22] = cc.v2(-7, 1);
model9Data[23] = cc.v2(-7, -2);
model9Data[24] = cc.v2(-7, -3);
model9Data[25] = cc.v2(-7, -5);
model9Data[26] = cc.v2(-7, -7);
model9Data[27] = cc.v2(-7, -9);
model9Data[28] = cc.v2(-7, -10);
model9Data[29] = cc.v2(-7, -13);
model9Data[30] = cc.v2(-6, 2);
model9Data[31] = cc.v2(-6, 1);
model9Data[32] = cc.v2(-6, -1);
model9Data[33] = cc.v2(-6, -3);
model9Data[34] = cc.v2(-6, -9);
model9Data[35] = cc.v2(-6, -11);
model9Data[36] = cc.v2(-6, -13);
model9Data[37] = cc.v2(-6, -14);
model9Data[38] = cc.v2(-5, 1);
model9Data[39] = cc.v2(-5, -1);
model9Data[40] = cc.v2(-5, -4);
model9Data[41] = cc.v2(-5, -5);
model9Data[42] = cc.v2(-5, -7);
model9Data[43] = cc.v2(-5, -8);
model9Data[44] = cc.v2(-5, -11);
model9Data[45] = cc.v2(-5, -13);
model9Data[46] = cc.v2(-4, 1);
model9Data[47] = cc.v2(-4, -1);
model9Data[48] = cc.v2(-4, -5);
model9Data[49] = cc.v2(-4, -6);
model9Data[50] = cc.v2(-4, -7);
model9Data[51] = cc.v2(-4, -11);
model9Data[52] = cc.v2(-4, -13);

model9Data[53] = cc.v2(-3, 0);
model9Data[54] = cc.v2(-3, -12);
model9Data[55] = cc.v2(1, -6);
model9Data[56] = cc.v2(2, -5);
model9Data[57] = cc.v2(2, -7);
model9Data[58] = cc.v2(4, -3);
model9Data[59] = cc.v2(4, -7);
model9Data[60] = cc.v2(5, -3);
model9Data[61] = cc.v2(6, -4);
model9Data[62] = cc.v2(7, -1);
model9Data[63] = cc.v2(7, -2);
model9Data[64] = cc.v2(7, -3);
model9Data[65] = cc.v2(8, -1);

var survive9Num = [];
survive9Num[0] = 2;
survive9Num[1] = 3;

var born9Num = [];
born9Num[0] = 3;

surviveNums[8] = survive9Num;
bornNums[8] = born9Num;
modelDatas[8] = model9Data;
modelName[8] = "模型9";

/////////////////////////////////////////////////模型10
//存放模型10分布
var model10Data = [];

model10Data[0] = cc.v2(-12, -3);
model10Data[1] = cc.v2(-12, -6);
model10Data[2] = cc.v2(-10, -2);
model10Data[3] = cc.v2(-10, -7);
model10Data[4] = cc.v2(-9, -2);
model10Data[5] = cc.v2(-9, -7);
model10Data[6] = cc.v2(-8, -3);
model10Data[7] = cc.v2(-8, -6);
model10Data[8] = cc.v2(-7, -3);
model10Data[9] = cc.v2(-7, -6);
model10Data[10] = cc.v2(-6, -2);
model10Data[11] = cc.v2(-6, -7);
model10Data[12] = cc.v2(-5, -2);
model10Data[13] = cc.v2(-5, -7);
model10Data[14] = cc.v2(11, -3);
model10Data[15] = cc.v2(11, -6);
model10Data[16] = cc.v2(10, -2);
model10Data[17] = cc.v2(10, -4);
model10Data[18] = cc.v2(10, -5);
model10Data[19] = cc.v2(10, -7);
model10Data[20] = cc.v2(9, -1);
model10Data[21] = cc.v2(9, -3);
model10Data[22] = cc.v2(9, -6);
model10Data[23] = cc.v2(9, -8);
model10Data[24] = cc.v2(8, 0);
model10Data[25] = cc.v2(8, -2);
model10Data[26] = cc.v2(8, -7);
model10Data[27] = cc.v2(8, -9);
model10Data[28] = cc.v2(7, -1);
model10Data[29] = cc.v2(7, -8);
model10Data[30] = cc.v2(2, -3);
model10Data[31] = cc.v2(2, -6);
model10Data[32] = cc.v2(3, -2);
model10Data[33] = cc.v2(3, -4);
model10Data[34] = cc.v2(3, -5);
model10Data[35] = cc.v2(3, -7);
model10Data[36] = cc.v2(4, -1);
model10Data[37] = cc.v2(4, -3);
model10Data[38] = cc.v2(4, -6);
model10Data[39] = cc.v2(4, -8);
model10Data[40] = cc.v2(5, 0);
model10Data[41] = cc.v2(5, -2);
model10Data[42] = cc.v2(5, -7);
model10Data[43] = cc.v2(5, -9);
model10Data[44] = cc.v2(6, -1);
model10Data[45] = cc.v2(6, -8);


var survive10Num = [];
survive10Num[0] = 1;
survive10Num[1] = 2;
survive10Num[2] = 5;

var born10Num = [];
born10Num[0] = 3;
born10Num[1] = 6;

surviveNums[9] = survive10Num;
bornNums[9] = born10Num;
modelDatas[9] = model10Data;
modelName[9] = "模型10";


exports.modelDatas=modelDatas;
exports.modelName=modelName;
exports.surviveNums=surviveNums;
exports.bornNums=bornNums;

