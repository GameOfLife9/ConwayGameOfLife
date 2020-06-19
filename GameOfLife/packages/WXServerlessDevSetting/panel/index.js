const packageName = "WXServerlessDevSetting";
var path = require('path');
var fs = require('fs');
Editor.Panel.extend({
  style: `
      .box{
        height:400px;
      }
      .titleBar{display:none;}
      .statusBar{
        height:50px;
        bottom: 0;
      }
      .ctrlBar{margin:5px 0;}
      :host { margin: 5px; }
      h2 { color: #00b26a; }
      .containerDiv{
        height:200px;        
        overflow-y: auto;
      }
      .btnAdd{
        float: right;
        margin:0 15px;
      }
      .btnDel{float: right; margin:0 5px;}
      .btnFile{
        float: right;
        margin:0 5px;
      }
    `,

  template: `
  <div class="box">
  <div class="titleBar">
  <h2>微信小游戏云开发配置
  <svg width=15  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 490.5 490.5" style="enable-background:new 0 0 490.5 490.5;" xml:space="preserve">
  <g>
    <g>
      <path d="M381.15,101.6c-5.3-26.2-18.8-50.2-38.8-68.4C318.95,11.8,288.55,0,256.75,0c-24.5,0-48.3,7-68.8,20.3
        c-15.8,10.2-29,23.7-38.8,39.5c-3.1-0.4-6.2-0.6-9.4-0.6c-39.9,0-72.4,32.5-72.4,72.4c0,3.7,0.3,7.3,0.8,10.9
        c-23.2,18.4-37.1,46.7-37.1,76.7c0,25.2,9.4,49.8,26.5,69.2c17.6,20,41.1,31.7,66,33.1c0.3,0,0.7,0,1,0h45.5c9.9,0,18-8.1,18-18
        c0-9.9-8.1-18-18-18h-45c-31.5-2-58.1-32.3-58.1-66.3c0-21.9,11.8-42.3,30.7-53.4c7.6-4.4,10.8-13.6,7.8-21.8
        c-1.4-3.9-2.2-8-2.2-12.4c0-20,16.3-36.4,36.4-36.4c4.3,0,8.5,0.7,12.3,2.2c8.8,3.3,18.6-0.7,22.5-9.2
        c14.9-31.6,47.2-52.1,82.2-52.1c47.1,0,85.9,35.2,90.4,82c0.8,8.1,6.9,14.7,14.9,16c35,6,61.3,38.3,61.3,75.3
        c0,39.1-30.6,73.1-68.4,76.1h-109.7c-9.9,0-18,8.1-18,18v79.2c-16.1,5.5-28.9,18.3-34.4,34.4H86.05c-9.9,0-18,8.1-18,18
        c0,9.9,8.1,18,18,18h106.7c7.5,21.8,28.1,37.4,52.4,37.4s44.9-15.7,52.4-37.4h106.7c9.9,0,18-8.1,18-18c0-9.9-8.1-18-18-18h-121.7
        c-9.9,0-18,8.1-18,18c0,10.7-8.7,19.4-19.4,19.4s-19.4-8.7-19.4-19.4c0-10.9,8.7-19.6,19.4-19.6c9.9,0,18-8.1,18-18v-76.2h92.5
        c0.4,0,0.8,0,1.3,0c27.7-2,53.6-14.7,72.9-35.9c19.1-21,29.6-48,29.6-76.1C459.45,159.7,426.55,115.6,381.15,101.6z" fill="#00b26a"/>
    </g>
  </g> 
  </svg></h2>
  </div>
  <div class="ctrlBar">
      <div>指定云开发文件夹: <ui-input id="txtRootPath" placeholder="输入指定路径" :value="yunFuncsRootPath"></ui-input></div>
      <ui-button id="btnPath">确定</ui-button>
      <hr />
      <div>当前云开发文件夹: <span id="label">{{yunFuncsRootPath}}</span>
      <template v-if="isAdd">
        <ui-button id="btnAddFunc" class="btnAdd tiny" title="添加云函数" disabled>
        <svg width="15" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="si-glyph si-glyph-folder-plus">
          <!-- Generator: Sketch 3.0.3 (7891) - http://www.bohemiancoding.com/sketch -->
          <title>939</title>
          
          <defs></defs>
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g transform="translate(0.000000, 2.000000)" fill="#434343">
                  <path d="M5.787,0.042 L2.02,0.042 L2.02,1.063 L0.022,1.063 L0.022,10.976 L1.042,10.976 L1.044,11.976 L15.946,11.976 L15.967,3 L7.349,3 L5.787,0.042 L5.787,0.042 Z M7.979,4.979 L9.041,4.979 L9.041,7 L11.062,7 L11.062,8.062 L9.041,8.062 L9.041,10.083 L7.979,10.083 L7.979,8.062 L5.958,8.062 L5.958,7 L7.979,7 L7.979,4.979 L7.979,4.979 Z" fill="#ccc" class="si-glyph-fill"></path>
                  <path d="M13.964,1.982 L13.964,1.042 L8.024,1.042 L8.354,1.982 L13.964,1.982 Z" class="si-glyph-fill"></path>
              </g>
          </g>
      </svg>
      </ui-button>    
      </template>
      <template v-else>      
        <ui-button title="添加云函数" class="btnAdd tiny green " @confirm="addYunFunc">
        <svg width="15" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="si-glyph si-glyph-folder-plus">
          <!-- Generator: Sketch 3.0.3 (7891) - http://www.bohemiancoding.com/sketch -->
          <title>939</title>
          
          <defs></defs>
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g transform="translate(0.000000, 2.000000)" fill="#434343">
                  <path d="M5.787,0.042 L2.02,0.042 L2.02,1.063 L0.022,1.063 L0.022,10.976 L1.042,10.976 L1.044,11.976 L15.946,11.976 L15.967,3 L7.349,3 L5.787,0.042 L5.787,0.042 Z M7.979,4.979 L9.041,4.979 L9.041,7 L11.062,7 L11.062,8.062 L9.041,8.062 L9.041,10.083 L7.979,10.083 L7.979,8.062 L5.958,8.062 L5.958,7 L7.979,7 L7.979,4.979 L7.979,4.979 Z" fill="#fff" class="si-glyph-fill"></path>
                  <path d="M13.964,1.982 L13.964,1.042 L8.024,1.042 L8.354,1.982 L13.964,1.982 Z" class="si-glyph-fill"></path>
              </g>
          </g>
      </svg>
      </ui-button>   
      </template>
      </div>
      <hr />
  </div>
      <div class="containerDiv">
         
      <ui-box-container v-for="item in yunFuncs" :key="item.name">
      <svg width=10  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 490.5 490.5" style="enable-background:new 0 0 490.5 490.5;" xml:space="preserve">
      <g>
        <g>
          <path d="M381.15,101.6c-5.3-26.2-18.8-50.2-38.8-68.4C318.95,11.8,288.55,0,256.75,0c-24.5,0-48.3,7-68.8,20.3
            c-15.8,10.2-29,23.7-38.8,39.5c-3.1-0.4-6.2-0.6-9.4-0.6c-39.9,0-72.4,32.5-72.4,72.4c0,3.7,0.3,7.3,0.8,10.9
            c-23.2,18.4-37.1,46.7-37.1,76.7c0,25.2,9.4,49.8,26.5,69.2c17.6,20,41.1,31.7,66,33.1c0.3,0,0.7,0,1,0h45.5c9.9,0,18-8.1,18-18
            c0-9.9-8.1-18-18-18h-45c-31.5-2-58.1-32.3-58.1-66.3c0-21.9,11.8-42.3,30.7-53.4c7.6-4.4,10.8-13.6,7.8-21.8
            c-1.4-3.9-2.2-8-2.2-12.4c0-20,16.3-36.4,36.4-36.4c4.3,0,8.5,0.7,12.3,2.2c8.8,3.3,18.6-0.7,22.5-9.2
            c14.9-31.6,47.2-52.1,82.2-52.1c47.1,0,85.9,35.2,90.4,82c0.8,8.1,6.9,14.7,14.9,16c35,6,61.3,38.3,61.3,75.3
            c0,39.1-30.6,73.1-68.4,76.1h-109.7c-9.9,0-18,8.1-18,18v79.2c-16.1,5.5-28.9,18.3-34.4,34.4H86.05c-9.9,0-18,8.1-18,18
            c0,9.9,8.1,18,18,18h106.7c7.5,21.8,28.1,37.4,52.4,37.4s44.9-15.7,52.4-37.4h106.7c9.9,0,18-8.1,18-18c0-9.9-8.1-18-18-18h-121.7
            c-9.9,0-18,8.1-18,18c0,10.7-8.7,19.4-19.4,19.4s-19.4-8.7-19.4-19.4c0-10.9,8.7-19.6,19.4-19.6c9.9,0,18-8.1,18-18v-76.2h92.5
            c0.4,0,0.8,0,1.3,0c27.7-2,53.6-14.7,72.9-35.9c19.1-21,29.6-48,29.6-76.1C459.45,159.7,426.55,115.6,381.15,101.6z" fill="#00b26a"/>
        </g>
      </g> 
      </svg>
        <span id="{{item.name}}">{{item.name}}</span>
        <ui-button id="{{'btnDel-'+item.name}}"class="red tiny btnDel" title="删除云函数" data-folder="{{item.name}}" @confirm="delFolder">
        <svg width="15" viewBox="0 0 17 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="si-glyph si-glyph-folder-error">
            <!-- Generator: Sketch 3.0.3 (7891) - http://www.bohemiancoding.com/sketch -->
            <title>938</title>
            
            <defs></defs>
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g transform="translate(1.000000, 2.000000)" fill="#434343">
                    <path d="M7.35,3 L5.788,0.042 L2.021,0.042 L2.021,1.063 L0.023,1.063 L0.023,10.976 L1.043,10.976 L1.045,11.976 L15.947,11.976 L15.968,3 L7.35,3 L7.35,3 Z M10.918,9.109 L10.09,9.938 L8.512,8.361 L6.934,9.938 L6.104,9.109 L7.682,7.531 L6.104,5.953 L6.934,5.125 L8.512,6.701 L10.088,5.125 L10.918,5.953 L9.34,7.531 L10.918,9.109 L10.918,9.109 Z" fill="#fff" class="si-glyph-fill"></path>
                    <path d="M13.964,1.982 L13.964,1.042 L8.024,1.042 L8.354,1.982 L13.964,1.982 Z" class="si-glyph-fill"></path>
                </g>
            </g>
        </svg>
        </ui-button>
        <ui-button title="打开资源管理器" id="{{'btnDel-'+item.name}}" data-folder="{{item.name}}" class="blue tiny btnFile" @confirm="openFolder">
        
        <svg width="15" viewBox="0 0 17 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="si-glyph si-glyph-folder-open">
            <!-- Generator: Sketch 3.0.3 (7891) - http://www.bohemiancoding.com/sketch -->
            <title>82</title>
            
            <defs></defs>
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <path d="M8.03,4.042 L7.228,3.042 L1.015,3.042 L1.015,4.042 L0.00899999996,4.042 L0.00899999996,13 L1.026,13 L1.031,13.984 L14.65,13.963 L15.953,4.041 L8.03,4.041 L8.03,4.042 Z M13.82,13.041 L1.711,13.041 L3.1,4.953 L15.032,4.953 L13.82,13.041 L13.82,13.041 Z" fill="#fff" class="si-glyph-fill"></path>
            </g>
        </svg>
       
        </ui-button>
      </ui-box-container>      
      <!-- 添加时的样式 -->
      <ui-box-container v-if="isAdd">
      <svg width=10  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 490.5 490.5" style="enable-background:new 0 0 490.5 490.5;" xml:space="preserve">
      <g>
        <g>
          <path d="M381.15,101.6c-5.3-26.2-18.8-50.2-38.8-68.4C318.95,11.8,288.55,0,256.75,0c-24.5,0-48.3,7-68.8,20.3
            c-15.8,10.2-29,23.7-38.8,39.5c-3.1-0.4-6.2-0.6-9.4-0.6c-39.9,0-72.4,32.5-72.4,72.4c0,3.7,0.3,7.3,0.8,10.9
            c-23.2,18.4-37.1,46.7-37.1,76.7c0,25.2,9.4,49.8,26.5,69.2c17.6,20,41.1,31.7,66,33.1c0.3,0,0.7,0,1,0h45.5c9.9,0,18-8.1,18-18
            c0-9.9-8.1-18-18-18h-45c-31.5-2-58.1-32.3-58.1-66.3c0-21.9,11.8-42.3,30.7-53.4c7.6-4.4,10.8-13.6,7.8-21.8
            c-1.4-3.9-2.2-8-2.2-12.4c0-20,16.3-36.4,36.4-36.4c4.3,0,8.5,0.7,12.3,2.2c8.8,3.3,18.6-0.7,22.5-9.2
            c14.9-31.6,47.2-52.1,82.2-52.1c47.1,0,85.9,35.2,90.4,82c0.8,8.1,6.9,14.7,14.9,16c35,6,61.3,38.3,61.3,75.3
            c0,39.1-30.6,73.1-68.4,76.1h-109.7c-9.9,0-18,8.1-18,18v79.2c-16.1,5.5-28.9,18.3-34.4,34.4H86.05c-9.9,0-18,8.1-18,18
            c0,9.9,8.1,18,18,18h106.7c7.5,21.8,28.1,37.4,52.4,37.4s44.9-15.7,52.4-37.4h106.7c9.9,0,18-8.1,18-18c0-9.9-8.1-18-18-18h-121.7
            c-9.9,0-18,8.1-18,18c0,10.7-8.7,19.4-19.4,19.4s-19.4-8.7-19.4-19.4c0-10.9,8.7-19.6,19.4-19.6c9.9,0,18-8.1,18-18v-76.2h92.5
            c0.4,0,0.8,0,1.3,0c27.7-2,53.6-14.7,72.9-35.9c19.1-21,29.6-48,29.6-76.1C459.45,159.7,426.55,115.6,381.15,101.6z" fill="#00b26a"/>
        </g>
      </g> 
      </svg>
        <ui-input placeholder="输入云函数名称..." id="addFuncName" @confirm="addFuncName" focused="true"></ui-input>
        
        <ui-button title="取消" class="red tiny btnFile" @confirm="onAddCancel">
        <svg width=15 viewBox="0 0 17 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="si-glyph si-glyph-delete">
            <!-- Generator: Sketch 3.0.3 (7891) - http://www.bohemiancoding.com/sketch -->
            <title>1227</title>
            
            <defs></defs>
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <path d="M12.566,8 L15.611,4.956 C16.031,4.535 16.031,3.853 15.611,3.434 L12.566,0.389 C12.146,-0.031 11.464,-0.031 11.043,0.389 L7.999,3.433 L4.955,0.389 C4.534,-0.031 3.852,-0.031 3.432,0.389 L0.388,3.434 C-0.034,3.854 -0.034,4.536 0.387,4.956 L3.431,8 L0.387,11.044 C-0.034,11.465 -0.034,12.147 0.388,12.567 L3.432,15.611 C3.852,16.032 4.534,16.032 4.955,15.611 L7.999,12.567 L11.043,15.611 C11.464,16.032 12.146,16.032 12.566,15.611 L15.611,12.567 C16.031,12.146 16.031,11.464 15.611,11.044 L12.566,8 L12.566,8 Z" fill="#fff" class="si-glyph-fill"></path>
            </g>
        </svg>       
        </ui-button>

        <ui-button title="确认添加" class="green tiny btnFile" @confirm="onAddConfirm">
        <svg width=15 viewBox="0 0 17 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="si-glyph si-glyph-checked">
            <!-- Generator: Sketch 3.0.3 (7891) - http://www.bohemiancoding.com/sketch -->
            <title>1228</title>
            
            <defs></defs>
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <path d="M3.432,6.189 C3.824,5.798 4.455,5.798 4.847,6.189 L6.968,8.31 L13.147,2.131 C13.531,1.747 14.157,1.753 14.548,2.144 L16.67,4.266 C17.06,4.657 17.066,5.284 16.684,5.666 L7.662,14.687 C7.278,15.07 6.651,15.064 6.261,14.673 L1.311,9.723 C0.92,9.333 0.92,8.7 1.311,8.31 L3.432,6.189 Z" fill="#fff" class="si-glyph-fill"></path>
            </g>
        </svg>
       
        </ui-button>
      </ui-box-container>  
      
      </div>
      <hr />
      <div class="statusBar">状态: <span id="label" v-html="status"></span></div>
      </div>
    `,

  $: {
    // btnAddFunc: '#btnAddFunc',
    // btn: '#btn',
    label: '#label',
    addFuncName: '#addFuncName',
    btnPath: '#btnPath',
    txtRootPath: '#txtRootPath',
    containerDiv: '.containerDiv'
  },
  data: {
    yunFuncsRootPath: "",
    isAdd: false,
    addName: "",
    status: "--",
    addYunFuncs: [],
    yunFuncs: []
  },
  /**
   * 创建云函数根目录
   * @param {string} targetPath 
   */
  createYunFuncRootPath: function (targetPath) {
    let bTPath = Editor.Project.path + "/build-templates";
    if (!fs.existsSync(bTPath)) {
      fs.mkdirSync(bTPath)
    }

    let wxgamePath = Editor.Project.path + "/build-templates/wechatgame";
    if (!fs.existsSync(wxgamePath)) {
      fs.mkdirSync(wxgamePath)
    }

    let yunFuncsRootPath = Editor.Project.path + "/build-templates/wechatgame/" + targetPath;
    if (!fs.existsSync(yunFuncsRootPath)) {
      fs.mkdirSync(yunFuncsRootPath)
    }
  },
  createYunFunc: function (funcName) {
    let yunFuncsRootPath = Editor.Project.path + "/build-templates/wechatgame/" + this.data.yunFuncsRootPath;
    let funcPath = Editor.Project.path + "/build-templates/wechatgame" + this.data.yunFuncsRootPath + "/" + funcName;
    if (!fs.existsSync(funcPath)) {
      //创建目录
      fs.mkdirSync(funcPath);
      //复制微信默认的index.js 和package.json模板到新建目录下
    } else {
      //提示已存在相同目录
    }
  },
  /**
   * 加载当前设定的云开发根目录下的云函数文件夹
   */
  loadSubYunFuncs() {

    if (this.data.yunFuncsRootPath === undefined || this.data.yunFuncsRootPath === "") {
      Editor.log("未设置云开发根目录");
      return;
    }
    let that = this;
    let yunFuncsRootPath = Editor.Project.path + "/build-templates/wechatgame/" + this.data.yunFuncsRootPath;
    that.data.yunFuncs = [];
    if (fs.existsSync(yunFuncsRootPath)) {
      let folders = fs.readdirSync(yunFuncsRootPath);
      folders.forEach(element => {
        let info = fs.statSync(yunFuncsRootPath + "/" + element)
        if (info.isDirectory()) {
          that.data.yunFuncs.push({
            name: element
          });
        }
      });
      Editor.success("加载云函数列表成功！");
    } else {
      Editor.warn("未设置云开发根目录,请编辑文件夹名称后，点击【确定】按钮进行设置");
    }
  },
  /**
   * 加载云函数根目录配置
   */
  loadYunFuncRootPath() {
    // console.log('package loaded');
    // 读取本插件的package.json
    Editor.log("读取插件的setting.json");
    let settingConfigPath = Editor.Project.path + "/packages/" + packageName + "/setting.json";
    let settingConfig = "";
    let settingConfigObj = {};
    if (fs.existsSync(settingConfigPath)) {
      settingConfig = fs.readFileSync(settingConfigPath, 'utf8');
      settingConfigObj = JSON.parse(settingConfig);
    }
    this.data.yunFuncsRootPath = settingConfigObj["cloudfunctionRoot"];

  },
  /**
   * 设置云函数根目录配置
   * @param {*} targetPath 
   */
  setYunFuncRootPath(targetPath) {
    let settingConfigPath = Editor.Project.path + "/packages/" + packageName + "/setting.json";
    let settingConfig = "";
    let settingConfigObj = {};
    if (fs.existsSync(settingConfigPath)) {
      let settingConfig = fs.readFileSync(settingConfigPath, 'utf8');
      settingConfigObj = JSON.parse(settingConfig);
    }

    settingConfigObj["cloudfunctionRoot"] = targetPath;
    let str = JSON.stringify(settingConfigObj);
    fs.writeFileSync(settingConfigPath, str); // 保存
    this.createYunFuncRootPath(targetPath);
  },
  /**
   * 复制文件
   * @param {*} sourceFile 
   * @param {*} targetFile 
   */
  copyFile(sourceFile, targetFile) {
    let rs = fs.createReadStream(sourceFile);
    let ws = fs.createWriteStream(targetFile);
    ws.on('close', function () {
      rs.close();
      ws.close();
    });
    rs.pipe(ws);
  },
  showMessage(message, level) {
    let m = "log";
    let c = "green";
    switch (level) {
      case "log": {
        m = "log";
        c = "white";
        break;
      }
      case "warn": {
        m = "warn";
        c = "yellow";
        break;
      }
      case "success": {
        m = "success";
        c = "green";
        break;
      }
      case "error": {
        m = "error";
        c = "red";
        break;
      }
      default: {
        m = "log";
        c = "white";
        break;
      }
    }
    this.data.status = "<font color='"+c+"'>"+message+"</font>";
    Editor.trace(m,message);
  },
  ready() {
    let that = this;
    new window.Vue({
      el: this.shadowRoot,
      data: function () {
        return that.data;
      },
      methods: {
        /**
         * 确认添加云函数
         * @param {*} event 
         */
        onAddConfirm(event) {
          event.stopPropagation();
          // confirm("试试看弹窗")
          console.log("event", event)
          Editor.log(that.$addFuncName.innerText)

          if (that.data.addName === "") {
            // that.data.status = "<font color='yellow'>请输入云函数名称！</font>";
            that.showMessage("请输入云函数名称！","warn");
            return;
          }


          let finded = that.data.yunFuncs.find(obj => obj.name === that.data.addName);
          //判断是否有重复云函数名
          if (finded === undefined) {
            //判断 build-templates/wechatgame目录下是否已存在相同目录名称
            //如果有则提示是否要将该文件夹直接作为云函数文件夹，否则需要用户手动删除该文件夹，再次操作

            let funcPath = Editor.Project.path + "/build-templates/wechatgame/" + that.data.yunFuncsRootPath + "/" + that.data.addName;
            if (fs.existsSync(funcPath)) {
              if (confirm(`/build-templates/wechatgame/${that.data.yunFuncsRootPath}/ 目录下已经存在相同名称文件夹：${that.data.addName},直接将已存在的文件夹作为云函数文件夹请点【确定】，否则(手动处理)请点击【取消】`)) {
                that.data.yunFuncs.push({
                  name: that.data.addName
                });
                // that.loadSubYunFuncs();
              }
            } else {
              fs.mkdirSync(funcPath);
              let templatePath = Editor.Project.path + "/packages/" + packageName + "/template";
              // debugger;
              that.copyFile(templatePath + "/index.js", funcPath + "/index.js");
              that.copyFile(templatePath + "/package.json", funcPath + "/package.json");
            }
            that.data.yunFuncs.push({
              name: that.data.addName
            })
            that.data.isAdd = false;
            that.data.addName = "";
            // that.data.status = "<font color='green'>添加云函数成功！</font>";
            that.showMessage("添加云函数成功！","success");
          } else {
            // that.data.status = "<font color='red'>已存在同名的云函数！</font>";
            that.showMessage("已存在同名的云函数！","error");
          }
        },
        /**
         * 取消添加操作
         * @param {*} event 
         */
        onAddCancel(event) {
          event.stopPropagation();
          that.data.isAdd = false;
          that.data.addName = "";
          // that.data.status = "<font color='yellow'>取消添加云函数</font>";
          that.showMessage("取消添加云函数","warn");
        },
        /**
         * 添加云函数按钮
         * @param {*} event 
         */
        addYunFunc(event) {
          event.stopPropagation();
          let funcPath = Editor.Project.path + "/build-templates/wechatgame/" + that.data.yunFuncsRootPath + "/";
          if (that.data.yunFuncsRootPath === undefined || that.data.yunFuncsRootPath === "" || !fs.existsSync(funcPath)) {
            // that.data.status = "<font color='red'>未设置云开发根目录,请编辑文件夹名称后，点击【确定】按钮进行设置</font>";
            that.showMessage("未设置云开发根目录,请编辑文件夹名称后，点击【确定】按钮进行设置","error");
          } else {
            that.data.isAdd = true;
            this.$nextTick(function () {
              that.$containerDiv.scrollTop = that.$containerDiv.scrollHeight;
            })

          }
        },
        /**
         * 添加云函数名称
         * @param {*} event 
         */
        addFuncName(event) {
          event.stopPropagation();
          that.data.addName = event.currentTarget.value;
        },
        /**
         * 打开云函数对应的目录
         * @param {*} event 
         */
        openFolder(event) {
          const {
            shell
          } = require("electron").remote;
          let folderPath = Editor.Project.path + "/build-templates/wechatgame/" + that.data.yunFuncsRootPath + "/" + event.currentTarget.dataset["folder"];

          shell.showItemInFolder(folderPath + "/index.js");
        },
        /**
         * 删除云函数对应的目录
         * @param {*} event 
         */
        delFolder(event) {
          const {
            dialog
          } = require('electron').remote
          let folderPath = Editor.Project.path + "/build-templates/wechatgame/" + that.data.yunFuncsRootPath + "/" + event.currentTarget.dataset["folder"];
          dialog.showMessageBox({
              type: "warning",
              buttons: ["确定", "取消"],
              title: "删除云函数警告",
              message: "此操作会删除云函数文件夹“" + event.currentTarget.dataset["folder"] + "”以及其下所有子文件，确定要进行删除操作？"
            },
            function (response) {
              Editor.log("showMessageBox btn:", response);
              if (response === 0) {
                let files = [];
                if (fs.existsSync(folderPath)) {
                  files = fs.readdirSync(folderPath);
                  files.forEach((file, index) => {
                    let curPath = folderPath + "/" + file;
                    if (fs.statSync(curPath).isDirectory()) {
                      delDir(curPath); //递归删除文件夹
                    } else {
                      fs.unlinkSync(curPath); //删除文件
                    }
                  });
                  fs.rmdirSync(folderPath);
                  that.loadSubYunFuncs();
                  // that.data.status = "<font color='green'>删除云函数对应的目录成功！</font>";
                  that.showMessage("删除云函数对应的目录成功！","success");
                }
              }
            });
        }
      }
    });

    this.loadYunFuncRootPath();
    this.loadSubYunFuncs();

    this.$btnPath.addEventListener('confirm', () => {
      that.data.yunFuncsRootPath = that.$txtRootPath.value;
      that.setYunFuncRootPath(that.data.yunFuncsRootPath);
      that.loadSubYunFuncs();
      // that.data.status = "<font color='green'>设置云开发根目录成功！</font>";
      that.showMessage("设置云开发根目录成功！","success");
    });

  },
});