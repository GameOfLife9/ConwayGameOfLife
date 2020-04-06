// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const ROWS=15;
const COLUMNS=15;
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
        gap:5,
        blockPrefab:cc.Prefab,
        bg:cc.Node,
        canvas:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    //varible list
    //touchi touchj 碰到的方块的索引
    //blockSize 方块大小 vec1
    //blocks 方块实例数组
    //

    start () {
        this.drawGrids();

         //获取碰到的方块的索引i j
        var self = this;
        self.canvas.on(cc.Node.EventType.TOUCH_START, function (event) {
           this.touchedEvent(event);
           }, self);
    },
    touchedEvent(event){
        var touches = event.getTouches();
        var touchLoc = touches[0].getLocation();

        this.touchi=Math.floor((touchLoc.x-this.gap)/(this.blockSize+this.gap));
        
        
        //可能存在错误
        this.touchj=Math.floor((touchLoc.y-this.gap)/(this.blockSize+this.gap))-1;
        if(this.touchj>14)
        {
            console.log("erro in touchedEvent function: thouchj over 14");
        }
        console.log(this.touchi);
        console.log(this.touchj);

        this.blocks[this.touchi][this.touchj].color=cc.color(0,100,100,255);
        this.blocks[this.touchi][this.touchj].getComponent('NumText').setNumber(1);
        //this.blocks[this.touchi][this.touchj].label.string="3";
        //let num_text=this.blocks[this.touchi][this.touchj].getComponentInChildren("NUM_Text");
        //console.log(num_text.string);
       // num_text.string="3";
    },
    //varibles:
    //blocksize
    //positions
    drawGrids(){
        

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

               // block.getComponentInChildren("NUM_Text").String="2";
                block.width=this.blockSize;
                block.height=this.blockSize;
                this.bg.addChild(block);
                block.setPosition(cc.v2(x,y));

                this.positions[i][j]=cc.v2(x,y);
                this.blocks[i][j]=block;

                //
                x+=this.gap+this.blockSize;
                
                //block.getComponent('block').setNumber(0);
            }
            y+=this.gap+this.blockSize;
            x=this.gap+this.blockSize/2;
        }
    },
    // update (dt) {},
});
