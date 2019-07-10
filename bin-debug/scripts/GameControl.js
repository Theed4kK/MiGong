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
        _this.tw_roleReturn = egret.Tween.get(_this.img_role);
        _this.img_role = img_role;
        return _this;
    }
    GameControl.prototype.RoleMoveState = function (state, start, target) {
        if (start === void 0) { start = 0; }
        if (target === void 0) { target = 0; }
        switch (state) {
            //操作移动
            case 0:
                this.addEventListener(egret.Event.ENTER_FRAME, this.RoleMove, this);
                break;
            //停止操作移动
            case 1:
                this.removeEventListener(egret.Event.ENTER_FRAME, this.RoleMove, this);
                break;
            case 2:
                this.addEventListener(egret.Event.ENTER_FRAME, this.RoleAutoMove, this);
                break;
            case 3:
                this.RoleAutoMove();
                break;
        }
    };
    GameControl.prototype.RoleAutoMove = function () {
        // this.genCells.returnPath.
        var path = this.genCells.returnPath;
        if (path.length > 0 && path[0] != this.genCells.index) {
            var index = path[0] + 0.5;
            var c = new CellRender();
            var target = new egret.Point(index * c.width, index * c.height);
            var now = new egret.Point(this.img_role.x, this.img_role.y);
            var dis = egret.Point.distance(now, target);
            path.splice(0);
            this.tw_roleReturn.to({ x: target.x, y: target.y }, (dis / this.speed) * 100).call(this.RoleAutoMove, this);
        }
    };
    //角色移动
    GameControl.prototype.RoleMove = function () {
        if (this.direction == null) {
            return;
        }
        var speedX = Math.cos(this.direction) * this.speed;
        var speedY = Math.sin(this.direction) * this.speed;
        var cell = this.genCells.cells[this.genCells.index];
        var scroll = this.genCells.scroll;
        var hasWall = false;
        var isEdge = false;
        var scrollH = 0;
        var groupWidth = 0;
        var obj = this.genCells.wallList.getElementAt(this.genCells.index);
        if (speedX < 0) {
            hasWall = (cell.leftCell == null || !cell.leftWall.isExit);
            isEdge = this.IsEdge(0);
            if (hasWall || isEdge) {
                var left = this.img_role.x - (this.img_role.width / 2);
                var distance = (left - (obj.x + CellRender.vWallwidth * 0.5));
                this.img_role.x += Math.max(-distance, speedX);
            }
            else {
                this.img_role.x += speedX;
            }
            scrollH = scroll.viewport.scrollH;
            if (((this.img_role.x - scrollH) < (scroll.width / 2)) && scrollH > 0) {
                scroll.viewport.scrollH += Math.max(speedX, -scrollH);
            }
        }
        else {
            hasWall = (cell.rightCell == null || !cell.rightCell.leftWall.isExit);
            isEdge = this.IsEdge(0);
            if (hasWall || isEdge) {
                var right = this.img_role.x + (this.img_role.width / 2);
                var distance = ((obj.x + obj.width - CellRender.vWallwidth * 0.5) - right);
                this.img_role.x += Math.min(speedX, distance);
            }
            else {
                this.img_role.x += speedX;
            }
            scrollH = scroll.viewport.scrollH;
            groupWidth = scroll.viewport.measuredWidth;
            if (((this.img_role.x - scrollH) > (scroll.width / 2)) && ((scrollH + scroll.width) < groupWidth)) {
                scroll.viewport.scrollH += Math.min(speedX, groupWidth - scrollH - scroll.width);
            }
        }
        if (speedY < 0) {
            hasWall = (cell.upCell == null || !cell.upWall.isExit);
            isEdge = this.IsEdge(1);
            if (hasWall || isEdge) {
                var top_1 = this.img_role.y - (this.img_role.height / 2);
                var distance = (top_1 - (obj.y + CellRender.hWallHeight * 0.5));
                this.img_role.y += Math.max(speedY, -distance);
            }
            else {
                this.img_role.y += speedY;
            }
        }
        else {
            hasWall = (cell.downCell == null || !cell.downCell.upWall.isExit);
            isEdge = this.IsEdge(1);
            if (hasWall || isEdge) {
                var bottom = this.img_role.y + (this.img_role.height / 2);
                var distance = ((obj.y + obj.height - CellRender.hWallHeight * 0.5) - bottom);
                this.img_role.y += Math.min(speedY, distance);
            }
            else {
                this.img_role.y += speedY;
            }
        }
        this.genCells.SetIndex(this.img_role.x, this.img_role.y);
        this.genCells.RefreshCell(this.direction, this.speed);
    };
    GameControl.prototype.IsEdge = function (type) {
        var isEdge = true;
        var img_role = this.img_role;
        var obj = this.genCells.wallList.getElementAt(this.genCells.index);
        switch (type) {
            case 0:
                isEdge = (Math.abs(img_role.y - obj.y)) < ((img_role.height / 2) + CellRender.hWallHeight * 0.5);
                isEdge = isEdge || ((Math.abs(img_role.y - obj.y - obj.height) < (img_role.height / 2) + CellRender.hWallHeight * 0.5));
                break;
            case 1:
                isEdge = (Math.abs(img_role.x - obj.x)) < ((img_role.width / 2) + CellRender.vWallwidth * 0.5);
                isEdge = isEdge || ((Math.abs(img_role.x - obj.x - obj.width) < (img_role.width / 2) + CellRender.vWallwidth * 0.5));
                break;
        }
        return isEdge;
    };
    return GameControl;
}(eui.Component));
__reflect(GameControl.prototype, "GameControl", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=GameControl.js.map