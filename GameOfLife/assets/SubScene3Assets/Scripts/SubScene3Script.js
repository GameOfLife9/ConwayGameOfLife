//ModelData存储模型坐标信息
import * as ModelData from 'ModelData';
import {
    modelName
} from './ModelData';
var ROWS = 20;
var COLUMNS = 20;
var isshowNum = false;
//当前关卡级数，用于loadLevel
var OROWS=30;
var OCOLUMNS=30;
//暂时变量，之后删掉
var display = true;
//exitcell用于判断格子i j是否有细胞
//blocks用于存储细胞实体
var ExitCell = new Array();
for (let i = 0; i < OROWS; i++) {
    ExitCell[i] = new Array();
    for (let j = 0; j < OCOLUMNS; j++) {
        ExitCell[i][j] = 0;
    }
}

//cellNum实时存储细胞ij周围细胞数目
var CellNum = new Array();
for (let i = 0; i < OROWS; i++) {
    CellNum[i] = new Array();
    for (let j = 0; j < OCOLUMNS; j++) {
        CellNum[i][j] = 0;
    }
}
var isStartState = false;

var lasttime = 0.0;
var timegap = 0.25;

var ModelIndex = 0;
var centerx = 0;
var centery = 0;
cc.Class({
    extends: cc.Component,

    properties: {
        itemTemplate: {
            default: null,
            type: cc.Node
        },
        blockPrefab: cc.Prefab,
        hasPrefab: cc.Prefab,
        bg: cc.Node,
        canvas: cc.Node,
        scrollviewback: cc.Node,
        showHideNumButton: cc.Button,
        ShowHideButtonLabel: cc.Label,
        startBtn: cc.Node,
        endBtn: cc.Node,
        scrollView: {
            default: null,
            type: cc.ScrollView
        },
    },

    changeSize(node, size, x, y) {
        node.width = size;
        node.height = size;
        node.x = x;
        node.y = y;
    },

    onLoad() {
        let windowSize = cc.view.getVisibleSize();
        let tWidth = windowSize.width;
        let tHeight = windowSize.height;
        let tx = -tWidth / 2;
        let ty = -tHeight / 2;
        let btnSize = tWidth / 9;
        let dx = (tWidth - 4 * btnSize) / 5;
        let btsY = tHeight * 0.025;

        let tnode = this.node.getChildByName("ScaleDecrease_Button");
        tx = dx + tx + btnSize / 2;
        this.changeSize(tnode, btnSize, tx, ty + btsY + btnSize / 2);

        tnode = this.node.getChildByName("ScaleIncrease_Button");
        tx = tx + dx + btnSize;
        this.changeSize(tnode, btnSize, tx, ty + btsY + btnSize / 2);

        tnode = this.node.getChildByName("ShowNum_Button");
        tx = tx + dx + btnSize;
        this.changeSize(tnode, btnSize, tx, ty + btsY + btnSize / 2);

        tnode = this.node.getChildByName("NextGeneration_Button");
        tx = tx + dx + btnSize;
        this.changeSize(tnode, btnSize, tx, ty + btsY + btnSize / 2);

        tx = -tWidth / 2;
        tnode = this.node.getChildByName("ReturnButton");
        tx = dx + tx + btnSize / 2;
        this.changeSize(tnode, btnSize, tx, -ty - btsY - btnSize / 2);

        tnode = this.node.getChildByName("Clear_Button");
        tx = dx + tx + btnSize;
        this.changeSize(tnode, btnSize, tx, -ty - btsY - btnSize / 2);

        tnode = this.node.getChildByName("LoadModel_Button");
        tx = dx + tx + btnSize;
        this.changeSize(tnode, btnSize, tx, -ty - btsY - btnSize / 2);

        tx = dx + tx + btnSize;
        this.changeSize(this.startBtn, btnSize, tx, -ty - btsY - btnSize / 2);

        this.changeSize(this.endBtn, btnSize, tx, -ty - btsY - btnSize / 2);
    },

    start() {
        this.drawGrids();

        var self = this;
        self.canvas.on(cc.Node.EventType.TOUCH_START, function (event) {
            this.touchedEvent(event);
        }, self);
        this.initLoadList();
    },
    //触摸事件
    touchedEvent(event) {
        var touches = event.getTouches();
        var touchLoc = touches[0].getLocation();

        //获取触碰到的方块 i j
        this.touchi = Math.floor((touchLoc.x - this.gap-this.blockSize/2) / (this.blockSize + this.gap));

        //可能存在错误
        //this.touchj=Math.floor((touchLoc.y-this.gap-this.blockSize*4.0)/(this.blockSize+this.gap));
        this.touchj = Math.floor((touchLoc.y - cc.winSize.height * 0.15 + this.blockSize / 2.0) / (this.blockSize + this.gap));
        if (this.touchj < ROWS && this.touchj >= 0&&this.touchi>=0&&this.touchi<COLUMNS) {
            let ii=this.touchi-centerx;
            let jj=this.touchj-centery;
            ii+=Math.floor(OROWS/2);
            jj+=Math.floor(OCOLUMNS/2);
            if (ExitCell[ii][jj] == 1) {
                this.changeHasNotCellSprite(this.touchi, this.touchj);
                ExitCell[ii][jj] = 0;
            } else {
                this.changeHasCellSprite(this.touchi, this.touchj);
                ExitCell[ii][jj] = 1;
            }
        }

        if (isshowNum == true) {
            this.showNum();
        } else {
            this.hideNum();
        }
    },
    ShowHideNumButtonFun() {
        if (isshowNum == false) {
            this.showNum();
            this.ShowHideButtonLabel.string = "隐藏数字"
        } else {
            this.hideNum();
            this.ShowHideButtonLabel.string = "显示数字"
        }
    },
    //根据当前的ExitCell更新blocks
    updateCells() {
        for(let i=0;i<ROWS;i++)
        {
            for(let j=0;j<COLUMNS;j++)
            {
                let ii=i-centerx+Math.floor(OROWS/2);
                let jj=j-centery+Math.floor(OCOLUMNS/2);
                
                if(ExitCell[ii][jj]==1)
                {
                    this.changeHasCellSprite(i, j);
                    this.blocks[i][j].getComponent('NumText').setNumber(0);
                }
                else
                {
                    this.changeHasNotCellSprite(i, j);
                    this.blocks[i][j].getComponent('NumText').setNumber(0);
                }
            }
        }
        if (isshowNum == true) {
            this.showNum();
        } else {
            this.computeNumAround();
            this.hideNum();
        }
    },
    //隐藏周围细胞数目
    hideNum() {
        isshowNum = false;
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLUMNS; j++) {
                this.blocks[i][j].getComponent('NumText').setNumber(0);
            }
        }
    },
    //放大棋盘
    scaleIncrease() {
        //设置放大的上限为30*30
        if (ROWS < 30 && COLUMNS < 30) {
            for(let i=0;i<ROWS;i++)
            {
                for(let j=0;j<COLUMNS;j++)
                {
                    this.blocks[i][j].destroy();
                }
            }
            ROWS += 5;
            COLUMNS += 5;
 
            //重新绘制棋盘
            this.drawGrids();
            //重新计算棋盘的中心点。
            centerx = Math.floor(ROWS / 2);
            centery = Math.floor((COLUMNS) / 2);
            for(let i=0;i<ROWS;i++)
            {
                for(let j=0;j<COLUMNS;j++)
                {
                    let ii=i-centerx+Math.floor(OROWS/2);
                    let jj=j-centery+Math.floor(OCOLUMNS/2);
                    if(ExitCell[ii][jj]==1)
                    {
                        this.changeHasCellSprite(i, j);
                        this.blocks[i][j].getComponent('NumText').setNumber(0);
                    }
                    else
                    {
                        this.changeHasNotCellSprite(i, j);
                        this.blocks[i][j].getComponent('NumText').setNumber(0);
                    }
                }
            }
        }

    },
    changeHasCellSprite(i, j) {
        let x = this.positions[i][j].x;
        let y = this.positions[i][j].y;

        let block = cc.instantiate(this.hasPrefab);
        block.width = this.blockSize;
        block.height = this.blockSize;
        this.bg.addChild(block);
        block.setPosition(cc.v2(x, y));

        this.positions[i][j] = cc.v2(x, y);

        this.blocks[i][j].destroy();
        this.blocks[i][j] = block;
    },
    changeHasNotCellSprite(i, j) {
        let x = this.positions[i][j].x;
        let y = this.positions[i][j].y;

        let block = cc.instantiate(this.blockPrefab);
        block.width = this.blockSize;
        block.height = this.blockSize;
        this.bg.addChild(block);
        block.setPosition(cc.v2(x, y));

        this.positions[i][j] = cc.v2(x, y);

        this.blocks[i][j].destroy();
        this.blocks[i][j] = block;
    },
    //此处缩小函数的作用同放大函数
    scaleDecrease() {
        if (ROWS > 15 && COLUMNS > 15) {
            for(let i=0;i<ROWS;i++)
            {
                for(let j=0;j<COLUMNS;j++)
                {
                    this.blocks[i][j].destroy();
                }
            }
            ROWS -= 5;
            COLUMNS -= 5;

            //重新绘制棋盘
            this.drawGrids();
            //重新计算棋盘的中心点。
            centerx = Math.floor(ROWS / 2);
            centery = Math.floor((COLUMNS) / 2);
            for(let i=0;i<ROWS;i++)
            {
                for(let j=0;j<COLUMNS;j++)
                {
                    let ii=i-centerx+Math.floor(OROWS/2);
                    let jj=j-centery+Math.floor(OCOLUMNS/2);
                    if(ExitCell[ii][jj]==1)
                    {
                        this.changeHasCellSprite(i, j);
                        this.blocks[i][j].getComponent('NumText').setNumber(0);
                    }
                    else
                    {
                        this.changeHasNotCellSprite(i, j);
                        this.blocks[i][j].getComponent('NumText').setNumber(0);
                    }
                }
            }
        }

    },
    //载入模型，此处设为1
    loadModelButtonClicked() {
        this.loadModel(0);
    },
    loadModel(modelNum) {
        ModelIndex = modelNum;
        //设置centerx和centery是因为为了利于缩放，以棋盘中心为原点。
        centerx = Math.floor(ROWS / 2);
        centery = Math.floor((COLUMNS) / 2);
        //首先清零
        for (let i = 0; i < OROWS; i++) {
            for (let j = 0; j < OCOLUMNS; j++) {
                ExitCell[i][j] = 0;
            }
        }
        //载入数据
        for (let k = 0; k < ModelData.modelDatas[modelNum].length; k++) {
            let m = ModelData.modelDatas[modelNum][k].x + Math.floor(OROWS / 2);
            let n = ModelData.modelDatas[modelNum][k].y + Math.floor(OCOLUMNS / 2);

            if (m >= 0 && m < OCOLUMNS && n >= 0 && n < OROWS) {
                ExitCell[m][n] = 1;
            } else {
                console.log("Function Loadmodel out index");
            }

        }
        for(let i=0;i<ROWS;i++)
        {
            for(let j=0;j<COLUMNS;j++)
            {
                let ii=i-centerx+Math.floor(OROWS/2);
                let jj=j-centery+Math.floor(OCOLUMNS/2);
                if(ExitCell[ii][jj]==1)
                {
                    this.changeHasCellSprite(i, j);
                    this.blocks[i][j].getComponent('NumText').setNumber(0);
                }
                else
                {
                    this.changeHasNotCellSprite(i, j);
                    this.blocks[i][j].getComponent('NumText').setNumber(0);
                }
            }
        }

        this.hideNum();
        //计算初始周围细胞数
        this.computeNumAround();
    },
    //显示周围细胞数目
    showNum() {
        isshowNum = true;
        this.computeNumAround();
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLUMNS; j++) {
                let ii=i-centerx+Math.floor(OROWS/2);
                let jj=j-centery+Math.floor(OCOLUMNS/2);
                this.blocks[i][j].getComponent('NumText').setNumber(CellNum[ii][jj]);
            }
        }
    },
    //计算周围细胞数目
    computeNumAround() {
        //暂时数组
        let TempCell = new Array();
        for (let i = 0; i < OROWS; i++) {
            TempCell[i] = new Array();
            for (let j = 0; j < OCOLUMNS; j++) {
                TempCell[i][j] = 0;
            }
        }
        for (let i = 0; i < OROWS; i++) {
            for (let j = 0; j < OCOLUMNS; j++) {
                let aroundNum = 0;
                for (let k = -1; k <= 1; k++) {
                    for (let l = -1; l <= 1; l++) {
                        //如果这个细胞不是自己，且未越界，且存在细胞，则周围细胞数+1
                        if ((k != 0 || l != 0) &&
                            (i + k) >= 0 && (i + k) < ROWS &&
                            (j + l) >= 0 && (j + l) < COLUMNS &&
                            (ExitCell[i + k][j + l] != 0)) {
                            aroundNum++;
                        }
                    }
                }
                TempCell[i][j] = aroundNum;
            }
        }
        CellNum = TempCell;
    },

    //生成下一代细胞
    nextGenCell() {

        this.computeNumAround();
        for (let i = 0; i < OROWS; i++) {
            for (let j = 0; j < OCOLUMNS; j++) {
                //此处有细胞，且周围细胞数不等于可存活数目，则该细胞死亡
                if (ExitCell[i][j] == 1) {
                    ExitCell[i][j] = 0;
                    for (let p = 0; p < ModelData.surviveNums[ModelIndex].length; p++) {
                        if (CellNum[i][j] == ModelData.surviveNums[ModelIndex][p]) {
                            ExitCell[i][j] = 1;
                        }
                    }

                }

                //此处没有细胞，且周围细胞数为等于允许出生数量，则生成一个细胞
                else {
                    for (let p = 0; p < ModelData.bornNums[ModelIndex].length; p++) {
                        if (CellNum[i][j] == ModelData.bornNums[ModelIndex][p]) {
                            ExitCell[i][j] = 1;
                        }
                    }
                }
            }
        }
        this.updateCells();
    },
    //这个函数是初始化棋盘的函数
    drawGrids() {
        //动态地设置间隔
        this.gap = 1;

        this.blockSize = (cc.winSize.width - this.gap * (COLUMNS + 2)) / (COLUMNS + 1);

        let x = this.gap + this.blockSize;
        //let y=this.gap+this.blockSize/2+this.blockSize*4.0;
        let y = cc.winSize.height * 0.15;
        this.positions = new Array();
        this.blocks = new Array();
        for (let i = 0; i < ROWS; i++) {
            this.positions[i] = new Array();
            this.blocks[i] = new Array();
            for (let j = 0; j < COLUMNS; j++) {
                this.positions[i][j] = 0;
            }
        }


        for (let j = 0; j < ROWS; j++) {
            for (let i = 0; i < COLUMNS; i++) {
                //实例化prefab
                let block = cc.instantiate(this.blockPrefab);
                block.width = this.blockSize;
                block.height = this.blockSize;

                this.bg.addChild(block);
                block.setPosition(cc.v2(x, y));

                this.positions[i][j] = cc.v2(x, y);

                this.blocks[i][j] = block;

                x += this.gap + this.blockSize;
            }
            y += this.gap + this.blockSize;
            x = this.gap + this.blockSize;
        }
        this.hideNum();
    },
    //切换状态，=true时细胞自动繁殖至下一代，=false时停止
    startEndButtonClicked() {
        isStartState = !isStartState;
        if (isStartState) {
            this.endBtn.active = true;
            this.startBtn.active = false;
        } else {
            this.startBtn.active = true;
            this.endBtn.active = false;
        }
        console.log(isStartState);
    },
    returnButtonClicked: function () {
        this.clearButton();
        isStartState = false;
        cc.director.loadScene("MainScene");
    },
    //清除所有细胞
    clearButton() {
        for (let i = 0; i < OROWS; i++) {
            for (let j = 0; j < OCOLUMNS; j++) {
                ExitCell[i][j] = 0;
                CellNum[i][j] = 0;
            }
        }
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLUMNS; j++) {
                this.changeHasNotCellSprite(i, j);
                this.blocks[i][j].getComponent('NumText').setNumber(0);
            }
        }
        //this.nextGenCell();
        //this.updateCells();
    },
    //细胞不停地繁殖，时间间隔为timegap，单位秒
    update(dt) {
        lasttime += dt;
        if (lasttime > timegap) {
            //console(lasttime);
            lasttime = 0.0;
            if (isStartState) {
                this.nextGenCell();
                this.updateCells();
            }
        }

    },

    //初始化载入模型列表
    initLoadList() {
        this.items = [];
        this.spacing = 15;
        this.content = this.scrollView.content;
        this.itemNum = modelName.length;
        this.content.height = this.itemNum * (this.itemTemplate.height + this.spacing) + this.spacing;
        for (let k = 0; k < this.itemNum; k++) {
            let item = cc.instantiate(this.itemTemplate);
            console.log(k);
            item.getComponent('ItemButton').setNumAndName(k, ModelData.modelName[k]);

            this.content.addChild(item);
            item.setPosition(0, -item.height * (k + 0.5) - this.spacing * (k + 1) - 30.0);
            this.items.push(item);
        }
    },
    showScorollView() {
        this.scrollView.node.active = true;
        this.scrollviewback.active = true;
    },
    //隐藏载入模型列表
    disableScorollView() {
        this.scrollView.node.active = false;
        this.scrollviewback.active = false;
    },
});