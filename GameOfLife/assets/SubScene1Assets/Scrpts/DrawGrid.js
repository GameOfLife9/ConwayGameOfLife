import * as GridData from 'GridData';
const ROWS = 15;
const COLUMNS = 15;
var isshowNum = false;

//关卡面板上升及下降速度
var Upspeed1 = 65;
var Upspeed2 = 5;
var Downspeed1 = 20;
var Downspeed2 = 5;
var LevelTall = 27;

//当前关卡级数，用于loadLevel
var level = 0;
//记录时间
var time = 0.0;
var maxlevel = 0;
var stepUse = 1;
var available = 1;
var increase = true;
var theTop;
var theRows = new Array(); //鼠标行坐标
var theCol = new Array(); //鼠标列坐标
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
var history = [];
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
        levelNum: cc.Label,
        canvas: cc.Node,
        showHideNumButton: cc.Button,
        ShowHideButtonLabel: cc.Label,
        ShowRequireButtonLabel: cc.Label,
        SucessSprite: cc.Sprite,
        nextLevelbtn: cc.Node,
        SucessBackButton: cc.Button,
        tips: cc.Node,
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
        SucessAudio: {
            type: cc.AudioSource,
            default: null
        },
        scrollView: {
            default: null,
            type: cc.ScrollView
        },
        scrollViewBack: cc.Button,
    },
    ButtonAudioPlay() {
        this.ButtonAudio.play();
    },
    changeSize(node, sizeW, sizeH, x, y) {
        node.width = sizeW;
        node.height = sizeH;
        node.x = x;
        node.y = y;
    },
    cCzie() {
        let blockSize = (cc.winSize.width - this.gap * (COLUMNS + 2)) / (COLUMNS + 1);
        theTop = this.gap + blockSize / 2 + blockSize * 4.0 + (this.gap + blockSize) * ROWS;
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
        this.changeSize(tnode, btnSize, btnSize, tx, ty + btsY + btnSize / 2);

        tnode = this.node.getChildByName("NextGen_Butoon");
        tx = tx + dx + btnSize;
        this.changeSize(tnode, btnSize, btnSize, tx, ty + btsY + btnSize / 2);

        tnode = this.node.getChildByName("ShowNum_Button");
        tx = tx + dx + btnSize;
        this.changeSize(tnode, btnSize, btnSize, tx, ty + btsY + btnSize / 2);

        tnode = this.node.getChildByName("ShowReq_Button");
        tx = tx + dx + btnSize;
        this.changeSize(tnode, btnSize, btnSize, tx, ty + btsY + btnSize / 2);

        tx = -tWidth / 2;
        tnode = this.node.getChildByName("Return_Button");
        tx = dx + tx + btnSize / 2;
        this.changeSize(tnode, btnSize, btnSize, tx - 5, tnode.height - tHeight / 2 + theTop + btnSize / 2);

        tnode = this.node.getChildByName("SelectLevel_Button");
        tx = dx + tx + btnSize;
        tx = dx + tx + btnSize;
        tx = dx + tx + btnSize;
        this.changeSize(tnode, btnSize, btnSize, tx + 5, tnode.height - tHeight / 2 + theTop + btnSize / 2);

        tnode = this.node.getChildByName("DiscBack");
        this.changeSize(tnode, btnSize, btnSize, 0, tnode.height * 0.5 - tHeight / 2 + theTop - this.gap - blockSize * 0.5);
    },
    onLoad() {
        this.cCzie();
        this.canTouch = 1;
        this.showScoroll = 0;
        this.showSuccess = 0;
        this.showDisplay = 1;
        this.showTipsFlag = 0;
        this.showTipsTime = 0.0;
        this.showNumDisplayFlag = 0;
        this.NoLifeFadeFlag = 0;
        this.times = -10;
        this.windowSize = cc.view.getVisibleSize();
        LevelTall = 0.025 * this.windowSize.height;
        let theWidth = this.windowSize.width * 2 / 3;
        let theHeight = theWidth * 65 / 48;
        this.changeSize(this.scrollView.node, theWidth, theHeight, 0, -this.windowSize.height / 2 - theHeight / 2);
        this.scrollView.node.active = true;
        theWidth = this.windowSize.width * 143 / 180;
        theHeight = theWidth * 511 / 572;
        this.changeSize(this.SucessSprite.node, theWidth, theHeight, 0, theHeight / 2 + this.windowSize.height / 2);
        this.SucessSprite.node.active = true;
        var node = cc.director.getScene().getChildByName('userInfo');
        var data = node.getComponent('userInfo').getdata();
        maxlevel = data.rank;
        level = maxlevel;
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
                if (this.isAccmp == false) return;
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
            this.SucessAudio.play();
            this.SucessSprite.node.getChildByName("Congratu_Label").getComponent(cc.Label).string = "恭喜通关";
            this.SucessSprite.node.getChildByName("NextLevel_Button").getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = "下一关"
        } else {
            this.SucessSprite.node.getChildByName("Congratu_Label").getComponent(cc.Label).string = "失败";
            this.SucessSprite.node.getChildByName("NextLevel_Button").getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = "重来"
        }
        this.accomplish();
    },
    accomplish() {
        this.NoLifeFadeFlag = 1;
        this.times = -10;
    },
    nextLevelClicked() {
        if (this.isAccmp == true) {
            this.SucessSprite.node.y = this.SucessSprite.node.height / 2 + this.windowSize.height / 2;
            this.SucessBackButton.node.active = false;
            this.nextLevelbtn.active = false;
            if (level < GridData.levelsEnd.length) {
                this.loadlevel();
                time = 0.0;
            }
        } else {

            this.SucessSprite.node.active = false;
            this.SucessBackButton.node.active = false;
            this.nextLevelbtn.active = false;
            this.resStart();
        }

    },
    //触摸事件
    touchedEvent(event) {
        if (this.canTouch == 0) return;
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

        if (available > 0 && this.touchj != -1 && this.touchi != -1) {
            if (ExitCell[this.touchi][this.touchj] == 0) {
                let lastCells = new Array();
                for (let i = 0; i < ROWS; i++) {
                    lastCells[i] = new Array();
                    for (let j = 0; j < COLUMNS; j++) {
                        lastCells[i][j] = ExitCell[i][j];
                    }
                }
                this.SetCellAudio.play();
                var obj = {};
                obj.arr = lastCells;
                obj.next = 0;
                history.push(obj);
                console.log("history length in touchedEvent Fun:" + history.length);
                available--;
                this.changeLabelString(true);
                this.changeHasCellSprite(this.touchi, this.touchj);
                ExitCell[this.touchi][this.touchj] = 1;
            } else {
                let lastCells = new Array();
                for (let i = 0; i < ROWS; i++) {
                    lastCells[i] = new Array();
                    for (let j = 0; j < COLUMNS; j++) {
                        lastCells[i][j] = ExitCell[i][j];
                    }
                }
                this.SetCellAudio.play();
                var obj = {};
                obj.arr = lastCells;
                obj.next = 0;
                history.push(obj);
                console.log("history length in touchedEvent Fun:" + history.length);
                available--;
                this.changeLabelString(false);
                this.changeHasNotCellSprite(this.touchi, this.touchj);
                ExitCell[this.touchi][this.touchj] = 0;
            }
            this.judgeAccom();
            if (available == 0 && stepUse == 0 && this.isAccmp == false) this.showTips();
        }

        if (isshowNum == true) {
            this.showNum();
        } else {
            this.hideNum();
        }
    },
    changeLabelString(increaseT) {
        this.levelNum.string = "第 " + (level + 1) + " 关"
        this.levelLabel.string = "可改动细胞数: " + available + "\n可迭代繁衍数: " + stepUse;
    },
    //根据当前的ExitCell更新blocks
    updateCells() {
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLUMNS; j++) {
                if (ExitCell[i][j] == 1) {
                    this.changeHasCellSprite(i, j);
                    this.blocks[i][j].getComponent('NumText').setNumber(0, 40);
                } else {
                    this.changeHasNotCellSprite(i, j);
                    this.blocks[i][j].getComponent('NumText').setNumber(0, 40);
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
        console.log(display);
        if (this.showDisplay) {
            if (isshowNum) this.showNumDisplayFlag = 1;
            this.hideNum();
            this.showDisplay = 0;
        } else {
            if (this.showNumDisplayFlag) this.showNum();
            else this.hideNum();
            this.showDisplay = 1;
            this.showNumDisplayFlag = 0;
        }

        if (display) {
            this.ShowRequireButtonLabel.string = "隐藏通关要求"
            for (let k = 0; k < GridData.levelsEnd[level].length; k++) {
                let m = GridData.levelsEnd[level][k].x;
                let n = GridData.levelsEnd[level][k].y;
                this.blocks[m][n]._children[2].active = true;
            }
            display = false;
        } else {
            this.ShowRequireButtonLabel.string = "显示通关要求"
            for (let k = 0; k < GridData.levelsEnd[level].length; k++) {
                let m = GridData.levelsEnd[level][k].x;
                let n = GridData.levelsEnd[level][k].y;
                this.blocks[m][n]._children[2].active = false;
            }
            this.updateCells();
            display = true;
        }

    },
    //载入关卡
    loadlevel() {
        //更新当前关卡
        //首先清零
        history = [];
        this.showDisplay = 1;
        display = true;
        console.log("history length in LoadLevel Fun:" + history.length);
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLUMNS; j++) {
                //this.blocks[i][j].color=cc.color(200,114,114,255);
                this.changeHasNotCellSprite(i, j);
                this.blocks[i][j].opacity = 255;
                this.blocks[i][j]._children[2].active = false;
                this.blocks[i][j].getComponent('NumText').setNumber(0, 40);
                ExitCell[i][j] = 0;
            }
        }

        available = GridData.availableCell[level];
        stepUse = GridData.stepUse[level];
        increase = GridData.increa[level]
        this.changeLabelString(increase);
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
        if (this.showDisplay == 0) {
            this.showNumDisplayFlag = 1 - this.showNumDisplayFlag;
            return;
        }
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
                this.blocks[i][j].getComponent('NumText').setNumber(CellNum[i][j], 40);
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
                this.blocks[i][j].getComponent('NumText').setNumber(0, 40);
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
        let changed = 0;
        let canChange = 0;
        var obj = {};
        if (history.length != 0) {
            obj = history.pop();
            canChange = 1;
            if (obj.next == 0) {
                for (let i = 0; i < ROWS; i++) {
                    for (let j = 0; j < COLUMNS; j++) {
                        if (ExitCell[i][j] != obj.arr[i][j]) {
                            changed = 1;
                            break;
                        }
                    }
                }
            } else changed = 2;
        } else return;

        if (changed == 1)
            available++;
        else if (changed == 2)
            stepUse++;

        this.changeLabelString(increase);
        if (canChange) {
            for (let i = 0; i < ROWS; i++) {
                for (let j = 0; j < COLUMNS; j++) {
                    ExitCell[i][j] = obj.arr[i][j];
                }
            }
            this.updateCells();
        }
        console.log("history length in returnLastCell Fun:" + history.length);
    },
    changeHasCellSprite(i, j) {
        this.blocks[i][j]._children[0].active = false;
        this.blocks[i][j]._children[1].active = true;
    },
    changeHasNotCellSprite(i, j) {
        this.blocks[i][j]._children[0].active = true;
        this.blocks[i][j]._children[1].active = false;
    },
    //生成下一代细胞
    nextGenCell() {
        if (stepUse > 0) {
            stepUse--;
            this.changeLabelString(increase);
        } else return;
        let lastCells = new Array();
        for (let i = 0; i < ROWS; i++) {
            lastCells[i] = new Array();
            for (let j = 0; j < COLUMNS; j++) {
                lastCells[i][j] = ExitCell[i][j];
            }
        }
        var obj = {};
        obj.arr = lastCells;
        obj.next = 1;
        history.push(obj);
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

        if (isshowNum == true) {
            this.showNum();
        } else {
            this.hideNum();
        }
        this.judgeAccom();
        if (available == 0 && stepUse == 0 && this.isAccmp == false) this.showTips();
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
        //this.scrollView.node.active = true;
        this.scrollViewBack.node.active = true;
        for (let i = 0; i < this.itemNum; i++) {
            if (i < maxlevel + 1) {
                this.items[i].getComponent(cc.Button).interactable = true;
            } else {
                this.items[i].getComponent(cc.Button).interactable = false;
            }
        }
        this.showScoroll = 1;
        this.canTouch = 0;
    },
    //隐藏载入模型列表
    disableScorollView() {
        this.canTouch = 1;
        this.showScoroll = 0;
        this.scrollView.node.x = 0;
        this.scrollView.node.y = -this.windowSize.height / 2 - this.scrollView.node.height / 2;
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
    showTips() {
        this.showTipsFlag = 1;
        this.tips.opacity = 0;
        this.tips.active = true;
        var action = cc.fadeIn(0.1); //渐显
        this.tips.runAction(action);
    },
    update(dt) {
        time += dt;
        if (this.showScoroll) { //1表示第一次上升，2表示第一次下降，3表示第二次上升，4表示第二次下降
            let y = this.scrollView.node.y;
            if (this.showScoroll == 1) {
                if (y <= LevelTall + 50)
                    y += Upspeed1;
                if (y > LevelTall + 50) {
                    y = LevelTall + 50;
                    this.showScoroll = 2;
                }
            } else if (this.showScoroll == 2) {
                if (y >= LevelTall - 25)
                    y -= Downspeed1;
                if (y < LevelTall - 25) {
                    y = LevelTall - 25;
                    this.showScoroll = 3;
                }
            } else if (this.showScoroll == 3) {
                if (y <= LevelTall + 15)
                    y += Upspeed2;
                if (y > LevelTall + 15) {
                    y = LevelTall + 15;
                    this.showScoroll = 4;
                }
            } else if (this.showScoroll == 4) {
                if (y > LevelTall)
                    y -= Downspeed2;
                if (y <= LevelTall) {
                    y = LevelTall;
                    this.showScoroll = 0;
                }
            }
            this.scrollView.node.y = y;
        }

        if (this.showSuccess) { //1表示第一次下降，2表示第一次上升，3表示第二次下降，4表示第二次上升
            let y = this.SucessSprite.node.y;
            if (this.showSuccess == 1) {
                if (y > LevelTall - 50)
                    y -= Upspeed1;
                if (y <= LevelTall - 50) {
                    y = LevelTall - 50;
                    this.showSuccess = 2;
                }
            } else if (this.showSuccess == 2) {
                if (y < LevelTall + 25)
                    y += Downspeed1;
                if (y >= LevelTall + 25) {
                    y = LevelTall + 25;
                    this.showSuccess = 3;
                }
            } else if (this.showSuccess == 3) {
                if (y > LevelTall - 15)
                    y -= Upspeed2;
                if (y <= LevelTall - 15) {
                    y = LevelTall - 15;
                    this.showSuccess = 4;
                }
            } else if (this.showSuccess == 4) {
                if (y < LevelTall)
                    y += Downspeed2;
                if (y >= LevelTall) {
                    y = LevelTall;
                    this.showSuccess = 0;
                    this.nextLevelbtn.opacity = 0;
                    this.nextLevelbtn.active = true;
                    var action = cc.fadeIn(0.4); //渐显
                    this.nextLevelbtn.runAction(action);
                }
            }
            this.SucessSprite.node.y = y;
        }

        if (this.showTipsFlag) {
            this.showTipsTime += dt;
            if (this.showTipsTime >= 1.0) {
                var action = cc.fadeOut(1.0); //渐隐效果
                this.tips.runAction(action);
                this.showTipsFlag = 0;
                this.showTipsTime = 0;
            }
        }

        if (this.NoLifeFadeFlag) {
            this.times++;
            if (this.times <= 60 && this.times>0) {
                for (let i = 0; i < ROWS; i++) {
                    for (let j = 0; j < COLUMNS; j++) {
                        if (ExitCell[i][j] == 0) {
                            //console.log(this.blocks[i][j].node);
                            this.blocks[i][j].opacity -= 4.25;
                        }
                    }
                }
            }
            else if(this.times == 90){
                this.showSuccess = 1;
                this.SucessBackButton.node.active = true;
                this.times = -10;
                this.NoLifeFadeFlag = 0;
            }
        }
    },
});