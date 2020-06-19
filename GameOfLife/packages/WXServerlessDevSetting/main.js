var path = require('path');
var fs = require('fs');
const packageName = "WXServerlessDevSetting";

function onAfterBuildFinish(options, callback) {
    Editor.log('Building ' + options.platform + ' to ' + options.dest); // 你可以在控制台输出点什么

    let settingConfigPath = Editor.Project.path + "/packages/" + packageName + "/setting.json";
    let settingConfig = "";
    let settingConfigObj = {};
    let yunFuncsRootPath = "";
    if (fs.existsSync(settingConfigPath)) {
        settingConfig = fs.readFileSync(settingConfigPath, 'utf8');
        settingConfigObj = JSON.parse(settingConfig);
    }
    yunFuncsRootPath = settingConfigObj["cloudfunctionRoot"];
    Editor.log('onAfterBuildFinish yunFuncsRootPath： ' + yunFuncsRootPath); // 你可以在控制台输出点什么
    if (yunFuncsRootPath) {
        var projectConfigPath = path.join(options.dest, 'project.config.json'); // 获取发布目录下的 project.config.json 所在路径
        var script = fs.readFileSync(projectConfigPath, 'utf8'); // 读取构建好的 project.config.json
        var projectConfigObj = JSON.parse(script);
        projectConfigObj["cloudfunctionRoot"] = yunFuncsRootPath;
        script = JSON.stringify(projectConfigObj);
        fs.writeFileSync(projectConfigPath, script); // 保存 project.config.json
    }
    callback();
}

module.exports = {
    load() {
        Editor.Builder.on('build-finished', onAfterBuildFinish);
    },

    unload() {
        Editor.Builder.removeListener('build-finished', onAfterBuildFinish);
    },
    messages: {
        open() {
            Editor.Panel.open('wx_serverless_dev_setting');
        },
    }
};