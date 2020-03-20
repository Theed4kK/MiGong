class WallRender extends eui.ItemRenderer {
	public constructor() {
		super();
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.width = +Config.GetInstance().config_common["cell_width"].value
		this.height = +Config.GetInstance().config_common["cell_height"].value
	}

	private img_exitSign: eui.Image;
	private img_item: eui.Image;

	private img_leftWall: eui.Image;
	private img_rightWall: eui.Image;
	private img_upWall: eui.Image;
	private img_downWall: eui.Image;

	private tw_autoReturn: egret.Tween;

	private group_wall: eui.Group;

	protected dataChanged(): void {
		let self: WallRender = this;
		let cell: Cell = self.data;
		self.SetWall();
		if (cell.item != 0) {
			let item = Config.GetInstance().config_item[cell.item];
			let glow = new egret.GlowFilter(Color[item.quality], 0.5, 10, 10, 10, egret.BitmapFilterQuality.HIGH, false, true);
			self.img_item.filters = [glow];
			self.img_item.source = item.pic;
			self.img_item.visible = true;
			self.img_item.x = self.x + Common.getRandomInt(self.img_leftWall.width / 2, self.width - self.img_rightWall.width / 2 - self.img_item.width);
			self.img_item.y = self.y + Common.getRandomInt(self.img_upWall.height / 2, self.height - self.img_downWall.height / 2 - self.img_item.height);
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

class CellRender extends eui.ItemRenderer {
	public constructor() {
		super();
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.width = +Config.GetInstance().config_common["cell_width"].value
		this.height = +Config.GetInstance().config_common["cell_height"].value
	}

	private img_bg: eui.Image;

	//颜色矩阵数组-置灰
	static colorMatrix = [
		0.3, 0.6, 0, 0, 0,
		0.3, 0.6, 0, 0, 0,
		0.3, 0.6, 0, 0, 0,
		0, 0, 0, 1, 0
	];

	protected dataChanged(): void {
		let cell: Cell = this.data;
		if (cell.isPassed) {
			this.img_bg.filters = null;
		}
		else {
			var colorFlilter = new egret.ColorMatrixFilter(CellRender.colorMatrix);
			this.img_bg.filters = [colorFlilter];
		}
	}
}