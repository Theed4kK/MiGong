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
var GenCells = (function (_super) {
    __extends(GenCells, _super);
    function GenCells() {
        var _this = _super.call(this) || this;
        _this.cells = [];
        return _this;
    }
    GenCells.prototype.SetIndex = function (type) {
        switch (type) {
            case 0:
                this.index--;
                break;
            case 1:
                this.index++;
                break;
            case 2:
                this.index -= this.col;
                break;
            case 3:
                this.index += this.col;
                break;
        }
        this.dispatchEvent(new MyEvent(MyEvent.updateStepNum));
    };
    GenCells.prototype.RefreshCell = function (dirX, speed) {
        if (!this.cells[this.index].isPassed) {
            var cellBgRender = this.cellList.getElementAt(this.index);
            cellBgRender.LightenUp(dirX, speed);
            this.cells[this.index].isPassed = true;
        }
    };
    GenCells.prototype.GetCells = function (row, col) {
        this.col = col;
        var cells = [];
        var allCell = [];
        var tmp = 0;
        for (var i = 0; i < row; i++) {
            var cell = [];
            for (var j = 0; j < col; j++) {
                var c = new Cell();
                c.id = tmp;
                cell.push(c);
                allCell.push(c);
                tmp++;
            }
            cells.push(cell);
        }
        var t = 0;
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < col; j++) {
                var c = cells[i][j];
                c.upCell = (i == 0 ? null : cells[i - 1][j]);
                if (c.upWall == null) {
                    c.upWall = new Wall();
                    c.upWall.id = t;
                    t++;
                    c.upWall.cell1Id = c.upCell != null ? c.upCell.id : null;
                    c.upWall.cell2Id = c.id;
                    if (c.upCell != null) {
                        c.upCell.downWall = c.upWall;
                    }
                }
                c.downCell = (i == row - 1 ? null : cells[i + 1][j]);
                if (c.downWall == null) {
                    c.downWall = new Wall();
                    c.downWall.id = t;
                    t++;
                    c.downWall.cell1Id = c.id;
                    c.downWall.cell2Id = c.downCell != null ? c.downCell.id : null;
                    if (c.downCell != null) {
                        c.downCell.upWall = c.downWall;
                    }
                }
                c.leftCell = (j == 0 ? null : cells[i][j - 1]);
                if (c.leftWall == null) {
                    c.leftWall = new Wall();
                    c.leftWall.id = t;
                    t++;
                    c.leftWall.cell1Id = c.leftCell != null ? c.leftCell.id : null;
                    c.leftWall.cell2Id = c.id;
                    if (c.leftCell != null) {
                        c.leftCell.rightWall = c.leftWall;
                    }
                }
                c.rightCell = (j == col - 1 ? null : cells[i][j + 1]);
                if (c.rightWall == null) {
                    c.rightWall = new Wall();
                    c.rightWall.id = t;
                    t++;
                    c.rightWall.cell1Id = c.id;
                    c.rightWall.cell2Id = c.rightCell != null ? c.rightCell.id : null;
                    if (c.rightCell != null) {
                        c.rightCell.leftWall = c.rightWall;
                    }
                }
            }
        }
        allCell[0].isSigned = true;
        var signedCell = [];
        var designedCell = [];
        for (var _i = 0, allCell_1 = allCell; _i < allCell_1.length; _i++) {
            var e = allCell_1[_i];
            designedCell.push(e);
        }
        var signingCell = allCell[0];
        designedCell.splice(0, 1);
        signedCell.push(allCell[0]);
        while (designedCell.length > 0) {
            var cs = [];
            cs = GenCells.GetDesignedCell(signingCell); //周围未访问的格子集合
            if (cs.length > 0) {
                var num = Common.getRandomInt(1, cs.length);
                GenCells.GetSharedWall(signingCell, cs[num - 1]).isOpen = true; //获得中间的墙并设置开放
                signingCell = cs[num - 1];
                signingCell.isSigned = true;
                signedCell.push(signingCell);
                designedCell.splice(designedCell.indexOf(signingCell), 1);
            }
            else {
                var num = Common.getRandomInt(1, signedCell.length);
                signingCell = signedCell[num - 1];
            }
        }
        this.cells = allCell;
        return allCell;
    };
    GenCells.GetDesignedCell = function (cell) {
        var cs = [];
        if (cell.upCell != null && !cell.upCell.isSigned) {
            cs.push(cell.upCell);
        }
        if (cell.downCell != null && !cell.downCell.isSigned) {
            cs.push(cell.downCell);
        }
        if (cell.leftCell != null && !cell.leftCell.isSigned) {
            cs.push(cell.leftCell);
        }
        if (cell.rightCell != null && !cell.rightCell.isSigned) {
            cs.push(cell.rightCell);
        }
        return cs;
    };
    GenCells.GetSharedWall = function (cell1, cell2) {
        var w;
        if (cell1.leftWall == cell2.rightWall) {
            w = cell1.leftWall;
        }
        else if (cell1.rightWall == cell2.leftWall) {
            w = cell1.rightWall;
        }
        else if (cell1.upWall == cell2.downWall) {
            w = cell1.upWall;
        }
        else if (cell1.downWall == cell2.upWall) {
            w = cell1.downWall;
        }
        return w;
    };
    return GenCells;
}(eui.Component));
__reflect(GenCells.prototype, "GenCells", ["eui.UIComponent", "egret.DisplayObject"]);
