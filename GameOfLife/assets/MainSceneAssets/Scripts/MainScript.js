cc.Class({
    extends: cc.Component,
    properties: {
        user:"admin",
        password:"123456"
    },
    start () {
        //获取常驻节点所绑定的脚本
        var userInfo = cc.find("InfoNode").getComponent('userInfo');
        //调用该脚本的函数并传值
        var info={};
        info.user = this.user;
        info.password = this.password;
        userInfo.setdata(info);
    },

});
