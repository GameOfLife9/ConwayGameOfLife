//ModelData存储模型坐标信息
import * as ModelData from 'ModelData';
import { modelName } from './ModelData';
var ROWS=25;
var COLUMNS=25;
var isshowNum=false;
//当前关卡级数，用于loadLevel

//暂时变量，之后删掉
var display=true;
//exitcell用于判断格子i j是否有细胞
//blocks用于存储细胞实体
var ExitCell=new Array();
for(let i=0;i<ROWS;i++){
    ExitCell[i]=new Array();
    for(let j=0;j<COLUMNS;j++){
        ExitCell[i][j]=0;
    }
}

//cellNum实时存储细胞ij周围细胞数目
var CellNum=new Array();
for(let i=0;i<ROWS;i++){
    CellNum[i]=new Array();
    for(let j=0;j<COLUMNS;j++){
        CellNum[i][j]=0;
    }
}
var isStartState=false;

var lasttime=0.0;
var timegap=0.5;

var ModelIndex=0;
var centerx=0;
var centery=0;
cc.Class({
    extends: cc.Component,

    properties: {
        itemTemplate:{
            default:null,
            type:cc.Node
        },
        blockPrefab:cc.Prefab,
        hasPrefab:cc.Prefab,
        bg:cc.Node,
        canvas:cc.Node,
        scrollviewback:cc.Node,
        showHideNumButton:cc.Button,
        ShowHideButtonLabel:cc.Label,
        scrollView:{
            default:null,
            type:cc.ScrollView
        },
    },

    // onLoad () {},

    start () {
        this.drawGrids();

        var self = this;
        self.canvas.on(cc.Node.EventType.TOUCH_START, function (event) {
           this.touchedEvent(event);
           }, self);
           this.initLoadList();
    },
     //触摸事件
    touchedEvent(event){
        var touches = event.getTouches();
        var touchLoc = touches[0].getLocation();

        //获取触碰到的方块 i j
        this.touchi=Math.floor((touchLoc.x-this.gap)/(this.blockSize+this.gap));   
        
        //可能存在错误
        //this.touchj=Math.floor((touchLoc.y-this.gap-this.blockSize*4.0)/(this.blockSize+this.gap));
        this.touchj=Math.floor((touchLoc.y-cc.winSize.height*0.15+this.blockSize/2.0)/(this.blockSize+this.gap));
        if(this.touchj<ROWS&&this.touchj>=0)
        {
            if(ExitCell[this.touchi][this.touchj]==1)
            {
                this.changeHasNotCellSprite(this.touchi,this.touchj);
                ExitCell[this.touchi][this.touchj]=0;
            }
            else{
                this.changeHasCellSprite(this.touchi,this.touchj);
                ExitCell[this.touchi][this.touchj]=1;
            }
        }

        if(isshowNum==true)
        {
            this.showNum();
        }
        else{
            this.hideNum();
        }
    },
    ShowHideNumButtonFun()
    {
        if(isshowNum==false)
        {
            this.showNum();
            this.ShowHideButtonLabel.string="隐藏数字"
        }
        else
        {
            this.hideNum();
            this.ShowHideButtonLabel.string="显示数字"
        }
    },
    //根据当前的ExitCell更新blocks
    updateCells(){
        for(let i=0;i<ROWS;i++)
        {
            for(let j=0;j<COLUMNS;j++)
            {
                if(ExitCell[i][j]==1)
                {
                    this.changeHasCellSprite(i,j);
                    this.blocks[i][j].getComponent('NumText').setNumber(0);
                }
                else{
                    this.changeHasNotCellSprite(i,j);
                    this.blocks[i][j].getComponent('NumText').setNumber(0);
                }         
            }
        }
        if(isshowNum==true)
        {
            this.showNum();
        }
        else{
            this.computeNumAround();
            this.hideNum();
        }
    },
    //隐藏周围细胞数目
    hideNum(){
        isshowNum=false;
        for(let i=0;i<ROWS;i++)
        {
            for(let j=0;j<COLUMNS;j++)
            {
                this.blocks[i][j].getComponent('NumText').setNumber(0);
            }
        }
    },
    //放大棋盘
    scaleIncrease(){
        //设置放大的上限为30*30
        if(ROWS<30&&COLUMNS<30)
        {
            //用originData存储当前所有细胞的坐标值，以便缩放后进行重新计算
            let originData=[];
            let iter=0;
            for(let i=0;i<(ROWS);i++){
                for(let j=0;j<(COLUMNS);j++){
                    if(ExitCell[i][j]==1)
                    {
                        //如果坐标i j处有细胞，我们就将此结果防止originData数组
                        //注意，此处放回的数据重新以棋盘左下角为原点
                        originData[iter]=cc.v2(i-centerx,j-centery);                       
                        iter++;                   
                    }
                    //销毁所有blocks以便重新绘制
                    this.blocks[i][j].destroy();
                }
            }
            //放大，行列数加5
            ROWS+=5;
            COLUMNS+=5;
            //将数组重新生成，匹配当前的行数和列数
            for(let i=0;i<ROWS;i++){
                ExitCell[i]=new Array();
                CellNum[i]=new Array();
                for(let j=0;j<COLUMNS;j++){
                    ExitCell[i][j]=0;
                    CellNum[i][j]=0;
                }
            }
            //重新绘制棋盘
            this.drawGrids();
            //重新计算棋盘的中心点。
            centerx=Math.floor(ROWS/2);
            centery=Math.floor((COLUMNS)/2);
            for(let k=0;k<originData.length;k++)
            {
                let m=originData[k].x+centerx;
                let n=originData[k].y+centery;
                //TODO：为了保证数组不越界我做了限制，但实际上这存在错误，因为越界的信息丢失了
                if(m>=0&&m<COLUMNS&&n>=0&&n<ROWS)
                {
                    this.changeHasCellSprite(m,n);
                    ExitCell[m][n]=1;
                }
                else{
                    console.log("Function Loadmodel out index");
                }
            }
        }

    },
    changeHasCellSprite(i,j){
        let x=this.positions[i][j].x;
        let y=this.positions[i][j].y;

        let block=cc.instantiate(this.hasPrefab);
        block.width=this.blockSize;
        block.height=this.blockSize;
        this.bg.addChild(block);
        block.setPosition(cc.v2(x,y));

        this.positions[i][j]=cc.v2(x,y);

        this.blocks[i][j].destroy();
        this.blocks[i][j]=block;
    },
    changeHasNotCellSprite(i,j){
        let x=this.positions[i][j].x;
        let y=this.positions[i][j].y;

        let block=cc.instantiate(this.blockPrefab);
        block.width=this.blockSize;
        block.height=this.blockSize;
        this.bg.addChild(block);
        block.setPosition(cc.v2(x,y));

        this.positions[i][j]=cc.v2(x,y);

        this.blocks[i][j].destroy();
        this.blocks[i][j]=block;
    },
    //此处缩小函数的作用同放大函数
    scaleDecrease(){
        if(ROWS>15&&COLUMNS>15)
        {
            let originData=[];
            let iter=0;
            for(let i=0;i<(ROWS);i++){
                for(let j=0;j<(COLUMNS);j++){
                    if(ExitCell[i][j]==1)
                    {
                        originData[iter]=cc.v2(i-centerx,j-centery);                       
                        iter++;                   
                    }
                    this.blocks[i][j].destroy();
                }
            }

            ROWS-=5;
            COLUMNS-=5;
            for(let i=0;i<ROWS;i++){
                ExitCell[i]=new Array();
                for(let j=0;j<COLUMNS;j++){
                    ExitCell[i][j]=0;
                }
            }

            this.drawGrids();

            centerx=Math.floor(ROWS/2);
            centery=Math.floor(COLUMNS/2);
            for(let k=0;k<originData.length;k++)
            {
                let m=originData[k].x+centerx;
                let n=originData[k].y+centery;

                if(m>=0&&m<COLUMNS&&n>=0&&n<ROWS)
                {
                    this.changeHasCellSprite(m,n);
                    ExitCell[m][n]=1;
                }
                else{
                    console.log("Function Loadmodel out index");
                }
            }
        }

    },
    //载入模型，此处设为1
    loadModelButtonClicked(){
        this.loadModel(0);
    },
    loadModel(modelNum)
    {
        ModelIndex=modelNum;
        //设置centerx和centery是因为为了利于缩放，以棋盘中心为原点。
        centerx=Math.floor(ROWS/2);
        centery=Math.floor((COLUMNS)/2);
        //首先清零
        for(let i=0;i<ROWS;i++)
        {
            for(let j=0;j<COLUMNS;j++)
            {
                this.changeHasNotCellSprite(i,j);
                this.blocks[i][j].getComponent('NumText').setNumber(0);
                ExitCell[i][j]=0;             
            }
        }
        //载入数据
        for(let k=0;k<ModelData.modelDatas[modelNum].length;k++)
        {
            let m=ModelData.modelDatas[modelNum][k].x+centerx;
            let n=ModelData.modelDatas[modelNum][k].y+centery;
 
            if(m>=0&&m<COLUMNS&&n>=0&&n<ROWS)
            {
                this.changeHasCellSprite(m,n);
                ExitCell[m][n]=1;
            }
            else{
                console.log("Function Loadmodel out index");
            }
 
        }


        this.hideNum();
        //计算初始周围细胞数
        this.computeNumAround();
    },
     //显示周围细胞数目
    showNum(){
        isshowNum=true;
        this.computeNumAround();
        for(let i=0;i<ROWS;i++)
        {
            for(let j=0;j<COLUMNS;j++)
            {
                this.blocks[i][j].getComponent('NumText').setNumber(CellNum[i][j]);
            }
        }
    },
    //计算周围细胞数目
    computeNumAround()
    {
        //暂时数组
         let TempCell=new Array();
        for(let i=0;i<ROWS;i++){
            TempCell[i]=new Array();
            for(let j=0;j<COLUMNS;j++){
                TempCell[i][j]=0;
            }
          }
        for(let i=0;i<ROWS;i++)
        {
            for(let j=0;j<COLUMNS;j++)
            {
                let aroundNum=0;
                for(let k=-1;k<=1;k++)
                {
                    for(let l=-1;l<=1;l++)
                    {
                        //如果这个细胞不是自己，且未越界，且存在细胞，则周围细胞数+1
                        if((k!=0||l!=0)&&
                        (i+k)>=0&&(i+k)<ROWS&&
                        (j+l)>=0&&(j+l)<COLUMNS&&
                        (ExitCell[i+k][j+l]!=0))
                        {
                            aroundNum++;
                        }
                    }
                }
                    TempCell[i][j]=aroundNum;
             }
        }
         CellNum=TempCell;
    },

    //生成下一代细胞
    nextGenCell(){
        
        this.computeNumAround();
        for(let i=0;i<ROWS;i++)
        {
            for(let j=0;j<COLUMNS;j++)
            {
                //此处有细胞，且周围细胞数不等于可存活数目，则该细胞死亡
                if(ExitCell[i][j]==1){
                    this.changeHasNotCellSprite(i,j);
                    ExitCell[i][j]=0;
                    for(let p=0;p<ModelData.surviveNums[ModelIndex].length;p++)
                    {
                        if(CellNum[i][j]==ModelData.surviveNums[ModelIndex][p])
                        {
                            this.changeHasCellSprite(i,j);
                            ExitCell[i][j]=1;
                        }
                    }

                }
    
                //此处没有细胞，且周围细胞数为等于允许出生数量，则生成一个细胞
                else{
                    for(let p=0;p<ModelData.bornNums[ModelIndex].length;p++)
                    {
                        if(CellNum[i][j]==ModelData.bornNums[ModelIndex][p])
                        {
                            this.changeHasCellSprite(i,j);
                            ExitCell[i][j]=1;
                        }
                    }
                }              
            }
        }
        if(isshowNum==true)
        {
            this.showNum();
        }
        else{
            this.hideNum();
        }
    },
    //这个函数是初始化棋盘的函数
    drawGrids(){
        //动态地设置间隔
        this.gap=30.0/COLUMNS;

        this.blockSize=(cc.winSize.width-this.gap*(COLUMNS+1))/COLUMNS;
        
        let x=this.gap+this.blockSize/2;
        //let y=this.gap+this.blockSize/2+this.blockSize*4.0;
        let y=cc.winSize.height*0.15;
        this.positions=new Array();
        this.blocks=new Array();
        for(let i=0;i<ROWS;i++){
            this.positions[i]=new Array();
            this.blocks[i]=new Array();
            for(let j=0;j<COLUMNS;j++){
                this.positions[i][j]=0;
            }
        }

        
        for( let j=0;j<ROWS;j++)
        {
            for(let i=0;i<COLUMNS;i++)
            {
                //实例化prefab
                let block=cc.instantiate(this.blockPrefab);
                block.width=this.blockSize;
                block.height=this.blockSize;

                this.bg.addChild(block);
                block.setPosition(cc.v2(x,y));

                this.positions[i][j]=cc.v2(x,y);

                this.blocks[i][j]=block;

                x+=this.gap+this.blockSize;
            }
            y+=this.gap+this.blockSize;
            x=this.gap+this.blockSize/2;
        }
        this.hideNum();
    },
    //切换状态，=true时细胞自动繁殖至下一代，=false时停止
    startEndButtonClicked(){
        isStartState=!isStartState;
        console.log(isStartState);
    },
    returnButtonClicked:function(){
        this.clearButton();
        isStartState=false;
        cc.director.loadScene("MainScene"); 
    },
    //清除所有细胞
    clearButton(){
        for(let i=0;i<ROWS;i++){
            for(let j=0;j<COLUMNS;j++){
                ExitCell[i][j]=0;
                CellNum[i][j]=0;
            }
        }
        this.nextGenCell();
        this.updateCells();
    },
    //细胞不停地繁殖，时间间隔为timegap，单位秒
    update (dt) {
        lasttime+=dt;
        if(lasttime>timegap)
        {
            //console(lasttime);
            lasttime=0.0;
            if(isStartState){
                this.nextGenCell();
                this.updateCells();
            }
        }

     },

     //初始化载入模型列表
    initLoadList(){
        this.items=[];
        this.spacing=15;
        this.content=this.scrollView.content;
        this.itemNum=modelName.length;
        this.content.height=this.itemNum*(this.itemTemplate.height+this.spacing)+this.spacing;
        for(let k=0;k<this.itemNum;k++){
            let item=cc.instantiate(this.itemTemplate);
            console.log(k);
            item.getComponent('ItemButton').setNumAndName(k,ModelData.modelName[k]);
            
            this.content.addChild(item);
            item.setPosition(0,-item.height*(k+0.5)-this.spacing*(k+1)-30.0);
            this.items.push(item);
        }
    },
    showScorollView(){
        this.scrollView.node.active=true;
        this.scrollviewback.active=true;
    },
    //隐藏载入模型列表
    disableScorollView(){
        this.scrollView.node.active=false;
        this.scrollviewback.active=false;
    },
});
