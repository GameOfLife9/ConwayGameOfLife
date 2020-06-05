// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

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
        numberLabel:cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    setNumber(number)
    {
        if(number==0){
            this.numberLabel.node.active=false;
        }
        else
        {
            this.numberLabel.node.active=true;
            this.numberLabel.string=number;
            if(number==1)
            {
                this.numberLabel.node.color=cc.color(255,0,0,255);
            }
            if(number==2)
            {
                this.numberLabel.node.color=cc.color(0,255,0,255);
            }
            if(number==3)
            {
                this.numberLabel.node.color=cc.color(0,0,255,255);
            }
            if(number==4)
            {
                this.numberLabel.node.color=cc.color(255,255,0,255);
            }
        }
            
    }
    // update (dt) {},
});
