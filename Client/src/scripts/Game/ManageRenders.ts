class ManageRenders extends eui.Component implements eui.UIComponent {
	public constructor(wallList: eui.List, cellList: eui.List) {
		super();
		this.wallList = wallList;
		this.cellList = cellList;
		GameUI.manageCells.addEventListener("RefreshCurRender", this.RefreshRender, this);
	}

	public wallList: eui.List;
	public cellList: eui.List;
	public currentBgRender: CellBgRender;
	public currentRender: WallRender;

	/**初始化背景和墙格子 */
	public InitRenders(cells: Cell[]): void {
		let self:ManageRenders = this;
		self.wallList.dataProvider = new eui.ArrayCollection(GameUI.manageCells.cells);
		self.wallList.itemRenderer = WallRender;
		self.cellList.dataProvider = new eui.ArrayCollection(GameUI.manageCells.cells);
		self.cellList.itemRenderer = CellBgRender;
		self.wallList.validateNow();
		self.wallList.validateDisplayList();
		self.cellList.validateNow();
		self.cellList.validateDisplayList();
		self.RefreshRender(new egret.Event("", false, false, 0));
	}

	private RefreshRender(e: egret.Event): void {
		this.currentRender = <WallRender>this.wallList.getElementAt(e.data);
		this.currentBgRender = <CellBgRender>this.cellList.getElementAt(e.data);
	}

	// 	/**生成地图底图 需要地图生成完成后调用*/
	// private GenMapTextrue(): void {
	// 	let group: eui.Group = <eui.Group>this.scroller.viewport;
	// 	let mapTexture = this.mapTexture;
	// 	if (mapTexture.parent == group) { group.removeChild(mapTexture); }
	// 	var rt: egret.RenderTexture = new egret.RenderTexture();
	// 	rt.drawToTexture(this.list);
	// 	mapTexture.texture = rt;
	// 	group.addChildAt(mapTexture, group.getChildIndex(this.list_bg) - 1);
	// 	this.list.visible = false;
	// 	egret.log("地图底图生成完成");
	// }
}