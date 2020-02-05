class CellBgRender extends eui.ItemRenderer {
	public constructor() {
		super();
		// this.addEventListener(egret.Event.ADDED, this.GetCellSize, this);
		this.addEventListener("", this.ArriveCell, this);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.width = +Config.GetInstance().config_common["cell_width"].value
		this.height = +Config.GetInstance().config_common["cell_height"].value
	}

	private img_bg: eui.Image;
	private img_exitSign: eui.Image;
	private img_item: eui.Image;

	private img_leftWall: eui.Image;
	private img_rightWall: eui.Image;
	private img_upWall: eui.Image;
	private img_downWall: eui.Image;

	private tw_autoReturn: egret.Tween;

	protected dataChanged(): void {
		let cell: Cell = this.data;
		this.SetWall();
		if (cell.item != 0) {
			let item = Config.GetInstance().config_item[cell.item];
			this.img_item.source = item.pic;
			this.img_item.visible = true;
			this.img_item.x = this.x + Common.getRandomInt(this.img_leftWall.width / 2, this.width - this.img_rightWall.width / 2 - this.img_item.width);
			this.img_item.y = this.y + Common.getRandomInt(this.img_upWall.height / 2, this.height - this.img_downWall.height / 2 - this.img_item.height);
			egret.log(`格子ID为：${cell.id}`);
		}
		else{
			this.img_item.visible = false;
		}
		if (cell.isSpecial) {
			this.img_bg.source = RES.getRes("532_png")
			this.img_bg.visible = true;
		}
	}

	ItemTest(role: eui.Image): boolean {
		let rect1: egret.Rectangle = role.getBounds();
		let rect2: egret.Rectangle = this.img_item.getBounds();
		let point1 = role.localToGlobal();
		let point2 = this.img_item.localToGlobal();
		rect1.x = point1.x;
		rect1.y = point1.y;
		rect2.x = point2.x;
		rect2.y = point2.y;
		if (rect1.intersects(rect2)) {
			this.img_item.visible = false;
			return true;
		}
		return false;
	}

	private ArriveCell() {

	}

	public HideReturnSign(): void {
		this.img_exitSign.visible = false;
	}

	public StartAni(): void {

	}

	SetWall() {
		let cell: Cell = this.data;
		this.img_leftWall.visible = !cell.leftWall.isOpen;
		this.img_rightWall.visible = !cell.rightWall.isOpen;
		this.img_upWall.visible = !cell.upWall.isOpen;
		this.img_downWall.visible = !cell.downWall.isOpen;
	}

}