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
var CellRender = (function (_super) {
    __extends(CellRender, _super);
    function CellRender() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.COMPLETE, _this.GetWallData, _this);
        return _this;
    }
    CellRender.prototype.GetWallData = function () {
        if (CellRender.hWallHeight == 0) {
            CellRender.hWallHeight = this.img_upWall.height;
        }
        if (CellRender.vWallwidth == 0) {
            CellRender.vWallwidth = this.img_leftWall.width;
        }
        // if (CellRender.hWallHeight == 0) {
        // 	CellRender.hWallHeight = this.img_upWall.height;
        // }
        // if (CellRender.vWallwidth == 0) {
        // 	CellRender.vWallwidth = this.img_leftWall.width;
        // }
    };
    CellRender.prototype.dataChanged = function () {
        var cell = this.data;
        this.img_upWall.visible = cell.upWall == null ? true : !cell.upWall.isExit;
        this.img_downWall.visible = !cell.downCell;
        this.img_leftWall.visible = cell.leftWall == null ? true : !cell.leftWall.isExit;
        this.img_rightWall.visible = !cell.rightCell;
        this.SetLeftWall();
    };
    CellRender.prototype.SetLeftWall = function () {
        var cell = this.data;
        if (!cell.leftWall.isExit) {
            if (cell.downCell != null && !cell.downCell.upWall.isExit) {
                this.img_leftWall.bottom = this.img_upWall.height / 2;
            }
        }
    };
    CellRender.prototype.StartAni = function (wait) {
        var aniTime = 500;
        egret.Tween.get(this.img_leftWall).wait(wait).to({ top: -2 }, aniTime);
        return aniTime;
    };
    CellRender.hWallHeight = 0;
    CellRender.vWallwidth = 0;
    CellRender.h = 0;
    CellRender.w = 0;
    return CellRender;
}(eui.ItemRenderer));
__reflect(CellRender.prototype, "CellRender");
//# sourceMappingURL=CellRender.js.map