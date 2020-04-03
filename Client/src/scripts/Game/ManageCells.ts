class ManageCells {
	public constructor(arrList: eui.ArrayCollection, cellList: eui.List) {
		this.arrayCellList = arrList;
		this.col = arrList.length / 15;
		this.cellList = cellList;
		this.SetCurrentCell();
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
	private _currentCellRender: CellRender;
	public get currentCellRender(): CellRender {
		return this._currentCellRender;
	};

	public returnPath: number[] = [];
	private cellList: eui.List;
	private arrayCellList: eui.ArrayCollection;

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

	private cell_width = +Config.GetInstance().config_common["cell_width"].value;
	private cell_height = +Config.GetInstance().config_common["cell_height"].value;

	/**玩家步长 */
	length = 1;
	/**玩家有效探索路径 */
	path: number[] = [];
	/**设置当前所在格子编号 */
	public SetIndex(role: eui.Group): void {
		let h: number = Math.floor(role.x / this.cell_width);
		let v: number = Math.floor(role.y / this.cell_height);
		let index: number = v * this.col + h;
		if (this._index != index) {
			this._index = index
			this.length++;
			this.SetCurrentCell();
			this.RecordPath();
		}
		this.GetCellItem(role);
	}

	GetCellItem(role: eui.Group) {
		let self: ManageCells = this;
		if (self._currentCell.item != 0 && self._currentCellRender.ItemTest(role)) {
			if (self.mapData.item[self._currentCell.item]) {
				self.mapData.item[self._currentCell.item]++;
			} else {
				self.mapData.item[self._currentCell.item] = 1;
			}
			self.mapData.itemNum++;
			GameEvent.dispatchEventWith(GameEvent.GetItem, false,
				{ id: self._currentCell.item, value: self.mapData.item[self._currentCell.item] }
			);
			self._currentCell.item = 0;
			self.arrayCellList.itemUpdated(self._currentCell);
		}
	}

	private SetCurrentCell() {
		let self: ManageCells = this;
		self._currentCell = self.arrayCellList.getItemAt(self.index);
		self._currentCellRender = self.cellList.getElementAt(self._index) as CellRender;
		this.mapData.point++;
		if (self._currentCell && !self._currentCell.isPassed) {
			self._currentCell.isPassed = true;
			GameEvent.dispatchEventWith(GameEvent.RefreshCurRender);
		}
	}

	/**记录路径 */
	private RecordPath(): void {
		let self: ManageCells = this;
		if (self.path.indexOf(self.index) == -1) {
			self.path.push(self.index);
		}
		if (self.GetUnpassedCells(self.currentCell) > 1 && (self.returnPath.length == 0 || self.returnPath.length > 5)) {
			self.returnPath = [];
			if (self.returnCell != null) {
				// this.returnCell.HideReturnSign();
			}
			self.returnCell = self._currentCellRender;
		}
		if (self.returnCell != null) {
			if (self.returnPath.indexOf(self.index) == -1) {
				self.returnPath.push(self.index);
			}
			else {
				self.returnPath.splice(-1, 1);
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