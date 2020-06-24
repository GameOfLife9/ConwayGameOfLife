
cc.Class({
    extends: cc.Component,

    properties: {

    },
    start () {
        cc.game.addPersistRootNode(this.node);
    },
    setdata : function(json){
        this.data = json;
    },
    getdata : function(){
        return this.data;
    },

});
