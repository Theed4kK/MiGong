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
        return _super.call(this) || this;
    }
    CellRender.prototype.dataChanged = function () {
        var cell = this.data;
        this.img_upWall.visible = cell.upWall == null ? true : !cell.upWall.isOpen;
        this.img_downWall.visible = !cell.downCell;
        this.img_leftWall.visible = cell.leftWall == null ? true : !cell.leftWall.isOpen;
        this.img_rightWall.visible = !cell.rightCell;
    };
    CellRender.prototype.StartAni = function () {
    };
    return CellRender;
}(eui.ItemRenderer));
__reflect(CellRender.prototype, "CellRender");
//# sourceMappingURL=CellRender.js.map