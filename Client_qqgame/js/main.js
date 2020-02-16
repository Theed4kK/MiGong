var egret = window.egret;var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var UIBase = (function (_super) {
    __extends(UIBase, _super);
    function UIBase(bgClose) {
        if (bgClose === void 0) { bgClose = false; }
        var _this = _super.call(this) || this;
        _this.bgClose = false;
        _this.isScale = false;
        _this.bgClose = bgClose;
        return _this;
    }
    UIBase.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        var self = this;
        if (self.width >= UIBase.UILayer.width && self.height >= UIBase.UILayer.height) {
            self.width = UIBase.UILayer.width;
            self.height = UIBase.UILayer.height;
        }
        else {
            if (self.isScale) {
                var scale = Math.min(UIBase.UILayer.width / self.width, UIBase.UILayer.height / self.height);
                self.scaleX = scale;
                self.scaleY = scale;
            }
            else {
                self.width = Math.min(self.width, UIBase.UILayer.width);
                self.height = Math.min(self.height, UIBase.UILayer.height);
            }
            var _width = self.width * self.scaleX;
            var _height = self.height * self.scaleY;
            self.horizontalCenter = 0;
            self.verticalCenter = 0;
            if (self.bgClose) {
                var bg = new egret.Sprite();
                self.addChildAt(bg, 0);
                bg.graphics.beginFill(0x000000, 0.8);
                bg.graphics.drawRect(0, 0, UIBase.UILayer.width / self.scaleX, UIBase.UILayer.height / self.scaleY);
                bg.graphics.endFill();
                bg.touchEnabled = true;
                bg.anchorOffsetX = (bg.width - self.width) / 2;
                bg.anchorOffsetY = (bg.height - self.height) / 2;
                bg.x = 0;
                bg.y = 0;
                bg.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    self.visible = false;
                }, self);
            }
        }
    };
    UIBase.OpenUI = function (creator) {
        var arg = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            arg[_i - 1] = arguments[_i];
        }
        var className = creator.prototype.__class__;
        var ui = UIBase.uiList[className];
        if (!ui || arg.length > 0) {
            if (ui) {
                UIBase.UILayer.removeChild(ui);
            }
            ui = new (creator.bind.apply(creator, [void 0].concat(arg)))();
            UIBase.uiList[className] = ui;
            UIBase.UILayer.addChild(ui);
        }
        else {
            ui.dispatchEvent(new egret.Event("OnOpen"));
            ui.visible = true;
        }
        return ui;
    };
    UIBase.CloseUI = function (creator) {
        var className = creator.prototype.__class__;
        var ui = UIBase.uiList[className];
        if (ui) {
            ui.visible = false;
            return true;
        }
        else {
            console.log("尝试关闭一个未打开过的UI");
            return false;
        }
    };
    UIBase.uiList = {};
    return UIBase;
}(eui.Component));
__reflect(UIBase.prototype, "UIBase", ["eui.UIComponent", "egret.DisplayObject"]);
var Cell = (function () {
    function Cell() {
        this.wallState = 15;
        /**0:上墙 1:下墙 2:左墙 3:右墙 */
        this.upWall = new Wall();
        this.downWall = new Wall();
        this.leftWall = new Wall();
        this.rightWall = new Wall();
        this.upCell = null;
        this.downCell = null;
        this.leftCell = null;
        this.rightCell = null;
        /**生成时用来标记是否已经被处理过 */
        this.isSigned = false;
        /**行走时用来标记格子是否已经通过 */
        this.isPassed = false;
        this.item = 0;
    }
    ;
    ;
    ;
    ;
    ;
    ;
    ;
    return Cell;
}());
__reflect(Cell.prototype, "Cell");
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [4 /*yield*/, platform.login()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 3:
                        userInfo = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_1, loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 5]);
                        wx.cloud.init();
                        egret.ImageLoader.crossOrigin = "anonymous";
                        return [4 /*yield*/, RES.loadConfig("default.res.json", "http://192.168.11.104:8080/resource/")];
                    case 2:
                        _a.sent();
                        console.log("使用网络资源");
                        return [3 /*break*/, 5];
                    case 3:
                        err_1 = _a.sent();
                        console.log("使用本地资源");
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 5: 
                    // await RES.loadGroup("loading");//加载loading组
                    return [4 /*yield*/, this.loadTheme()];
                    case 6:
                        // await RES.loadGroup("loading");//加载loading组
                        _a.sent();
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 7:
                        _a.sent();
                        Config.GetInstance().InitCofing(); //加载配置文件
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 9];
                    case 8:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createGameScene = function () {
        // this.stage.addChild(new StartPage());
        var uiLayer = new eui.UILayer();
        UIBase.UILayer = uiLayer;
        this.stage.addChild(uiLayer);
        DBManage.InitWx();
        UIBase.OpenUI(StartPage);
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
var DebugPlatform = (function () {
    function DebugPlatform() {
    }
    DebugPlatform.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { nickName: "username" }];
            });
        });
    };
    DebugPlatform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return DebugPlatform;
}());
__reflect(DebugPlatform.prototype, "DebugPlatform", ["Platform"]);
if (!window.platform) {
    window.platform = new DebugPlatform();
}
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var ThemeAdapter = (function () {
    function ThemeAdapter() {
    }
    /**
     * 解析主题
     * @param url 待解析的主题url
     * @param onSuccess 解析完成回调函数，示例：compFunc(e:egret.Event):void;
     * @param onError 解析失败回调函数，示例：errorFunc():void;
     * @param thisObject 回调的this引用
     */
    ThemeAdapter.prototype.getTheme = function (url, onSuccess, onError, thisObject) {
        var _this = this;
        function onResGet(e) {
            onSuccess.call(thisObject, e);
        }
        function onResError(e) {
            if (e.resItem.url == url) {
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                onError.call(thisObject);
            }
        }
        if (typeof generateEUI !== 'undefined') {
            egret.callLater(function () {
                onSuccess.call(thisObject, generateEUI);
            }, this);
        }
        else if (typeof generateEUI2 !== 'undefined') {
            RES.getResByUrl("resource/gameEui.json", function (data, url) {
                window["JSONParseClass"]["setData"](data);
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateEUI2);
                }, _this);
            }, this, RES.ResourceItem.TYPE_JSON);
        }
        else if (typeof generateJSON !== 'undefined') {
            if (url.indexOf(".exml") > -1) {
                var dataPath = url.split("/");
                dataPath.pop();
                var dirPath = dataPath.join("/") + "_EUI.json";
                if (!generateJSON.paths[url]) {
                    RES.getResByUrl(dirPath, function (data) {
                        window["JSONParseClass"]["setData"](data);
                        egret.callLater(function () {
                            onSuccess.call(thisObject, generateJSON.paths[url]);
                        }, _this);
                    }, this, RES.ResourceItem.TYPE_JSON);
                }
                else {
                    egret.callLater(function () {
                        onSuccess.call(thisObject, generateJSON.paths[url]);
                    }, this);
                }
            }
            else {
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateJSON);
                }, this);
            }
        }
        else {
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
            RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
        }
    };
    return ThemeAdapter;
}());
__reflect(ThemeAdapter.prototype, "ThemeAdapter", ["eui.IThemeAdapter"]);
var BagUI = (function (_super) {
    __extends(BagUI, _super);
    function BagUI() {
        var _this = _super.call(this, true) || this;
        _this.souceData = [];
        //面板和道具类型的对应关系
        _this.indexToType = {
            0: 1,
            1: 2
        };
        _this.isScale = true;
        return _this;
    }
    BagUI.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    BagUI.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.view.getChildAt(0).name = "道具";
        this.view.getChildAt(1).name = "贡品";
        this.tabBar.dataProvider = this.view;
        this.view.selectedIndex = 0;
        this.InitList();
        this.RrefreshList(this.view.selectedIndex);
        this.tabBar.addEventListener(eui.ItemTapEvent.ITEM_TAP, function (e) {
            _this.DisplayList(e.itemIndex);
        }, this);
        this.addEventListener("OnOpen", this.OnOpen, this);
    };
    BagUI.prototype.OnOpen = function () {
        this.RrefreshList(this.view.selectedIndex);
    };
    BagUI.prototype.InitList = function () {
        var self = this;
        self.list_item1.itemRenderer = BagItemRender;
        self.list_item2.itemRenderer = BagItemRender;
        self.lists = [self.list_item1, self.list_item2];
    };
    BagUI.prototype.RrefreshList = function (index) {
        var self = this;
        ItemManage.GetInstance().Getdata().then(function (data) {
            self.souceData = Common.DictionaryToArray(data);
            self.DisplayList(0);
        });
    };
    BagUI.prototype.DisplayList = function (index) {
        var self = this;
        if (self.lists[index].dataProvider) {
            return;
        }
        var itemConfigs = Config.GetInstance().config_item;
        var souceData = self.souceData.filter(function (x) { return itemConfigs[x.id].type == self.indexToType[index]; });
        if (souceData.length == 0) {
            return;
        }
        self.arrayCollection = new eui.ArrayCollection(souceData);
        self.lists[index].dataProvider = self.arrayCollection;
    };
    return BagUI;
}(UIBase));
__reflect(BagUI.prototype, "BagUI");
var BagItemRender = (function (_super) {
    __extends(BagItemRender, _super);
    function BagItemRender() {
        return _super.call(this) || this;
    }
    BagItemRender.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    BagItemRender.prototype.dataChanged = function () {
        var config = Config.GetInstance().config_item[this.data.id];
        this.img_icon.texture = RES.getRes(config.pic);
        this.txt_name.text = config.name;
        this.txt_num.text = "\u5F53\u524D\u62E5\u6709\uFF1A" + this.data.value;
        this.txt_des.text = config.des;
    };
    return BagItemRender;
}(eui.ItemRenderer));
__reflect(BagItemRender.prototype, "BagItemRender");
var Common = (function () {
    function Common() {
    }
    Common.getRandomInt = function (min, max) {
        var Range = max - min;
        var Rand = Math.random();
        return (min + Math.round(Rand * Range));
    };
    /**把数组字段转换成数组
     * breakWord:分隔符
     * toNum:返回的是数值数组还是字符串数组
     */
    Common.ParseField = function (field, breakWord, toNum) {
        if (breakWord === void 0) { breakWord = ","; }
        if (toNum === void 0) { toNum = true; }
        var arr = field.split(breakWord);
        if (toNum) {
            var nums_1 = [];
            arr.forEach(function (v) {
                nums_1.push(Number(v));
            });
            return nums_1;
        }
        else {
            return arr;
        }
    };
    Common.DictionaryToArray = function (dict) {
        var data = [];
        for (var item in dict) {
            data.push({ id: item, value: dict[item] });
        }
        return data;
    };
    return Common;
}());
__reflect(Common.prototype, "Common");
var Config = (function () {
    function Config() {
        this.config_paths = [
            ["config_item", "item_json"],
            ["config_map", "map_json"],
            ["config_level", "level_json"],
            ["config_common", "commom_json"]
        ];
    }
    Config.GetInstance = function () {
        Config.instance = Config.instance ? Config.instance : new Config();
        return Config.instance;
    };
    Config.prototype.InitCofing = function () {
        var _this = this;
        this.config_paths.forEach(function (path) {
            Config.instance[path[0]] = _this.GetConfigFromFile(path[1]);
        });
    };
    Config.prototype.GetConfigFromFile = function (fileName) {
        var objs = RES.getRes(fileName);
        var configs = [];
        objs.forEach(function (v) {
            configs[v.id] = v;
        });
        return configs;
    };
    return Config;
}());
__reflect(Config.prototype, "Config");
var ItemUI = (function (_super) {
    __extends(ItemUI, _super);
    function ItemUI() {
        return _super.call(this) || this;
    }
    ItemUI.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    ItemUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return ItemUI;
}(eui.Component));
__reflect(ItemUI.prototype, "ItemUI", ["eui.UIComponent", "egret.DisplayObject"]);
var StartPage = (function (_super) {
    __extends(StartPage, _super);
    function StartPage() {
        return _super.call(this) || this;
    }
    StartPage.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    StartPage.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        egret.Tween.get(this.btn_start, { loop: true }).to({ alpha: 0.5 }, 500).to({ alpha: 1 }, 500);
        this.AddListeners();
    };
    StartPage.prototype.AddListeners = function () {
        this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            UIBase.OpenUI(GameUI);
        }, this);
        this.btn_bag.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            UIBase.OpenUI(BagUI);
        }, this);
    };
    return StartPage;
}(UIBase));
__reflect(StartPage.prototype, "StartPage");
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var AssetAdapter = (function () {
    function AssetAdapter() {
    }
    /**
     * @language zh_CN
     * 解析素材
     * @param source 待解析的新素材标识符
     * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
     * @param thisObject callBack的 this 引用
     */
    AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
        function onGetRes(data) {
            compFunc.call(thisObject, data, source);
        }
        if (RES.hasRes(source)) {
            var data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        }
        else {
            RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    return AssetAdapter;
}());
__reflect(AssetAdapter.prototype, "AssetAdapter", ["eui.IAssetAdapter"]);
var ItemLib = (function () {
    function ItemLib() {
    }
    return ItemLib;
}());
__reflect(ItemLib.prototype, "ItemLib");
var LevelLib = (function () {
    function LevelLib() {
    }
    return LevelLib;
}());
__reflect(LevelLib.prototype, "LevelLib");
var MapLib = (function () {
    function MapLib() {
    }
    return MapLib;
}());
__reflect(MapLib.prototype, "MapLib");
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.skinName = "Loading";
        return _this;
    }
    LoadingUI.prototype.onProgress = function (current, total) {
        // this.textField.text = `Loading...${current}/${total}`;
    };
    return LoadingUI;
}(eui.Component));
__reflect(LoadingUI.prototype, "LoadingUI", ["eui.UIComponent", "egret.DisplayObject"]);
var CellBgRender = (function (_super) {
    __extends(CellBgRender, _super);
    function CellBgRender() {
        return _super.call(this) || this;
    }
    CellBgRender.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.width = +Config.GetInstance().config_common["cell_width"].value;
        this.height = +Config.GetInstance().config_common["cell_height"].value;
    };
    CellBgRender.prototype.dataChanged = function () {
        var cell = this.data;
        this.SetWall();
        if (cell.item != 0) {
            var item = Config.GetInstance().config_item[cell.item];
            this.img_item.source = item.pic;
            this.img_item.visible = true;
            this.img_item.x = this.x + Common.getRandomInt(this.img_leftWall.width / 2, this.width - this.img_rightWall.width / 2 - this.img_item.width);
            this.img_item.y = this.y + Common.getRandomInt(this.img_upWall.height / 2, this.height - this.img_downWall.height / 2 - this.img_item.height);
        }
        else {
            this.img_item.visible = false;
        }
        if (cell.isSpecial) {
            this.img_bg.source = RES.getRes("532_png");
            this.img_bg.visible = true;
        }
    };
    CellBgRender.prototype.ItemTest = function (role) {
        var rect1 = role.getBounds();
        var rect2 = this.img_item.getBounds();
        var point1 = role.localToGlobal();
        var point2 = this.img_item.localToGlobal();
        rect1.x = point1.x;
        rect1.y = point1.y;
        rect2.x = point2.x;
        rect2.y = point2.y;
        if (rect1.intersects(rect2)) {
            this.img_item.visible = false;
            return true;
        }
        return false;
    };
    CellBgRender.prototype.HideReturnSign = function () {
        this.img_exitSign.visible = false;
    };
    CellBgRender.prototype.StartAni = function () {
    };
    CellBgRender.prototype.SetWall = function () {
        var cell = this.data;
        this.img_leftWall.visible = !cell.leftWall.isOpen;
        this.img_rightWall.visible = !cell.rightWall.isOpen;
        this.img_upWall.visible = !cell.upWall.isOpen;
        this.img_downWall.visible = !cell.downWall.isOpen;
    };
    return CellBgRender;
}(eui.ItemRenderer));
__reflect(CellBgRender.prototype, "CellBgRender");
var ExitTips = (function (_super) {
    __extends(ExitTips, _super);
    function ExitTips(point, itemNum) {
        var _this = _super.call(this, true) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, function () {
            _this.txt_tips.text = "\u786E\u8BA4\u9000\u51FA\u8FF7\u5BAB\uFF1F\n\u5F53\u524D\u5DF2\u63A2\u7D22\uFF1A" + point + "\n\u5F53\u524D\u5DF2\u627E\u5230\u5B9D\u85CF\uFF1A" + itemNum;
        }, _this);
        return _this;
    }
    ExitTips.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    ExitTips.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.btn_cancel.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            UIBase.CloseUI(ExitTips);
        }, this);
        this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.dispatchEvent(new egret.Event("ExitMap"));
            UIBase.CloseUI(ExitTips);
        }, this);
    };
    return ExitTips;
}(UIBase));
__reflect(ExitTips.prototype, "ExitTips");
var GameControl = (function (_super) {
    __extends(GameControl, _super);
    function GameControl(img_role, group_light, speed, manageCells, maskSize) {
        var _this = _super.call(this) || this;
        _this.maskLight = new LightMask();
        _this.wall_height = +Config.GetInstance().config_common["wall_height"].value;
        _this.wall_width = +Config.GetInstance().config_common["wall_height"].value;
        _this.cell_height = +Config.GetInstance().config_common["cell_height"].value;
        _this.cell_width = +Config.GetInstance().config_common["cell_height"].value;
        _this.lastPoint = new egret.Point(0, 0);
        _this.img_role = img_role;
        _this.group_light = group_light;
        _this.manageCells = manageCells;
        _this.maskSize = maskSize;
        _this.InitLight();
        _this.speed = speed;
        _this.img_role.anchorOffsetX = _this.img_role.width / 2;
        _this.img_role.anchorOffsetY = _this.img_role.height / 2;
        return _this;
    }
    /**初始化光照 */
    GameControl.prototype.InitLight = function () {
        var maskLight = this.maskLight;
        maskLight.SetMaskSize(this.maskSize[0], this.maskSize[1]);
        maskLight.SetLightValue();
        maskLight.MoveMask(this.cell_width / 2, this.cell_height / 2, this.manageCells.currentCell, this.manageCells.currentBgRender);
        this.group_light.addChild(this.maskLight);
        maskLight.x = 0;
        maskLight.y = 0;
    };
    GameControl.prototype.RefreshLight = function () {
        var role = this.img_role;
        this.maskLight.MoveMask(role.x, role.y, this.manageCells.currentCell, this.manageCells.currentBgRender);
    };
    GameControl.prototype.RoleMoveState = function (state, start, target) {
        if (start === void 0) { start = 0; }
        if (target === void 0) { target = 0; }
        switch (state) {
            //操作移动
            case 0:
                this.addEventListener(egret.Event.ENTER_FRAME, this.PlayerMove, this);
                break;
            //停止操作移动
            case 1:
                this.removeEventListener(egret.Event.ENTER_FRAME, this.PlayerMove, this);
                break;
            case 2:
                this.addEventListener(egret.Event.ENTER_FRAME, this.RoleAutoMove, this);
                break;
            case 3:
                this.RoleAutoMove();
                break;
        }
    };
    GameControl.prototype.RoleAutoMove = function () {
        var path = this.manageCells.returnPath;
        if (path.length == 0) {
            return;
        }
        var index;
        if (path.length > 1) {
            index = path[path.length - 2] + 0.5;
        }
        else {
            index = path[0] + 0.5;
        }
        this.direction = Math.atan2(index * this.cell_height - this.img_role.y, index * this.cell_width - this.img_role.x);
        this.RoleMove(2);
    };
    GameControl.prototype.PlayerMove = function () {
        this.RoleMove(1);
    };
    /**角色移动,type:1为手动引动  2为自动移动 */
    GameControl.prototype.RoleMove = function (type) {
        if (type === void 0) { type = 1; }
        if (this.direction == null) {
            return;
        }
        var startTimer = egret.getTimer();
        var speedX = Number((Math.cos(this.direction) * this.speed * type).toFixed(2));
        var speedY = Number((Math.sin(this.direction) * this.speed * type).toFixed(2));
        var cell = this.manageCells.currentCell;
        var obj = this.manageCells.currentBgRender;
        var moveX = 0;
        var moveY = 0;
        var img_role = this.img_role;
        var moveRight = speedX > 0;
        var nearWall = moveRight ? cell.rightWall : cell.leftWall;
        if (!nearWall.isOpen || this.IsEdge(0)) {
            var width = this.wall_width * 0.5 + img_role.width * 0.5;
            var distance = Math.abs(obj.x + (moveRight ? 1 : 0) * obj.width / type - img_role.x) - width;
            moveX = moveRight ? Math.min(distance, speedX) : Math.max(-distance, speedX);
        }
        else {
            moveX = speedX;
        }
        img_role.x += moveX;
        moveRight = speedY < 0;
        nearWall = moveRight ? cell.upWall : cell.downWall;
        if (!nearWall.isOpen || this.IsEdge(1)) {
            var height = this.wall_height * 0.5 + img_role.height * 0.5;
            var distance = Math.abs(obj.y + (moveRight ? 0 : 1) * obj.height / type - img_role.y) - height;
            moveY = moveRight ? Math.max(-distance, speedY) : Math.min(distance, speedY);
        }
        else {
            moveY = speedY;
        }
        img_role.y += moveY;
        this.dispatchEventWith("moveScroll", false, { moveX: moveX, moveY: moveY });
        this.manageCells.SetIndex(img_role);
        if (this.lastPoint && Math.abs(moveX) > 1 || Math.abs(moveY) > 1) {
            this.RefreshLight();
            this.lastPoint = new egret.Point(img_role.x, img_role.y);
        }
    };
    GameControl.prototype.IsEdge = function (type) {
        var isEdge = true;
        var img_role = this.img_role;
        var obj = this.manageCells.currentBgRender;
        switch (type) {
            case 0:
                isEdge = (Math.abs(img_role.y - obj.y)) < ((img_role.height / 2) + this.wall_height * 0.5);
                isEdge = isEdge || ((Math.abs(img_role.y - obj.y - obj.height) < (img_role.height / 2) + this.wall_height * 0.5));
                break;
            case 1:
                isEdge = (Math.abs(img_role.x - obj.x)) < ((img_role.width / 2) + this.wall_width * 0.5);
                isEdge = isEdge || ((Math.abs(img_role.x - obj.x - obj.width) < (img_role.width / 2) + this.wall_width * 0.5));
                break;
        }
        return isEdge;
    };
    return GameControl;
}(eui.Component));
__reflect(GameControl.prototype, "GameControl");
var GameItem = (function (_super) {
    __extends(GameItem, _super);
    function GameItem() {
        return _super.call(this) || this;
    }
    GameItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.Init();
    };
    GameItem.prototype.Init = function () {
        this.list.itemRenderer;
        this.list.dataProvider;
    };
    return GameItem;
}(eui.Component));
__reflect(GameItem.prototype, "GameItem", ["eui.UIComponent", "egret.DisplayObject"]);
var ItemRenderInGameUI = (function (_super) {
    __extends(ItemRenderInGameUI, _super);
    function ItemRenderInGameUI() {
        return _super.call(this) || this;
    }
    ItemRenderInGameUI.prototype.dataChanged = function () {
    };
    return ItemRenderInGameUI;
}(eui.ItemRenderer));
__reflect(ItemRenderInGameUI.prototype, "ItemRenderInGameUI");
var GameUI = (function (_super) {
    __extends(GameUI, _super);
    function GameUI() {
        var _this = _super.call(this) || this;
        _this.mapTexture = new egret.Bitmap();
        _this.stepNum = 0;
        _this.virt = new VirtualRocker();
        _this.once(egret.Event.REMOVED_FROM_STAGE, _this.RemoveListener, _this);
        return _this;
    }
    GameUI.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.addChild(this.virt);
        this.virt.visible = false;
        this.scroller_map.viewport = this.list_cell;
        this.GenMiGong().then(function () {
            console.log("地图生成完成");
            _this.AddListener();
        });
    };
    GameUI.prototype.AddListener = function () {
        this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ExitMap, this);
        this.img_Bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.BeginTouch, this);
        this.img_Bg.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.Move, this);
        this.img_Bg.addEventListener(egret.TouchEvent.TOUCH_END, this.CancelTouch, this);
        this.img_Bg.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.CancelTouch, this);
        this.manageCells.addEventListener("RefreshCurRender", this.UpdateIndex, this);
        this.gameControl.addEventListener("moveScroll", this.MoveScroll, this);
    };
    GameUI.prototype.RemoveListener = function () {
        this.btn_exit.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.ExitMap, this);
        this.img_Bg.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.BeginTouch, this);
        this.img_Bg.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.Move, this);
        this.img_Bg.removeEventListener(egret.TouchEvent.TOUCH_END, this.CancelTouch, this);
        this.img_Bg.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.CancelTouch, this);
        this.manageCells.removeEventListener("RefreshCurRender", this.UpdateIndex, this);
        this.gameControl.removeEventListener("moveScroll", this.MoveScroll, this);
    };
    GameUI.prototype.ExitMap = function () {
        var _this = this;
        var exitTips = UIBase.OpenUI(ExitTips, this.txt_stepNum.text, this.txt_stepNum.text);
        exitTips.once("ExitMap", function () {
            _this.manageCells.ExitMap();
            UIBase.CloseUI(GameUI);
        }, this);
    };
    GameUI.prototype.ReturnSignCell = function () {
        this.gameControl.RoleMoveState(2);
    };
    GameUI.prototype.MoveScroll = function (e) {
        var scrollH = this.scroller_map.viewport.scrollH;
        var scrollV = this.scroller_map.viewport.scrollV;
        var moveX = 0, moveY = 0;
        var role = this.img_role;
        var data = e.data;
        var isLeft = data.moveX < 0 ? -1 : 1;
        var isUp = data.moveY < 0 ? -1 : 1;
        if ((isLeft > 0 && role.x >= this.scroller_map.width / 2) || (isLeft < 0 && role.x <= this.scroller_map.viewport.contentWidth - this.scroller_map.width / 2)) {
            var moveX_min = isLeft < 0 ? scrollH : this.scroller_map.viewport.contentWidth - scrollH - this.scroller_map.width;
            moveX = Math.min(Math.abs(data.moveX), Math.abs(moveX_min));
        }
        if ((isUp > 0 && role.y >= this.scroller_map.height / 2) || (isUp < 0 && role.y <= this.scroller_map.viewport.contentHeight - this.scroller_map.height / 2)) {
            var moveY_min = isUp < 0 ? scrollV : this.scroller_map.viewport.contentHeight - scrollV - this.scroller_map.height;
            moveY = Math.min(Math.abs(data.moveY), Math.abs(moveY_min));
        }
        var move = function () {
            var scrolls = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                scrolls[_i] = arguments[_i];
            }
            scrolls.forEach(function (s) {
                s.viewport.scrollH += (isLeft * moveX);
                s.viewport.scrollV += (isUp * moveY);
            });
        };
        move(this.scroller_map, this.scroller_role, this.scroller_bg);
    };
    GameUI.prototype.UpdateIndex = function (e) {
        this.stepNum++;
        this.txt_stepNum.text = "已探索：" + this.stepNum.toString();
    };
    /**触屏手指移动 */
    GameUI.prototype.Move = function (e) {
        var angle = this.virt.onTouchMove(e);
        this.gameControl.direction = angle;
    };
    GameUI.prototype.CancelTouch = function () {
        if (!this.gameControl) {
            return;
        }
        this.gameControl.direction = null;
        this.gameControl.RoleMoveState(1); //停止移动
        this.virt.stop();
    };
    GameUI.prototype.BeginTouch = function (e) {
        if (!this.gameControl) {
            return;
        }
        this.virt.x = e.localX;
        this.virt.y = e.localY;
        this.virt.start();
        this.gameControl.RoleMoveState(0); //开始移动
    };
    /**生成迷宫 */
    GameUI.prototype.GenMiGong = function () {
        return __awaiter(this, void 0, void 0, function () {
            var row, self, cells;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        row = 15;
                        self = this;
                        self.txt_stepNum.text = "已探索：0";
                        return [4 /*yield*/, GenCells.GetCells()];
                    case 1:
                        cells = _a.sent();
                        this.manageCells = new ManageCells(cells, this.list_cell, this.img_mapBg);
                        // self.group_light.width = self.list_cell.contentWidth;
                        // self.group_light.height = self.list_cell.contentHeight;
                        // console.log(`Gmae:group_light.width--->${self.list_cell.contentWidth},group_light.height--->${self.list_cell.contentHeight}`);
                        //初始化角色控制器和光照效果
                        self.gameControl = new GameControl(this.img_role, this.group_light, 10, this.manageCells, [self.list_cell.contentWidth, self.list_cell.contentHeight]);
                        self.PlayStartAni();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**播放开始动画 */
    GameUI.prototype.PlayStartAni = function () {
        var _this = this;
        var obj = this.manageCells.currentBgRender;
        this.img_role.x = obj.x;
        this.img_role.y = obj.y + (obj.height / 2);
        egret.Tween.get(this.scroller_map.viewport).to({ scrollH: 0 }, this.scroller_map.viewport.scrollH / 0.5);
        egret.Tween.get(this.img_role).wait(this.scroller_map.viewport.scrollH / 0.5).to({ x: obj.x + (obj.width / 2) }, 1000).call(function () {
            _this.img_Bg.touchEnabled = true;
        });
        // obj.StartAni(1000);
    };
    GameUI.prototype.SetListScale = function () {
        if (this.scroller_map.scaleX == 0.5) {
            this.scroller_map.scaleX = 1;
            this.scroller_map.scaleY = 1;
        }
        else {
            this.scroller_map.scaleX = 0.5;
            this.scroller_map.scaleY = 0.5;
        }
    };
    return GameUI;
}(UIBase));
__reflect(GameUI.prototype, "GameUI");
var GenCells = (function () {
    function GenCells() {
    }
    /**根据行和列返回格子列表 */
    GenCells.GetCells = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cells, allCell, playerData, map, row, col, tmp, i, cell, j, c, edgeCell, i, j, c;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cells = [];
                        allCell = [];
                        return [4 /*yield*/, PlayerDataManage.GetInstance().Getdata()];
                    case 1:
                        playerData = _a.sent();
                        map = Config.GetInstance().config_map[playerData.level];
                        row = 15;
                        col = map.size;
                        tmp = 0;
                        for (i = 0; i < row; i++) {
                            cell = [];
                            for (j = 0; j < col; j++) {
                                c = new Cell();
                                c.id = tmp;
                                cell.push(c);
                                allCell.push(c);
                                tmp++;
                            }
                            cells.push(cell);
                        }
                        edgeCell = new Cell();
                        edgeCell.isSigned = true;
                        for (i = 0; i < row; i++) {
                            for (j = 0; j < col; j++) {
                                c = cells[i][j];
                                c.upCell = (i == 0 ? edgeCell : cells[i - 1][j]);
                                if (c.upCell != edgeCell) {
                                    c.upWall.cell1Id = c.upCell.id;
                                    c.upWall.cell2Id = c.id;
                                    c.upCell.downWall = c.upWall;
                                }
                                c.downCell = (i == row - 1 ? edgeCell : cells[i + 1][j]);
                                c.leftCell = (j == 0 ? edgeCell : cells[i][j - 1]);
                                if (c.leftCell != edgeCell) {
                                    c.leftWall.cell1Id = c.leftCell.id;
                                    c.leftWall.cell2Id = c.id;
                                    c.leftCell.rightWall = c.leftWall;
                                }
                                c.rightCell = (j == col - 1 ? edgeCell : cells[i][j + 1]);
                            }
                        }
                        allCell[cells.length - 1].downWall.isOpen = true;
                        GenCells.SetCellDrop(allCell, map);
                        GenCells.SetWallOpen(allCell);
                        return [2 /*return*/, allCell];
                }
            });
        });
    };
    GenCells.SetWallSize = function (allCell) {
        allCell.forEach(function (v) {
        });
    };
    /**掉落和特殊地面生成 */
    GenCells.SetCellDrop = function (allCell, map) {
        var drop_item = Common.ParseField(map.drop_item);
        var drop_num = Common.ParseField(map.drop_num);
        var allItems = [];
        drop_num.forEach(function (num, index) {
            for (var i = 0; i < num; i++) {
                allItems.push(drop_item[index]);
            }
        });
        allItems.sort(function (a, b) { return Math.random() > .5 ? -1 : 1; });
        allCell.forEach(function (v, index, arr) {
            if (v.id != 0 && v.id != arr.length - 1) {
                var itemNum = allItems.length;
                var cellNum = allCell.length - 2;
                if (itemNum != 0 && (itemNum / cellNum) > Math.random()) {
                    v.item = allItems[0];
                    allItems.splice(0, 1);
                }
                else {
                    v.isSpecial = (map.special_chance / 10000) > Math.random();
                }
            }
        });
    };
    /**生成迷宫核心逻辑,设置通道(移除两个格子之间的墙) */
    GenCells.SetWallOpen = function (allCell) {
        allCell[0].isSigned = true;
        var signedCell = [];
        var designedCell = [];
        for (var _i = 0, allCell_1 = allCell; _i < allCell_1.length; _i++) {
            var e = allCell_1[_i];
            designedCell.push(e);
        }
        var signingCell = allCell[0];
        designedCell.splice(0, 1);
        signedCell.push(allCell[0]);
        while (designedCell.length > 0) {
            var cs = [];
            cs = GenCells.GetDesignedCell(signingCell);
            if (cs.length > 0) {
                var num = Common.getRandomInt(1, cs.length);
                GenCells.GetSharedWall(signingCell, cs[num - 1]).isOpen = true;
                signingCell = cs[num - 1];
                signingCell.isSigned = true;
                signedCell.push(signingCell);
                designedCell.splice(designedCell.indexOf(signingCell), 1);
            }
            else {
                var num = Common.getRandomInt(1, signedCell.length);
                signingCell = signedCell[num - 1];
            }
        }
    };
    /**获取周围未访问的格子集合 */
    GenCells.GetDesignedCell = function (cell) {
        var cs = [];
        if (!cell.upCell.isSigned) {
            cs.push(cell.upCell);
        }
        if (!cell.downCell.isSigned) {
            cs.push(cell.downCell);
        }
        if (!cell.leftCell.isSigned) {
            cs.push(cell.leftCell);
        }
        if (!cell.rightCell.isSigned) {
            cs.push(cell.rightCell);
        }
        return cs;
    };
    /**获得两个格子中间的墙 */
    GenCells.GetSharedWall = function (cell1, cell2) {
        var w;
        if (cell1.leftWall == cell2.rightWall) {
            w = cell1.leftWall;
            cell1.wallState -= 1;
            cell2.wallState -= 4;
        }
        else if (cell1.rightWall == cell2.leftWall) {
            w = cell1.rightWall;
            cell1.wallState -= 4;
            cell2.wallState -= 1;
        }
        else if (cell1.upWall == cell2.downWall) {
            w = cell1.upWall;
            cell1.wallState -= 2;
            cell2.wallState -= 8;
        }
        else if (cell1.downWall == cell2.upWall) {
            w = cell1.downWall;
            cell1.wallState -= 8;
            cell2.wallState -= 2;
        }
        return w;
    };
    return GenCells;
}());
__reflect(GenCells.prototype, "GenCells");
var LightMask = (function (_super) {
    __extends(LightMask, _super);
    function LightMask() {
        var _this = _super.call(this) || this;
        _this.mask_con = new egret.DisplayObjectContainer();
        _this.mask_bitmap = new egret.Bitmap();
        _this.wall_height = +Config.GetInstance().config_common["wall_height"].value;
        _this.wall_width = +Config.GetInstance().config_common["wall_height"].value;
        _this.cell_height = +Config.GetInstance().config_common["cell_height"].value;
        _this.cell_width = +Config.GetInstance().config_common["cell_height"].value;
        _this.maskNum = 0;
        _this.passedPos = {};
        var self = _this;
        self.cacheAsBitmap = true;
        self.mask_sprite = new egret.Sprite();
        self.mask_sprite.blendMode = egret.BlendMode.ERASE;
        self.mask_sprite.alpha = 0.3;
        self.cirleLight_shape = new egret.Shape();
        self.mask_shape = new egret.Shape();
        self.cirleLight_shape.blendMode = egret.BlendMode.ERASE;
        self.mask_sprite.addChild(self.mask_bitmap);
        self.mask_sprite.addChild(self.mask_con);
        self.addChild(self.cirleLight_shape);
        return _this;
    }
    ;
    //设置背景框的大小
    LightMask.prototype.SetMaskSize = function (maskW, maskH) {
        this.graphics.clear();
        this.graphics.beginFill(0x000000, 1);
        this.graphics.drawRect(this.wall_width, this.wall_height, maskW - this.wall_width * 2, maskH - this.wall_height * 2);
        this.graphics.endFill();
        this.radius = this.cell_width * 2 - this.wall_width * 2;
    };
    LightMask.prototype.SetMaskPos = function (posx, posy) {
        this.cirleLight_shape.x = posx;
        this.cirleLight_shape.y = posy;
    };
    LightMask.prototype.SetLightValue = function () {
        var c_m = new egret.Matrix();
        c_m.createGradientBox(this.radius, this.radius, 0, -this.radius / 2, -this.radius / 2);
        var colorGroup = [0, 50, 180, 255];
        var alphaGroup = [1, 0.9, 0.3, 0];
        this.cirleLight_shape.graphics.clear();
        this.cirleLight_shape.graphics.beginGradientFill(egret.GradientType.RADIAL, [0xffffff, 0xffffff, 0xffffff, 0xffffff], alphaGroup, colorGroup, c_m); //这个渐变的参数是自己调的，可能不太理想，谁有好的参数可以留言，谢谢啦。
        this.cirleLight_shape.graphics.drawCircle(0, 0, this.radius);
        this.cirleLight_shape.graphics.endFill();
    };
    LightMask.prototype.MoveMask = function (posx, posy, cell, cellRender) {
        this.cirleLight_shape.x = posx;
        this.cirleLight_shape.y = posy;
    };
    // public setLightValue(posx: number, posy: number, cell: Cell, cellRender: CellBgRender) {
    // 	let self: LightMask = this;
    // 	let radius = this.radius;
    // 	let cellPos = {
    // 		x1: cellRender.x - this.wall_width / 2,
    // 		x2: cellRender.x + this.wall_width / 2 + this.cell_width,
    // 		y1: cellRender.y - this.wall_height / 2,
    // 		y2: cellRender.y + this.wall_height / 2 + this.cell_height,
    // 	}
    // 	let pos_group: { posx: number, posy: number, points: egret.Point[] } = { posx: posx, posy: posy, points: [] };
    // 	for (let angle = 0; angle <= 360; angle += 2) {
    // 		let vertex = { x: posx + radius * Math.sin(Math.PI * angle / 180), y: posy - radius * Math.cos(Math.PI * angle / 180) };
    // 		let boundary_x = vertex.x >= cellPos.x2 ? cellPos.x2 : (vertex.x <= cellPos.x1 ? cellPos.x1 : -999);
    // 		let boundary_y = vertex.y >= cellPos.y2 ? cellPos.y2 : (vertex.y <= cellPos.y1 ? cellPos.y1 : -999);
    // 		let offset = { y: vertex.y > posy ? 0.3 : -0.3, x: vertex.x > posx ? 0.3 : -0.3 };
    // 		// let offset = { y: 0, x: 0 }
    // 		//竖边界交点
    // 		let res_v = this.segmentsIntr(vertex, { x: posx, y: posy }, { x: boundary_x, y: posy - offset.y }, { x: boundary_x, y: vertex.y + offset.y })
    // 		//横边界交点
    // 		let res_h = this.segmentsIntr(vertex, { x: posx, y: posy }, { x: posx - offset.x, y: boundary_y }, { x: vertex.x + offset.x, y: boundary_y })
    // 		let intersection;
    // 		// let res_v_left = angle > 180;
    // 		// let res_h_top = angle < 90 || angle > 270;
    // 		let dis_v, dis_h;
    // 		//同时与横竖边界相交
    // 		if (res_v && res_h) {
    // 			let res_v_left = res_v.x < cellRender.x + this.cell_width / 2;
    // 			let res_h_top = res_h.y < cellRender.y + this.cell_height / 2;
    // 			//距离两个交点的长度
    // 			dis_v = egret.Point.distance(new egret.Point(posx, posy), new egret.Point(res_v.x, res_v.y));
    // 			dis_h = egret.Point.distance(new egret.Point(posx, posy), new egret.Point(res_h.x, res_h.y));
    // 			//先与竖边界相交
    // 			if (dis_v < dis_h) {
    // 				//判断竖墙是本格的左或右
    // 				let wall_1 = !res_v_left ? cell.rightWall : cell.leftWall;
    // 				//判断横墙是本格的左或右
    // 				let _cell = !res_v_left ? cell.rightCell : cell.leftCell;
    // 				//竖墙存在（本格）
    // 				if (!wall_1.isOpen) {
    // 					intersection = res_v;
    // 				}
    // 				//竖墙不存在
    // 				else {
    // 					//相交的横墙是上还是下
    // 					let wall_2 = res_h_top ? _cell.upWall : _cell.downWall;
    // 					if (!wall_2.isOpen) {
    // 						intersection = res_h;
    // 					}
    // 					else {
    // 						let isEdge = (res_v.y > cellPos.y1 && res_v.y < cellPos.y1 + this.wall_height) || (res_v.y < cellPos.y2 && res_v.y > cellPos.y2 - this.wall_height);
    // 						intersection = isEdge ? res_v : vertex;
    // 					}
    // 				}
    // 			}
    // 			//先与横边界相交
    // 			else {
    // 				//判断横墙是本格的上或下
    // 				let wall_1 = res_h_top ? cell.upWall : cell.downWall;
    // 				//判断竖墙是本格的上或下
    // 				let _cell = res_h_top ? cell.upCell : cell.downCell;
    // 				//横墙存在（本格）
    // 				if (!wall_1.isOpen) {
    // 					intersection = res_h;
    // 				}
    // 				//横墙不存在
    // 				else {
    // 					//相交的竖墙是左还是右
    // 					let wall_2 = res_v_left ? _cell.leftWall : _cell.rightWall;
    // 					if (!wall_2.isOpen) {
    // 						intersection = res_v;
    // 					}
    // 					else {
    // 						let isEdge = (res_h.x > cellPos.x1 && res_h.x < cellPos.x1 + this.wall_width) || (res_h.x < cellPos.x2 && res_h.x > cellPos.x2 - this.wall_width);
    // 						intersection = isEdge ? res_h : vertex;
    // 					}
    // 				}
    // 			}
    // 		}
    // 		//只与竖墙相交
    // 		else if (res_v) {
    // 			let res_v_left = res_v.x < cellRender.x + this.cell_width / 2;
    // 			let wall = res_v_left ? cell.leftWall : cell.rightWall;
    // 			if (!wall.isOpen) {
    // 				intersection = res_v;
    // 			}
    // 			else {
    // 				let res_h_top = res_v.y < cellRender.y + this.cell_height / 2;
    // 				let cell_2 = res_v_left ? cell.leftCell : cell.rightCell;
    // 				let wall_2 = res_h_top ? cell_2.upWall : cell_2.downWall;
    // 				let isEdge = (res_v.y > cellPos.y1 && res_v.y < cellPos.y1 + this.wall_height) || (res_v.y < cellPos.y2 && res_v.y > cellPos.y2 - this.wall_height);
    // 				if (!isEdge) {
    // 					intersection = vertex;
    // 				}
    // 				else {
    // 					if (wall_2.isOpen) {
    // 						intersection = res_v;
    // 					}
    // 					else {
    // 						intersection = vertex;
    // 					}
    // 				}
    // 			}
    // 		}
    // 		//只与横墙相交
    // 		else if (res_h) {
    // 			let res_h_top = res_h.y < cellRender.y + this.cell_height / 2;
    // 			let wall = res_h_top ? cell.upWall : cell.downWall;
    // 			if (!wall.isOpen) {
    // 				intersection = res_h;
    // 			}
    // 			else {
    // 				let res_v_left = res_h.x < cellRender.x + this.cell_width / 2;
    // 				let cell_2 = res_h_top ? cell.upCell : cell.downCell;
    // 				let wall_2 = res_v_left ? cell_2.leftWall : cell_2.rightWall;
    // 				let isEdge = (res_h.x > cellPos.x1 && res_h.x < cellPos.x1 + this.wall_width) || (res_h.x < cellPos.x2 && res_h.x > cellPos.x2 - this.wall_width);
    // 				if (!isEdge) {
    // 					intersection = vertex;
    // 				}
    // 				else {
    // 					if (wall_2.isOpen) {
    // 						intersection = res_h;
    // 					}
    // 					else {
    // 						intersection = vertex;
    // 					}
    // 				}
    // 			}
    // 		}
    // 		if (!intersection) { intersection = vertex }
    // 		pos_group.points.push(new egret.Point(intersection.x, intersection.y));
    // 	}
    // 	self.DrawShape(self.cirleLight_shape, pos_group);
    // 	let _posX = Math.floor(posx / 5);
    // 	let _posY = Math.floor(posy / 5);
    // 	if (self.passedPos[_posX] && self.passedPos[_posX][_posY]) {
    // 		return;
    // 	}
    // 	// let mask_shape = new egret.Shape();
    // 	// self.DrawShape(mask_shape, pos_group);
    // 	// self.mask_con.addChild(mask_shape);
    // 	// if (self.maskNum > 180) {
    // 	// 	self.maskNum = 0;
    // 	// 	let render = new egret.RenderTexture();
    // 	// 	render.drawToTexture(self.mask_sprite);
    // 	// 	if (self.mask_bitmap.texture) {
    // 	// 		self.mask_bitmap.texture.dispose();
    // 	// 	}
    // 	// 	self.mask_bitmap.texture = render;
    // 	// 	self.mask_sprite.removeChild(self.mask_con);
    // 	// 	self.mask_con = new egret.DisplayObjectContainer();
    // 	// 	self.mask_sprite.addChild(self.mask_con);
    // 	// }
    // 	// self.maskNum++;
    // 	if (!self.passedPos[_posX]) {
    // 		self.passedPos[_posX] = {};
    // 	}
    // 	self.passedPos[_posX][_posY] = true;
    // }
    LightMask.prototype.DrawShape = function (shape, pos_group, clear) {
        if (clear === void 0) { clear = true; }
        if (clear) {
            shape.graphics.clear();
        }
        shape.graphics.beginFill(0xffffff, 1);
        shape.graphics.lineStyle(1, 0xffffff);
        shape.graphics.moveTo(pos_group.posx, pos_group.posy);
        pos_group.points.forEach(function (intersection) {
            shape.graphics.lineTo(intersection.x, intersection.y);
        });
        shape.graphics.lineTo(pos_group.posx, pos_group.posy);
        shape.graphics.endFill();
    };
    //获取交点
    LightMask.prototype.segmentsIntr = function (a, b, c, d) {
        if (c.x == -999 || c.y === -999 || d.x == -999 || d.y == -999) {
            return null;
        }
        // 三角形abc 面积的2倍  
        var area_abc = (a.x - c.x) * (b.y - c.y) - (a.y - c.y) * (b.x - c.x);
        // 三角形abd 面积的2倍  
        var area_abd = (a.x - d.x) * (b.y - d.y) - (a.y - d.y) * (b.x - d.x);
        // 面积符号相同则两点在线段同侧,不相交 (对点在线段上的情况,本例当作不相交处理);  
        if (area_abc * area_abd >= 0) {
            return null;
        }
        // 三角形cda 面积的2倍  
        var area_cda = (c.x - a.x) * (d.y - a.y) - (c.y - a.y) * (d.x - a.x);
        // 三角形cdb 面积的2倍  
        // 注意: 这里有一个小优化.不需要再用公式计算面积,而是通过已知的三个面积加减得出.  
        var area_cdb = area_cda + area_abc - area_abd;
        if (area_cda * area_cdb >= 0) {
            return null;
        }
        //计算交点坐标  
        var t = area_cda / (area_abd - area_abc);
        var dx = t * (b.x - a.x), dy = t * (b.y - a.y);
        return { x: a.x + dx, y: a.y + dy };
    };
    return LightMask;
}(egret.Sprite));
__reflect(LightMask.prototype, "LightMask");
var ManageCells = (function (_super) {
    __extends(ManageCells, _super);
    function ManageCells(cells, cellList, mapBg) {
        var _this = _super.call(this) || this;
        _this._index = 0;
        _this.returnPath = [];
        _this.cells = [];
        _this.returnCell = null;
        _this.mapData = {
            point: 0,
            item: {},
            itemNum: 0
        };
        _this.cell_width = +Config.GetInstance().config_common["cell_width"].value;
        _this.cell_height = +Config.GetInstance().config_common["cell_height"].value;
        _this.cells = cells;
        _this.col = cells.length / 15;
        _this.cellList = cellList;
        _this.mapBg = mapBg;
        _this.InitRenders();
        return _this;
    }
    Object.defineProperty(ManageCells.prototype, "index", {
        /**当前所在格子编号 */
        get: function () {
            return this._index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManageCells.prototype, "currentCell", {
        /**当前所在格子 */
        get: function () {
            return this._currentCell;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ManageCells.prototype, "currentBgRender", {
        get: function () {
            return this._currentBgRender;
        },
        enumerable: true,
        configurable: true
    });
    ;
    /**初始化背景和墙格子 */
    ManageCells.prototype.InitRenders = function () {
        var self = this;
        self.arrayCellList = new eui.ArrayCollection(this.cells);
        self.cellList.dataProvider = self.arrayCellList;
        self.cellList.itemRenderer = CellBgRender;
        self.cellList.validateNow();
        self.cellList.validateDisplayList();
        this.mapBg.width = this.cellList.contentWidth;
        this.mapBg.height = this.cellList.contentHeight;
        this.SetCurrentCell();
    };
    ManageCells.prototype.ExitMap = function () {
        if (this.mapData.itemNum > 0) {
            ItemManage.GetInstance().GetItems(this.mapData.item);
        }
        PlayerDataManage.GetInstance().GetPoint(this.mapData.point);
    };
    /**设置当前所在格子编号 */
    ManageCells.prototype.SetIndex = function (role) {
        var h = Math.floor(role.x / this.cell_width);
        var v = Math.floor(role.y / this.cell_height);
        var index = v * this.col + h;
        if (this._index != index) {
            this._index = index;
            this.SetCurrentCell();
            this.SetReturnPath();
        }
        this.GetCellItem(role);
    };
    ManageCells.prototype.GetCellItem = function (role) {
        if (this._currentCell.item != 0 && this._currentBgRender.ItemTest(role)) {
            if (this.mapData.item[this._currentCell.item]) {
                this.mapData.item[this._currentCell.item]++;
            }
            else {
                this.mapData.item[this._currentCell.item] = 1;
            }
            this._currentCell.item = 0;
            this.arrayCellList.itemUpdated(this._currentBgRender);
            this.mapData.itemNum++;
        }
    };
    ManageCells.prototype.SetCurrentCell = function () {
        var self = this;
        self._currentCell = self.arrayCellList.getItemAt(self.index);
        self._currentBgRender = self.cellList.getElementAt(self._index);
        this.mapData.point++;
        if (self._currentCell && !self._currentCell.isPassed) {
            self._currentCell.isPassed = true;
            this.dispatchEvent(new egret.Event("RefreshCurRender"));
        }
    };
    /**设置返回路径 */
    ManageCells.prototype.SetReturnPath = function () {
        if (this.GetUnpassedCells(this.currentCell) > 1 && (this.returnPath.length == 0 || this.returnPath.length > 5)) {
            this.returnPath = [];
            if (this.returnCell != null) {
                this.returnCell.HideReturnSign();
            }
            this.returnCell = this._currentBgRender;
        }
        if (this.returnCell != null) {
            if (this.returnPath.indexOf(this.index) == -1) {
                this.returnPath.push(this.index);
            }
            else {
                this.returnPath.splice(-1, 1);
            }
        }
    };
    /**获取指定格子周围没经过的格子数量 */
    ManageCells.prototype.GetUnpassedCells = function (cell) {
        var num = cell.downWall.isOpen && !cell.downCell.isPassed ? 1 : 0;
        num += cell.upWall.isOpen && !cell.upCell.isPassed ? 1 : 0;
        num += cell.leftWall.isOpen && !cell.leftCell.isPassed ? 1 : 0;
        num += cell.rightWall.isOpen && !cell.rightCell.isPassed ? 1 : 0;
        return num;
    };
    return ManageCells;
}(eui.Component));
__reflect(ManageCells.prototype, "ManageCells", ["eui.UIComponent", "egret.DisplayObject"]);
var VirtualRocker = (function (_super) {
    __extends(VirtualRocker, _super);
    function VirtualRocker() {
        var _this = _super.call(this) || this;
        _this.circleRadius = 0; //圆环半径
        _this.ballRadius = 0; //小球半径
        _this.centerX = 0; //中心点坐标
        _this.centerY = 0;
        //触摸移动，设置小球的位置
        _this.p1 = new egret.Point();
        _this.p2 = new egret.Point();
        return _this;
    }
    VirtualRocker.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    VirtualRocker.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        //获取圆环和小球半径
        this.circleRadius = this.circle.height / 2;
        this.ballRadius = this.ball.height / 2;
        //获取中心点
        this.centerX = this.circleRadius;
        this.centerY = this.circleRadius;
        this.anchorOffsetX = this.circleRadius;
        this.anchorOffsetY = this.circleRadius;
        this.touchEnabled = false;
    };
    VirtualRocker.prototype.start = function () {
        this.visible = true;
        this.ball.x = this.centerX;
        this.ball.y = this.centerY;
    };
    //停止虚拟摇杆
    VirtualRocker.prototype.stop = function () {
        this.visible = false;
    };
    VirtualRocker.prototype.onTouchMove = function (e) {
        this.p1.x = this.x;
        this.p1.y = this.y;
        this.p2.x = e.stageX;
        this.p2.y = e.stageY;
        var dist = egret.Point.distance(this.p1, this.p2);
        var angle = Math.atan2(e.stageY - this.y, e.stageX - this.x);
        //手指距离在圆环范围内
        if (dist <= (this.circleRadius - this.ballRadius)) {
            this.ball.x = this.centerX + e.stageX - this.x;
            this.ball.y = this.centerY + e.stageY - this.y;
            //手指距离在圆环范围外
        }
        else {
            this.ball.x = Math.cos(angle) * (this.circleRadius - this.ballRadius) + this.centerX;
            this.ball.y = Math.sin(angle) * (this.circleRadius - this.ballRadius) + this.centerY;
        }
        return angle;
    };
    return VirtualRocker;
}(eui.Component));
__reflect(VirtualRocker.prototype, "VirtualRocker", ["eui.UIComponent", "egret.DisplayObject"]);
var Wall = (function () {
    function Wall() {
        /**为true时表明没有墙 */
        this.isOpen = false;
    }
    return Wall;
}());
__reflect(Wall.prototype, "Wall");
var DBManage = (function () {
    function DBManage() {
    }
    DBManage.InitWx = function () {
        try {
            wx.cloud.init();
            wx.cloud.callFunction({
                name: "GetOpenId",
                data: {},
                success: function (res) {
                    DBManage.OPENID = res.result.OPENID;
                    console.log("OPENID--->", DBManage.OPENID);
                },
                fail: function (err) {
                    console.log("err", err);
                }
            });
        }
        catch (err) {
            console.log("\u672A\u80FD\u6210\u529F\u521D\u59CB\u5316\u5FAE\u4FE1\u4E91\uFF1A" + err);
        }
    };
    DBManage.SaveData = function (form, data) {
        if (!data) {
            return;
        }
        try {
            wx.cloud.init();
            var db_1 = wx.cloud.database();
            var value_1 = db_1.collection(form).where({
                _openid: DBManage.OPENID
            });
            value_1.count().then(function (res) {
                if (res.total == 0) {
                    db_1.collection(form).add({
                        data: data,
                    });
                }
                else {
                    value_1.get().then(function (res) {
                        var _id = res.data[0]._id;
                        db_1.collection(form).doc(_id).update({
                            data: data,
                            fail: function (err) {
                                console.log("更新数据失败", err);
                            }
                        });
                    });
                }
            });
        }
        catch (err) {
            egret.localStorage.setItem(form, JSON.stringify(data));
        }
    };
    DBManage.LoadData = function (form) {
        return __awaiter(this, void 0, void 0, function () {
            var db, data, err_2, dataStr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        wx.cloud.init();
                        db = wx.cloud.database();
                        return [4 /*yield*/, db.collection(form).where({
                                _openid: DBManage.OPENID
                            }).get().then(function (res) {
                                if (res.data.length > 0) {
                                    return res.data[0];
                                }
                            })];
                    case 1:
                        data = _a.sent();
                        if (data) {
                            delete data._id;
                            delete data._openid;
                        }
                        return [2 /*return*/, data];
                    case 2:
                        err_2 = _a.sent();
                        dataStr = egret.localStorage.getItem(form);
                        if (dataStr) {
                            return [2 /*return*/, JSON.parse(dataStr)];
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return DBManage;
}());
__reflect(DBManage.prototype, "DBManage");
var data_key_item = "item";
var data_key_player = "player";
var ItemManage = (function () {
    function ItemManage() {
        this.init = false;
    }
    ItemManage.GetInstance = function () {
        if (!ItemManage.instance) {
            ItemManage.instance = new ItemManage();
        }
        return ItemManage.instance;
    };
    ItemManage.prototype.Getdata = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.init) return [3 /*break*/, 2];
                        return [4 /*yield*/, ItemManage.instance.LoadData().then(function (res) {
                                _this.init = true;
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, this.data];
                }
            });
        });
    };
    ItemManage.prototype.GetItem = function (id, num) {
        if (num === void 0) { num = 1; }
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.Getdata()];
                    case 1:
                        data = _a.sent();
                        if (data[id]) {
                            data[id] += num;
                        }
                        else {
                            data[id] = num;
                        }
                        if (data[id] == 0) {
                            delete data[id];
                        }
                        this.SaveData();
                        return [2 /*return*/];
                }
            });
        });
    };
    ItemManage.prototype.GetItems = function (items) {
        return __awaiter(this, void 0, void 0, function () {
            var data, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (items == {}) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.Getdata()];
                    case 1:
                        data = _a.sent();
                        for (id in items) {
                            if (data[id]) {
                                data[id] += items[id];
                            }
                            else {
                                data[id] = items[id];
                            }
                            if (data[id] == 0) {
                                delete data[id];
                            }
                        }
                        this.SaveData();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**合成物品
     * 默认合成1个
     * 返回:1成功 -1材料数量不足 -2物品无合成配置或错误*/
    ItemManage.prototype.ComposeItem = function (id, num) {
        if (num === void 0) { num = 1; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var configs, data, need_items, need_nums;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        configs = Config.GetInstance().config_item;
                        if (configs[id].need_item == "") {
                            return [2 /*return*/, -2];
                        }
                        return [4 /*yield*/, this.Getdata()];
                    case 1:
                        data = _a.sent();
                        need_items = configs[id].need_item.split(",");
                        need_nums = configs[id].need_num.split(",");
                        need_items.forEach(function (v, i) {
                            var id = Number(v);
                            if (configs[id]) {
                                if (data[id] < Number(need_nums[i])) {
                                    return -1;
                                }
                            }
                            else {
                                return -2;
                            }
                        });
                        need_items.forEach(function (v, i) {
                            _this.GetItem(Number(v), -Number(need_nums[i]));
                        });
                        this.GetItem(id, num);
                        return [2 /*return*/, 1];
                }
            });
        });
    };
    ItemManage.prototype.LoadData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, DBManage.LoadData(data_key_item)];
                    case 1:
                        _a.data = _b.sent();
                        if (!this.data) {
                            this.data = {};
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ItemManage.prototype.SaveData = function () {
        DBManage.SaveData(data_key_item, this.data);
    };
    return ItemManage;
}());
__reflect(ItemManage.prototype, "ItemManage", ["IPlayerDataManage"]);
var PlayerDataManage = (function () {
    function PlayerDataManage() {
        this.init = false;
    }
    PlayerDataManage.prototype.Getdata = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.init) return [3 /*break*/, 2];
                        return [4 /*yield*/, PlayerDataManage.instance.LoadData().then(function (res) {
                                _this.init = true;
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.data];
                    case 2: return [2 /*return*/, this.data];
                }
            });
        });
    };
    PlayerDataManage.GetInstance = function () {
        if (!PlayerDataManage.instance) {
            PlayerDataManage.instance = new PlayerDataManage();
        }
        return PlayerDataManage.instance;
    };
    PlayerDataManage.prototype.GetPoint = function (num) {
        return __awaiter(this, void 0, void 0, function () {
            var data, maxLvl, configs, i, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.Getdata()];
                    case 1:
                        data = _a.sent();
                        data.point += num;
                        if (data.point < 0) {
                            data.point = 0;
                        }
                        maxLvl = +Config.GetInstance().config_common["maxLvl"].value;
                        configs = Config.GetInstance().config_level;
                        if (num >= 0) {
                            for (i = data.level; i < maxLvl; i++) {
                                if (data.point < configs[i].point) {
                                    break;
                                }
                                data.level++;
                            }
                        }
                        else {
                            for (i = data.level; i > 1; i--) {
                                if (data.point >= configs[i - 1].point) {
                                    break;
                                }
                                data.level--;
                            }
                        }
                        this.SaveData();
                        return [2 /*return*/];
                }
            });
        });
    };
    PlayerDataManage.prototype.SaveData = function () {
        DBManage.SaveData(data_key_player, this.data);
    };
    PlayerDataManage.prototype.LoadData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, DBManage.LoadData(data_key_player)];
                    case 1:
                        _a.data = _b.sent();
                        if (!this.data) {
                            this.data = { level: 1, point: 0 };
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return PlayerDataManage;
}());
__reflect(PlayerDataManage.prototype, "PlayerDataManage", ["IPlayerDataManage"]);

;window.Main = Main;