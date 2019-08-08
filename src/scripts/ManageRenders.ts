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
		this.wallList.dataProvider = new eui.ArrayCollection(GameUI.manageCells.cells);
		this.wallList.itemRenderer = WallRender;
		this.cellList.dataProvider = new eui.ArrayCollection(GameUI.manageCells.cells);
		this.cellList.itemRenderer = CellBgRender;
		this.wallList.validateNow();
		this.wallList.validateDisplayList();
		this.cellList.validateNow();
		this.cellList.validateDisplayList();
		this.RefreshRender(new egret.Event("", false, false, 0));
	}

	public RefreshRender(e: egret.Event): void {
		this.currentRender = <WallRender>this.wallList.getElementAt(e.data);
		this.currentBgRender = <CellBgRender>this.cellList.getElementAt(e.data);
		this.currentBgRender.LightenUp();
	}

	
}