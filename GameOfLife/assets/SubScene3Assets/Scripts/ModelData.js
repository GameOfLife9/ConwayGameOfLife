//存储模型数据
//这里的模型存储方式和关卡模式与自由模式的稍有不同，此处以棋盘的中心为原点，前两个模式以左下角为起点
var modelDatas=[];
var modelName=[];
//存放模型1分布
var model1Data=[];

model1Data[0]=cc.v2(0,0);
model1Data[1]=cc.v2(1,0);
model1Data[2]=cc.v2(-1,0);

modelDatas[0]=model1Data;
modelName[0]="模型1";
//存放模型2分布
var model2Data=[];

model2Data[0]=cc.v2(0,0);
model2Data[1]=cc.v2(0,1);
model2Data[2]=cc.v2(0,-1);

modelDatas[1]=model2Data;
modelName[1]="模型2";
exports.modelDatas=modelDatas;
exports.modelName=modelName;

