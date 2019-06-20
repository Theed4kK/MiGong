var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Cell = (function () {
    function Cell() {
        this.isPassed = false;
        this.isSigned = false;
        this.upCell = this.downCell = this.leftCell = this.rightCell = null;
    }
    return Cell;
}());
__reflect(Cell.prototype, "Cell");
