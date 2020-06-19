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
        //        this.postDataToWX();
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
    postDataToWX: function () {
        //向微信保存最高分数
        var kvDateList = new Array();
        kvDateList.push({
            key: "score",
            value: "111" //this.integral.toString()
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
    setNode(data, rank, openid) {
        //获取常驻节点所绑定的脚本
        var userInfo = cc.find("InfoNode").getComponent('userInfo');
        //调用该脚本的函数并传值
        var info = {};
        info.user = data.nickName;
        //        info.password = this.password;
        info.rank = rank;
        info.head = data.avatarUrl;
        info.openid = openid;
        console.log("openid",openid);
        userInfo.setdata(info);
    },
    start() {
        this.loginInfo();
        //this.getInfo();
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
    },
    getOpenId(num, theRes) {
        let that = this;
        if (num == 0) {
            return new Promise(function (resolve, reject) {
                wx.cloud.callFunction({
                        name: "getOpenID",
                        data: {
                            action: "search",
                        }
                    })
                    .then(res => {
                        console.log("获取关卡成功");
                        console.log(res);
                        that.setNode(theRes, res.result.res.data.rank,res.result.openid);
                    })
                    .catch(res => {
                        console.log("获取关卡失败")
                    })
            })
        } else {
            return new Promise(function (resolve, reject) {
                wx.cloud.callFunction({
                        name: "pushNew",
                    })
                    .then(res => {
                        console.log("创建新用户成功");
                        console.log(res);
                        that.setNode(theRes, 0,res.result.openid);
                    })
                    .catch(res => {
                        console.log("创建新用户失败")
                    })
            })
        }
    },
    loginInfo() {
        let exportJson = {};
        let sysInfo = window.wx.getSystemInfoSync();
        //获取微信界面大小
        let width = sysInfo.screenWidth;
        let that = this;
        let height = sysInfo.screenHeight;
        window.wx.getSetting({
            success(res) {
                console.log(res.authSetting);
                if (res.authSetting["scope.userInfo"]) {
                    console.log("用户已授权");
                    window.wx.getUserInfo({
                        success(res) {
                            exportJson.userInfo = res.userInfo;
                            //此时可进行登录操作
                            that.getOpenId(0, res.userInfo);
                        }
                    });
                } else {
                    console.log("用户未授权");
                    let button = window.wx.createUserInfoButton({
                        type: 'text',
                        text: '',
                        style: {
                            left: 0,
                            top: 0,
                            width: width,
                            height: height,
                            backgroundColor: '#00000000', //最后两位为透明度
                            color: '#ffffff',
                            fontSize: 20,
                            textAlign: "center",
                            lineHeight: height,
                        }
                    });
                    button.onTap((res) => {
                        if (res.userInfo) {
                            console.log("用户授权:", res);
                            exportJson.userInfo = res.userInfo;
                            //此时可进行登录操作
                            that.getOpenId(1, res.userInfo);
                            button.destroy();
                        } else {
                            console.log("用户拒绝授权:", res);
                        }
                    });
                }
            }
        })
    }
});