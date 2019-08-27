var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Wall = (function () {
    function Wall() {
        /**为true时表明没有墙 */
        this.isOpen = false;
        this.left = 0;
        this.right = 0;
        this.top = 0;
        this.bottom = 0;
    }
    return Wall;
}());
__reflect(Wall.prototype, "Wall");
//# sourceMappingURL=Wall.js.map