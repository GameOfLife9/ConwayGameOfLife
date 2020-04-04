// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const ROWS=20;
const COLUMNS=20;
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        gap:10,
        blockPrefab:cc.Prefab,
        bg:cc.Node,
        faff:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.drawGrids();
        this.testFun();
    },
    //varibles:
    //blocksize
    //positions
    testFun:function() {
        //faff.width=80;
    },
    drawGrids:function(){
        console.log("drawGrids");
        this.blockSize=(cc.winSize.width-this.gap*(COLUMNS+1))/COLUMNS;
        let x=this.gap+this.blockSize/2;
        let y=this.blockSize;
        this.positions=new Array();
        for(let i=0;i<ROWS;i++){
            this.positions[i]=new Array();
            for(let j=0;j<COLUMNS;j++){
                this.positions[i][j]=0;
            }
        }
        console.log(this.positions);
        console.log(this.positions.length);
        //console.log(this.blockPrefab.Node.Size.width);
        let block=cc.instantiate(this.blockPrefab);
        console.log(block.width);
        //block.width=this.blockSize;
        //block.height=this.blockSize;
        //console.log(block.width);
        this.bg.addChild(block);
        block.setPosition(cc.v2(x,y));
        console.log(x,y);
        this.positions[0][0]=cc.v2(x,y);
       /* for( let i=0;i<ROWS;i++)
        {
            //this.positions.push([0,0,0,0]);
            for(let j=0;j<COLUMNS;j++)
            {
                let block=cc.instantiate(this.blockPrefab);
                block.width=this.blockSize;
                block.height=this.blockSize;
                console.log(block.width);
                this.bg.addChild(block);
                block.setPosition(cc.v2(x,y));
                this.positions[i][j]=cc.v2(x,y);
                x+=this.gap+this.blockSize;
                //block.getComponent('block').setNumber(0);
            }
            y+=this.gap+this.blockSize;
            x=this.gap+this.blockSize/2;
        }*/
    },
    // update (dt) {},
});
