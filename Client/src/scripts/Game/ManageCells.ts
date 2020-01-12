class ManageCells extends eui.Component implements eui.UIComponent {
	public constructor(cells: Cell[], cellList: eui.List, mapBg: eui.Image) {
		super();
		this.cells = cells;
		this.col = cells.length / 15;
		this.cellList = cellList;
		this.mapBg = mapBg;
		this.InitRenders();
	}

	private _index: number = 0;
	/**当前所在格子编号 */
	public get index(): number {
		return this._index;
	}

	private _currentCell: Cell;
	/**当前所在格子 */
	public get currentCell(): Cell {
		return this._currentCell;
	};
	private _currentBgRender: CellBgRender;
	public get currentBgRender(): CellBgRender {
		return this._currentBgRender;
	};

	public cells: Cell[] = [];
	public returnPath: number[] = [];

	private cellList: eui.List;
	private mapBg: eui.Image;

	/**初始化背景和墙格子 */
	public InitRenders(): void {
		let self: ManageCells = this;
		this.mapBg.width = this.cells.length * Config.GetInstance().config_common["cell_width"].value + Config.GetInstance().config_common["cell_width"].value
		self.cellList.dataProvider = new eui.ArrayCollection(this.cells);
		self.cellList.itemRenderer = CellBgRender;
		self.cellList.validateNow();
		self.cellList.validateDisplayList();
		this.mapBg.width = this.cellList.contentWidth;
		this.mapBg.height = this.cellList.contentHeight;
		this.SetCurrentCell();
	}


	private col: number;
	private returnCell: CellBgRender = null;

	cell_width = Config.GetInstance().config_common["cell_width"].value;
	cell_height = Config.GetInstance().config_common["cell_height"].value;
	/**设置当前所在格子编号 */
	public SetIndex(roleX: number, roleY: number): void {
		let h: number = Math.floor(roleX / this.cell_width);
		let v: number = Math.floor(roleY / this.cell_height);
		let index: number = v * this.col + h;
		if (this._index != index) {
			this._index = index
			this.SetCurrentCell();
			this.SetReturnPath();
		}
	}

	private SetCurrentCell() {
		let self: ManageCells = this;
		self._currentCell = self.cells[self.index]
		self._currentCell.isPassed = true;
		self._currentBgRender = self.cellList.getElementAt(self._index) as CellBgRender;
	}

	/**设置返回路径 */
	private SetReturnPath(): void {
		if (this.GetUnpassedCells(this.currentCell) > 1 && (this.returnPath.length == 0 || this.returnPath.length > 5)) {
			this.returnPath = [];
			if (this.returnCell != null) {
				this.returnCell.HideReturnSign();
			}
			this.returnCell = this._currentBgRender;
			this.returnCell.SetReturnSign();
		}
		if (this.returnCell != null) {
			if (this.returnPath.indexOf(this.index) == -1) {
				this.returnPath.push(this.index);
			}
			else {
				this.returnPath.splice(-1, 1);
			}
		}
	}

	/**获取指定格子周围没经过的格子数量 */
	private GetUnpassedCells(cell: Cell): number {
		let num: number = cell.downWall.isOpen && !cell.downCell.isPassed ? 1 : 0;
		num += cell.upWall.isOpen && !cell.upCell.isPassed ? 1 : 0;
		num += cell.leftWall.isOpen && !cell.leftCell.isPassed ? 1 : 0;
		num += cell.rightWall.isOpen && !cell.rightCell.isPassed ? 1 : 0;
		return num;
	}
}