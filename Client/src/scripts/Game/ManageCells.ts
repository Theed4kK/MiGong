class ManageCells {
	public constructor(cells: Cell[], cellList: eui.List, group_mapBg: eui.Group) {
		this.cells = cells;
		this.col = cells.length / 15;
		this.cellList = cellList;
		this.group_mapBg = group_mapBg;
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

	public returnPath: number[] = [];
	private cells: Cell[] = [];
	private cellList: eui.List;
	private arrayCellList: eui.ArrayCollection;
	private group_mapBg: eui.Group;

	/**初始化背景和墙格子 */
	public InitRenders(): void {
		let self: ManageCells = this;
		self.arrayCellList = new eui.ArrayCollection(this.cells);
		self.cellList.dataProvider = self.arrayCellList;
		self.cellList.itemRenderer = CellBgRender;
		self.cellList.validateNow();
		self.cellList.validateDisplayList();

		let ground_bitmap = new egret.Bitmap();
		let wall_bitmap = new egret.Bitmap();
		self.group_mapBg.addChild(ground_bitmap);
		self.group_mapBg.addChild(wall_bitmap);
		let ground_render = new egret.RenderTexture();
		let wall_render = new egret.RenderTexture();

		ground_render.drawToTexture(self.cellList);
		ground_bitmap.texture = ground_render;
		for (let i = 0; i < self.arrayCellList.length; i++) {
			let cell: Cell = self.arrayCellList.getItemAt(i);
			cell.renderState++;
		}
		self.arrayCellList.refresh();
		self.cellList.validateNow();
		self.cellList.validateDisplayList();

		wall_render.drawToTexture(self.cellList);
		wall_bitmap.texture = wall_render;
		for (let i = 0; i < self.arrayCellList.length; i++) {
			let cell: Cell = self.arrayCellList.getItemAt(i);
			cell.renderState++;
		}
		self.arrayCellList.refresh();

		// self.cellList.validateNow();
		// self.cellList.validateDisplayList();
		this.SetCurrentCell();
	}

	ExitMap() {
		if (this.mapData.itemNum > 0) {
			ItemManage.GetInstance().GetItems(this.mapData.item);
		}
		PlayerDataManage.GetInstance().GetPoint(this.mapData.point);
	}

	private col: number;
	private returnCell: CellBgRender = null;
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
		if (this._currentCell.item != 0 && this._currentBgRender.ItemTest(role)) {
			if (this.mapData.item[this._currentCell.item]) {
				this.mapData.item[this._currentCell.item]++;
			} else {
				this.mapData.item[this._currentCell.item] = 1;
			}
			this._currentCell.item = 0;
			this.arrayCellList.itemUpdated(this._currentCell);
			this.mapData.itemNum++;
		}
	}

	private SetCurrentCell() {
		let self: ManageCells = this;
		self._currentCell = self.arrayCellList.getItemAt(self.index);
		self._currentBgRender = self.cellList.getElementAt(self._index) as CellBgRender;
		this.mapData.point++;
		if (self._currentCell && !self._currentCell.isPassed) {
			self._currentCell.isPassed = true;
			this.cellList.dispatchEvent(new egret.Event("RefreshCurRender"));
		}
	}

	/**设置返回路径 */
	private SetReturnPath(): void {
		if (this.GetUnpassedCells(this.currentCell) > 1 && (this.returnPath.length == 0 || this.returnPath.length > 5)) {
			this.returnPath = [];
			if (this.returnCell != null) {
				this.returnCell.HideReturnSign();
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