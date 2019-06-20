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
        }
        if (cell.rightCell == null && cell.downCell == null) {
            this.img_exitSign.visible = true;
        }
    };
    CellBgRender.prototype.LightenUp = function (dirX, dirY, speed) {
        var width = this.img_bg.width;
        var height = this.img_bg.height;
        this.tw = egret.Tween.get(this.img_bg);
        // if(dirX )
        switch (dirX) {
            case 0:
                this.tw.to({ right: width }, 300);
                break;
            case 1:
                this.tw.to({ left: width }, 300);
                break;
        }
        switch (dirY) {
            case 0:
                this.tw.to({ top: height }, 300);
                break;
            case 1:
                this.tw.to({ bottom: height }, 300);
                break;
        }
    };
    CellBgRender.prototype.StartAni = function () {
    };
    return CellBgRender;
}(eui.ItemRenderer));
__reflect(CellBgRender.prototype, "CellBgRender");
