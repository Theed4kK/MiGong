class GenCells {
	public constructor() {
	}

	/**根据行和列返回格子列表 */
	public static GetCells(row: number, col: number): Cell[] {
		let cells: Cell[][] = [];
		let allCell: Cell[] = [];

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

		let t: number = 0;
		for (var i: number = 0; i < row; i++) {
			for (var j: number = 0; j < col; j++) {
				let c: Cell = cells[i][j];
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
			}
		}

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