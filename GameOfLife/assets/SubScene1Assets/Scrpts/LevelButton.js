cc.Class({
    extends: cc.Component,

    properties: {
        numberLabel:cc.Label,
        canvas:cc.Node,
    },

    // onLoad () {},

    start () {
        this.node.on('touchend', function () {
            if(this.node.getComponent(cc.Button).interactable == true)
            {
                this.canvas.getComponent('DrawGrid').selectLevel(this.num);
                this.canvas.getComponent('DrawGrid').disableScorollView();
                this.canvas.getComponent('DrawGrid').ButtonAudioPlay();
            }
        }, this);
    },
    setNumAndName(number){
        this.numberLabel.string="关卡"+(number+1);
        this.num=number;
    },
    // update (dt) {},
});
