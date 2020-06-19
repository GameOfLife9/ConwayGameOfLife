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
        content: cc.Node
    },
    min: function (a, b) {
        if (a < b) return a;
        else return b;
    },
    cmp: function (propertyName) {
        return function (object1, object2) {
            var value1 = object1[propertyName];
            var value2 = object2[propertyName];
            if (value1 > value2) {
                return -1;
            } else if (value1 < value2) {
                return 1;
            } else {
                return 0;
            }
        }
    },
    getfriend: function () {
        //获得用户朋友信息
        var url = "http://30517j992t.qicp.vip/users/getFriends";
        let that = this;
        return new Promise((resolve, reject) => {
            wx.request({
                url: url,
                data: {
                    user: that.user
                },
                method: "POST",
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success(res) {
                    var data = res.data.data;
                    var obj = {};
                    obj.user_id = that.user;
                    obj.friend_id = that.user;
                    obj.friend_rank = that.totalInfo[0].gq;
                    obj.friend_head = that.totalInfo[0].head;
                    that.arr.push(obj);
                    for (var i = 0; i < data.length; i++) {
                        /*    obj.name=data[i].friend_id;
                            obj.rank=1;
                            obj.gq=data[i].friend_rank;*/
                        that.arr.push(data[i]);
                    }
                    that.arr.sort(that.cmp("friend_rank"));
                    that.prepareTo();
                    that.load_recode(that.start_index);
                    that.flag = true;
                    resolve(res.data)
                },
                fail() {

                }
            });
        });
    },
    setbeforInfo: function () {
        var node = cc.director.getScene().getChildByName('userInfo');
        var data = node.getComponent('userInfo').getdata();
        this.user = data.user;
        this.password = data.password;
        this.rank = data.rank;
        this.head = data.head;
        var obj = {};
        var url = this.head;
        this.loadImgByUrl(this.MyHead, url, "jpg")
        obj.name = this.user;
        obj.rank = 1;
        obj.gq = this.rank;
        obj.head = this.head;
        //我的信息显示
        this.MyRankLabel.string = obj.gq + " 关";
        this.MyNameLabel.string = obj.name;
        this.totalInfo = [];
        this.totalInfo.push(obj);
    },
    onLoad() {
        this.start_y = this.content.y; //初始化起始y坐标
        this.start_index = 0; //100项数据里面的起始数据记录索引
        var self = this;
        wx.onMessage(function (data) {
            console.log("TetrisRank data:");
            if (data.text == "showRank") {
                console.log(data);
                self.openid = data.data.openid;
                self.getWXData();
            }
        });
        //        this.setbeforInfo();
        //        this.getfriend();
    },
    getFriend: function (data) {
        let that = this;
        let obj = {};
        let myobj = {};
        that.arr = [];
        for (var i = 0; i < this.content._children.length; i++)
            this.content._children[i].destroy();
        this.start_y = this.content.y; //初始化起始y坐标
        this.start_index = 0; //100项数据里面的起始数据记录索引
        for (var i = 0; i < data.length; i++) {
            obj.user_id = "0";
            obj.friend_id = data[i].nickname;
            obj.friend_rank = data[i].KVDataList[0].value;
            obj.friend_head = data[i].avatarUrl;
            that.arr.push(obj);
            if (data[i].openid == this.openid) {
                obj.user_id = this.openid;
                myobj = obj;
            }
        }
        //我的信息显示
        this.loadImgByUrl(this.MyHead, myobj.friend_head, "jpg")
        this.MyRankLabel.string = myobj.friend_rank + " 关";
        this.MyNameLabel.string = myobj.friend_id;
        that.arr.sort(that.cmp("friend_rank"));
        console.log(that.arr);
        that.prepareTo();
        that.load_recode(that.start_index);
        that.flag = true;
    },
    getWXData: function () {
        var that = this;
        const dataList = ["rank"];
        return new Promise((resolve, reject) => {
            wx.getFriendCloudStorage({
                keyList: dataList,
                success: function (res) {
                    console.log("friendInfo");
                    console.log(res);
                    that.getFriend(res.data);
                },
                fail: function (res) {}
            });
        });
    },
    prepareTo() {
        console.log(this.arr);
        var len = this.arr.length;
        this.HIGH = len;
        this.SUM = len;
        this.value_set = [];
        for (var i = 1; i <= len; i++) {
            this.value_set.push(i);
        }
        this.content = this.scroll_view.content;
        this.opt_item_set = [];
        //每次加载3页
        var total = this.min(this.PAGE_NUM * 3, this.SUM);
        for (var i = 0; i < total; i++) {
            var item = cc.instantiate(this.infoLabel);
            this.content.addChild(item);
            this.opt_item_set.push(item);
        }
        this.scroll_view.node.on("scroll-ended", this.on_scroll_ended.bind(this), this); //监听scrollview事件
    },
    load_recode: function (start_index) {
        this.start_index = start_index;
        var total = this.min(this.PAGE_NUM * 3, this.SUM);
        for (var i = 0; i < total; i++) {
            var label = this.opt_item_set[i].getChildByName("Label").getComponent(cc.Label);
            //显示记录
            var user_name = this.opt_item_set[i].getChildByName("name").getComponent(cc.Label);
            var theRank = this.opt_item_set[i].getChildByName("rank").getComponent(cc.Label);
            var node = this.opt_item_set[i].getChildByName("picture");
            var theHead = node.getChildByName("head").getComponent(cc.Sprite);
            var url = this.arr[this.start_index + i].friend_head;
            this.loadImgByUrl(theHead, url, "jpg");
            user_name.string = this.arr[this.start_index + i].friend_id;
            theRank.string = this.arr[this.start_index + i].friend_rank;
            label.string = this.value_set[this.start_index + i];
            //        label.string+="哈";
            if (this.openid == this.arr[this.start_index + i].user_id) {
                this.MyPlace.string = this.start_index + i + 1;
            }
        }
    },
    load_scroll_recode: function () {
        //向下加载数据
        //当开始位置比value_set的长度小则代表没加载完
        if (this.start_index + this.PAGE_NUM * 3 < this.value_set.length &&
            this.content.y >= this.start_y + this.PAGE_NUM * 2 * this.HIGH) //content超过2个PAGE的高度
        {
            //_autoScrolling在引擎源码中负责处理scrollview的滚动动作
            if (this.scroll_view._autoScrolling) { //等自动滚动结束后再加载防止滚动过快，直接跳到非常后的位置
                this.scroll_view.elastic = false; //关闭回弹效果 美观
                return;
            }
            var down_loaded = this.PAGE_NUM;
            this.start_index += down_loaded;

            if (this.start_index + this.PAGE_NUM * 3 > this.value_set.length) {
                //超过数据范围的长度
                var out_len = this.start_index + this.PAGE_NUM * 3 - this.value_set.length;
                down_loaded -= out_len;
                this.start_index -= out_len;
            }
            this.load_recode(this.start_index);
            this.content.y -= down_loaded * this.HIGH;
            return;
        }
        //向上加载
        if (this.start_index > 0 && this.content.y <= this.start_y) {
            if (this.scroll_view._autoScrolling) {
                this.scroll_view.elastic = false;
                return;
            }
            var up_loaded = this.PAGE_NUM;
            this.start_index -= up_loaded;
            if (this.start_index < 0) {
                up_loaded += this.start_index;
                this.start_index = 0;
            }
            this.load_recode(this.start_index);
            this.content.y += up_loaded * this.HIGH;
        }
    },
    on_scroll_ended: function () {
        this.load_scroll_recode();
        this.scroll_view.elastic = true; //加载结束后自动滚动回弹开启
    },
    update(dt) {
        if (this.flag) {
            this.load_scroll_recode();
        }
    },
    setImg: function (imgNode, spriteFrame) {
        imgNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    },
    loadImgByUrl: function (imgNode, remoteUrl, imageType) {
        let that = this;
        if (!imageType) {
            imageType = "png";
        }
        cc.loader.load({
            url: remoteUrl,
            type: imageType
        }, function (err, texture) {
            if (err) {
                return;
            }
            that.setImg(imgNode, new cc.SpriteFrame(texture));
        });
    },
    start() {
        //this.start_y = this.content.y; //初始化起始y坐标
        //this.start_index = 0; //100项数据里面的起始数据记录索引
        //this.load_recode(this.start_index);
    },
    returnButtonClicked: function () {
        cc.director.loadScene("MainScene");
    }
    // update (dt) {},
});