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
var GameControl = (function (_super) {
    __extends(GameControl, _super);
    function GameControl() {
        var _this = _super.call(this) || this;
        _this.cells = [];
        _this.speed = null;
        return _this;
    }
    //角色移动
    GameControl.prototype.RoleMove = function (index, obj) {
        var speed = this.speed;
        var cell = this.cells[index];
        var hasWall = false;
        var isEdge = false;
        var scrollH = 0;
        var groupWidth = 0;
        switch (this.direction) {
            //向左移动
            case 0:
                hasWall = (cell.leftCell == null || !cell.leftWall.isOpen);
                isEdge = (Math.abs(this.img_role.y - obj.y)) < ((this.img_role.height / 2) + 2);
                isEdge = isEdge || ((Math.abs(this.img_role.y - obj.y - obj.height) < (this.img_role.height / 2) + 2));
                if (hasWall || isEdge) {
                    var left = this.img_role.x - (this.img_role.width / 2);
                    var distance = (left - (obj.x + 2));
                    this.img_role.x -= Math.min(speed, distance);
                }
                else {
                    this.img_role.x -= speed;
                }
                scrollH = this.scroll.viewport.scrollH;
                // groupWidth = this.scroller.viewport.width;
                if (((this.img_role.x - scrollH) < (this.scroll.width / 2)) && scrollH > 0) {
                    this.scroll.viewport.scrollH -= Math.min(speed, scrollH);
                }
                break;
            //向右移动
            case 1:
                hasWall = (cell.rightCell == null || !cell.rightCell.leftWall.isOpen);
                isEdge = (Math.abs(this.img_role.y - obj.y)) < ((this.img_role.height / 2) + 2);
                isEdge = isEdge || ((Math.abs(this.img_role.y - obj.y - obj.height) < (this.img_role.height / 2) + 2));
                if (hasWall || isEdge) {
                    var right = this.img_role.x + (this.img_role.width / 2);
                    var distance = ((obj.x + obj.width - 2) - right);
                    this.img_role.x += Math.min(speed, distance);
                }
                else {
                    this.img_role.x += speed;
                }
                scrollH = this.scroll.viewport.scrollH;
                groupWidth = this.scroll.viewport.measuredWidth;
                if (((this.img_role.x - scrollH) > (this.scroll.width / 2)) && ((scrollH + this.scroll.width) < groupWidth)) {
                    this.scroll.viewport.scrollH += speed;
                }
                break;
            //向下移动
            case 2:
                hasWall = (cell.downCell == null || !cell.downCell.upWall.isOpen);
                isEdge = (Math.abs(this.img_role.x - obj.x)) < ((this.img_role.width / 2) + 2);
                isEdge = isEdge || ((Math.abs(this.img_role.x - obj.x - obj.width) < (this.img_role.width / 2) + 2));
                if (hasWall || isEdge) {
                    var bottom = this.img_role.y + (this.img_role.height / 2);
                    var distance = ((obj.y + obj.height - 2) - bottom);
                    this.img_role.y += Math.min(speed, distance);
                }
                else {
                    this.img_role.y += speed;
                }
                break;
            //向上移动
            case 3:
                hasWall = (cell.upCell == null || !cell.upWall.isOpen);
                isEdge = (Math.abs(this.img_role.x - obj.x)) < ((this.img_role.width / 2) + 2);
                isEdge = isEdge || ((Math.abs(this.img_role.x - obj.x - obj.width) < (this.img_role.width / 2) + 2));
                if (hasWall || isEdge) {
                    var top_1 = this.img_role.y - (this.img_role.height / 2);
                    var distance = (top_1 - (obj.y + 2));
                    this.img_role.y -= Math.min(speed, distance);
                }
                else {
                    this.img_role.y -= speed;
                }
                break;
        }
    };
    return GameControl;
}(eui.Component));
__reflect(GameControl.prototype, "GameControl", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=GameControl.js.map