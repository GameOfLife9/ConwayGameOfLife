cc.Class({
    extends: cc.Component,

    properties: {
        Thename: cc.EditBox,
        password: cc.EditBox,
        errorShow: cc.Node,
        loginBtn: cc.Button,
        registerShow: cc.Node,
        registerError: cc.Node,
        registerName: cc.EditBox,
        registerPassword: cc.EditBox,
        registerPassword2: cc.EditBox,
        ReSuccess: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    login: function () {
        let name = this.Thename.string;
        let mima = this.password.string;
        if (!name || !mima) return;
        this.loginBtn.disabled = true;
        this.checkUser(name, mima);
        this.loginBtn.disabled = false;
    },
    register: function () {
        if (!this.registerName.string) return;
        if (!this.registerPassword.string) return;
        if (!this.registerPassword2.string) return;
        if (this.registerPassword.string != this.registerPassword2.string) {
            var action = cc.fadeOut(2);
            this.registerError.active = true;
            this.registerError.runAction(action);
            return;
        }
        this.addUser(this.registerName.string, this.registerPassword.string);
    },
    showRegisterScene: function () {
        this.registerShow.active = true;
    },
    closeRegisterScene: function () {
        this.registerShow.active = false;
    },
    start() {

    },
    addUser(name, password) {
        var url = "http://30517j992t.qicp.vip/users/insert";
        let that = this;
        let head = "https://ae01.alicdn.com/kf/H199d5d7cf1094f10a0a8eb79243f96c7q.jpg";
        return new Promise((resolve, reject) => {
            wx.request({
                url: url,
                data: {
                    name: name,
                    password: password,
                    head: head
                },
                method: "POST",
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success(res) {
                    that.Thename.string = name;
                    that.password.string = "";
                    that.registerName.string = "";
                    that.registerPassword.string = "";
                    that.registerPassword2.string = "";
                    that.ReSuccess.active = true;
                    var action = cc.fadeOut(2);
                    that.ReSuccess.runAction(action);
                    that.closeRegisterScene();
                    resolve(res.data)
                },
                fail() {

                }
            });
        });
    },
    checkUser(name, password) {
        var url = "http://30517j992t.qicp.vip/users/search";
        let that = this;
        return new Promise((resolve, reject) => {
            wx.request({
                url: url,
                data: {
                    user: name,
                    password: password
                },
                method: "POST",
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success(res) {
                    if (res.data.err == 1) {
                        that.password.string = "";
                        var action = cc.fadeOut(2);
                        that.errorShow.active = true;
                        that.errorShow.runAction(action);
                    } else {
                        that.setInformation(name, password, res.data.rank, res.data.head);
                        cc.director.loadScene("MainScene");
                    }
                    resolve(res.data)
                },
                fail() {

                }
            });
        });
    },
    setInformation: function (user, password, rank, head) {
        //获取常驻节点所绑定的脚本
        var userInfo = cc.find('userGet').getComponent('userGet');
        //调用该脚本的函数并传值
        var info = {};
        info.user = user;
        info.password = password;
        info.rank = rank;
        info.head = head;
        userInfo.setdata(info);
    }

});