import * as GridData from 'GridData';
const ROWS=15;
const COLUMNS=15;
var isshowNum=true;
//当前关卡级数，用于loadLevel
var level=0;

var stepUse=1;
var available=1;
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
var lastCells=new Array();
for(let i=0;i<ROWS;i++){
    lastCells[i]=new Array();
    for(let j=0;j<COLUMNS;j++){
        lastCells[i][j]=0;
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
cc.Class({
    extends: cc.Component,

    properties: {
        gap:0.1,
        //细胞预制件
        blockPrefab:cc.Prefab,
        hasPrefab:cc.Prefab,
        bg:cc.Node,
        levelLabel:cc.Label,
        canvas:cc.Node,
        showHideNumButton:cc.Button,
        ShowHideButtonLabel:cc.Label,
        ShowRequireButtonLabel:cc.Label,
    },
    start () {
        this.drawGrids();

         //获取触碰到的方块的索引i j
        var self = this;
        self.canvas.on(cc.Node.EventType.TOUCH_START, function (event) {
           this.touchedEvent(event);
           }, self);
    },
    //判断是否通关
    judgeAccom(){
        let isAccmp=true;
        for(let i=0;i<ROWS;i++)
        {
            for(let j=0;j<COLUMNS;j++)
            {
                //如果当前格子没有细胞，但是通关要求此处有细胞，则未通关
                if(ExitCell[i][j]==0){
                    for(let k=0;k<GridData.levelsEnd[level].length;k++)
                    {
                        let m=GridData.levelsEnd[level][k].x;
                        let n=GridData.levelsEnd[level][k].y;
                        if(m==i&&n==j){
                            isAccmp=false;
                        }
                    }
                }
                //如果当前格子有细胞，但是通关要求此处没有细胞，则未通关
                else{
                    let hasfind=false;
                    for(let k=0;k<GridData.levelsEnd[level].length;k++)
                    {
                        let m=GridData.levelsEnd[level][k].x;
                        let n=GridData.levelsEnd[level][k].y;
                        if(m==i&&n==j){
                            hasfind=true;
                        }
                    }
                    if(hasfind==false){
                        isAccmp=false;
                    }
                }
            }
        }
        //如果通关，执行通关操作
        console.log("通关？",isAccmp);
        if(isAccmp==true){
            this.accomplish();
        }
    },
    //通关操作，载入下一关
    accomplish(){
        level++;
        if(level<GridData.levelsEnd.length){
            console.log("loadlevel");
            this.loadlevel();
        }          
    },
    //触摸事件
    touchedEvent(event){
        var touches = event.getTouches();
        var touchLoc = touches[0].getLocation();

        //获取触碰到的方块 i j
        this.touchi=Math.floor((touchLoc.x-this.gap)/(this.blockSize+this.gap));   
        
        //可能存在错误
        this.touchj=Math.floor((touchLoc.y-this.gap-this.blockSize*4.0)/(this.blockSize+this.gap));

        if(this.touchj<ROWS&&available>0)
        {          
            for(let i=0;i<ROWS;i++){
                for(let j=0;j<COLUMNS;j++){
                    lastCells[i][j]=ExitCell[i][j];
                }
            }
            available--;
            this.levelLabel.string="Lv:"+(level+1)+"  本关还可下"+available+"个棋子，\n目标分布为繁衍"+stepUse+"代后的分布";
            this.changeHasCellSprite(this.touchi,this.touchj);
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
    //显示或者隐藏通关要求
    displayOrHideReq(){    
        if(display){
            this.ShowRequireButtonLabel.string="隐藏通关要求"
            for(let k=0;k<GridData.levelsEnd[level].length;k++)
            {
                let m=GridData.levelsEnd[level][k].x;
                let n=GridData.levelsEnd[level][k].y;
                
                this.blocks[m][n].color=cc.color(50,10,150,255);
            }
            display=false;
        }else{
            this.ShowRequireButtonLabel.string="显示通关要求"
            this.updateCells();
            display=true;
        }

    },
    //载入关卡
    loadlevel(){
        //更新当前关卡
        this.levelLabel.string="Lv:"+(level+1)+"  本关还可下"+available+"个棋子，\n目标分布为繁衍"+stepUse+"代后的分布";
        //首先清零
        for(let i=0;i<ROWS;i++)
        {
            for(let j=0;j<COLUMNS;j++)
            {
                //this.blocks[i][j].color=cc.color(200,114,114,255);
                this.changeHasNotCellSprite(i,j);
                this.blocks[i][j].getComponent('NumText').setNumber(0);
                ExitCell[i][j]=0;             
            }
        }
        this.levelLabel.string="Lv:"+(level+1)+"  本关还可下"+available+"个棋子，\n目标分布为繁衍"+stepUse+"代后的分布";
        available=GridData.availableCell[level];
        //载入数据
        for(let k=0;k<GridData.levelsStart[level].length;k++)
        {
            let m=GridData.levelsStart[level][k].x;
            let n=GridData.levelsStart[level][k].y;
            
           // this.blocks[m][n].color=cc.color(0,100,100,255);
            this.changeHasCellSprite(m,n);
            ExitCell[m][n]=1;
        }
        //计算初始周围细胞数
        this.computeNumAround();
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
    //重新开始
    resStart(){
        this.loadlevel();
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
    //返回上一代细胞
    returnLastCell(){
        if(lastCells!=null)
        {
            for(let i=0;i<ROWS;i++){
                for(let j=0;j<COLUMNS;j++){
                    ExitCell[i][j]=lastCells[i][j];
                }
            }
            this.updateCells();
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
    //生成下一代细胞
    nextGenCell(){
        for(let i=0;i<ROWS;i++){
            for(let j=0;j<COLUMNS;j++){
                lastCells[i][j]=ExitCell[i][j];
            }
        }
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
        if(stepUse>0)
        {
            stepUse--;
            this.levelLabel.string="Lv:"+(level+1)+"  本关还可下"+available+"个棋子，\n目标分布为繁衍"+stepUse+"代后的分布";
        }

        if(isshowNum==true)
        {
            this.showNum();
        }
        else{
            this.hideNum();
        }
        if(stepUse==0)
        {
            this.judgeAccom();
        }
  
    },
    drawGrids(){
        this.blockSize=(cc.winSize.width-this.gap*(COLUMNS+1))/COLUMNS;
        let x=this.gap+this.blockSize/2;
        let y=this.gap+this.blockSize/2+this.blockSize*4.0;
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

        this.loadlevel();
        this.showNum();
    },
    /*
     update (dt) {
         
     },*/
});
