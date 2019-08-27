var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GenCells = (function () {
    function GenCells() {
    }
    /**根据行和列返回格子列表 */
    GenCells.GetCells = function () {
        var cells = [];
        var allCell = [];
        var map = MapLib.configs[1];
        var row = 15;
        var col = map.size;
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
        //初始化格子/墙的id和关联
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < col; j++) {
                var c = cells[i][j];
                c.upCell = (i == 0 ? null : cells[i - 1][j]);
                if (c.upCell != null) {
                    c.upWall.cell1Id = c.upCell.id;
                    c.upWall.cell2Id = c.id;
                    c.upCell.downWall = c.upCell.walls[1] = c.upWall;
                }
                c.downCell = (i == row - 1 ? null : cells[i + 1][j]);
                c.leftCell = (j == 0 ? null : cells[i][j - 1]);
                if (c.leftCell != null) {
                    c.leftWall.cell1Id = c.leftCell.id;
                    c.leftWall.cell2Id = c.id;
                    c.leftCell.rightWall = c.leftCell.walls[3] = c.leftWall;
                }
                c.rightCell = (j == col - 1 ? null : cells[i][j + 1]);
                c.nearCells = [c.upCell, c.downCell, c.leftCell, c.rightCell];
                c.walls = [c.upWall, c.downWall, c.leftWall, c.rightWall];
            }
        }
        GenCells.SetCellDrop(allCell, map);
        GenCells.SetWallOpen(allCell);
        // GenCells.SetWallSize(allCell);
        return allCell;
    };
    GenCells.SetWallSize = function (allCell) {
        allCell.forEach(function (v) {
        });
    };
    /**掉落和特殊地面生成 */
    GenCells.SetCellDrop = function (allCell, map) {
        var drop_item = Common.ParseField(map.drop_item);
        var drop_num = Common.ParseField(map.drop_num);
        var allItems = [];
        drop_num.forEach(function (num, index) {
            for (var i = 0; i < num; i++) {
                allItems.push(drop_item[index]);
            }
        });
        allItems.sort(function (a, b) { return Math.random() > .5 ? -1 : 1; });
        allCell.forEach(function (v, index, arr) {
            if (v.id != 0 && v.id != arr.length - 1) {
                var itemNum = allItems.length;
                var cellNum = allCell.length - 2;
                if (itemNum != 0 && (itemNum / cellNum) > Math.random()) {
                    v.item = allItems[0];
                    allItems.splice(0, 1);
                }
                else {
                    v.isSpecial = (map.special_chance / 10000) > Math.random();
                }
            }
        });
    };
    /**生成迷宫核心逻辑,设置通道(移除两个格子之间的墙) */
    GenCells.SetWallOpen = function (allCell) {
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
            cs = GenCells.GetDesignedCell(signingCell);
            if (cs.length > 0) {
                var num = Common.getRandomInt(1, cs.length);
                GenCells.GetSharedWall(signingCell, cs[num - 1]).isOpen = true;
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
    };
    /**获取周围未访问的格子集合 */
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
    /**获得两个格子中间的墙 */
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
}());
__reflect(GenCells.prototype, "GenCells");
//# sourceMappingURL=GenCells.js.map