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
var CellBgRender = (function (_super) {
    __extends(CellBgRender, _super);
    function CellBgRender() {
        return _super.call(this) || this;
    }
    CellBgRender.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    CellBgRender.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    CellBgRender.prototype.dataChanged = function () {
        var cell = this.data;
        if (cell.id == 0) {
            this.img_bg.visible = false;
            cell.isPassed = true;
            return;
        }
        if (cell.id == 1 && !cell.leftWall.isExit) {
            this.img_bg.left = CellRender.vWallwidth / 2;
        }
        if (cell.upCell != null && cell.upCell.id == 0 && !cell.upWall.isExit) {
            this.img_bg.top = CellRender.hWallHeight / 2;
        }
        //最右下角的出口标志
        if (cell.rightCell == null && cell.downCell == null) {
            this.img_exitSign.visible = true;
        }
        //左边边界格子
        if (cell.leftCell == null) {
            this.img_bg.left = CellRender.vWallwidth / 2;
        }
        //右边边界格子
        if (cell.rightCell == null) {
            this.img_bg.right = CellRender.vWallwidth / 2;
        }
        //上边边界格子
        if (cell.upCell == null) {
            this.img_bg.top = CellRender.hWallHeight / 2;
        }
        //下边边界格子
        if (cell.downCell == null) {
            this.img_bg.bottom = CellRender.hWallHeight / 2;
        }
    };
    CellBgRender.prototype.LightenUp = function (dir, speed) {
        egret.Tween.get(this.img_bg).to({ alpha: 0 }, 1000);
    };
    CellBgRender.prototype.RefreshBg = function (type) {
        switch (type) {
            case 0:
                egret.Tween.get(this.img_bg).to({ right: CellRender.vWallwidth / 2 }, 500);
                break;
            case 1:
                egret.Tween.get(this.img_bg).to({ left: CellRender.vWallwidth / 2 }, 500);
                break;
            case 2:
                egret.Tween.get(this.img_bg).to({ bottom: CellRender.hWallHeight / 2 }, 500);
                break;
            case 3:
                egret.Tween.get(this.img_bg).to({ top: CellRender.hWallHeight / 2 }, 500);
                break;
        }
    };
    CellBgRender.prototype.SetReturnSign = function () {
        this.img_exitSign.visible = true;
    };
    CellBgRender.prototype.StartAni = function () {
    };
    return CellBgRender;
}(eui.ItemRenderer));
__reflect(CellBgRender.prototype, "CellBgRender");
//# sourceMappingURL=CellBgRender.js.map