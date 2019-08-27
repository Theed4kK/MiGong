var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Cell = (function () {
    function Cell() {
        /**0:上墙 1:下墙 2:左墙 3:右墙 */
        this.upWall = new Wall();
        this.downWall = new Wall();
        this.leftWall = new Wall();
        this.rightWall = new Wall();
        this.walls = [];
        this.upCell = null;
        this.downCell = null;
        this.leftCell = null;
        this.rightCell = null;
        this.nearCells = [];
        /**生成时用来标记是否已经被处理过 */
        this.isSigned = false;
        /**行走时用来标记格子是否已经通过 */
        this.isPassed = false;
        this.item = 0;
    }
    ;
    ;
    ;
    ;
    ;
    ;
    ;
    ;
    return Cell;
}());
__reflect(Cell.prototype, "Cell");
//# sourceMappingURL=Cell.js.map