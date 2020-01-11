class ManageRenders extends eui.Component implements eui.UIComponent {
	public constructor(cellList: eui.List, mapBg: eui.Image) {
		super();
		this.cellList = cellList;
		this.mapBg = mapBg;
		GameUI.manageCells.addEventListener("RefreshCurRender", this.RefreshRender, this);
	}

	private cellList: eui.List;
	private mapBg: eui.Image;
	public currentBgRender: CellBgRender;

	/**初始化背景和墙格子 */
	public InitRenders(cells: Cell[], width, height): void {
		let self: ManageRenders = this;
		this.mapBg.width = cells.length * Config.GetInstance().config_common["cell_width"].value + Config.GetInstance().config_common["cell_width"].value
		// self.cellList.height = height;
		// self.cellList.width = width;
		self.cellList.dataProvider = new eui.ArrayCollection(GameUI.manageCells.cells);
		self.cellList.itemRenderer = CellBgRender;
		self.cellList.validateNow();
		self.cellList.validateDisplayList();
		this.mapBg.width = this.cellList.contentWidth;
		this.mapBg.height = this.cellList.contentHeight;
		self.RefreshRender(new egret.Event("", false, false, 0));
	}

	private RefreshRender(e: egret.Event): void {
		this.currentBgRender = <CellBgRender>this.cellList.getElementAt(e.data);
	}
}