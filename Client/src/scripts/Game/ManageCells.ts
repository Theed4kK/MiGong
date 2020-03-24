class ManageCells {
	public constructor(cells: Cell[], cellList: eui.List, view: egret.Rectangle) {
		this.cells = cells;
		this.col = cells.length / 15;
		this.cellList = cellList;
		this.view = view;
		this.InitRenders();
	}

	private _index: number = 0;
	/**当前所在格子编号 */
	public get index(): number {
		return this._index;
	}

	private view: egret.Rectangle;

	private _currentCell: Cell;
	/**当前所在格子 */
	public get currentCell(): Cell {
		return this._currentCell;
	};
	private _currentBgRender: CellRender;
	public get currentBgRender(): CellRender {
		return this._currentBgRender;
	};

	public returnPath: number[] = [];
	private cells: Cell[] = [];
	private cellList: eui.List;
	private arrayCellList: eui.ArrayCollection;

	/**初始化背景和墙格子 */
	public InitRenders(): void {
		let self: ManageCells = this;
		self.arrayCellList = new eui.ArrayCollection(this.cells);
		self.cellList.dataProvider = self.arrayCellList;
		self.cellList.itemRenderer = CellRender;
		self.cellList.validateNow();
		self.cellList.validateDisplayList();
		this.SetCurrentCell();
	}

	ExitMap() {
		if (this.mapData.itemNum > 0) {
			ItemManage.GetInstance().GetItems(this.mapData.item);
		}
		PlayerDataManage.GetInstance().GetPoint(this.mapData.point);
	}

	private col: number;
	private returnCell: CellRender = null;
	private mapData: {
		point: number,
		item: { [id: number]: number },
		itemNum: number
	} = {
		point: 0,
		item: {},
		itemNum: 0
	};

	cell_width = +Config.GetInstance().config_common["cell_width"].value;
	cell_height = +Config.GetInstance().config_common["cell_height"].value;
	/**设置当前所在格子编号 */
	public SetIndex(role: eui.Group): void {
		let h: number = Math.floor(role.x / this.cell_width);
		let v: number = Math.floor(role.y / this.cell_height);
		let index: number = v * this.col + h;
		if (this._index != index) {
			this._index = index
			this.SetCurrentCell();
			this.SetReturnPath();
		}
		this.GetCellItem(role);
	}

	GetCellItem(role: eui.Group) {
		let self: ManageCells = this;
		if (self._currentCell.item != 0 && self._currentBgRender.ItemTest(role)) {
			if (self.mapData.item[self._currentCell.item]) {
				self.mapData.item[self._currentCell.item]++;
			} else {
				self.mapData.item[self._currentCell.item] = 1;
			}
			self._currentCell.item = 0;
			self.arrayCellList.itemUpdated(self._currentCell);
			self.mapData.itemNum++;
			GameEvent.dispatchEventWith(GameEvent.GetItem, false, Common.DictionaryToArray(self.mapData.item));
		}
	}

	private SetCurrentCell() {
		let self: ManageCells = this;
		self._currentCell = self.arrayCellList.getItemAt(self.index);
		self._currentBgRender = self.cellList.getElementAt(self._index) as CellRender;
		this.mapData.point++;
		if (self._currentCell && !self._currentCell.isPassed) {
			self._currentCell.isPassed = true;
			GameEvent.dispatchEventWith(GameEvent.RefreshCurRender);
		}
	}

	/**设置返回路径 */
	private SetReturnPath(): void {
		if (this.GetUnpassedCells(this.currentCell) > 1 && (this.returnPath.length == 0 || this.returnPath.length > 5)) {
			this.returnPath = [];
			if (this.returnCell != null) {
				// this.returnCell.HideReturnSign();
			}
			this.returnCell = this._currentBgRender;
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