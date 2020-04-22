const ROWS=15;
const COLUMNS=15;
var isshowNum=true;
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


cc.Class({
    extends: cc.Component,

    properties: {
        
        blockPrefab:cc.Prefab,
        bg:cc.Node,
        canvas:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.drawGrids();

        var self = this;
        self.canvas.on(cc.Node.EventType.TOUCH_START, function (event) {
           this.touchedEvent(event);
           }, self);
    },
     //触摸事件
    touchedEvent(event){
        var touches = event.getTouches();
        var touchLoc = touches[0].getLocation();

        //获取触碰到的方块 i j
        this.touchi=Math.floor((touchLoc.x-this.gap)/(this.blockSize+this.gap));   
        
        //可能存在错误
        this.touchj=Math.floor((touchLoc.y-this.gap)/(this.blockSize+this.gap));

        if(this.touchj<ROWS)
        {
            this.blocks[this.touchi][this.touchj].color=cc.color(0,100,100,255);
            ExitCell[this.touchi][this.touchj]=1;
        }

        if(isshowNum==true)
        {
            this.showNum();
        }
        else{
            this.hideNum();
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
                    this.blocks[i][j].color=cc.color(0,100,100,255);
                    this.blocks[i][j].getComponent('NumText').setNumber(0);
                }
                else{
                    this.blocks[i][j].color=cc.color(200,114,114,255);
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
               //此处有细胞，且周围细胞数<2且>3，则该细胞死亡
               if(ExitCell[i][j]==1&&(CellNum[i][j]<2||CellNum[i][j]>3)){
                   this.blocks[i][j].color=cc.color(200,114,114,255);
                   ExitCell[i][j]=0;
               }
   
               //此处没有细胞，且周围细胞数为3，则生成一个细胞
               if(ExitCell[i][j]==0&&CellNum[i][j]==3){
                   this.blocks[i][j].color=cc.color(0,100,100,255);
                   ExitCell[i][j]=1;
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
    drawGrids(){
        this.gap=75.0/COLUMNS;

        this.blockSize=(cc.winSize.width-this.gap*(COLUMNS+1))/COLUMNS;
        
        let x=this.gap+this.blockSize/2;
        let y=this.gap+this.blockSize/2;
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
        this.showNum();
    },
    startEndButtonClicked(){
        isStartState=!isStartState;
        console.log(isStartState);
    },
    returnButtonClicked:function(){
        cc.director.loadScene("MainScene"); 
    },
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
});
