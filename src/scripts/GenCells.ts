class GenCells extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	public index: number;
	private lastIndex: number = 0;
	// public speed: number;
	public wallList: eui.List;
	public cellList: eui.List;
	public scroll: eui.Scroller;
	public cells: Cell[] = [];
	public returnPath: number[] = [0];

	private col: number;

	public SetIndex(h: number, v: number): void {
		this.index = v * this.col + h;
		egret.log("编号-----》" + this.index);
		if (this.index != this.lastIndex) {
			this.SetReturnPath();
			this.dispatchEvent(new MyEvent(MyEvent.updateStepNum));
			this.lastIndex = this.index;
		}
	}

	private SetReturnPath(): void {
		if (this.GetOpenWallNum(this.cells[this.index]) == 3 && (this.returnPath.length == 0 || this.returnPath.length > 5)) {
			this.returnPath = [];
			let c = <CellBgRender>this.cellList.getElementAt(this.index);
			c.SetReturnSign();
		}
		if (this.returnPath.indexOf(this.index) == -1) {
			this.returnPath.push(this.index);
		}
	}

	private GetOpenWallNum(cell: Cell): number {
		let num: number = cell.downCell != null && cell.downCell.upWall.isExit ? 1 : 0;
		num += cell.upCell != null && cell.upWall.isExit ? 1 : 0;
		num += cell.leftCell != null && cell.leftWall.isExit ? 1 : 0;
		num += cell.rightCell != null && cell.leftCell.leftWall.isExit ? 1 : 0;
		return num;
	}

	public RefreshCell(dir: number, speed: number): void {
		if (!this.cells[this.index].isPassed) {
			let cellBgRender: CellBgRender = <CellBgRender>this.cellList.getElementAt(this.index);
			cellBgRender.LightenUp(dir, speed);
			this.RefreshAroundCells();
			this.cells[this.index].isPassed = true;
		}
	}

	private RefreshAroundCells(): void {
		let cell: Cell = this.cells[this.index];
		let leftCell: Cell = this.cells[this.index].leftCell;
		if (leftCell != null && !cell.leftWall.isExit && !leftCell.isPassed) {
			let cellBgRender: CellBgRender = <CellBgRender>this.cellList.getElementAt(this.index - 1);
			cellBgRender.RefreshBg(0);
		}
		let rightCell: Cell = this.cells[this.index].rightCell;
		if (rightCell != null && !rightCell.leftWall.isExit && !rightCell.isPassed) {
			let cellBgRender: CellBgRender = <CellBgRender>this.cellList.getElementAt(this.index + 1);
			cellBgRender.RefreshBg(1);
		}
		let upCell: Cell = this.cells[this.index].upCell;
		if (upCell != null && !cell.upWall.isExit && !upCell.isPassed) {
			let cellBgRender: CellBgRender = <CellBgRender>this.cellList.getElementAt(this.index - this.col);
			cellBgRender.RefreshBg(2);
		}
		let downCell: Cell = this.cells[this.index].downCell;
		if (downCell != null && !downCell.upWall.isExit && !downCell.isPassed) {
			let cellBgRender: CellBgRender = <CellBgRender>this.cellList.getElementAt(this.index + this.col);
			cellBgRender.RefreshBg(3);
		}
	}

	public GetCells(row: number, col: number): Cell[] {
		this.col = col;
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
			cs = GenCells.GetDesignedCell(signingCell); //周围未访问的格子集合
			if (cs.length > 0) {
				let num: number = Common.getRandomInt(1, cs.length);
				GenCells.GetSharedWall(signingCell, cs[num - 1]).isExit = true;	//获得中间的墙并设置开放
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
		this.cells = allCell;
		return allCell;
	}

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