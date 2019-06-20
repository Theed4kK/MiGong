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
    function GameControl(img_role) {
        var _this = _super.call(this) || this;
        _this.img_role = img_role;
        return _this;
    }
    GameControl.prototype.RoleMoveState = function (state, start, target) {
        if (start === void 0) { start = 0; }
        if (target === void 0) { target = 0; }
        switch (state) {
            case 0:
                this.addEventListener(egret.Event.ENTER_FRAME, this.RoleMove, this);
                break;
            case 1:
                this.removeEventListener(egret.Event.ENTER_FRAME, this.RoleMove, this);
                break;
        }
    };
    //角色移动
    GameControl.prototype.RoleMove = function () {
        if (this.directionX == null && this.directionY == null) {
            return;
        }
        var speed = this.speed;
        var cell = this.genCells.cells[this.genCells.index];
        var scroll = this.genCells.scroll;
        var hasWall = false;
        var isEdge = false;
        var scrollH = 0;
        var groupWidth = 0;
        var obj = this.genCells.wallList.getElementAt(this.genCells.index);
        switch (this.directionX) {
            //向左移动
            case 0:
                hasWall = (cell.leftCell == null || !cell.leftWall.isOpen);
                isEdge = this.IsEdge(0);
                if (hasWall || isEdge) {
                    var left = this.img_role.x - (this.img_role.width / 2);
                    var distance = (left - (obj.x + 2));
                    this.img_role.x -= Math.min(speed, distance);
                }
                else {
                    this.img_role.x -= speed;
                }
                scrollH = scroll.viewport.scrollH;
                if (((this.img_role.x - scrollH) < (scroll.width / 2)) && scrollH > 0) {
                    scroll.viewport.scrollH -= Math.min(speed, scrollH);
                }
                break;
            //向右移动
            case 1:
                hasWall = (cell.rightCell == null || !cell.rightCell.leftWall.isOpen);
                isEdge = this.IsEdge(0);
                if (hasWall || isEdge) {
                    var right = this.img_role.x + (this.img_role.width / 2);
                    var distance = ((obj.x + obj.width - 2) - right);
                    this.img_role.x += Math.min(speed, distance);
                }
                else {
                    this.img_role.x += speed;
                }
                scrollH = scroll.viewport.scrollH;
                groupWidth = scroll.viewport.measuredWidth;
                if (((this.img_role.x - scrollH) > (scroll.width / 2)) && ((scrollH + scroll.width) < groupWidth)) {
                    scroll.viewport.scrollH += speed;
                }
                break;
        }
        switch (this.directionY) {
            //向下移动
            case 0:
                hasWall = (cell.downCell == null || !cell.downCell.upWall.isOpen);
                isEdge = this.IsEdge(1);
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
            case 1:
                hasWall = (cell.upCell == null || !cell.upWall.isOpen);
                isEdge = this.IsEdge(1);
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
        this.ResetIndex();
        this.genCells.RefreshCell(this.directionX, this.directionY, this.speed);
    };
    GameControl.prototype.ResetIndex = function () {
        var obj = this.genCells.wallList.getElementAt(this.genCells.index);
        var left = this.img_role.x - (this.img_role.width / 2);
        var right = this.img_role.x + (this.img_role.width / 2);
        var up = this.img_role.y - (this.img_role.height / 2);
        var bottom = this.img_role.y + (this.img_role.height / 2);
        if (right < obj.x) {
            this.genCells.SetIndex(0);
        }
        if (left > obj.x + obj.width) {
            this.genCells.SetIndex(1);
        }
        if (bottom < obj.y) {
            this.genCells.SetIndex(2);
        }
        if (up > obj.y + obj.height) {
            this.genCells.SetIndex(3);
        }
    };
    GameControl.prototype.IsEdge = function (type) {
        var isEdge = true;
        var img_role = this.img_role;
        var obj = this.genCells.wallList.getElementAt(this.genCells.index);
        switch (type) {
            case 0:
                isEdge = (Math.abs(img_role.y - obj.y)) < ((img_role.height / 2) + 2);
                isEdge = isEdge || ((Math.abs(img_role.y - obj.y - obj.height) < (img_role.height / 2) + 2));
                break;
            case 1:
                isEdge = (Math.abs(img_role.x - obj.x)) < ((img_role.width / 2) + 2);
                isEdge = isEdge || ((Math.abs(img_role.x - obj.x - obj.width) < (img_role.width / 2) + 2));
        }
        return isEdge;
    };
    return GameControl;
}(eui.Component));
__reflect(GameControl.prototype, "GameControl", ["eui.UIComponent", "egret.DisplayObject"]);
