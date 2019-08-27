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
    CellBgRender.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    CellBgRender.prototype.dataChanged = function () {
        var cell = this.data;
        if (cell.item != 0) {
            var item = ItemLib.configs[cell.item];
            this.img_exitSign.source = item.pic;
        }
        else {
            if (cell.isSpecial) {
                this.img_exitSign.source = RES.getRes("532_png");
                egret.log("特殊地面ID--->" + cell.id);
            }
            else {
                this.img_exitSign.visible = false;
            }
        }
        if (cell.id == 0) {
            this.visible = true;
        }
        else {
            this.visible = false;
        }
        if (cell.downCell == null && cell.rightCell == null) {
            this.visible = true;
            this.img_bg.visible = false;
            this.img_exitSign.source = RES.getRes("100_png");
        }
    };
    CellBgRender.prototype.LightenUp = function () {
        this.visible = true;
    };
    CellBgRender.prototype.SetReturnSign = function () {
        // this.img_exitSign.visible = true;
    };
    CellBgRender.prototype.HideReturnSign = function () {
        this.img_exitSign.visible = false;
    };
    CellBgRender.prototype.StartAni = function () {
    };
    return CellBgRender;
}(eui.ItemRenderer));
__reflect(CellBgRender.prototype, "CellBgRender");
//# sourceMappingURL=CellBgRender.js.map