cc.Class({
    extends: cc.Component,

    properties: {
        numberLabel:cc.Label
    },


    // onLoad () {},

    start () {

    },
    setNumber(number,labelfrontsize=45)
    {
        if(number==0){
            this.numberLabel.node.active=false;
        }
        else
        {
            this.numberLabel.fontSize=labelfrontsize;
            this.numberLabel.node.active=true;
            this.numberLabel.string=number;
            if(number==1)
            {
                this.numberLabel.node.color=cc.color(255*0.8,0,0,255);
            }
            else if(number==2)
            {
                this.numberLabel.node.color=cc.color(0,255*0.8,0,255);
            }
            else if(number==3)
            {
                this.numberLabel.node.color=cc.color(0,0,255*0.8,255);
            }
            else if(number==4)
            {
                this.numberLabel.node.color=cc.color(255*0.8,255*0.8,0,255);
            }
            else
            {
                this.numberLabel.node.color=cc.color(0.0,255*0.8,255*0.8,255);
            }
        }

    }
    // update (dt) {},
});
