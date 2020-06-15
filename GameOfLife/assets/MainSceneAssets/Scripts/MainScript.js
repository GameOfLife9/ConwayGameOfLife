cc.Class({
    extends: cc.Component,
    properties: {
        user: "admin",
        password: "123456",
        rank: 0,
        head: "https://ae01.alicdn.com/kf/H1f12dd4c08e0429eb76a1856d6d977f2n.jpg",
        bgs: [cc.Node], //用于管理背景图片结点的数组,记得回cocos面板中添加数组的结点数量
        speed: 3, //移动时控制速度的变量
    },
    getInfo: function () {
        var node = cc.director.getScene().getChildByName('userGet');
        var data = node.getComponent('userGet').getdata();
        this.user = data.user;
        this.password = data.password;
        this.rank = data.rank;
        this.head = data.head;
    },
    onLoad() {
        //三张背景图位置初始化
        //获得当前游戏窗口的高度
        this.height = cc.winSize.height
        //获得当前游戏窗口的宽度
        let width = cc.winSize.width
        for (let index = 0; index < this.bgs.length; index++) {
            this.bgs[index].height = this.height;
            this.bgs[index].width = width;
            this.bgs[index].y = -540 - index * this.height;
        }
    },
    start() {
        this.getInfo();
        //获取常驻节点所绑定的脚本
        var userInfo = cc.find('userInfo').getComponent('userInfo');
        //调用该脚本的函数并传值
        var info = {};
        info.user = this.user;
        info.password = this.password;
        info.rank = this.rank;
        info.head = this.head;
        userInfo.setdata(info);
    },
    update(dt) {
        this.bgMove();
    },
    lateUpdate(dt) {
        for (let index = 0; index < this.bgs.length; index++) {
            if (this.bgs[index].y > this.height * 0.5) {
                this.bgs[index].y -= this.bgs[index].height * 3;
            }
        }
    },
    bgMove: function () {
        //三个背景一起移动
        for (let index = 0; index < this.bgs.length; index++) {
            this.bgAction = cc.sequence(
                cc.moveTo(0.5, -360, this.bgs[index].y + this.speed),
                cc.callFunc(function (target) {
                    //为了防止出现黑边，每次移动后都设置一遍整数的坐标，移动过程中会出现小数的坐标导致黑边
                    //target.position = cc.v2(Math.round(target.x), Math.round(target.y));
                })
            )
            this.bgs[index].runAction(this.bgAction)
        }
    }
});