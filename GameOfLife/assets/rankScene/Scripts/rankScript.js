cc.Class({
    extends: cc.Component,

    properties: {
        HIGH: 100,
        SUM: 100,
        PAGE_NUM: 8,
        arr: [],
        flag: false,
        user: "admin",
        password: "123456",
        MyNameLabel: cc.Label,
        MyRankLabel: cc.Label,
        MyPlace: cc.Label,
        MyHead: cc.Node,
        infoLabel: {
            type: cc.Prefab,
            default: null,
        },
        scroll_view: {
            type: cc.ScrollView,
            default: null,
        },
        content: cc.Node,
        display: cc.Sprite
    },
    changeSize() {
        let windowSize = cc.view.getVisibleSize();
        let tWidth = windowSize.width;
        let tHeight = windowSize.height;
        let theW = 0.8333 * tWidth;
        let theH = theW * 1.3;
        let tnode = this.node.getChildByName("background2");
        let ynode = this.node.getChildByName("title");
        let theY = 0.012484 * tHeight + 20;
        tnode.width = theW;
        tnode.height = theH;
        tnode.y = ynode.y - ynode.height / 2 - theY - theH / 2;
    },
    setInfo() {
        var node = cc.director.getScene().getChildByName('userInfo');
        var data = node.getComponent('userInfo').getdata();
        this.openid = data.openid;
        console.log(this.openid);
    },
    onLoad() {
        this.changeSize();
        this.setInfo();
    },

    start() {
        this.tex = new cc.Texture2D();
        var openDataContext = wx.getOpenDataContext();
        let that = this;
        openDataContext.postMessage({
            text: "showRank",
            data: {
                openid:that.openid
            }
        });
    },
    /*  _updateSubDomainCanvas () {
          if (!this.tex) {
              return;
          }
          var openDataContext = wx.getOpenDataContext();
          var sharedCanvas = openDataContext.canvas;
          this.tex.initWithElement(sharedCanvas);
          this.tex.handleLoadedTexture();
          this.display.spriteFrame = new cc.SpriteFrame(this.tex);
      },*/
    returnButtonClicked: function () {
        cc.director.loadScene("MainScene");
    }
    // update (dt) {},
});