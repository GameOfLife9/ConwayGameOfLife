cc.Class({
    extends: cc.Component,

    properties: {
        ButtonAudio: {
            type: cc.AudioSource,
            default: null
        },
    },

    // onLoad () {},

    start() {

    },
    ButtonAudioPlay() {
        this.ButtonAudio.play();
    },
    Scene1ChangeButon: function () {
        this.ButtonAudioPlay();
        cc.director.loadScene("SubScene1");
    },
    Scene3ChangeButon: function () {
        this.ButtonAudioPlay();
        /*var theNode = this.node._parent;
        var action = cc.fadeOut(0.2);//渐隐效果
        theNode.runAction(action);*/
        cc.director.loadScene("SubScene3");
    },
    rankChangeButon: function () {
        this.ButtonAudioPlay();
        cc.director.loadScene("rankScene");
    },
    HelpChangeButon: function () {
        this.ButtonAudioPlay();
        cc.director.loadScene("HelpScene");
    },
    // update (dt) {},
});