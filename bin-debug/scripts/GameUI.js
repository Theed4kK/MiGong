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
        _this.genCells = new GenCells();
        _this.map = new egret.Bitmap();
        _this.initPos = new egret.Point();
        _this.stepNum = 0;
        _this.virt = new VirtualRocker();
        _this.once(egret.Event.REMOVED_FROM_STAGE, _this.RemoveListener, _this);
        return _this;
    }
    ;
    GameUI.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    GameUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addChild(this.virt);
        this.virt.visible = false;
        this.btn_scale.addEventListener(egret.TouchEvent.TOUCH_TAP, this.SetListScale, this);
        this.btn_gen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.GenMiGong, this);
        this.btn_swapMode.addEventListener(egret.TouchEvent.TOUCH_TAP, this.GenMap, this);
        this.input_speed.addEventListener(egret.Event.CHANGE, this.ModifySpeed, this);
        this.img_Bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.BeginTouch, this);
        this.img_Bg.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.Move, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.CancelTouch, this);
        this.img_Bg.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.CancelTouch, this);
        this.genCells.addEventListener(MyEvent.updateStepNum, this.UpdateStepNum, this);
        this.scroller.horizontalScrollBar.autoVisibility = false;
        this.scroller.horizontalScrollBar.visible = false;
        this.img_role.anchorOffsetX = this.img_role.width / 2;
        this.img_role.anchorOffsetY = this.img_role.height / 2;
        this.gameControl = new GameControl(this.img_role);
        this.gameControl.speed = Number(this.input_speed.text);
        this.gameControl.genCells = this.genCells;
        var genCells = this.genCells;
        genCells.scroll = this.scroller;
        genCells.wallList = this.list;
        genCells.cellList = this.list_bg;
        this.GenMiGong();
    };
    GameUI.prototype.GenMap = function () {
        var group = this.scroller.viewport;
        if (this.map.parent == group) {
            group.removeChild(this.map);
        }
        var rt = new egret.RenderTexture();
        rt.drawToTexture(this.list);
        var _map = new egret.Bitmap();
        _map.texture = rt;
        this.map = _map;
        group.addChildAt(_map, group.getChildIndex(this.list_bg) - 1);
        this.list.visible = false;
    };
    GameUI.prototype.UpdateStepNum = function () {
        if (!this.genCells.cells[this.genCells.index].isPassed) {
            this.stepNum++;
            this.txt_stepNum.text = "已探索：" + this.stepNum.toString();
        }
    };
    GameUI.prototype.RemoveListener = function () {
        this.btn_scale.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.SetListScale, this);
        this.btn_gen.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.GenMiGong, this);
        this.btn_swapMode.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.GenMiGong, this);
        this.input_speed.removeEventListener(egret.Event.CHANGE, this.ModifySpeed, this);
        this.img_Bg.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.BeginTouch, this);
        this.img_Bg.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.Move, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.CancelTouch, this);
        this.img_Bg.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.CancelTouch, this);
    };
    //触屏手指移动
    GameUI.prototype.Move = function (e) {
        var angle = this.virt.onTouchMove(e);
        this.gameControl.direction = angle;
    };
    GameUI.prototype.CancelTouch = function () {
        this.gameControl.direction = null;
        this.gameControl.RoleMoveState(1); //停止移动
        this.virt.stop();
    };
    GameUI.prototype.BeginTouch = function (e) {
        if (this.list.numElements == 0) {
            return;
        }
        this.initPos.x = e.stageX;
        this.initPos.y = e.stageY;
        this.virt.x = e.stageX;
        this.virt.y = e.stageY;
        this.virt.start();
        this.gameControl.RoleMoveState(0); //开始移动
    };
    GameUI.prototype.ModifySpeed = function () {
        var speed = Number(this.input_speed.text);
        this.gameControl.speed = speed;
    };
    GameUI.prototype.GenMiGong = function () {
        var row = 15;
        var col = Number(this.input_col.text);
        this.genCells.index = 0;
        this.txt_stepNum.text = "已探索：0";
        this.genCells.GetCells(row, col);
        this.list.dataProvider = new eui.ArrayCollection(this.genCells.cells);
        this.list.itemRenderer = CellRender;
        this.list_bg.dataProvider = new eui.ArrayCollection(this.genCells.cells);
        this.list_bg.itemRenderer = CellBgRender;
        this.list.validateNow();
        this.list.validateDisplayList();
        this.GenMap();
        this.img_mapBg.width = this.list.width;
        this.PlayAni();
    };
    GameUI.prototype.PlayAni = function () {
        var _this = this;
        var obj = this.list.getElementAt(this.genCells.index);
        this.img_role.x = obj.x;
        this.img_role.y = obj.y + (obj.height / 2);
        egret.Tween.get(this.scroller.viewport).to({ scrollH: 0 }, this.scroller.viewport.scrollH / 0.5);
        egret.Tween.get(this.img_role).wait(this.scroller.viewport.scrollH / 0.5).to({ x: obj.x + (obj.width / 2) }, 1000).call(function () {
            _this.img_Bg.touchEnabled = true;
        });
        var wait = obj.StartAni(1000);
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
