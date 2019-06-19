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
        _this.gameControl = new GameControl();
        _this.initPos = new egret.Point();
        _this.index = 0;
        _this.cells = [];
        _this.touchError = 5;
        _this.stepNum = 0;
        _this.timeOnEnterFrame = 0;
        return _this;
        // this.addEventListener(eui.UIEvent.COMPLETE, this.OnComplete, this);
    }
    GameUI.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    GameUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.btn_scale.addEventListener(egret.TouchEvent.TOUCH_TAP, this.SetListScale, this);
        this.btn_gen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.GenMiGong, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.Move, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.BeginTouch, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.CancelTouch, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.CancelTouch, this);
        this.scroller.horizontalScrollBar.autoVisibility = false;
        this.scroller.horizontalScrollBar.visible = false;
        this.img_role.anchorOffsetX = this.img_role.width / 2;
        this.img_role.anchorOffsetY = this.img_role.height / 2;
        var gameControl = this.gameControl;
        gameControl.scroll = this.scroller;
        gameControl.img_role = this.img_role;
    };
    //触屏手指移动
    GameUI.prototype.Move = function (e) {
        var cell = this.cells[this.index];
        var rolePos = new egret.Point(this.img_role.x, this.img_role.y);
        var difX = Math.abs(e.stageX - this.initPos.x);
        var difY = Math.abs(e.stageY - this.initPos.y);
        this.touchError = Number(this.input_touchError.text);
        if (difX <= this.touchError && difY <= this.touchError) {
            return;
        }
        if (difX > difY) {
            this.gameControl.direction = e.stageX > this.initPos.x ? 1 : 0;
        }
        else {
            this.gameControl.direction = e.stageY > this.initPos.y ? 2 : 3;
        }
        this.initPos.x = e.stageX;
        this.initPos.y = e.stageY;
    };
    GameUI.prototype.CancelTouch = function () {
        console.log("退出触摸");
        this.touchId == 0;
        this.gameControl.direction = null;
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    GameUI.prototype.BeginTouch = function (e) {
        console.log("开始触摸");
        if (this.touchId == 0) {
            this.touchId = e.touchPointID;
        }
        this.initPos.x = e.stageX;
        this.initPos.y = e.stageY;
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.timeOnEnterFrame = egret.getTimer();
    };
    GameUI.prototype.onEnterFrame = function (e) {
        var pass = egret.getTimer() - this.timeOnEnterFrame;
        this.RoleMove();
        // this.AutoMove();
        this.timeOnEnterFrame = egret.getTimer();
    };
    //角色移动
    GameUI.prototype.RoleMove = function () {
        if (this.gameControl.direction != null && this.touchId != 0) {
            var speed = Number(this.input_speed.text);
            var obj = this.list.getElementAt(this.index);
            this.gameControl.speed = speed;
            this.gameControl.RoleMove(this.index, obj); //角色移动
            this.ResetIndex(); //刷新所在cell
        }
    };
    GameUI.prototype.RefreshCell = function () {
        if (!this.cells[this.index].isPassed) {
            var cellRender = this.list_bg.getElementAt(this.index);
            cellRender.LightenUp(this.gameControl.direction, Number(this.input_speed.text));
            this.cells[this.index].isPassed = true;
        }
    };
    GameUI.prototype.ResetIndex = function () {
        var obj = this.list.getElementAt(this.index);
        var left = this.img_role.x - (this.img_role.width / 2);
        var right = this.img_role.x + (this.img_role.width / 2);
        var up = this.img_role.y - (this.img_role.height / 2);
        var bottom = this.img_role.y + (this.img_role.height / 2);
        if (right < obj.x) {
            this.index--;
        }
        if (left > obj.x + obj.width) {
            this.index++;
        }
        if (bottom < obj.y) {
            this.index -= Number(this.input_col.text);
        }
        if (up > obj.y + obj.height) {
            this.index += Number(this.input_col.text);
        }
        this.stepNum += this.cells[this.index].isPassed ? 0 : 1;
        this.txt_stepNum.text = "已探索：" + this.stepNum.toString();
        this.RefreshCell();
    };
    GameUI.prototype.GenMiGong = function () {
        var row = 10;
        var col = Number(this.input_col.text);
        this.index = 0;
        this.cells = GenCells.GetCells(row, col);
        this.list.dataProvider = new eui.ArrayCollection(this.cells);
        this.list.itemRenderer = CellRender;
        this.list.validateNow();
        this.list.validateDisplayList();
        this.list_bg.dataProvider = new eui.ArrayCollection(this.cells);
        this.list_bg.itemRenderer = CellBgRender;
        this.list_bg.validateNow();
        this.list_bg.validateDisplayList();
        this.bg.width = this.list.width;
        var obj = this.list.getElementAt(this.index);
        this.img_role.x = obj.x + (obj.width / 2);
        this.img_role.y = obj.y + (obj.height / 2);
        egret.Tween.get(this.scroller.viewport).to({ scrollH: 0 }, this.scroller.viewport.scrollH / 0.5);
        obj.StartAni();
        this.gameControl.cells = this.cells;
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