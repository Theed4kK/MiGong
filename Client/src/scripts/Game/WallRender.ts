class WallRender extends eui.ItemRenderer {
	public constructor() {
		super();
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.width = +Config.GetInstance().config_common["cell_width"].value
		this.height = +Config.GetInstance().config_common["cell_height"].value
	}

	private img_leftWall: eui.Image;
	private img_rightWall: eui.Image;
	private img_upWall: eui.Image;
	private img_downWall: eui.Image;

	protected dataChanged(): void {
		let self: WallRender = this;
		let cell: Cell = self.data;
		if (cell.specialIndex == CELL_INDEX.Start) {
			self.img_leftWall.visible = false;
		}
		else {
			self.img_leftWall.visible = !cell.leftWall.isOpen;
		}
		if (cell.specialIndex == CELL_INDEX.End) {
			self.img_rightWall.visible = false;
		}
		else {
			self.img_rightWall.visible = !cell.rightWall.isOpen;
		}
		self.img_upWall.visible = !cell.upWall.isOpen;
		self.img_downWall.visible = !cell.downWall.isOpen;
	}
}

class CellRender extends eui.ItemRenderer {
	public constructor() {
		super();
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.width = +Config.GetInstance().config_common["cell_width"].value;
		this.height = +Config.GetInstance().config_common["cell_height"].value;
		if (!CellRender.wall_width) {
			CellRender.wall_width = +Config.GetInstance().config_common["wall_width"].value;
		}
		if (!CellRender.wall_height) {
			CellRender.wall_height = +Config.GetInstance().config_common["wall_height"].value;
		}
	}

	private img_bg: eui.Image;
	private img_item: eui.Image;

	//颜色矩阵数组-置灰
	static colorMatrix = [
		0.3, 0.6, 0, 0, 0,
		0.3, 0.6, 0, 0, 0,
		0.3, 0.6, 0, 0, 0,
		0, 0, 0, 1, 0
	];

	static wall_width: number = null;
	static wall_height: number = null;

	protected dataChanged(): void {
		let cell: Cell = this.data;
		let self: CellRender = this;
		if (cell.item != 0) {
			let item = Config.GetInstance().config_item[cell.item];
			let glow = new egret.GlowFilter(Color[item.quality], 0.5, 10, 10, 10, egret.BitmapFilterQuality.HIGH, false, true);
			self.img_item.filters = [glow];
			self.img_item.source = item.pic;
			self.img_item.visible = true;
		}
		else {
			self.img_item.visible = false;
		}
	}

	ItemTest(role: eui.Group): boolean {
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
}