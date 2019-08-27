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
    ;
    GameUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addChild(this.virt);
        // this.stage.frameRate = 60;
        this.virt.visible = false;
        this.scroller.horizontalScrollBar.autoVisibility = false;
        this.scroller.horizontalScrollBar.visible = false;
        this.GenMiGong();
        this.AddListener();
        egret.log("childrenCreated");
    };
    /**初始化迷宫墙和地面贴图 */
    GameUI.prototype.InitManageRenders = function (cells) {
        GameUI.manageRenders = new ManageRenders(this.list_wall, this.list_cell);
        GameUI.manageRenders.InitRenders(cells);
    };
    GameUI.prototype.AddListener = function () {
        var _this = this;
        this.btn_scale.addEventListener(egret.TouchEvent.TOUCH_TAP, this.SetListScale, this);
        this.btn_gen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.GenMiGong, this);
        this.btn_return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ReturnSignCell, this);
        this.btn_test.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.gameControl.maskLight.setLightValue(100);
        }, this);
        this.input_speed.addEventListener(egret.Event.CHANGE, this.ModifySpeed, this);
        this.img_Bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.BeginTouch, this);
        this.img_Bg.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.Move, this);
        this.img_Bg.addEventListener(egret.TouchEvent.TOUCH_END, this.CancelTouch, this);
        this.img_Bg.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.CancelTouch, this);
        GameUI.manageCells.addEventListener("RefreshCurRender", this.UpdateIndex, this);
        this.gameControl.addEventListener(MyEvent.moveScroll, this.MoveScroll, this);
    };
    GameUI.prototype.ReturnSignCell = function () {
        this.gameControl.RoleMoveState(2);
    };
    GameUI.prototype.MoveScroll = function (e) {
        var scrollH = this.scroller.viewport.scrollH;
        var data = e.data;
        if (data.speed < 0) {
            if (((data.x - scrollH) < (this.scroller.width / 2)) && scrollH > 0) {
                this.scroller.viewport.scrollH += Math.max(data.speed, -scrollH);
            }
        }
        else {
            var groupWidth = this.scroller.viewport.measuredWidth;
            if (((data.x - scrollH) > (this.scroller.width / 2)) && ((scrollH + this.scroller.width) < groupWidth)) {
                this.scroller.viewport.scrollH += Math.min(data.speed, groupWidth - scrollH - this.scroller.width);
            }
        }
    };
    GameUI.prototype.UpdateIndex = function (e) {
        this.stepNum++;
        this.txt_stepNum.text = "已探索：" + this.stepNum.toString();
    };
    GameUI.prototype.RemoveListener = function () {
        this.btn_scale.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.SetListScale, this);
        this.btn_gen.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.GenMiGong, this);
        this.btn_swapMode.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.GenMiGong, this);
        this.input_speed.removeEventListener(egret.Event.CHANGE, this.ModifySpeed, this);
        this.img_Bg.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.BeginTouch, this);
        this.img_Bg.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.Move, this);
        this.img_Bg.removeEventListener(egret.TouchEvent.TOUCH_END, this.CancelTouch, this);
        this.img_Bg.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.CancelTouch, this);
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
        // egret.log("停止触摸");
    };
    GameUI.prototype.BeginTouch = function (e) {
        if (!this.gameControl) {
            return;
        }
        this.virt.x = e.stageX;
        this.virt.y = e.stageY;
        this.virt.start();
        this.gameControl.RoleMoveState(0); //开始移动
        // egret.log("开始触摸");
    };
    GameUI.prototype.ModifySpeed = function () {
        this.gameControl.speed = Number(this.input_speed.text);
    };
    /**生成迷宫 */
    GameUI.prototype.GenMiGong = function () {
        var row = 15;
        var col = Number(this.input_col.text);
        var self = this;
        self.txt_stepNum.text = "已探索：0";
        GameUI.manageCells = new ManageCells(GenCells.GetCells());
        self.InitManageRenders(GameUI.manageCells.cells);
        self.InitMask();
        //初始化角色控制器和光照效果
        self.gameControl = new GameControl(this.img_role, this.group_light, Number(this.input_speed.text));
        self.PlayStartAni();
        egret.log("迷宫生成完成");
    };
    /**处理遮罩 需要地图生成完成后调用 */
    GameUI.prototype.InitMask = function () {
        var self = this;
        // self.img_mapBg.width = self.list.width;
        self.group_wallBg.width = self.list_wall.width;
        self.img_mask.x = WallRender.vWallwidth;
        self.img_mask.y = WallRender.hWallHeight;
        self.img_mask.width = self.list_wall.width - WallRender.vWallwidth * 2;
        self.img_mask.height = self.list_wall.height - WallRender.hWallHeight * 2;
        self.group_light.x = WallRender.vWallwidth;
        self.group_light.y = WallRender.hWallHeight;
        self.group_light.width = self.list_wall.width - WallRender.vWallwidth * 2;
        self.group_light.height = self.list_wall.height - WallRender.hWallHeight * 2;
    };
    /**播放开始动画 */
    GameUI.prototype.PlayStartAni = function () {
        var _this = this;
        var obj = GameUI.manageRenders.currentRender;
        this.img_role.x = obj.x;
        this.img_role.y = obj.y + (obj.height / 2);
        egret.Tween.get(this.scroller.viewport).to({ scrollH: 0 }, this.scroller.viewport.scrollH / 0.5);
        egret.Tween.get(this.img_role).wait(this.scroller.viewport.scrollH / 0.5).to({ x: obj.x + (obj.width / 2) }, 1000).call(function () {
            _this.img_Bg.touchEnabled = true;
        });
        obj.StartAni(1000);
        egret.log("开始动画播放完成");
    };
    GameUI.prototype.SetListScale = function () {
        if (this.scroller.scaleX == 0.5) {
            this.scroller.scaleX = 1;
            this.scroller.scaleY = 1;
        }
        else {
            this.scroller.scaleX = 0.5;
            this.scroller.scaleY = 0.5;
        }
    };
    return GameUI;
}(eui.Component));
__reflect(GameUI.prototype, "GameUI", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=GameUI.js.map