var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Wall = (function () {
    function Wall() {
        this.isOpen = false;
    }
    Wall.hWalls = [];
    Wall.wWalls = [];
    return Wall;
}());
__reflect(Wall.prototype, "Wall");
//# sourceMappingURL=Wall.js.map