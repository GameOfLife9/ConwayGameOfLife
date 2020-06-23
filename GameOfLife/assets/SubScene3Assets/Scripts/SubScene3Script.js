//ModelData存储模型坐标信息
import * as ModelData from 'ModelData';
import {
    modelName
} from './ModelData';
var ROWS = 20;
var COLUMNS = 20;
var THEMAX = 50;
var isshowNum = false;
var theI = 0; //与ROWS对应
var theJ = 0; //与COLUMNS对应

var theRows = new Array(); //
var theCol = new Array();
//当前关卡级数，用于loadLevel

//暂时变量，之后删掉
var display = true;
//exitcell用于判断格子i j是否有细胞
//blocks用于存储细胞实体
var ExitCell = new Array();

//cellNum实时存储细胞ij周围细胞数目
var CellNum = new Array();

var isStartState = false;

var lasttime = 0.0;
var timegap = 0.15;

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
        SetCellAudio: {
            type: cc.AudioSource,           
            default: null          
        },
        ButtonAudio: {
            type: cc.AudioSource,           
            default: null          
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
    ButtonAudioPlay()
    {
        this.ButtonAudio.play();
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
        this.touchj = -1;
        this.touchi = -1;
        for (let i = 0; i < ROWS; i++) {
            if (touchLoc.y > theRows[i][1]) continue;
            if (touchLoc.y >= theRows[i][0]) {
                this.touchi = i;
                break;
            } else break;
        }
        for (let i = 0; i < COLUMNS; i++) {
            if (touchLoc.x > theCol[i][1]) continue;
            if (touchLoc.x >= theCol[i][0]) {
                this.touchj = i;
                break;
            } else break;
        }
        //this.touchj = Math.floor((touchLoc.x - this.gap) / (this.blockSize + this.gap));

        //可能存在错误
        //this.touchj=Math.floor((touchLoc.y-this.gap-this.blockSize*4.0)/(this.blockSize+this.gap));
        // this.touchi = Math.floor((touchLoc.y - cc.winSize.height * 0.15 + this.blockSize / 2.0) / (this.blockSize + this.gap));
        if (this.touchj != -1 && this.touchi != -1) {
            if (ExitCell[this.touchi + theI][this.touchj + theJ] == 1) {
                this.changeHasNotCellSprite(this.touchi + theI, this.touchj + theJ);
                ExitCell[this.touchi + theI][this.touchj + theJ] = 0;
                this.SetCellAudio.play();
            } else {
                this.changeHasCellSprite(this.touchi + theI, this.touchj + theJ);
                ExitCell[this.touchi + theI][this.touchj + theJ] = 1;
                this.SetCellAudio.play();
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
        for (let i = 0; i < THEMAX; i++) {
            for (let j = 0; j < THEMAX; j++) {
                if (ExitCell[i][j] == 1) {
                    this.changeHasCellSprite(i, j);
                    this.blocks[i][j].getComponent('NumText').setNumber(0,);
                } else {
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
        for (let i = theI; i < theI + ROWS; i++) {
            for (let j = theJ; j < theJ + COLUMNS; j++) {
                this.blocks[i][j].getComponent('NumText').setNumber(0);
            }
        }
    },
    changeChessSize(){
        theI = Math.floor((THEMAX - ROWS) / 2);
        theJ = Math.floor((THEMAX - COLUMNS) / 2);
        this.blockSize = (cc.winSize.width - this.gap * (COLUMNS + 2)) / (COLUMNS + 1);
        let ty = cc.winSize.height * 0.15 - this.blockSize / 2;
        theRows = new Array();
        for (let i = 0; i < ROWS; i++) {
            theRows[i] = new Array();
            theRows[i][0] = ty;
            ty += this.gap + this.blockSize;
            theRows[i][1] = ty;
        }
        theCol = new Array();
        let tx = this.gap + this.blockSize / 2;
        for (let i = 0; i < COLUMNS; i++) {
            theCol[i] = new Array();
            theCol[i][0] = tx;
            tx += this.gap + this.blockSize;
            theCol[i][1] = tx;
        }
        let x = this.gap + this.blockSize;
        //let y=this.gap+this.blockSize/2+this.blockSize*4.0;
        let y = cc.winSize.height * 0.15;

        for(let i = 0;i<THEMAX;i++){
            for(let j=0;j<THEMAX;j++){
                this.blocks[i][j].x = -1000;
                this.blocks[i][j].y = 0;
                this.positions[i][j] = cc.v2(-1000, 0);
            }
        }
        for (let i = theI; i < theI + ROWS; i++) {
            for (let j = theJ; j < theJ + COLUMNS; j++) {
                this.blocks[i][j].x = x;
                this.blocks[i][j].y = y;
                this.blocks[i][j].width = this.blockSize;
                this.blocks[i][j].height = this.blockSize;
                this.blocks[i][j]._children[0].width = this.blockSize;
                this.blocks[i][j]._children[0].height = this.blockSize;
                this.blocks[i][j]._children[1].width = this.blockSize;
                this.blocks[i][j]._children[1].height = this.blockSize;
                this.positions[i][j] = cc.v2(x, y);
                x += this.gap + this.blockSize;
            }
            y += this.gap + this.blockSize;
            x = this.gap + this.blockSize;
        }
        if (isshowNum == true) {
            this.showNum();
        } else {
            this.hideNum();
        }
    },
    //放大棋盘
    scaleIncrease() {
        //设置放大的上限为50*50
        if (ROWS < THEMAX && COLUMNS < THEMAX) {
            ROWS += 5;
            COLUMNS += 5;
            this.changeChessSize();
        }

    },
    changeHasCellSprite(i, j) {
        this.blocks[i][j]._children[0].active = false;
        this.blocks[i][j]._children[1].active = true;
    },
    changeHasNotCellSprite(i, j) {
        this.blocks[i][j]._children[0].active = true;
        this.blocks[i][j]._children[1].active = false;
    },
    //此处缩小函数的作用同放大函数
    scaleDecrease() {
        if (ROWS > 15 && COLUMNS > 15) {
            ROWS -= 5;
            COLUMNS -= 5;
            this.changeChessSize();
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
        centery = Math.floor(COLUMNS / 2);
        //首先清零
        for (let i = 0; i < THEMAX; i++) {
            for (let j = 0; j < THEMAX; j++) {
                this.changeHasNotCellSprite(i, j);
                this.blocks[i][j].getComponent('NumText').setNumber(0);
                ExitCell[i][j] = 0;
            }
        }
        //载入数据
        for (let k = 0; k < ModelData.modelDatas[modelNum].length; k++) {
            let m = ModelData.modelDatas[modelNum][k].x + centerx + theI;
            let n = ModelData.modelDatas[modelNum][k].y + centery + theJ;

            if (m >= 0 && m < THEMAX && n >= 0 && n < THEMAX) {
                this.changeHasCellSprite(n, m);
                ExitCell[n][m] = 1;
            } else {
                console.log("Function Loadmodel out index");
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
        for (let i = theI; i < theI + ROWS; i++) {
            for (let j = theJ; j < theJ + COLUMNS; j++) {
                this.blocks[i][j].getComponent('NumText').setNumber(CellNum[i][j],15*45.0/COLUMNS);
            }
        }
    },
    //计算周围细胞数目
    computeNumAround() {
        //暂时数组
        let TempCell = new Array();
        for (let i = 0; i < THEMAX; i++) {
            TempCell[i] = new Array();
            for (let j = 0; j < THEMAX; j++) {
                TempCell[i][j] = 0;
            }
        }
        for (let i = 0; i < THEMAX; i++) {
            for (let j = 0; j < THEMAX; j++) {
                let aroundNum = 0;
                for (let k = -1; k <= 1; k++) {
                    for (let l = -1; l <= 1; l++) {
                        //如果这个细胞不是自己，且未越界，且存在细胞，则周围细胞数+1
                        if ((k != 0 || l != 0) &&
                            (i + k) >= 0 && (i + k) < THEMAX &&
                            (j + l) >= 0 && (j + l) < THEMAX &&
                            (ExitCell[i + k][j + l] != 0)) {
                            aroundNum++;
                        }
                    }
                }
                TempCell[i][j] = aroundNum;
            }
        }
        for (let i = 0; i < THEMAX; i++) {
            for (let j = 0; j < THEMAX; j++) {
                CellNum[i][j] = TempCell[i][j];
            }
        }
    },

    //生成下一代细胞
    nextGenCell() {

        this.computeNumAround();
        for (let i = 0; i < THEMAX; i++) {
            for (let j = 0; j < THEMAX; j++) {
                //此处有细胞，且周围细胞数不等于可存活数目，则该细胞死亡
                if (ExitCell[i][j] == 1) {
                    this.changeHasNotCellSprite(i, j);
                    ExitCell[i][j] = 0;
                    for (let p = 0; p < ModelData.surviveNums[ModelIndex].length; p++) {
                        if (CellNum[i][j] == ModelData.surviveNums[ModelIndex][p]) {
                            this.changeHasCellSprite(i, j);
                            ExitCell[i][j] = 1;
                        }
                    }

                }

                //此处没有细胞，且周围细胞数为等于允许出生数量，则生成一个细胞
                else {
                    for (let p = 0; p < ModelData.bornNums[ModelIndex].length; p++) {
                        if (CellNum[i][j] == ModelData.bornNums[ModelIndex][p]) {
                            this.changeHasCellSprite(i, j);
                            ExitCell[i][j] = 1;
                        }
                    }
                }
            }
        }
        if (isshowNum == true) {
            this.showNum();
        } else {
            this.hideNum();
        }
    },
    //这个函数是初始化棋盘的函数
    drawGrids() {
        //动态地设置间隔
        this.gap = 1;
        theI = Math.floor((THEMAX - ROWS) / 2);
        theJ = Math.floor((THEMAX - COLUMNS) / 2);
        this.blockSize = (cc.winSize.width - this.gap * (COLUMNS + 2)) / (COLUMNS + 1);
        let ty = cc.winSize.height * 0.15 - this.blockSize / 2;
        for (let i = 0; i < ROWS; i++) {
            theRows[i] = new Array();
            theRows[i][0] = ty;
            ty += this.gap + this.blockSize;
            theRows[i][1] = ty;
        }

        let tx = this.gap + this.blockSize / 2;
        for (let i = 0; i < COLUMNS; i++) {
            theCol[i] = new Array();
            theCol[i][0] = tx;
            tx += this.gap + this.blockSize;
            theCol[i][1] = tx;
        }

        let x = this.gap + this.blockSize;
        //let y=this.gap+this.blockSize/2+this.blockSize*4.0;
        let y = cc.winSize.height * 0.15;
        this.positions = new Array();
        this.blocks = new Array();
        for (let i = 0; i < THEMAX; i++) {
            this.positions[i] = new Array();
            this.blocks[i] = new Array();
            ExitCell[i] = new Array();
            CellNum[i] = new Array();
            for (let j = 0; j < THEMAX; j++) {
                ExitCell[i][j] = 0;
                CellNum[i][j] = 0;
                //实例化prefab
                let block = cc.instantiate(this.blockPrefab);
                block.width = 1;
                block.height = 1;

                this.bg.addChild(block);
                block.setPosition(cc.v2(-1000, 0));

                this.positions[i][j] = cc.v2(-1000, 0);

                this.blocks[i][j] = block;
            }
        }
        for (let i = theI; i < theI + ROWS; i++) {
            for (let j = theJ; j < theJ + COLUMNS; j++) {
                this.blocks[i][j].x = x;
                this.blocks[i][j].y = y;
                this.blocks[i][j].width = this.blockSize;
                this.blocks[i][j].height = this.blockSize;
                this.positions[i][j] = cc.v2(x, y);
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
        for (let i = 0; i < THEMAX; i++) {
            for (let j = 0; j < THEMAX; j++) {
                ExitCell[i][j] = 0;
                CellNum[i][j] = 0;
            }
        }
        this.nextGenCell();
        this.updateCells();
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