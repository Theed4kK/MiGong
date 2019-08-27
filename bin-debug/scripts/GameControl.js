var __reflect = (this && this.__reflect) || function (p, c, t) {
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
var GameControl = (function (_super) {
    __extends(GameControl, _super);
    function GameControl(img_role, group_light, speed) {
        var _this = _super.call(this) || this;
        _this.maskLight = new LightMask();
        _this.lightBitMap = new egret.Bitmap();
        _this.img_role = img_role;
        _this.group_light = group_light;
        _this.InitLight();
        _this.speed = speed;
        _this.img_role.anchorOffsetX = _this.img_role.width / 2;
        _this.img_role.anchorOffsetY = _this.img_role.height / 2;
        return _this;
    }
    /**初始化光照 */
    GameControl.prototype.InitLight = function () {
        var maskLight = this.maskLight;
        var group_light = this.group_light;
        maskLight.setMaskSize(group_light.width, group_light.height);
        maskLight.setLightValue(300);
        this.DrawLightTexture();
        group_light.addChild(this.lightBitMap);
        maskLight.x = 0;
        maskLight.y = 0;
    };
    GameControl.prototype.DrawLightTexture = function () {
        return __awaiter(this, void 0, void 0, function () {
            var render;
            return __generator(this, function (_a) {
                render = new egret.RenderTexture();
                render.drawToTexture(this.maskLight);
                this.lightBitMap.texture = render;
                return [2 /*return*/];
            });
        });
    };
    GameControl.prototype.RefreshLight = function () {
        if (egret.getTimer() - this.lightRefreshTime < 50) {
            return;
        }
        var role = this.img_role;
        this.maskLight.setLightPos(role.x - role.width / 2, role.y - role.height / 2);
        this.DrawLightTexture();
        this.lightRefreshTime = egret.getTimer();
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
        var path = GameUI.manageCells.returnPath;
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
        this.direction = Math.atan2(index * WallRender.height - this.img_role.y, index * WallRender.width - this.img_role.x);
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
        var cell = GameUI.manageCells.currentCell;
        var obj = GameUI.manageRenders.currentRender;
        var move = 0;
        var img_role = this.img_role;
        var isPlus = speedX > 0;
        var nearWall = isPlus ? cell.rightWall : cell.leftWall;
        if (!nearWall.isOpen || this.IsEdge(0)) {
            var width = WallRender.vWallwidth * 0.5 + img_role.width * 0.5;
            var distance = Math.abs(obj.x + (isPlus ? 1 : 0) * obj.width / type - img_role.x) - width;
            move = isPlus ? Math.min(distance, speedX) : Math.max(-distance, speedX);
        }
        else {
            move = speedX;
        }
        img_role.x += move;
        isPlus = speedY < 0;
        nearWall = isPlus ? cell.upWall : cell.downWall;
        if (!nearWall.isOpen || this.IsEdge(1)) {
            var height = WallRender.hWallHeight * 0.5 + img_role.height * 0.5;
            var distance = Math.abs(obj.y + (isPlus ? 0 : 1) * obj.height / type - img_role.y) - height;
            move = isPlus ? Math.max(-distance, speedY) : Math.min(distance, speedY);
        }
        else {
            move = speedY;
        }
        img_role.y += move;
        this.dispatchEventWith(MyEvent.moveScroll, false, { x: img_role.x, speed: speedX });
        GameUI.manageCells.SetIndex(img_role.x, img_role.y);
        this.RefreshLight();
    };
    GameControl.prototype.IsEdge = function (type) {
        var isEdge = true;
        var img_role = this.img_role;
        var obj = GameUI.manageRenders.currentRender;
        switch (type) {
            case 0:
                isEdge = (Math.abs(img_role.y - obj.y)) < ((img_role.height / 2) + WallRender.hWallHeight * 0.5);
                isEdge = isEdge || ((Math.abs(img_role.y - obj.y - obj.height) < (img_role.height / 2) + WallRender.hWallHeight * 0.5));
                break;
            case 1:
                isEdge = (Math.abs(img_role.x - obj.x)) < ((img_role.width / 2) + WallRender.vWallwidth * 0.5);
                isEdge = isEdge || ((Math.abs(img_role.x - obj.x - obj.width) < (img_role.width / 2) + WallRender.vWallwidth * 0.5));
                break;
        }
        return isEdge;
    };
    return GameControl;
}(eui.Component));
__reflect(GameControl.prototype, "GameControl", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=GameControl.js.map