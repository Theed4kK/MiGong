class GenCells {
	public constructor() {
	}

	/**根据行和列返回格子列表 */
	public static GetCells(): Cell[] {
		let cells: Cell[][] = [];
		let allCell: Cell[] = [];
		let map: MapLib = MapLib.configs[1];
		let row = 15;
		let col = map.size;

		let tmp: number = 0;
		for (var i: number = 0; i < row; i++) {
			let cell: Cell[] = [];
			for (var j: number = 0; j < col; j++) {
				let c: Cell = new Cell();
				c.id = tmp;
				cell.push(c);
				allCell.push(c);
				tmp++;
			}
			cells.push(cell);
		}

		//初始化格子/墙的id和关联
		for (var i: number = 0; i < row; i++) {
			for (var j: number = 0; j < col; j++) {
				let c: Cell = cells[i][j];
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

		allCell = GenCells.SetCellDrop(allCell, map);

		allCell = GenCells.SetWallOpen(allCell);
		return allCell;
	}

	private static SetCellDrop(allCell: Cell[], map: MapLib) {
		let drop_item: number[] = <number[]>Common.ParseField(map.drop_item);
		let drop_num: number[] = <number[]>Common.ParseField(map.drop_num);
		let allItems: number[] = [];
		drop_num.forEach((num, index) => {
			for (let i = 0; i < num; i++) {
				allItems.push(drop_item[index]);
			}
		})
		allItems.sort((a, b) => { return Math.random() > .5 ? -1 : 1; })
		allCell.forEach((v, index, arr) => {
			if (v.id != 0 && v.id != arr.length - 1) {
				let itemNum = allItems.length;
				let cellNum = allCell.length - 2;
				if (itemNum != 0 && (itemNum / cellNum) > Math.random()) {
					v.item = allItems[0];
					allItems.splice(0, 1);
				}
				else {
					v.isSpecial = (map.special_chance / 10000) > Math.random()
				}
			}
		})
		return allCell;
	}

	private static SetWallOpen(allCell: Cell[]) {
		allCell[0].isSigned = true;
		let signedCell: Cell[] = [];
		let designedCell: Cell[] = [];
		for (let e of allCell) {
			designedCell.push(e);
		}

		let signingCell: Cell = allCell[0];
		designedCell.splice(0, 1);
		signedCell.push(allCell[0]);

		while (designedCell.length > 0) {
			let cs: Cell[] = [];
			cs = GenCells.GetDesignedCell(signingCell);
			if (cs.length > 0) {
				let num: number = Common.getRandomInt(1, cs.length);
				GenCells.GetSharedWall(signingCell, cs[num - 1]).isOpen = true;
				signingCell = cs[num - 1];
				signingCell.isSigned = true;
				signedCell.push(signingCell);
				designedCell.splice(designedCell.indexOf(signingCell), 1)
			}
			else {
				let num: number = Common.getRandomInt(1, signedCell.length);
				signingCell = signedCell[num - 1];
			}
		}
		return allCell;
	}

	/**获取周围未访问的格子集合 */
	private static GetDesignedCell(cell: Cell): Cell[] {
		let cs: Cell[] = [];
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
	}

	/**获得两个格子中间的墙 */
	private static GetSharedWall(cell1: Cell, cell2: Cell): Wall {
		let w: Wall;
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
	}
}