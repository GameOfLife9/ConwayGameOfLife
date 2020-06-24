import * as GridData from 'GridData';
const ROWS = 15;
const COLUMNS = 15;
var isshowNum = false;
//当前关卡级数，用于loadLevel
var level = 0;
//记录时间
var time = 0.0;
var maxlevel = 0;
var stepUse = 1;
var available = 1;
var increase = true;
var theRows = new Array(); //鼠标行坐标
var theCol = new Array();//鼠标列坐标
//暂时变量，之后删掉
var display = true;
//exitcell用于判断格子i j是否有细胞
//blocks用于存储细胞实体
var ExitCell = new Array();
for (let i = 0; i < ROWS; i++) {
    ExitCell[i] = new Array();
    for (let j = 0; j < COLUMNS; j++) {
        ExitCell[i][j] = 0;
    }
}
var history = new Array();
//cellNum实时存储细胞ij周围细胞数目
var CellNum = new Array();
for (let i = 0; i < ROWS; i++) {
    CellNum[i] = new Array();
    for (let j = 0; j < COLUMNS; j++) {
        CellNum[i][j] = 0;
    }
}
cc.Class({
    extends: cc.Component,

    properties: {
        gap: 1,
        //细胞预制件
        blockPrefab: cc.Prefab,
        hasPrefab: cc.Prefab,
        bg: cc.Node,
        levelLabel: cc.Label,
        canvas: cc.Node,
        showHideNumButton: cc.Button,
        ShowHideButtonLabel: cc.Label,
        ShowRequireButtonLabel: cc.Label,
        SucessSprite: cc.Sprite,
        SucessBackButton: cc.Button,
        itemTemplate: {
            default: null,
            type: cc.Node
        },
        scrollView: {
            default: null,
            type: cc.ScrollView
        },
        scrollViewBack: cc.Button,
    },
    changeSize(node, size, x, y) {
        node.width = size;
        node.height = size;
        node.x = x;
        node.y = y;
    },
    cCzie() {
        let windowSize = cc.view.getVisibleSize();
        let tWidth = windowSize.width;
        let tHeight = windowSize.height;
        let tx = -tWidth / 2;
        let ty = -tHeight / 2;
        let btnSize = tWidth / 9;
        let dx = (tWidth - 4 * btnSize) / 5;
        let btsY = tHeight * 0.025;

        let tnode = this.node.getChildByName("LastCell_Button");
        tx = dx + tx + btnSize / 2;
        this.changeSize(tnode, btnSize, tx, ty + btsY + btnSize / 2);

        tnode = this.node.getChildByName("NextGen_Butoon");
        tx = tx + dx + btnSize;
        this.changeSize(tnode, btnSize, tx, ty + btsY + btnSize / 2);

        tnode = this.node.getChildByName("ShowNum_Button");
        tx = tx + dx + btnSize;
        this.changeSize(tnode, btnSize, tx, ty + btsY + btnSize / 2);

        tnode = this.node.getChildByName("ShowReq_Button");
        tx = tx + dx + btnSize;
        this.changeSize(tnode, btnSize, tx, ty + btsY + btnSize / 2);

        tx = -tWidth / 2;
        tnode = this.node.getChildByName("Return_Button");
        tx = dx + tx + btnSize / 2;
        this.changeSize(tnode, btnSize, tx - 5, -ty - btsY - btnSize / 2);

        tnode = this.node.getChildByName("SelectLevel_Button");
        tx = dx + tx + btnSize;
        tx = dx + tx + btnSize;
        tx = dx + tx + btnSize;
        this.changeSize(tnode, btnSize, tx + 5, -ty - btsY - btnSize / 2);

    },
    onLoad() {
        this.cCzie();
        var node = cc.director.getScene().getChildByName('userInfo');
        var data = node.getComponent('userInfo').getdata();
        maxlevel = data.rank;
    },
    start() {
        this.drawGrids();
        this.initLoadList();
        //获取触碰到的方块的索引i j
        var self = this;
        self.canvas.on(cc.Node.EventType.TOUCH_START, function (event) {
            this.touchedEvent(event);
        }, self);
    },
    //判断是否通关
    judgeAccom() {
        this.isAccmp = true;
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLUMNS; j++) {
                //如果当前格子没有细胞，但是通关要求此处有细胞，则未通关
                if (ExitCell[i][j] == 0) {
                    for (let k = 0; k < GridData.levelsEnd[level].length; k++) {
                        let m = GridData.levelsEnd[level][k].x;
                        let n = GridData.levelsEnd[level][k].y;
                        if (m == i && n == j) {
                            this.isAccmp = false;
                        }
                    }
                }
                //如果当前格子有细胞，但是通关要求此处没有细胞，则未通关
                else {
                    let hasfind = false;
                    for (let k = 0; k < GridData.levelsEnd[level].length; k++) {
                        let m = GridData.levelsEnd[level][k].x;
                        let n = GridData.levelsEnd[level][k].y;
                        if (m == i && n == j) {
                            hasfind = true;
                        }
                    }
                    if (hasfind == false) {
                        this.isAccmp = false;
                    }
                }
            }
        }
        //如果通关，执行通关操作
        console.log("通关？", this.isAccmp);
        if (this.isAccmp == true) {
            level++;
            if (level > maxlevel) {
                maxlevel = level;
                this.updateUserRank();
                this.postDataToWX();
            }
            this.SucessSprite.node.getChildByName("Congratu_Label").getComponent(cc.Label).string = "恭喜通关";
            this.SucessSprite.node.getChildByName("NextLevel_Button").getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = "下一关"
        } else {
            this.SucessSprite.node.getChildByName("Congratu_Label").getComponent(cc.Label).string = "失败";
            this.SucessSprite.node.getChildByName("NextLevel_Button").getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = "重来"
        }
        this.accomplish();
    },
    accomplish() {

        this.SucessSprite.node.active = true;
        this.SucessBackButton.node.active = true;

    },
    nextLevelClicked() {
        if (this.isAccmp == true) {

            this.SucessSprite.node.active = false;
            this.SucessBackButton.node.active = false;
            if (level < GridData.levelsEnd.length) {
                this.loadlevel();
                time = 0.0;
            }
        } else {

            this.SucessSprite.node.active = false;
            this.SucessBackButton.node.active = false;
            this.resStart();
        }

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
                this.touchj = i;
                break;
            } else break;
        }
        for (let i = 0; i < COLUMNS; i++) {
            if (touchLoc.x > theCol[i][1]) continue;
            if (touchLoc.x >= theCol[i][0]) {
                this.touchi = i;
                break;
            } else break;
        }
        //this.touchi = Math.floor((touchLoc.x - this.gap - this.blockSize / 2) / (this.blockSize + this.gap));

        //可能存在错误
        //this.touchj = Math.floor((touchLoc.y - this.gap - this.blockSize * 4.0) / (this.blockSize + this.gap));

        if (available > 0 && this.touchj != -1 && this.touchi != -1) {
            if (ExitCell[this.touchi][this.touchj] == 0 && increase == true) {
                let lastCells = new Array();
                for (let i = 0; i < ROWS; i++) {
                    lastCells[i] = new Array();
                    for (let j = 0; j < COLUMNS; j++) {
                        lastCells[i][j] = ExitCell[i][j];
                    }
                }
                history[history.length] = lastCells;
                console.log("history length in touchedEvent Fun:" + history.length);
                available--;
                this.levelLabel.string = "Lv:" + (level + 1) + "  本关还可增加" + available + "个细胞，\n目标分布为繁衍" + stepUse + "代后的分布";
                this.changeHasCellSprite(this.touchi, this.touchj);
                ExitCell[this.touchi][this.touchj] = 1;
            }
            if (ExitCell[this.touchi][this.touchj] == 1 && increase == false) {
                let lastCells = new Array();
                for (let i = 0; i < ROWS; i++) {
                    lastCells[i] = new Array();
                    for (let j = 0; j < COLUMNS; j++) {
                        lastCells[i][j] = ExitCell[i][j];
                    }
                }
                history[history.length] = lastCells;
                console.log("history length in touchedEvent Fun:" + history.length);
                available--;
                this.levelLabel.string = "Lv:" + (level + 1) + "  本关还可消除" + available + "个细胞，\n目标分布为繁衍" + stepUse + "代后的分布";
                this.changeHasNotCellSprite(this.touchi, this.touchj);
                ExitCell[this.touchi][this.touchj] = 0;
            }
        }

        if (isshowNum == true) {
            this.showNum();
        } else {
            this.hideNum();
        }
    },
    //根据当前的ExitCell更新blocks
    updateCells() {
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLUMNS; j++) {
                if (ExitCell[i][j] == 1) {
                    this.changeHasCellSprite(i, j);
                    this.blocks[i][j].getComponent('NumText').setNumber(0);
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
    //显示或者隐藏通关要求
    displayOrHideReq() {
        if (display) {
            this.ShowRequireButtonLabel.string = "隐藏通关要求"
            for (let k = 0; k < GridData.levelsEnd[level].length; k++) {
                let m = GridData.levelsEnd[level][k].x;
                let n = GridData.levelsEnd[level][k].y;

                this.blocks[m][n].color = cc.color(50, 10, 150, 255);
            }
            display = false;
        } else {
            this.ShowRequireButtonLabel.string = "显示通关要求"
            this.updateCells();
            display = true;
        }

    },
    //载入关卡
    loadlevel() {
        //更新当前关卡
        //首先清零
        history = new Array();
        console.log("history length in LoadLevel Fun:" + history.length);
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLUMNS; j++) {
                //this.blocks[i][j].color=cc.color(200,114,114,255);
                this.changeHasNotCellSprite(i, j);
                this.blocks[i][j].getComponent('NumText').setNumber(0);
                ExitCell[i][j] = 0;
            }
        }

        available = GridData.availableCell[level];
        stepUse = GridData.stepUse[level];
        increase = GridData.increa[level]
        if (increase == true) {
            this.levelLabel.string = "Lv:" + (level + 1) + "  本关还可增加" + available + "个细胞，\n目标分布为繁衍" + stepUse + "代后的分布";
        } else {
            this.levelLabel.string = "Lv:" + (level + 1) + "  本关还可消除" + available + "个细胞，\n目标分布为繁衍" + stepUse + "代后的分布";
        }
        //载入数据
        for (let k = 0; k < GridData.levelsStart[level].length; k++) {
            let m = GridData.levelsStart[level][k].x;
            let n = GridData.levelsStart[level][k].y;

            // this.blocks[m][n].color=cc.color(0,100,100,255);
            this.changeHasCellSprite(m, n);
            ExitCell[m][n] = 1;
        }
        //计算初始周围细胞数
        this.computeNumAround();
        this.hideNum();
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
    //显示周围细胞数目
    showNum() {
        isshowNum = true;
        this.computeNumAround();
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLUMNS; j++) {
                this.blocks[i][j].getComponent('NumText').setNumber(CellNum[i][j]);
            }
        }
    },
    //重新开始
    resStart() {
        this.loadlevel();
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
    //计算周围细胞数目
    computeNumAround() {
        //暂时数组
        let TempCell = new Array();
        for (let i = 0; i < ROWS; i++) {
            TempCell[i] = new Array();
            for (let j = 0; j < COLUMNS; j++) {
                TempCell[i][j] = 0;
            }
        }
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLUMNS; j++) {
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
    //返回上一代细胞
    returnLastCell() {
        let changed = false;
        if (history.length != 0) {
            for (let i = 0; i < ROWS; i++) {
                for (let j = 0; j < COLUMNS; j++) {
                    if (ExitCell[i][j] != history[history.length - 1][i][j])
                        changed = true;
                }
            }
        }

        if (changed) {
            available++;
        }

        if (increase == true) {
            this.levelLabel.string = "Lv:" + (level + 1) + "  本关还可增加" + available + "个细胞，\n目标分布为繁衍" + stepUse + "代后的分布";
        } else {
            this.levelLabel.string = "Lv:" + (level + 1) + "  本关还可消除" + available + "个细胞，\n目标分布为繁衍" + stepUse + "代后的分布";
        }
        if (history.length != 0) {
            for (let i = 0; i < ROWS; i++) {
                for (let j = 0; j < COLUMNS; j++) {
                    ExitCell[i][j] = history[history.length - 1][i][j];
                }
            }
            this.updateCells();
        }
        let arrTemp = new Array();
        for (let i = 0; i < history.length - 1; i++) {
            arrTemp[i] = history[i];
        }
        history = arrTemp;
        console.log("history length in returnLastCell Fun:" + history.length);
    },
    changeHasCellSprite(i, j) {
        /*let x = this.positions[i][j].x;
        let y = this.positions[i][j].y;

        let block = cc.instantiate(this.hasPrefab);
        block.width = this.blockSize;
        block.height = this.blockSize;
        this.bg.addChild(block);
        block.setPosition(cc.v2(x, y));

        this.positions[i][j] = cc.v2(x, y);

        this.blocks[i][j].destroy();
        this.blocks[i][j] = block;*/
        this.blocks[i][j]._children[0].active = false;
        this.blocks[i][j]._children[1].active = true;
    },
    changeHasNotCellSprite(i, j) {
        /*let x = this.positions[i][j].x;
        let y = this.positions[i][j].y;

        let block = cc.instantiate(this.blockPrefab);
        block.width = this.blockSize;
        block.height = this.blockSize;
        this.bg.addChild(block);
        block.setPosition(cc.v2(x, y));

        this.positions[i][j] = cc.v2(x, y);

        this.blocks[i][j].destroy();
        this.blocks[i][j] = block;*/
        this.blocks[i][j]._children[0].active = true;
        this.blocks[i][j]._children[1].active = false;
    },
    //生成下一代细胞
    nextGenCell() {
        let lastCells = new Array();
        for (let i = 0; i < ROWS; i++) {
            lastCells[i] = new Array();
            for (let j = 0; j < COLUMNS; j++) {
                lastCells[i][j] = ExitCell[i][j];
            }
        }
        history[history.length] = lastCells;
        console.log("history length in nextGenCell Fun:" + history.length);
        this.computeNumAround();
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLUMNS; j++) {
                //此处有细胞，且周围细胞数<2且>3，则该细胞死亡
                if (ExitCell[i][j] == 1 && (CellNum[i][j] < 2 || CellNum[i][j] > 3)) {
                    this.changeHasNotCellSprite(i, j);
                    ExitCell[i][j] = 0;
                }

                //此处没有细胞，且周围细胞数为3，则生成一个细胞
                if (ExitCell[i][j] == 0 && CellNum[i][j] == 3) {
                    this.changeHasCellSprite(i, j);
                    ExitCell[i][j] = 1;
                }
            }
        }
        if (stepUse > 0) {
            stepUse--;
            if (increase == true) {
                this.levelLabel.string = "Lv:" + (level + 1) + "  本关还可增加" + available + "个细胞，\n目标分布为繁衍" + stepUse + "代后的分布";
            } else {
                this.levelLabel.string = "Lv:" + (level + 1) + "  本关还可消除" + available + "个细胞，\n目标分布为繁衍" + stepUse + "代后的分布";
            }
        }

        if (isshowNum == true) {
            this.showNum();
        } else {
            this.hideNum();
        }
        if (stepUse == 0) {
            if (available > 0) {
                available--;
            } else {
                this.judgeAccom();
            }

        }

    },
    drawGrids() {
        this.blockSize = (cc.winSize.width - this.gap * (COLUMNS + 2)) / (COLUMNS + 1);
        let x = this.gap + this.blockSize;
        let y = this.gap + this.blockSize / 2 + this.blockSize * 4.0;

        let ty = y - this.blockSize / 2;
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

        this.loadlevel();
        this.hideNum();
    },
    selectLevel(i) {
        level = i;
        this.loadlevel();
    },
    //初始化载入模型列表
    initLoadList() {
        this.items = [];
        this.spacing = 15;
        this.content = this.scrollView.content;
        this.itemNum = GridData.levelsStart.length;
        this.content.height = this.itemNum * (this.itemTemplate.height + this.spacing) + this.spacing;
        for (let k = 0; k < this.itemNum; k++) {
            let item = cc.instantiate(this.itemTemplate);
            item.getComponent('LevelButton').setNumAndName(k);
            this.content.addChild(item);
            item.setPosition(0, -item.height * (k + 0.5) - this.spacing * (k + 1) - 30.0);
            this.items.push(item);
        }
    },
    showScorollView() {
        this.scrollView.node.active = true;
        this.scrollViewBack.node.active = true;
        for (let i = 0; i < this.itemNum; i++) {
            if (i < maxlevel + 1) {
                this.items[i].getComponent(cc.Button).interactable = true;
            } else {
                this.items[i].getComponent(cc.Button).interactable = false;
            }

        }
    },
    //隐藏载入模型列表
    disableScorollView() {
        this.scrollView.node.active = false;
        this.scrollViewBack.node.active = false;
    },
    updateUserRank: function () {
        return new Promise(function (resolve, reject) {
            wx.cloud.callFunction({
                    name: "getOpenID",
                    data: {
                        action: "updata",
                        rank: maxlevel
                    }
                })
                .then(res => {
                    console.log("更新关卡成功");
                })
                .catch(res => {
                    console.log("更新关卡失败")
                })
        })
    },
    postDataToWX: function () {
        //向微信保存最高分数
        var kvDateList = new Array();
        var maxx = String(maxlevel);
        kvDateList.push({
            key: "rank",
            value: maxx
        });
        //托管游戏数据
        wx.setUserCloudStorage({
            KVDataList: kvDateList,
            success: function (res) {
                console.log("wx.setUserCloudStorage success");
                console.log(res);
            },
            fail: function (res) {
                console.log("wx.setUserCloudStorage fail");
                console.log(res);
            }
        });
    },
    update(dt) {
        time += dt;
    },
});