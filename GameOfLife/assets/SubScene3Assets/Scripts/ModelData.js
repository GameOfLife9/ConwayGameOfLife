//存储模型数据
//这里的模型存储方式和关卡模式与自由模式的稍有不同，此处以棋盘的中心为原点，前两个模式以左下角为起点

//存放每个模型细胞分布数组的数组，注意区分modelDatas数组和model1Data的区别，前者是数组的数组，后者是数组
var modelDatas=[];
//存放当细胞周围有多少个细胞才能继续存活的数组注意区分surviveNums数组和survie1Num的区别，前者是数组的数组，后者是数组
var surviveNums=[];
//存放当前没有细胞的格子周围有几个细胞才能产生一个新的细胞的数组，注意点同上
var bornNums=[];
//存放模型名字
var modelName=[];
///////////////////////////////////////////////////模型1
//存放模型1分布
var model1Data=[];

model1Data[0]=cc.v2(0,0);
model1Data[1]=cc.v2(1,0);
model1Data[2]=cc.v2(-1,0);

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
modelName[0]="模型1";
/////////////////////////////////////////////////模型2同上
//存放模型2分布
var model2Data=[];

model2Data[0]=cc.v2(0,0);
model2Data[1]=cc.v2(0,1);
model2Data[2]=cc.v2(0,-1);

var survive2Num=[];
survive2Num[0]=2;
survive2Num[1]=3;

var born2Num=[];
born2Num[0]=3;

surviveNums[1]=survive2Num;
bornNums[1]=born2Num;
modelDatas[1]=model2Data;
modelName[1]="模型2";


exports.modelDatas=modelDatas;
exports.modelName=modelName;
exports.surviveNums=surviveNums;
exports.bornNums=bornNums;

