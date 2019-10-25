class CellBgRender extends eui.ItemRenderer {
	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED, this.GetCellSize, this);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
	}

	public static _width: number = 0;
	public static _height: number = 0;
	private GetCellSize() {
		if (CellBgRender._width == 0) {
			CellBgRender._width = this.width;
		}
		if (CellBgRender._height == 0) {
			CellBgRender._height = this.height;
		}
	}

	private img_bg: eui.Image;
	private img_exitSign: eui.Image;

	private tw_autoReturn: egret.Tween;

	protected dataChanged(): void {
		let cell: Cell = this.data;

		if (cell.item != 0) {
			let item = Config.GetInstance().configs_item[cell.item];
			this.img_exitSign.source = item.pic;
		}
		else {
			if (cell.isSpecial) {
				this.img_exitSign.source = RES.getRes("532_png")
				egret.log("特殊地面ID--->" + cell.id);
			}
			else {
				this.img_exitSign.visible = false;
			}
		}
		if (cell.downCell == null && cell.rightCell == null) {
			this.visible = true;
			this.img_bg.visible = false;
			this.img_exitSign.source = RES.getRes("100_png")
		}
	}

	public SetReturnSign(): void {
		// this.img_exitSign.visible = true;
	}

	public HideReturnSign(): void {
		this.img_exitSign.visible = false;
	}

	public StartAni(): void {

	}

}